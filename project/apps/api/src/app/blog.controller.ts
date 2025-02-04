import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseFilePipeBuilder, Patch, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './app-filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogPostQuery, CreatePostDto, FOTO_FILE, UpdatePostDto } from '@project/blog-post';

import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ApiOperations } from './api.const';
import { FileInterceptor } from '@nestjs/platform-express';
import { dtoToFormData, multerFileToFormData } from '@project/helpers';
import { MAX_FOTO_SIZE, MIME_TYPES } from '@project/shareable';
import { ConfigType } from '@nestjs/config';
import applicationConfig from './app.config';



@ApiBearerAuth()
@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly applicationsOptions: ConfigType<typeof applicationConfig>,
  ) {}

  @ApiOperation({ summary: ApiOperations.GetLenta })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Get('lenta/?')
  public async getLentaByQuery(@Query() query: BlogPostQuery,@Req() request: Request) {
    //Получим подписчиков и добапвим себя, а затем передадим в запрос публикация по ним
    const{ data : user} = await this.httpService.axiosRef.get(`${this.applicationsOptions.users}/${request['user'].sub}`,{
      headers: {
        'Authorization': request.headers['authorization']
      }
    }

    );
    const stringQuery = Object.keys(query).map(key => {
      return `${key}=${encodeURIComponent(query[key])}`;
    })
    .join('&');
    const { data } = await this.httpService.axiosRef.post(`${this.applicationsOptions.blog}/lenta/?${stringQuery}`,user);
    return data;

  }
  @ApiOperation({ summary: ApiOperations.CreateNewPost })
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor(FOTO_FILE))
  @Post('/')
  public async create(@Body() createPostDto: CreatePostDto,
  @UploadedFile(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
              fileType: MIME_TYPES.join('|'),
            })
            .addMaxSizeValidator({ maxSize: MAX_FOTO_SIZE })
            .build({
              errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            })
          ) fotoFile?: Express.Multer.File
) {
    const formData = new FormData();

    dtoToFormData(createPostDto, formData);

    if (fotoFile) {
      multerFileToFormData(fotoFile, formData, FOTO_FILE);
    }

    const { data } = await this.httpService.axiosRef.post(`${this.applicationsOptions.blog}/`,formData);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.DeletePostById })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async delete(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${this.applicationsOptions.blog}/${id}/${request['user'].sub}`);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.PatchPostById })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${this.applicationsOptions.blog}/${id}/${request['user'].sub}`,dto);
    return data;
  }


  @ApiOperation({ summary: ApiOperations.CreateRepostById })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:id')
  public async repost(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${this.applicationsOptions.blog}/repost/${id}/${request['user'].sub}`);
    return data;
  }




  @Get('/:id')
  public async getById(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.applicationsOptions.blog}/${id}`);
    return data;

  }

  @Get('/?')
  public async getByQuery(@Query() query: BlogPostQuery) {
    const stringQuery = Object.keys(query).map(key => {
      return `${key}=${encodeURIComponent(query[key])}`;
    })
    .join('&');
    const { data } = await this.httpService.axiosRef.get(`${this.applicationsOptions.blog}/?${stringQuery}`);
    return data;

  }





}
