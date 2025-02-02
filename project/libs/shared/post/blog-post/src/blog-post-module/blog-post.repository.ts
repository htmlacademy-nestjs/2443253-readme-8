import { Injectable, NotFoundException } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostFactory } from './blog-post.factory';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from "@project/models";
import { OrderBy, PaginationResult} from "@project/core";
import { Prisma } from "@prisma/client";
import { BlogPostQuery } from "./blog-post.query";
import { POSTS_FOR_ONE_REQUEST } from "./blog-post.constant";


@Injectable()
//Работа с репозиторием post
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  //Количество постов
  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  //Количество страниц
  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }


  public async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        comments: {
          connect: [],
        }
      }
    });
    entity.id = record.id;
  }

//Удаление по id
  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }


//Поиск по id
public async findById(id: string): Promise<BlogPostEntity> {

    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }
    return this.createEntityFromDocument(document);

  }
  public async findNew(): Promise<string> {
    const newPosts = await this.client.post.findMany(
      {where : {new : true}}
    )
    let newNames = "";
    for(const post of newPosts) {
      newNames = post.name + ", " + newNames;
    }
    return newNames;
  }

  //запрос с фильтрацией и пагинацией
  public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const take = (query?.limit <= POSTS_FOR_ONE_REQUEST) ? query?.limit : POSTS_FOR_ONE_REQUEST;
    const skip = query?.page && take ? (query.page - 1) * take : undefined;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    //фильтрация
    if (query?.name) {
      where.name =
        {
          contains: query?.name,
        }
      }

      if (query?.state) {
        where.state =
          {
            equals: query?.state,
          }
        }
      if (query?.type) {
        where.type =
          {
            equals: query?.type,
          }
          }

      if (query?.userId) {
      where.userId =
        {
          contains: query?.userId,
        }
        }

    if  (query?.teg) {
      where.tegs = {
        has: query.teg,
      }
    }

    if  (query?.subscribtions) {
      where.userId = {
        in: query.subscribtions,
    }
    }
  //Сортировка

     if (query?.sortDirection) {
      if(query?.sortType===OrderBy.createdAt)
        orderBy.createdAt = query.sortDirection
      else
      if(query?.sortType===OrderBy.countLikes)
        orderBy.countLikes = query.sortDirection
      else
      if(query?.sortType===OrderBy.countComments)
        orderBy.countComments = query.sortDirection
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  //update
  public async update(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        tegs : pojoEntity.tegs,

        userId : pojoEntity.userId,
        countLikes : pojoEntity.countLikes,
        countComments : pojoEntity.countComments,

        state : pojoEntity.state,
        repost : pojoEntity.repost,
        originPostId : pojoEntity.originPostId,

        type: pojoEntity.type,

        name: pojoEntity.name,
        video: pojoEntity.video,
        announcement: pojoEntity.announcement,
        text: pojoEntity.text,
        author: pojoEntity.author,

      },
      include: {
        comments: true,
      }
    });
  }
}
