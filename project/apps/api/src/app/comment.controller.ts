import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './app-filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

import { InjectUserIdInterceptor } from '@project/interceptors';
import { CreateCommentDto } from '@project/blog-comment';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiOperations } from './api.const';
import { ConfigType } from '@nestjs/config';
import applicationConfig from './app.config';

@ApiBearerAuth()
@Controller('comment')
@UseFilters(AxiosExceptionFilter)
export class CommentController {

  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly applicationsOptions: ConfigType<typeof applicationConfig>,
  ) {}


  @ApiOperation({ summary: ApiOperations.GetAllCommentsForPost })
  @Get('/:id')
  public async getById(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.applicationsOptions.comment}/${id}`);
    return data;

  }

  @ApiOperation({ summary: ApiOperations.CreateNewCommentByPostId })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:id')
  public async addCommentToPost(@Param('id') id: string,@Req() request: Request,@Body() dto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${this.applicationsOptions.blog}/comments/${id}/${request['user'].sub}`,dto);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.DeleteCommentById })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/:commentId')
  public async deleteComment(@Param('commentId') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${this.applicationsOptions.blog}/comments/${id}/${request['user'].sub}`);
    return data;
  }

}
