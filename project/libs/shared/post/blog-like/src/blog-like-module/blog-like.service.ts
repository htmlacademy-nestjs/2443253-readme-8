import { Injectable} from '@nestjs/common';

import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { BlogPostService } from '@project/blog-post';
import { BlogLikeFactory } from './blog-like.factory';

@Injectable()
export class BlogLikeService {

  constructor(
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogPostService: BlogPostService,
  ) {}

  //Поставим лайк

  public async addLike(postId:string, dto: CreateLikeDto): Promise<BlogLikeEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    const newLike = BlogLikeFactory.createFromDto(dto,existsPost.id);
    await this.blogLikeRepository.save(newLike);
    return newLike;
  }


  //Уберем лайк
  public async deleteLike(postId:string, dto: CreateLikeDto): Promise<void> {
          await this.blogLikeRepository.delete(postId,dto.userId);
  }

}
