import { Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { BlogLikeService } from './blog-like.service';
import { LikeRdo } from './rdo/like.rdo';
import { fillDto } from '@project/helpers';


@Controller('posts/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService,
  ) {}

  @Post('/:postId/:userId')
  public async create(@Param('postId') postId: string,@Param('userId') userId: string) {
    const newLike = await this.blogLikeService.addLike(postId,userId);
    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @Delete('/:postId/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('postId') postId,@Param('userId') userId: string) {
    await this.blogLikeService.deleteLike(postId,userId);
  }


}
