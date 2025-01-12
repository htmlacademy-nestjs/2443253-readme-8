import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';

import { BlogCommentController } from './blog-comment.controller';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentService } from './blog-comment.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
  exports: [BlogCommentRepository, BlogCommentFactory]

})
export class BlogCommentModule {}
