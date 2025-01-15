import {Expose} from 'class-transformer';
export class CommentRdo {
  @Expose()
  message: string;
  @Expose()
  postId: string;
  @Expose()
  createdAt: string;
  @Expose()
  userId: string;
}
