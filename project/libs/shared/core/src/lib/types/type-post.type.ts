

//Публикация типа видео
export type VideoPost = {
  name: string;
  video: string;
}

//Публикация типа текст
export type TextPost = {
  name: string;
  announcement: string;
  text: string;
}
//Публикация типа цитата
export type QuotePost = {
  text: string;
  author: string;
}
//Публикация типа фото
export type FotoPost ={
  foto: string;
}

//Публикация типа ссылка
export type RefPost = {
  reference: string;
  description?: string;

}
