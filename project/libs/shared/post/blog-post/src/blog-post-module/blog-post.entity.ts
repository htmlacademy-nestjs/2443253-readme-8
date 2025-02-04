
import { Entity, Post,  PostState,  PostType, StorableEntity} from '@project/core';
import {BlogCommentEntity, BlogCommentFactory} from '@project/blog-comment';







export class BlogPostEntity extends Entity implements StorableEntity<Post> {

  public tegs: string[];

  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public countLikes:number;
  public countComments:number;

  public state:PostState;
  public repost: boolean;
  public new: boolean;
  public originPostId:string;

  public type:PostType;//тип публикации

  public name: string;//Тип публикации: видео,текст
  public video?: string;////Тип публикации: видео
  public foto?: string;////Тип публикации: фото
  public announcement?: string;////Тип публикации: текст
  public text?: string;////Тип публикации: текст, цитата
  public author?: string;//Тип публикации: цитата
  public comments: BlogCommentEntity[];//Комментарии




  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (! post) {
      return;
    }

    this.id = post.id ?? undefined;//Идентификатор поста
    this.tegs = post.tegs;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.userId = post.userId;
    this.countLikes = post.countLikes;
    this.countComments = post.countComments;

    this.state = post.state;
    this.repost = post.repost;
    this.new = post.new;
    this.originPostId = post.originPostId;

    this.type = post.type;

    this.name = post.name;
    this.video = post.video;
    this.foto = post.foto;
    this.announcement = post.announcement;
    this.text = post.text;
    this.author = post.author;
    this.comments = [];


    const blogCommentFactory = new BlogCommentFactory();

    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

  }

  public toPOJO(): Post {

    return {

      id: this.id,
      tegs : this.tegs,
      createdAt : this.createdAt,
      updatedAt : this.updatedAt,

      userId : this.userId,
      countLikes : this.countLikes,
      countComments : this.countComments,

      state : this.state,
      repost : this.repost,
      new : this.new,
      originPostId : this.originPostId,

      type: this.type,

      name: this.name,
      video: this.video,
      foto: this.foto,
      announcement: this.announcement,
      text: this.text,
      author: this.author,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    }
  }

}
