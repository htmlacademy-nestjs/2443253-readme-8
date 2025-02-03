import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpStatus, Param, ParseFilePipeBuilder, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { ChangePasswordUserDto, CreateUserDto, LoginUserDto, MAX_FILE_SIZE, MIME_TYPES } from '@project/authentication';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './app-filters/axios-exception.filter';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApiBearerAuth,  ApiConsumes,  ApiOperation,  ApiTags } from '@nestjs/swagger';
import { ApiOperations } from './api.const';
import { FileInterceptor } from '@nestjs/platform-express';
import { AVATAR_FILE } from '@project/authentication';
import { dtoToFormData, multerFileToFormData } from '@project/helpers';
@UseFilters(AxiosExceptionFilter)
@ApiTags('Users authentication')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(AVATAR_FILE))
  @ApiOperation({ summary: ApiOperations.CreateNewUser })
  @Post('createuser')
  public async create(
    @Body() createUserDto: CreateUserDto,
        @UploadedFile(
          new ParseFilePipeBuilder()
          .addFileTypeValidator({
            fileType: MIME_TYPES.join('|'),
          })
          .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE })
          .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          })
        ) avatarFile?: Express.Multer.File
        )
   {
    const formData = new FormData();

    dtoToFormData(createUserDto, formData);

    if (avatarFile) {
      multerFileToFormData(avatarFile, formData, AVATAR_FILE);
    }
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, formData);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.SendNotifyNewPosts })
  @Post('notifynewposts')
  public async notifyNewPosts() {
    //Получим строку со списком наименований новых публикаций
    const { data:newPosts } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/newposts`);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/notifynewposts`, newPosts);

    return data;
  }

  @ApiOperation({ summary: ApiOperations.Login })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.GetNewTokens })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @ApiOperation({ summary: ApiOperations.ChangePassword })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('changepassword')
  public async changePassword(@Body() changePasswordUserDto: ChangePasswordUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/changepassword`, changePasswordUserDto);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.SubscribeOnUser })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('subscribe/:id')
  public async subscribe(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/subscribe/${id}/${request['user'].sub}`);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.UnSubcribeOnUser })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('unsubscribe/:id')
  public async unsubscribe(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/unsubscribe/${id}/${request['user'].sub}`);
    return data;
  }

}
