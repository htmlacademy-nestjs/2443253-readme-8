import { CommonPostDto } from "./create-post.dto";


export type CreateVideoPostDto = CommonPostDto & {
    name: string;
    video: string;
}

