import { Injectable, NotFoundException } from "@nestjs/common";
import { BlogPostEntity, BlogPostRepository } from '@project/blog-post';
import { PostState } from "@project/core";
import { POST_NOT_FOUND } from "./routing.post.constant";
import { CreatePostDto } from "../dto/create-post.dto";


@Injectable()
export class PostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

//Создание новой публикации
public async create(dto: CreatePostDto): Promise<BlogPostEntity> {
      const {tegs, name, video, announcement, text, author, foto, reference, description, type} = dto;

      const blogPost = {
        tegs, name, video, announcement,text, author, foto, reference, description, type,
        date:String(new Date()),
        createDate:String(new Date()),
        userId:'', //Нужно получить id пользователя, который создает публикацию (добавить с помощью MiddleWare?)
        repost:false,
        state:PostState.Published,
        countLikes:0,
        countComments:0,

      };


      const postEntity = new BlogPostEntity(blogPost)

        this.blogPostRepository
        .save(postEntity);
        return postEntity;

    }

//Получить публикацию по id
    public async getPost(id: string) {
      const post = await this.blogPostRepository.findById(id);

      if (! post) {
        throw new NotFoundException(POST_NOT_FOUND);
      }
      return post;
    }
  }

