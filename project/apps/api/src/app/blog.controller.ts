import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './app-filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogPostQuery, CreatePostDto, UpdatePostDto } from '@project/blog-post';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';


@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Get('lenta/?')
  public async getLentaByQuery(@Query() query: BlogPostQuery,@Req() request: Request) {
    //Получим подписчиков и добапвим себя, а затем передадим в запрос публикация по ним
    const{ data : user} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${request['user'].sub}`,{
      headers: {
        'Authorization': request.headers['authorization']
      }
    }

    );
    const stringQuery = Object.keys(query).map(key => {
      return `${key}=${encodeURIComponent(query[key])}`;
    })
    .join('&');
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/lenta/?${stringQuery}`,user);
    return data;

  }
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async delete(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}/${request['user'].sub}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}/${request['user'].sub}`,dto);
    return data;
  }



  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:id')
  public async repost(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/repost/${id}/${request['user'].sub}`);
    return data;
  }




  @Get('/:id')
  public async getById(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;

  }

  @Get('/?')
  public async getByQuery(@Query() query: BlogPostQuery) {
    const stringQuery = Object.keys(query).map(key => {
      return `${key}=${encodeURIComponent(query[key])}`;
    })
    .join('&');
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/?${stringQuery}`);
    return data;

  }





}
