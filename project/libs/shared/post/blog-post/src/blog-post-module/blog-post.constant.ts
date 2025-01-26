import { OrderBy, PostState, SortDirection } from "@project/core";

export const POSTS_FOR_ONE_REQUEST= 25;

export const DEFAULT_POST_COUNT_LIMIT = 20;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_TYPE = OrderBy.createdAt;
export const DEFAULT_PAGE_COUNT = 1;
export const DEFAULT_POST_STATE = PostState.Published;

export const POST_MIN_LENGTH = 20;
export const POST_MAX_LENGTH = 300; //Максимальное ограничение для публикаций типа цитата и ссылка

export const ANNOUNCE_MIN_LENGTH = 50;
export const ANNOUNCE_MAX_LENGTH = 255;

export const TEXT_MIN_LENGTH = 100;
export const TEXT_MAX_LENGTH = 1024;

export const AUTHOR_MIN_LENGTH = 3;
export const AUTHOR_MAX_LENGTH = 50;

export const TEGS_MAX_COUNT = 8;
