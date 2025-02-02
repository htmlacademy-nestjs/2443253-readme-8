import { Injectable } from '@nestjs/common';

import { Like, EntityFactory } from '@project/core';
import { BlogLikeEntity } from './blog-like.entity';


@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
  public create(entityPlainData: Like): BlogLikeEntity {
    return new BlogLikeEntity(entityPlainData);
  }

  public static createLikeEntity(userId:string, postId: string): BlogLikeEntity {
    const currentDate = new Date();
    return new BlogLikeEntity({
      userId,
      postId,
      createdAt: currentDate,
      id:crypto.randomUUID(),
    });
  }
}
