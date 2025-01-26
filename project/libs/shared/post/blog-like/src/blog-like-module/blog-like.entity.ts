import { Like, Entity, StorableEntity } from '@project/core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public createdAt: Date;
  public postId?: string;
  public userId: string;


  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public populate(like?: Like): void {
    if (! like) {
      return;
    }

    this.id = like.id ?? undefined;
    this.createdAt = like.createdAt;
    this.postId = like.postId ?? undefined;
    this.userId = like.userId;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      createdAt: this.createdAt,
      postId: this.postId,
      userId: this.userId,
    }
  }
}
