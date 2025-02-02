import { Injectable, NotFoundException} from '@nestjs/common';

import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';

import { BlogPostService } from '@project/blog-post';
import { BlogLikeFactory } from './blog-like.factory';

import { PostState } from '@prisma/client';

@Injectable()
export class BlogLikeService {

  constructor(
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogPostService: BlogPostService,
  ) {}

  //Поставим лайк

  public async addLike(postId:string, userId:string): Promise<BlogLikeEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    if (existsPost.state === PostState.draft) { throw new NotFoundException('Post is not published')}
    const newLike = BlogLikeFactory.createLikeEntity(userId,existsPost.id);
    await this.blogLikeRepository.save(newLike);
    return newLike;
  }


  //Уберем лайк
  public async deleteLike(postId:string, userId:string): Promise<void> {
          await this.blogLikeRepository.delete(postId,userId);
  }

}
