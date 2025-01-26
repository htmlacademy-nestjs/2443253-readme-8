import { Transform } from 'class-transformer';
import { IsIn,  IsMongoId,  IsNumber, IsOptional, IsString } from 'class-validator';

import { OrderBy, PostState, PostType, SortDirection } from '@project/core';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT,
  DEFAULT_SORT_TYPE,
  DEFAULT_POST_STATE
} from './blog-post.constant';


export class BlogPostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

 //Запрос по тегам
  @IsString()
  @IsOptional()
  public teg?: string;


  //Запрос по имени публикации
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString({ message: `Допустимо одно из значений:
    draft|published` })
  @IsOptional()
  public state?: PostState = DEFAULT_POST_STATE;

  //Запрос по типу video|text|quote|foto|reference
  @IsString({ message: `Допустимо одно из значений:
    video | text | quote | foto | reference` })
  @IsOptional()
  public type?: PostType;

  //Запрос по пользователю
  @IsMongoId()
  @IsOptional()
  public userId?: string;

  //Направление сортировки
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

 //Признак сортировки
  @IsIn(Object.values(OrderBy))
  @IsOptional()
  public sortType: OrderBy = DEFAULT_SORT_TYPE;


  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
