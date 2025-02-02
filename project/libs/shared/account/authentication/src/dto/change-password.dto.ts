import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.constant";

export class ChangePasswordUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
   @IsString()
  public password: string;

  @ApiProperty({
    description: 'New user password',
    example: '12345'
  })
   @IsString()
  public newPassword: string;
}
