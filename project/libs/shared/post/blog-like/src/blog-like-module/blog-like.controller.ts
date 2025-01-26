import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { BlogLikeService } from './blog-like.service';
import { LikeRdo } from './rdo/like.rdo';
import { fillDto } from '@project/helpers';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService,
  ) {}

  @Post('/')
  public async create(@Param('postId') postId: string, @Body() dto: CreateLikeDto) {
    const newLike = await this.blogLikeService.addLike(postId,dto);
    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('postId') postId, @Body() dto: CreateLikeDto) {
    await this.blogLikeService.deleteLike(postId,dto);
  }


}
