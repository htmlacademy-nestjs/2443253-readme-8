import { PostState, PostType } from '../constants'
import { FotoPost, QuotePost, RefPost, TextPost, VideoPost } from "./type-post.type";

export type Post = VideoPost & TextPost & QuotePost & FotoPost & RefPost& {
  id?: string;
  tegs?: string[];
  date:string;
  createDate:string;
  userId:string;
  repost:boolean;
  countLikes:number;
  countComments:number;

  state:PostState;
  type:PostType;//тип публикации
}

