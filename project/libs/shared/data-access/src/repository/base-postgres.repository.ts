import { PrismaClientService } from '@project/models';
import { Entity, StorableEntity, EntityFactory } from '@project/core';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
DocumentType = ReturnType<T['toPOJO']>
> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly client: PrismaClientService,
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (! document) {
      return null;
    }

    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findById(id: T['id']): Promise<T> {
    throw new Error('Not implemented');
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async save(entity: T): Promise<void> {
    throw new Error('Not implemented');
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async update(entity: T): Promise<void> {
    throw new Error('Not implemented');
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async deleteById(id: T['id'], id2?:T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
