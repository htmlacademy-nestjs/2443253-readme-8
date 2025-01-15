
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
  public originPostId:string;

  public type:PostType;//тип публикации

  public name: string;//Тип публикации: видео,текст
  public video?: string;////Тип публикации: видео
  public announcement?: string;////Тип публикации: текст
  public text?: string;////Тип публикации: текст, цитата
  public author?: string;//Тип публикации: цитата
  public comments: BlogCommentEntity[];//Комментарии
  // public likes: Like[];//Лайки




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
    this.originPostId = post.originPostId;

    this.type = post.type;

    this.name = post.name;
    this.video = post.video;
    this.announcement = post.announcement;
    this.text = post.text;
    this.author = post.author;
    this.comments = [];


    const blogCommentFactory = new BlogCommentFactory();

    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
    console.log(this.comments);

    // this.likes = post.likes;

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
      originPostId : this.originPostId,

      type: this.type,

      name: this.name,
      video: this.video,
      announcement: this.announcement,
      text: this.text,
      author: this.author,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),

      // likes: this.likes,


    }
  }

}
