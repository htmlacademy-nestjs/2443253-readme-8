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
import { ANNOUNCE_MAX_LENGTH, ANNOUNCE_MIN_LENGTH, AUTHOR_MAX_LENGTH, AUTHOR_MIN_LENGTH, DEFAULT_POST_STATE, DEFAULT_POST_TYPE, POST_MAX_LENGTH, POST_MIN_LENGTH, TEXT_MAX_LENGTH, TEXT_MIN_LENGTH } from '../blog-post.constant';

export class CreatePostDto {

//--------------------------------------------
  // @ApiProperty({
  //   description: 'Теги для публикации',
  //   type: [String],
  //   example: [],
  //   required: false

  // })
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

  @MinLength(POST_MIN_LENGTH)
  @MaxLength(POST_MAX_LENGTH)
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
  @MinLength(ANNOUNCE_MIN_LENGTH)
  @MaxLength(ANNOUNCE_MAX_LENGTH)
  @IsOptional()
  announcement?: string;
//--------------------------------------------

  @ApiProperty({
    description: 'Публикация типа текст -- текст публикации, Публикация типа ссылка -- описание',
    example: 'Компания Toyota Motors выпустила новый электромобиль,Компания Toyota Motors выпустила новый электромобильКомпания Toyota Motors выпустила новый электромобиль',
    required: false
  })
  @MinLength(TEXT_MIN_LENGTH)
  @MaxLength(TEXT_MAX_LENGTH)
  @IsOptional()
  text?: string;
//--------------------------------------------
  @ApiProperty({
    description: 'Публикация типа цитата -- автор',
    example: 'Л.Н. Толстой',
    required: false
  })
  @IsOptional()
  @MinLength(AUTHOR_MIN_LENGTH)
  @MaxLength(AUTHOR_MAX_LENGTH)

  author?: string;
//--------------------------------------------
}
