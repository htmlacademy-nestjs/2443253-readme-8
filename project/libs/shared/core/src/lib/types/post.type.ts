import { PostState, PostType } from '../constant';
import { Comment } from './comment-type'

export type Post = {
  id?: string;//Идентификатор поста
  tegs: string[];//Тэги

  createdAt?: Date;//Дата создания
  updatedAt?: Date;//Дата обновления

  userId:string;//Идентификатор пользователя
  countLikes:number;//Кол-во лайков
  countComments:number;//Кол-во комментариев

  state:PostState;//Состояние публикации draft|published
  repost:boolean;//Репост
  originPostId:string;//Идентификатор поста, который является родителем

  type:PostType;//тип публикации video|text|quote|foto|reference
//Общие поля для всех типов публикаций
  name: string; //Название публикации | текст цитаты | путь к файлу фото | ссылка (публикация типа ссылка)
//Поля для разных типов публикаций
  video?: string;//Публикация типа видео -- путь к файлу с видео
  announcement?: string;//Публикация типа текст -- текст с анонсом
  text?: string;//Публикация типа текст -- текст публикации, //Публикация типа ссылка -- описание
  author?: string;//Публикация типа цитата -- автор
  comments?: Comment[];//Комментарии
}

