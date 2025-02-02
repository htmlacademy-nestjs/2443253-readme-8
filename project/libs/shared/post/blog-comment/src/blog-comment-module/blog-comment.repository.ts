import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import { Comment } from '@project/core';

import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BasePostgresRepository } from '@project/data-access';
import { COMMENTS_FOR_ONE_REQUEST } from './blog-comment.constant';

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

    private async updateCountComments(postId: string): Promise<void> {

      //Посчитаем комментарии
      await this.client.post.update({
        where: { id: postId },
        data: {
        countComments : await this.getCommentCount(postId),
      }
    });


    }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: {...entity.toPOJO()}
    });

    entity.id = record.id;
    this.updateCountComments(entity.postId);

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

  public async deleteById(id: string, postId: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
    this.updateCountComments(postId);
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {

    const take = COMMENTS_FOR_ONE_REQUEST;

    const records = await this.client.comment.findMany({
      where:{
        postId
      },
      take,
    });

    return records.map(record => this.createEntityFromDocument(record))
  }
}
