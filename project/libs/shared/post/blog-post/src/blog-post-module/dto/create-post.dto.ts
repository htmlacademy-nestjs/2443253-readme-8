import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@project/core';

export class CreatePostDto {


  @ApiProperty({
    description: 'Теги для публикации',
    example: '[#Toyota,#Honda]'
  })
  tegs?: string[];

  createdAt?: Date;//Дата создания
  updatedAt?: Date;//Дата создания
  userId?: string;
  countLikes?:number;
  countComments?:number;
  originPostId?:string;


  @ApiProperty({
    description: 'Состояние публикации draft | published',
    example: 'draft'
  })
  state:PostState;

  @ApiProperty({
    description: 'Был ли репост у публикации true | false',
    example: 'false'
  })
  repost:boolean;

  @ApiProperty({
    description: 'Тип публикации  video | text | quote | foto | reference',
    example: 'text'
  })
  type:PostType;

//Общие поля для всех типов публикаций
  @ApiProperty({
    description: 'Уникальное имя поста в зависимости от типа публикации Название публикации | текст цитаты | путь к файлу фото | ссылка (публикация типа ссылка)',
    example: 'Автомобили'
  })
  name: string; //Название публикации | текст цитаты | путь к файлу фото | ссылка (публикация типа ссылка)

//Поля для разных типов публикаций

  @ApiProperty({
  description: 'Путь к файлу с видео-публикацией',
  example: 'https://example.com/video.mp4'
  })
  video?: string;


  @ApiProperty({
  description: 'Публикация типа текст -- текст с анонсом',
  example: 'О модернизации модели Ford'
  })
  announcement?: string;

  @ApiProperty({
    description: 'Публикация типа текст -- текст публикации, Публикация типа ссылка -- описание',
    example: 'Компания Toyota Motors выпустила новый электромобиль'
  })
  text?: string;

  @ApiProperty({
    description: 'Публикация типа цитата -- автор',
    example: 'Л.Н. Толстой'
  })
  author?: string;

}
