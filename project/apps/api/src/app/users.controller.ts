import { HttpService } from '@nestjs/axios';
import { Body, Controller, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { ChangePasswordUserDto, CreateUserDto, LoginUserDto } from '@project/authentication';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './app-filters/axios-exception.filter';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
@UseFilters(AxiosExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @Post('createuser')
  public async create(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, createUserDto);
    return data;
  }

  @Post('notifynewposts')
  public async notifyNewPosts() {
    //Получим строку со списком наименований новых публикаций
    const { data:newPosts } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/newposts`);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/notifynewposts`, newPosts);
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('changepassword')
  public async changePassword(@Body() changePasswordUserDto: ChangePasswordUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/changepassword`, changePasswordUserDto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('subscribe/:id')
  public async subscribe(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/subscribe/${id}/${request['user'].sub}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('unsubscribe/:id')
  public async unsubscribe(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/unsubscribe/${id}/${request['user'].sub}`);
    return data;
  }

}
