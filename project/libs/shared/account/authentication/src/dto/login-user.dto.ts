import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.constant";

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user10@notfound.local',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
   @IsString()
  public password: string;
}
