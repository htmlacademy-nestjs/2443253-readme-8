import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';

import { BlogLikeController } from './blog-like.controller';

import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeFactory } from './blog-like.factory';
import { BlogLikeService } from './blog-like.service';
import { BlogPostRepository, BlogPostService,BlogPostFactory } from '@project/blog-post';
import { BlogCommentFactory, BlogCommentRepository } from '@project/blog-comment';


@Module({
  imports: [PrismaClientModule],
  controllers: [BlogLikeController],
  providers: [BlogLikeService, BlogLikeRepository, BlogLikeFactory,BlogPostService,BlogPostRepository,BlogPostFactory,BlogCommentRepository,BlogCommentFactory],
  exports: [BlogLikeRepository, BlogLikeFactory]

})
export class BlogLikeModule {}
