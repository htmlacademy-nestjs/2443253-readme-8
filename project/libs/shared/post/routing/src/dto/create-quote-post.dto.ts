import { CommonPostDto } from "./create-post.dto";

export type CreateQuotePostDto  = CommonPostDto & {
  text: string;
  author: string;
}
