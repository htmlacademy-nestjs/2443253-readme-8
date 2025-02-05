import { Transform } from 'class-transformer';
import { IsArray, IsIn,  IsMongoId,  IsNumber, IsOptional, IsString } from 'class-validator';

import { OrderBy, PostState, PostType, SortDirection } from '@project/core';

import {
  DEFAULT_POST_STATE,
  DefaultQueryParams
} from './blog-post.constant';


export class BlogPostQuery {
  @Transform(({ value }) => +value || DefaultQueryParams.PostCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = DefaultQueryParams.PostCountLimit;

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
  public sortDirection: SortDirection = DefaultQueryParams.SortDirection;

 //Признак сортировки
  @IsIn(Object.values(OrderBy))
  @IsOptional()
  public sortType: OrderBy = DefaultQueryParams.SortType;


  @Transform(({ value }) => +value || DefaultQueryParams.PageCount)
  @IsOptional()
  public page: number = DefaultQueryParams.PageCount;


  //Запрос по пользователю
  @IsArray()
  @IsOptional()
  public subscribtions?: string[];

}
