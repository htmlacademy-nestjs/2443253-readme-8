export const PostType = {
  Video : 'video',
  Text : 'text',
  Quote : 'quote',
  Foto : 'foto',
  Reference : 'reference',
} as const;
export type PostType = (typeof PostType)[keyof typeof PostType];

export const PostState = {
  Draft : 'draft',
  Published : 'published',
} as const;

export type PostState = (typeof PostState)[keyof typeof PostState];
