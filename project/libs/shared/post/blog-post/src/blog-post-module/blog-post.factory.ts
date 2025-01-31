import { EntityFactory, Post } from "@project/core";
import { BlogPostEntity } from "./blog-post.entity";
import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";


@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto, originPostId?:string,newUserId?: string, repost=false): BlogPostEntity {
    const entity = new BlogPostEntity();

    entity.id = crypto.randomUUID();
    entity.tegs = dto.tegs;
    entity.userId = repost ? newUserId: dto.userId;
    entity.countLikes = 0;
    entity.countComments = 0;
    entity.originPostId = repost ? originPostId : dto.userId;
    entity.state = dto.state;
    entity.repost = dto.repost;
    entity.type = dto.type;
    entity.name = dto.name;

    entity.video = dto.video;
    entity.announcement = dto.announcement;
    entity.text = dto.text;
    entity.author = dto.author;
    entity.comments = [];

    return entity;
  }

}
