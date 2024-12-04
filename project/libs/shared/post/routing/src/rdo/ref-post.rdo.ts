import { CommonPostRdo } from "./post.rdo";

export type RefPostRdo = CommonPostRdo & {
  reference: string;
  description?: string;
}
