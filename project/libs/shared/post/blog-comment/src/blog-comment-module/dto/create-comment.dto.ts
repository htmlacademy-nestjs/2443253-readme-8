import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import { BlogCommentValidateMessage, COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../blog-comment.constant';
export class CreateCommentDto {

  @ApiProperty({
    description: 'Текст комментария, минимальная длина 10 символов, максимальная - 300 символов',
    example: '123456'
  })
@IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  @MinLength(COMMENT_MIN_LENGTH)
  @MaxLength(COMMENT_MAX_LENGTH)
  message: string;
}

