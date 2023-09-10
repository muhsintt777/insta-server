import { Db } from "configs/db";
import { TABLES } from "configs/constants";
import { Post } from "./posts";

export class PostsService {
  static async getPost(id: number) {
    console.log(id, "id");
  }

  static async getAllPost(): Promise<Post[]> {
    const sql = "SELECT * FROM posts";
    const result = await Db.select(sql, {});
    if (!result) throw { statusCode: 500, errorMessage: "DB selection failed" };

    const posts: Post[] = [];
    result.forEach((item) => {
      const obj = {
        id: item.id,
        createdAt: 23424242,
        updatedAt: 43534535,
        imageUrl: item.image_url,
        caption: item.caption,
        likeCount: Number(item.like_count),
        commentCount: Number(item.comment_count),
      } as Post;
      posts.push(obj);
    });

    return posts;
  }

  static async addPost(
    caption: string,
    imageUrl: string | null
  ): Promise<number> {
    const sql = `INSERT INTO ${TABLES.POSTS} (caption, imageUrl) VALUES ($value1, $value2) RETURNING id`;
    const replacements = { value1: caption, value2: imageUrl };

    const result = await Db.insert(sql, replacements);
    if (!result) throw { statusCode: 500, errorMessage: "DB insert failed" };
    const id = result[0][0].id as number;

    return id;
  }
}
