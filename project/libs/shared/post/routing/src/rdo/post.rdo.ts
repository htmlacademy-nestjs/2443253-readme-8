import { PostState, PostType } from "@project/core";
import { PhotoPostRdo } from "./photo-post.rdo";
import { QuotePostRdo } from "./quote-post.rdo";
import { RefPostRdo } from "./ref-post.rdo";
import { TextPostRdo } from "./text-post.rdo";
import { VideoPostRdo } from "./video-post.rdo";


export type CommonPostRdo = {
   id?: string;

   date:string;
   Date:string;
   userId:string;
   repost:boolean;
   state:PostState;

   tegs?: string[];//Тип публикации: все публикации
   type:PostType;//тип публикации
}


export type PostRdo = VideoPostRdo & PhotoPostRdo & QuotePostRdo &
                            RefPostRdo & TextPostRdo & VideoPostRdo & CommonPostRdo;

