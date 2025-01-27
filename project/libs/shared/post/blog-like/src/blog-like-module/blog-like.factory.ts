import { Injectable } from '@nestjs/common';

import { Like, EntityFactory } from '@project/core';
import { BlogLikeEntity } from './blog-like.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
  public create(entityPlainData: Like): BlogLikeEntity {
    return new BlogLikeEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateLikeDto, postId: string): BlogLikeEntity {
    const currentDate = new Date();
    return new BlogLikeEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      id:crypto.randomUUID(),
    });
  }
}
