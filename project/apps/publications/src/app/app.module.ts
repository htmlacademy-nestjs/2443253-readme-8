import { Module } from '@nestjs/common';
import { BlogPostModule } from '@project/blog-post';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogLikeModule } from '@project/blog-like';
import { PostConfigModule } from '@project/post-config';



@Module({
  imports: [
    BlogPostModule,BlogCommentModule,BlogLikeModule,PostConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
