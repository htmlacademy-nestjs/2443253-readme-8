import { IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  message: string;
  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  userId: string;
}
