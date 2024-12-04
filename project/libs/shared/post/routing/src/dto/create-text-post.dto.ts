import { CommonPostDto } from "./create-post.dto";



export type CreateTextPostDto = CommonPostDto & {
  name: string;
  announcement: string;
  text: string;
}
