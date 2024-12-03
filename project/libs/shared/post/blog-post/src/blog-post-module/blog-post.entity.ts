import { Entity, Post, PostType, PostState } from '@project/core';
import { StorableEntity} from '@project/core';






export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public tegs?: string[];
  public date: string;
  public createDate: string;
  public userId: string;
  public repost: boolean;
  public state:PostState;
  public countLikes:number;
  public countComments:number;



  public name?: string;//Тип публикации: видео,текст
  public video?: string;////Тип публикации: видео
  public announcement?: string;////Тип публикации: текст
  public text?: string;////Тип публикации: текст, цитата
  public author?: string;//Тип публикации: цитата
  public foto?: string;//Тип публикации: фото
  public reference?: string;//Тип публикации: ссылка
  public description?: string;//Тип публикации: ссылка

  public type:PostType;//тип публикации




  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (! post) {
      return;
    }

    this.id = post.id ?? '';

    this.date = post.date;
    this.createDate = post.createDate;
    this.userId = post.userId;
    this.repost = post.repost;
    this.state = post.state;
    this.countLikes = post.countLikes;
    this.countComments = post.countComments;

    this.name = post.name;
    this.video = post.video;
    this.announcement = post.announcement;
    this.text = post.text;
    this.author = post.author;
    this.foto = post.foto;
    this.reference = post.reference;
    this.description = post.description;

    this.type = post.type;

  }

  public toPOJO(): Post {
    return {
      id: this.id,

      date : this.date,
      createDate : this.createDate,
      userId : this.userId,
      repost : this.repost,
      state : this.state,
      countLikes : this.countLikes,
      countComments : this.countComments,

      name: this.name,
      video: this.video,
      announcement: this.announcement,
      text: this.text,
      author: this.author,
      foto: this.foto,
      reference: this.reference,
      description: this.description,

      type: this.type,
    }
  }

}
