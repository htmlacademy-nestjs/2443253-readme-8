import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { SortDirection } from '@project/core';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT
} from './blog-post.constant';
import { PostState, PostType } from '@prisma/client';


export class BlogPostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

 //Запрос по тегам
  @IsString()
  @IsOptional()
  public teg?: string;

  //Запрос черновиков
  @IsString()
  @IsOptional()
  public state?: PostState;

  //Запрос по типу публикации
  @IsString()
  @IsOptional()
  public type?: PostType;

  //Запрос по типу публикации
  @IsString()
  @IsOptional()
  public name?: string;


  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
