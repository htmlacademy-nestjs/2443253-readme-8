import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';


import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './blog-post.query';
import { PaginationResult } from '@project/core';
import { BlogPostFactory } from './blog-post.factory';
import { BlogCommentRepository, BlogCommentFactory, CreateCommentDto, BlogCommentEntity } from '@project/blog-comment';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) {}

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return await this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {

    const newPost = BlogPostFactory.createFromCreatePostDto(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async repostPost(postId:string, userId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(postId);

    if (await this.blogPostRepository.isReposted(postId,userId)>0)
    {
      throw new NotFoundException(`Post with ID ${postId} already reposted by you`);
    }

    //Если юзер репостит не свой пост и если юзер еще не репостил этот пост
    if (existsPost.userId !== userId) {
      const newPost = BlogPostFactory.createFromCreatePostDto(existsPost,postId,userId,true);
      await this.blogPostRepository.save(newPost);
      return newPost;
    } else {
      throw new NotFoundException(`Post with ID ${postId} already yours`);
    }

  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id)
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
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

  public async addComment(postId:string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.getPost(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto,existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
