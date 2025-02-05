import { OrderBy, PostState, PostType, SortDirection } from "@project/core";

export const DEFAULT_POST_STATE = PostState.Published;
export const DEFAULT_POST_TYPE = PostType.Text;

export const DefaultQueryParams = {
  PostCountLimit : 20,
  SortDirection: SortDirection.Desc,
  SortType: OrderBy.createdAt,
  PageCount: 1,
  PostsForOneRequest : 25
}as const;

export const PostValidationLimits = {
  PostMinLength: 20,
  PostMaxLength: 300,
  AnnounceMinLength: 50,
  AnnounceMaxLength: 255,
  TextMinLength: 100,
  TextMaxLength: 1024,
  AuthorMinLength: 3,
  AuthorMaxLength: 50,
  TegsMaxCount:8,

} as const;

export const FOTO_FILE = 'foto';
