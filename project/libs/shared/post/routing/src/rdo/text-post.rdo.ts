import { CommonPostRdo } from "./post.rdo";

export type TextPostRdo = CommonPostRdo & {
  name: string;
  announcement: string;
  text: string;
}
