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
import { PostValidationLimits } from '../blog-post.constant';


export class UpdatePostDto {


  // @ApiProperty({
  //   description: 'Теги для публикации',
  //   example: '[#Toyota,#Honda]'
  // })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(PostValidationLimits.TegsMaxCount)
  tegs?: string[];
//--------------------------------------
  @ApiProperty({
    description: 'Состояние публикации draft | published',
    example: 'published'
  })
  @IsString({ message: `Допустимо одно из значений:
                        draft|published` })
  @IsNotEmpty({ message: 'Состояние публикации не может быть пустым' })
  @IsOptional()
  state?:PostState;
//--------------------------------------

  @IsBoolean()
  @IsOptional()
  repost?:boolean;
//--------------------------------------
  @ApiProperty({
    description: 'Признак новой  публикации. Для вновь созданных true, после рассылки уведомлений о новых публикациях - false',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  new:boolean;
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
    example: 'Автомобили АвтомобилиАвтомобилиАвтомобилиАвтомобилиАвтомобилиАвтомобили'
  })
  @IsString()
  @IsOptional()
  @MinLength(PostValidationLimits.PostMinLength)
  @MaxLength(PostValidationLimits.PostMaxLength)
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
  example: 'О модернизации модели Ford О модернизации модели Ford О модернизации модели Ford О модернизации модели Ford'
  })
  @IsString()
  @IsOptional()
  @MinLength(PostValidationLimits.AnnounceMinLength)
  @MaxLength(PostValidationLimits.AnnounceMaxLength)
  announcement?: string;

  @ApiProperty({
    description: 'Публикация типа текст -- текст публикации, Публикация типа ссылка -- описание',
    example: 'Компания Toyota Motors выпустила новый электромобиль Компания Toyota Motors выпустила новый электромобиль Компания Toyota Motors выпустила новый электромобиль Компания Toyota Motors выпустила новый электромобиль'
  })
  @IsString()
  @IsOptional()
  @MinLength(PostValidationLimits.TextMinLength)
  @MaxLength(PostValidationLimits.TextMaxLength)
  text?: string;

  @ApiProperty({
    description: 'Публикация типа цитата -- автор',
    example: 'Л.Н. Толстой'
  })
  @IsString()
  @IsOptional()
  @MinLength(PostValidationLimits.AuthorMinLength)
  @MaxLength(PostValidationLimits.AuthorMaxLength)
  author?: string;

}
