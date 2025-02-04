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
    entity.originPostId = repost ? originPostId : "";
    entity.state = dto.state;
    entity.repost = repost;
    entity.new =  true;
    entity.type = dto.type;
    entity.name = dto.name;

    entity.video = dto.video;
    entity.foto = dto.foto;
    entity.announcement = dto.announcement;
    entity.text = dto.text;
    entity.author = dto.author;
    entity.comments = [];

    return entity;
  }

}
