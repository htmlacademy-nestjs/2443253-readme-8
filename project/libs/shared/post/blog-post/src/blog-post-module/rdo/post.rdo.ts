
import { PostState, PostType } from '@project/core';
import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose()
  id: string;

  @Expose()
  tegs: string[];

  @Expose()
  createdAt: Date;//Дата создания
  @Expose()
  updatedAt: Date;//Дата создания

  @Expose()
  userId:string;//Идентификатор пользователя
  @Expose()
  countLikes:number;//Кол-во лайков
  @Expose()
  countComments:number;//Кол-во комментариев


  @Expose()
  state:PostState;

  @Expose()
  repost:boolean;

  @Expose()
  type:PostType;

  @Expose()
  originPostId:string;

//Общие поля для всех типов публикаций
  @Expose()
  name: string; //Название публикации | текст цитаты | путь к файлу фото | ссылка (публикация типа ссылка)

//Поля для разных типов публикаций

  @Expose()
  video: string;

  @Expose()
  announcement: string;

  @Expose()
  text: string;

  @Expose()
  author: string;

}
