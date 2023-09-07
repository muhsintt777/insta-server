interface Posts {
  id: number;
  createdAt: number;
  updatedAt: number | null;
  imageUrl: string | null;
  caption: string;
  likes: number;
  commentCount: number;
}

export interface AddPostParams {}
