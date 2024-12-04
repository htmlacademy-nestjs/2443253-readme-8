import { CommonPostRdo } from "./post.rdo";

export type QuotePostRdo  = CommonPostRdo & {
  text: string;
  author: string;
}
