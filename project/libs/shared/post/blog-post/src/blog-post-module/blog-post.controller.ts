import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/helpers';
import { BlogPostService } from './blog-post.service';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';



@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const postEntity = await this.blogPostService.getPost(id);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Get('/')
  public async index() {
    const blogCategoryEntities = await this.blogPostService.getAllPosts();
    const categories = blogCategoryEntities.map((blogCategory) => blogCategory.toPOJO());
    return fillDto(PostRdo, categories);
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newCategory = await this.blogPostService.createPost(dto);
    return fillDto(PostRdo, newCategory.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogPostService.deletePost(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedCategory = await this.blogPostService.updatePost(id, dto);
    return fillDto(PostRdo, updatedCategory.toPOJO());
  }
}
