import { IsMongoId, IsString } from "class-validator";

export class RepostPostDto {
  @IsString()
  @IsMongoId()
  userId: string;
}
