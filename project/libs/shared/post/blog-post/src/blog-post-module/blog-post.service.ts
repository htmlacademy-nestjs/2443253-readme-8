import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';


import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './blog-post.query';
import { PaginationResult } from '@project/core';
import { BlogPostFactory } from './blog-post.factory';
import { BlogCommentRepository, BlogCommentFactory, CreateCommentDto, BlogCommentEntity } from '@project/blog-comment';
import { BlogUserEntity } from '@project/blog-user';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) {}

  public async checkPostByOwn(postId: string, userId:string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (existsPost.userId !== userId) { throw new NotFoundException(`Post with ID ${postId} is not your`);}
    return existsPost;

  }

  public async getAllPosts(query?: BlogPostQuery,user?:BlogUserEntity): Promise<PaginationResult<BlogPostEntity>> {
    query.subscribtions = [...user.subscribers,user.id]
    return await this.blogPostRepository.find(query);
  }

  public async getAllNewPosts(): Promise<string> {
    return await this.blogPostRepository.findNew();
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {

    const newPost = BlogPostFactory.createFromCreatePostDto(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async repostPost(postId:string, userId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(postId);

    //если юзер еще не репостил этот пост
    if (existsPost.userId===userId && existsPost.repost)
    {
      throw new NotFoundException(`Post with ID ${postId} already reposted by you`);
    }

    //Если юзер репостит не свой пост
    if (existsPost.userId !== userId) {
      const newPost = BlogPostFactory.createFromCreatePostDto(existsPost,postId,userId,true);
      await this.blogPostRepository.save(newPost);
      return newPost;
    } else {
      throw new NotFoundException(`Post with ID ${postId} already yours`);
    }

  }

  public async deletePost(id: string,userId:string): Promise<void> {
    if (await this.checkPostByOwn(id,userId)) {
      try {
        await this.blogPostRepository.deleteById(id);
      } catch {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id)
  }

  public async updatePost(id: string,userId:string, dto: UpdatePostDto): Promise<BlogPostEntity> {
      const existsPost = await this.checkPostByOwn(id,userId)
      if (existsPost) {
        let hasChanges = false;

        for (const [key, value] of Object.entries(dto)) {
          if (value !== undefined && existsPost[key] !== value) {
            existsPost[key] = value;
            hasChanges = true;
          }

        }
        if (!hasChanges) {
          return existsPost;
        }
        await this.blogPostRepository.update(existsPost);
        return existsPost;
     }
  }

  public async addComment(postId:string, dto: CreateCommentDto, userId:string): Promise<BlogCommentEntity> {
    const existsPost = await this.getPost(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto,existsPost.id,userId);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }


  public async deleteComment(id:string, userId:string): Promise<void> {
    const existsComment = await this.blogCommentRepository.findById(id);
    if (existsComment.userId !== userId) {
      throw new NotFoundException(`The comment with ID ${id} is not your`);
    }
    await this.blogCommentRepository.deleteById(id,existsComment.postId);

  }
}
