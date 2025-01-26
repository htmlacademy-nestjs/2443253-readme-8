import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@project/core';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TEGS_MAX_COUNT, POST_MIN_LENGTH, POST_MAX_LENGTH, ANNOUNCE_MIN_LENGTH, ANNOUNCE_MAX_LENGTH, TEXT_MIN_LENGTH, TEXT_MAX_LENGTH, AUTHOR_MIN_LENGTH, AUTHOR_MAX_LENGTH } from '../blog-post.constant';


export class UpdatePostDto {


  @ApiProperty({
    description: 'Теги для публикации',
    example: '[#Toyota,#Honda]'
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(TEGS_MAX_COUNT)
  tegs?: string[];
//--------------------------------------
  @ApiProperty({
    description: 'Состояние публикации draft | published',
    example: 'draft'
  })
  @IsString({ message: `Допустимо одно из значений:
                        draft|published` })
  @IsNotEmpty({ message: 'Состояние публикации не может быть пустым' })
  @IsOptional()
  state?:PostState;
//--------------------------------------
  @ApiProperty({
    description: 'Был ли репост у публикации true | false',
    example: 'false'
  })
  @IsBoolean()
  @IsOptional()
  repost?:boolean;
//--------------------------------------
  @ApiProperty({
    description: 'Тип публикации  video | text | quote | foto | reference',
    example: 'text'
  })
  @IsString({ message: `Допустимо одно из значений:
    video | text | quote | foto | reference` })
  @IsNotEmpty({ message: 'Тип публикации не может быть пустым' })
  @IsOptional()
  type?:PostType;
//--------------------------------------

//Общие поля для всех типов публикаций
  @ApiProperty({required: true,
    description: `Уникальное имя поста в зависимости от типа публикации Название публикации (тип - видео, текст)
                  | текст цитаты (тип - цитата) | ссылка (тип - ссылка)`,
    example: 'Автомобили'
  })
  @IsString()
  @IsOptional()
  @MinLength(POST_MIN_LENGTH)
  @MaxLength(POST_MAX_LENGTH)
  name?: string; //Название публикации | текст цитаты | путь к файлу фото | ссылка (публикация типа ссылка)
//--------------------------------------

//Поля для разных типов публикаций

  @ApiProperty({
  description: 'Путь к файлу с видео-публикацией',
  example: 'https://example.com/video.mp4'
  })
  @IsString()
  @IsOptional()
  video?: string;


  @ApiProperty({
  description: 'Публикация типа текст -- текст с анонсом',
  example: 'О модернизации модели Ford'
  })
  @IsString()
  @IsOptional()
  @MinLength(ANNOUNCE_MIN_LENGTH)
  @MaxLength(ANNOUNCE_MAX_LENGTH)
  announcement?: string;

  @ApiProperty({
    description: 'Публикация типа текст -- текст публикации, Публикация типа ссылка -- описание',
    example: 'Компания Toyota Motors выпустила новый электромобиль'
  })
  @IsString()
  @IsOptional()
  @MinLength(TEXT_MIN_LENGTH)
  @MaxLength(TEXT_MAX_LENGTH)
  text?: string;

  @ApiProperty({
    description: 'Публикация типа цитата -- автор',
    example: 'Л.Н. Толстой'
  })
  @IsString()
  @IsOptional()
  @MinLength(AUTHOR_MIN_LENGTH)
  @MaxLength(AUTHOR_MAX_LENGTH)
  author?: string;

}
