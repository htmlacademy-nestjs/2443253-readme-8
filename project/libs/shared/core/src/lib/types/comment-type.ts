export type Comment = {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  postId?: string;
  userId?: string;
}
