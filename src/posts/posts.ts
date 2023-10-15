export interface Post {
  id: number;
  createdAt: number;
  updatedAt: number | null;
  imageUrl: string | null;
  caption: string;
  likeCount: number;
  commentCount: number;
  status: 1 | 2;
}

export interface AddPostParams {}

interface ColStatus {
  name: "status";
  value: 1 | 2;
}

interface ColImageUrl {
  name: "image_url";
  value: string;
}

interface ColCaption {
  name: "caption";
  value: string;
}

interface ColLikeCount {
  name: "like_count";
  value: number;
}

interface ColCommentCount {
  name: "comment_count";
  value: number;
}

export type PostsColumn = (
  | ColStatus
  | ColCaption
  | ColImageUrl
  | ColLikeCount
  | ColCommentCount
)[];
