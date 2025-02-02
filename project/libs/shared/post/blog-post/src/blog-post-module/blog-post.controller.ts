import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { PostRdo } from './rdo/post.rdo';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostService } from './blog-post.service';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';
import { BlogUserEntity } from '@project/blog-user';


@Controller('posts')
export class BlogPostController {
  constructor (
    private readonly blogPostService: BlogPostService,
  ) {}

  @Get('newposts')
  public async getNewPosts() {
    const newPostsNames = await this.blogPostService.getAllNewPosts();

    return newPostsNames;
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
     return fillDto(PostRdo, post.toPOJO());
  }

  @Post('lenta')
  public async getLenta(@Query() query: BlogPostQuery, @Body() user: BlogUserEntity) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query,user);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(BlogPostWithPaginationRdo, result);
  }


  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @Post('repost/:id/:userId')
  public async repost(@Param('id') postId: string, @Param('userId') userId: string) {
    const newPost = await this.blogPostService.repostPost(postId,userId);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string,@Param('userId') userId: string,) {
    await this.blogPostService.deletePost(id,userId);
  }

  @Patch('/:id/:userId')
  public async update(@Param('id') id: string, @Param('userId') userId: string,@Body() dto: UpdatePostDto,) {
    const updatedPost = await this.blogPostService.updatePost(id, userId, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  @Post('comments/:postId/:userId')
  public async createComment(@Param('postId') postId: string, @Param('userId') userId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto, userId);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @Delete('comments/:commentId/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteComment(@Param('commentId') postId: string, @Param('userId') userId: string) {
     await this.blogPostService.deleteComment(postId, userId);
  }
}
