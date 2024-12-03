import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from './routing-post.service';


@Controller('post')
export class PostController {
  constructor(protected readonly postService:PostService){
}

@Post('create')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.create(dto);
    return newPost.toPOJO();
  }


  @Get(':id')
  public async show(@Param('id') id: string) {
    const existPost = await this.postService.getPost(id);
    return existPost.toPOJO();
  }
}
