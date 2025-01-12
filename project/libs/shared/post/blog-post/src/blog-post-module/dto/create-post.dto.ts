import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@project/core';


import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {

//--------------------------------------------
  @ApiProperty({
    description: 'Теги для публикации',
    example: '[#Toyota,#Honda]'
  })
  @IsArray()
  @IsOptional()
  tegs: string[];
//--------------------------------------------

  @IsString()
  @IsMongoId()
  userId: string;
//--------------------------------------------
//  countLikes?:number;
//  countComments?:number;
//  originPostId?:string;

//--------------------------------------------
  @ApiProperty({
    description: 'Состояние публикации draft | published',
    example: 'draft'
  })

  @IsString({ message: `Допустимо одно из значений:
                        draft|published` })
  @IsNotEmpty({ message: 'Состояние публикации не может быть пустым' })
  state:PostState;
//--------------------------------------------
  @ApiProperty({
    description: 'Был ли репост у публикации true | false',
    example: 'false'
  })
  @IsBoolean()
  @IsOptional()
  repost:boolean;
//--------------------------------------------
  @ApiProperty({
    description: 'Тип публикации  video | text | quote | foto | reference',
    example: 'text'
  })
  @IsString({ message: `Допустимо одно из значений:
                        video | text | quote | foto | reference` })
  @IsNotEmpty({ message: 'Тип публикации не может быть пустым' })
  type:PostType;
//--------------------------------------------
//Общие поля для всех типов публикаций
  @ApiProperty({
    description: 'Уникальное имя поста в зависимости от типа публикации Название публикации | текст цитаты | путь к файлу фото | ссылка (публикация типа ссылка)',
    example: 'Автомобили'
  })
  @IsString()
  name: string; //Название публикации | текст цитаты | путь к файлу фото | ссылка (публикация типа ссылка)
//--------------------------------------------
//Поля для разных типов публикаций

  @ApiProperty({
  description: 'Путь к файлу с видео-публикацией',
  example: 'https://example.com/video.mp4'
  })
  @IsOptional()
  video?: string;
//--------------------------------------------

  @ApiProperty({
  description: 'Публикация типа текст -- текст с анонсом',
  example: 'О модернизации модели Ford'
  })
  @IsOptional()
  announcement?: string;
//--------------------------------------------

  @ApiProperty({
    description: 'Публикация типа текст -- текст публикации, Публикация типа ссылка -- описание',
    example: 'Компания Toyota Motors выпустила новый электромобиль'
  })
  @IsOptional()
  text?: string;
//--------------------------------------------
  @ApiProperty({
    description: 'Публикация типа цитата -- автор',
    example: 'Л.Н. Толстой'
  })
  @IsOptional()
  author?: string;
//--------------------------------------------
}
