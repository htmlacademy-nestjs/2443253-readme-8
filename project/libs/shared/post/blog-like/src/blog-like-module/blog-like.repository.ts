import { Injectable, NotFoundException} from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import { Like } from '@project/core';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';
import { BasePostgresRepository } from '@project/data-access';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {
  constructor(
    entityFactory: BlogLikeFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }


  //Количество лайков по посту
  private async getLikeCount(postId: string): Promise<number> {
    return this.client.like.count({ where:
      {
        postId,
      },
    });
  }
  //Проверяем наличие лайка у пользователя
  private async likeExists(postId: string, userId: string): Promise<number> {
    const where: Prisma.LikeWhereInput = {};
    where.postId = postId;
    where.userId = userId;
    return await this.client.like.count({ where });
  }

  private async updateCountLikes(postId: string): Promise<void> {

      //Посчитаем количество лайков по посту и запишем значение в пост
      await this.client.post.update({
        where: { id: postId },
        data: {
        countLikes : await this.getLikeCount(postId),
      }
      });

  }
  //Ставим лайк
  public async save(entity: BlogLikeEntity): Promise<void> {
   const likeExists = this.likeExists(entity.postId,entity.userId);

   if (await likeExists === 0) {
      const record = await this.client.like.create({
        data: {...entity.toPOJO()}
      });

      entity.id = record.id;
      this.updateCountLikes(entity.postId);
    } else{
      throw new NotFoundException(`Like for post ${entity.postId} and user ${entity.userId} already exists`);
    }


  }

  //Удаляем лайк
  public async delete(postId: string, userId:string): Promise<void> {
    const where: Prisma.LikeWhereInput = {};
    where.postId = postId;
    where.userId = userId;
    const record = await this.client.like.findFirst({ where });
    try {
      await this.client.like.delete({
        where: {
          id: record.id,
        }    });
        this.updateCountLikes(postId);
    } catch {
      throw new NotFoundException(`Like for post ${postId} and user ${userId} not exists`);
    }

  }
}
