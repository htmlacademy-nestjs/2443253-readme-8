import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import { Comment } from '@project/core';

import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }


    //Количество комментариев по посту
    private async getCommentCount(postId: string): Promise<number> {
      return this.client.comment.count({ where:
        {
          postId,
        },
      });
    }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: {...entity.toPOJO()}
    });

    entity.id = record.id;

    //Посчитаем комментарии
    await this.client.post.update({
      where: { id: record.postId },
      data: {
      countComments : await this.getCommentCount(record.postId),
      }
    });

  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId
      }
    });

    return records.map(record => this.createEntityFromDocument(record))
  }
}
