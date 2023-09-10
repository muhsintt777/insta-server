export interface Post {
  id: number;
  createdAt: number;
  updatedAt: number | null;
  imageUrl: string | null;
  caption: string;
  likeCount: number;
  commentCount: number;
}

export interface AddPostParams {}
