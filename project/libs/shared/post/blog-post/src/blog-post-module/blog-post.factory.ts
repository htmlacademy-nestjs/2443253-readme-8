import { EntityFactory, Post } from "@project/core";
import { BlogPostEntity } from "./blog-post.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

}
