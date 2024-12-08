import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
  @ApiProperty({
    description:'User email',
    example: 'user@gmail.com'
  })
  public email: string;

  @ApiProperty({
    description:'User name',
    example: 'Victor Nazarov'
  })
  public userName: string;

  @ApiProperty({
    description:'User password',
    example: '12345'
  })
  public password: string;
}
