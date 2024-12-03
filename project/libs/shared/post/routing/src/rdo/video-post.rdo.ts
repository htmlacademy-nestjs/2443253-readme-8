import { CommonPostRdo } from "./post.rdo";

export type VideoPostRdo = CommonPostRdo & {
  name: string;
  video: string;
}
