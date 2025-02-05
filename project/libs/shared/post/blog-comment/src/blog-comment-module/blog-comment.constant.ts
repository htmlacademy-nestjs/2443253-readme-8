export const COMMENTS_FOR_ONE_REQUEST = 50;


export const BlogCommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid author id',
} as const;

export const CommentValidationLimits = {
  MessageMinLength: 10,
  MessageMaxLength: 300,
} as const;
