import { Injectable, NotFoundException } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostFactory } from './blog-post.factory';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from "@project/models";
import { PostState, PostType } from "@project/core";
import { POSTS_FOR_ONE_REQUEST } from "./blog-post.constant";
import { PostFilter, postFilterToPrismaFilter } from "./blog-post.filter";


@Injectable()
//Работа с репозиторием post
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }


  public async save(entity: BlogPostEntity): Promise<void> {
    const record = await this.client.post.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
    entity.createdAt = record.createdAt;
    entity.updatedAt = record.updatedAt;
  }


//Поиск по id
public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument({...document, state : document.state as PostState,type : document.type as PostType} );
  }

  //запрос нескольких постов
  public async find(filter?: PostFilter): Promise<BlogPostEntity[]> {
    const where = filter ?? postFilterToPrismaFilter(filter);

    const documents = await this.client.post.findMany({
      where,
      take: POSTS_FOR_ONE_REQUEST,
    });


    return documents.map((document) => this.createEntityFromDocument({...document, state : document.state as PostState,type : document.type as PostType}));
  }

  //удаление поста по id
  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }

  //update
  public async update(entity: BlogPostEntity): Promise<void> {
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        tegs : entity.tegs,
        createdAt : entity.createdAt,
        updatedAt : entity.updatedAt,

        userId : entity.userId,
        countLikes : entity.countLikes,
        countComments : entity.countComments,

        state : entity.state as PostState,
        repost : entity.repost,
        originPostId : entity.originPostId,

        type: entity.type,

        name: entity.name,
        video: entity.video,
        announcement: entity.announcement,
        text: entity.text,
        author: entity.author,
      }
    });
  }


  public async findByIds(ids: string[]): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument({...record, state : record.state as PostState,type : record.type as PostType}));
  }



}
