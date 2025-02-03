import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.constant";


export class CreateUserDto {
  @ApiProperty({
    description:'User email',
    example: 'user10@notfound.local'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description:'User name',
    example: 'Victor Nazarov'
  })
  @IsString()
  public userName: string;

  @ApiProperty({
    description:'User avatar file',
    example: `project/apps/api/src/app/avatars/avatar1.jpg`

  })
  @ApiProperty({type : 'string',format: 'binary' })
  @IsOptional()
  public avatarFile?: unknown;

  @ApiProperty({
    description:'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
