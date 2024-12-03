import { PostType} from '@project/core';
import { CreateVideoPostDto } from './create-video-post.dto';
import { CreatePhotoPostDto } from './create-photo-post.dto';
import { CreateQuotePostDto } from './create-quote-post.dto';
import { CreateRefPostDto } from './create-ref-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';

export type CommonPostDto = {
  tegs?: string[]
  type:PostType;//тип публикации

}
export type CreatePostDto = CreateVideoPostDto & CreatePhotoPostDto & CreateQuotePostDto &
                            CreateRefPostDto & CreateTextPostDto & CreateVideoPostDto & CommonPostDto;




