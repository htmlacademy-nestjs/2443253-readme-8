import { Module } from "@nestjs/common";
import { BlogPostModule } from "@project/blog-post";
import { PostController } from "./routing-post.controller";
import { PostService } from "./routing-post.service";

@Module({
  imports: [BlogPostModule],
  controllers: [PostController],
  providers: [PostService]

})
export class RoutingPostModule {}
