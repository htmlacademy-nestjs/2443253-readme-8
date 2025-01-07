import { Module } from '@nestjs/common';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostService } from './blog-post.service';
import { PrismaClientModule } from '@project/models';
import { BlogPostController } from './blog-post.controller';



@Module({
  imports: [PrismaClientModule],
  providers: [BlogPostRepository,BlogPostFactory, BlogPostService],
  controllers: [BlogPostController],
  exports: [BlogPostService],
})
export class BlogPostModule {

}
