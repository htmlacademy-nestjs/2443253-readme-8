import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';


import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async getAllPosts(): Promise<BlogPostEntity[]> {
    return await this.blogPostRepository.find();
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const existspost = (await this.blogPostRepository.find({ name: dto.name })).at(0);
    if (existspost) {
      throw new ConflictException('A post with the name already exists');
    }

    const newpost = new BlogPostEntity(dto);
    await this.blogPostRepository.save(newpost);

    return newpost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      // TODO. Обратите внимание. Ошибки могут быть разными
      // Вы должны реагировать на них по-разному.
      throw new NotFoundException(`post with ID ${id} not found`);
    }
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const blogpostEntity = new BlogPostEntity(dto);

    try {
      await this.blogPostRepository.update(blogpostEntity);
      return blogpostEntity;
    } catch {
      throw new NotFoundException(`post with ID ${id} not found`);
    }
  }

  public async getPostsByIds(postIds: string[]): Promise<BlogPostEntity[]> {
    const posts = await this.blogPostRepository.findByIds(postIds);

    if (posts.length !== postIds.length) {
      const foundpostIds = posts.map((post) => post.id);
      const notFoundpostIds = postIds.filter((postId) => !foundpostIds.includes(postId));

      if (notFoundpostIds.length > 0) {
        throw new NotFoundException(`Categories with ids ${notFoundpostIds.join(', ')} not found.`);
      }
    }

    return posts;
  }
}
