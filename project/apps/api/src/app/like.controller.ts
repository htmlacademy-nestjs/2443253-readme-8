import {  Controller, Delete, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './app-filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiOperations } from './api.const';


@ApiBearerAuth()
@Controller('like')
@UseFilters(AxiosExceptionFilter)
export class LikeController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiOperation({ summary: ApiOperations.LikeOn })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:id')
  public async addLikeToPost(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Like}/${id}/${request['user'].sub}`);
    return data;
  }

  @ApiOperation({ summary: ApiOperations.LikeOut })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/:id')
  public async deleteLike(@Param('id') id: string,@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Like}/${id}/${request['user'].sub}`);
    return data;
  }

}
