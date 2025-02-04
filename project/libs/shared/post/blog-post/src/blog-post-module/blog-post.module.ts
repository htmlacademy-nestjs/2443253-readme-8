import { Module } from '@nestjs/common';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostService } from './blog-post.service';
import { PrismaClientModule } from '@project/models';
import { BlogPostController } from './blog-post.controller';
import { BlogCommentFactory, BlogCommentRepository } from '@project/blog-comment';
import { FileUploaderModule,FileUploaderService} from '@project/file-uploader';



@Module({
  imports: [PrismaClientModule,FileUploaderModule],
  providers: [BlogPostRepository,BlogPostFactory, BlogPostService,BlogCommentRepository,BlogCommentFactory,FileUploaderService],
  controllers: [BlogPostController],
  exports: [BlogPostService],
})
export class BlogPostModule {

}
