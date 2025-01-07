import { Prisma } from '@prisma/client';
import { PostState } from '@project/core';

export interface PostFilter {
  id?: string;
  name?: string;
  state?: PostState;
  // tegs?: string[];
}

export function postFilterToPrismaFilter(filter: PostFilter): Prisma.PostWhereInput | undefined {
  if (! filter) {
    return undefined;
  }

  let prismaFilter: Prisma.PostWhereInput = {};

  if (filter.id) {
    prismaFilter = { id: filter.id };
  }

  if (filter.name) {
    prismaFilter = { name: filter.name };
  }

  if (filter.state) {
    prismaFilter = { state: filter.state };
  }

  // if (filter.tegs) {
  //   prismaFilter = { tegs: [...filter.tegs] };
  // }

  return prismaFilter;
}
