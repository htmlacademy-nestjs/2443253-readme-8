import { CommonPostDto } from "./create-post.dto";


export type CreatePhotoPostDto = CommonPostDto & {
  foto: string;
}
