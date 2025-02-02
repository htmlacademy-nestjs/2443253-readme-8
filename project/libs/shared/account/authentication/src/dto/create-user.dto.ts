import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.constant";


export class CreateUserDto {
  @ApiProperty({
    description:'User email',
    example: 'user@gmail.com'
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
    description:'User avatar',
    example: `C:Readme\\2443253-readme-8\\project\\apps\\api\\src\\app\\avatars\\avatar1.jpg`
  })
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description:'User password',
    example: '12345'
  })
  @IsString()
  public password: string;
}
