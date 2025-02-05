import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@project/core';


import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DEFAULT_POST_STATE, DEFAULT_POST_TYPE, PostValidationLimits } from '../blog-post.constant';

export class CreatePostDto {

//--------------------------------------------
  @IsOptional()
  @IsArray()
  tegs: string[] = [];
//--------------------------------------------

  @IsString()
  @IsMongoId()
  userId: string;

//--------------------------------------------
  @ApiProperty({
    description: 'Состояние публикации draft | published',
    example: 'published',
    required: false
  })

  @IsString({ message: `Допустимо одно из значений:
                        draft|published` })
  @IsNotEmpty({ message: 'Состояние публикации не может быть пустым' })
  state:PostState= DEFAULT_POST_STATE;


  @ApiProperty({
    description: 'Тип публикации  video | text | quote | foto | reference',
    example: 'text'
  })
  @IsString({ message: `Допустимо одно из значений:
                        video | text | quote | foto | reference` })
  @IsNotEmpty({ message: 'Тип публикации не может быть пустым' })
  type:PostType = DEFAULT_POST_TYPE;
//--------------------------------------------
//Общие поля для всех типов публикаций
  @ApiProperty({ required: true,
    description: `Уникальное имя поста в зависимости от типа публикации Название публикации (тип - видео, текст)
                  | текст цитаты (тип - цитата) | ссылка (тип - ссылка)`,
    example: 'Автомобили,Автомобили,Автомобили,Автомобили,Автомобили,Автомобили,Автомобили,'
  })

  @MinLength(PostValidationLimits.PostMinLength)
  @MaxLength(PostValidationLimits.PostMaxLength)
  @IsString()

  name: string; //Название публикации | текст цитаты |  ссылка (публикация типа ссылка)
//--------------------------------------------
//Поля для разных типов публикаций

  @ApiProperty({
  description: 'Путь к файлу с видео-публикацией (валидная ссылка)',
  example: 'https://example.com/video.mp4',
  required: false
  })
  @IsOptional()
  @IsUrl()
  video?: string;
//--------------------------------------------
  @ApiProperty({
  description: 'Путь к файлу с фото',
  example: 'project/uploads/image.jpg',
  type : 'string',format: 'binary',
  required: false
  })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiProperty({
  description: 'Публикация типа текст -- текст с анонсом публикации',
  example: 'О модернизации модели Toyota,О модернизации модели Toyota,О модернизации модели Toyota',
  required: false
  })
  @MinLength(PostValidationLimits.AnnounceMinLength)
  @MaxLength(PostValidationLimits.AnnounceMaxLength)
  @IsOptional()
  announcement?: string;
//--------------------------------------------

  @ApiProperty({
    description: 'Публикация типа текст -- текст публикации, Публикация типа ссылка -- описание',
    example: 'Компания Toyota Motors выпустила новый электромобиль,Компания Toyota Motors выпустила новый электромобильКомпания Toyota Motors выпустила новый электромобиль',
    required: false
  })
  @MinLength(PostValidationLimits.TextMinLength)
  @MaxLength(PostValidationLimits.TextMaxLength)
  @IsOptional()
  text?: string;
//--------------------------------------------
  @ApiProperty({
    description: 'Публикация типа цитата -- автор',
    example: 'Л.Н. Толстой',
    required: false
  })
  @IsOptional()
  @MinLength(PostValidationLimits.AuthorMinLength)
  @MaxLength(PostValidationLimits.AuthorMaxLength)

  author?: string;
//--------------------------------------------
}
