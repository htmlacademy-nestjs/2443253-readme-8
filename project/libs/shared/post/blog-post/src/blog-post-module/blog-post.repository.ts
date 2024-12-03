import { Injectable } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostFactory } from './blog-post.factory';
import { BaseMemoryRepository } from '@project/data-access';

@Injectable()
//Работа с репозиторием post
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  constructor(entityFactory: BlogPostFactory) {
    super(entityFactory);
  }

//Поиск по id
//Если публикация не найдена, то возвращается null
  public async findById(id: string): Promise<BlogPostEntity | null> {
    const entities = Array.from(this.entities.values());
    const post = entities.find((entity) => entity.id === id);

    if (! post) {
      return null;
    }

    return this.entityFactory.create(post);
  }
}
