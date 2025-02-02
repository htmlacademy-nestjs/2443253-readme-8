export enum ApplicationServiceURL {
  Users = 'http://localhost:4000/api/auth',
  Blog = 'http://localhost:3000/api/posts',
  Comment = 'http://localhost:3000/api/posts/comments',
  Like = 'http://localhost:3000/api/posts/likes',
  Notify = 'http://localhost:3000/api/notify',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
