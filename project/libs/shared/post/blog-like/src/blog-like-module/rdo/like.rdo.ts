import {Expose} from 'class-transformer';
export class LikeRdo {
  @Expose()
  postId: string;
  @Expose()
  createdAt: string;
  @Expose()
  userId: string;
}
