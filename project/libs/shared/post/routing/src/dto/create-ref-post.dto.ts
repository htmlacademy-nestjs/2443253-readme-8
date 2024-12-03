import { CommonPostDto } from "./create-post.dto";

export type CreateRefPostDto = CommonPostDto & {
  reference: string;
  description?: string;
}
