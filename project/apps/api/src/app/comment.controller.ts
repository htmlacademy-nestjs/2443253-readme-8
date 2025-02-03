import { Body, Controller, Delete, Get, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './app-filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CreateCommentDto } from '@project/blog-comment';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiOperations } from './api.const';

@ApiBearerAuth()
@Controller('comment')
@UseFilters(AxiosExceptionFilter)
export class CommentController {

  constructor(
    private readonly httpService: HttpService,
  ) {}


  @ApiOperation({ summary: ApiOperations.GetAllCommentsForPost })
  @Get('/:id')
  public async getById(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/${id}`);
    return data;

  }

  @ApiOperation({ summary: ApiOperations.CreateNewCommentByPostId })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:id')
  public async addCommentToPost(@Param('id') id: string,@Req() request: Request,@Body() dto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/comments/${id}/${request['user'].sub}`,dto);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.DeleteCommentById })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/:commentId')
  public async deleteComment(@Param('commentId') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/comments/${id}/${request['user'].sub}`);
    return data;
  }

}
