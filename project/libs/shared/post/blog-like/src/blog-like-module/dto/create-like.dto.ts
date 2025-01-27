import { IsMongoId, IsString} from 'class-validator';
import { BlogLikeValidateId } from '../blog-like.constant';
export class CreateLikeDto {
  @IsString()
  @IsMongoId({ message: BlogLikeValidateId.InvalidID })
  userId: string;
}
