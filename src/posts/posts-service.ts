import { Db } from "configs/db";
import { TABLES } from "configs/constants";
import { Post, PostsColumn } from "./posts";

// interface ColStatus {
//   name: "status";
//   value: 1 | 2;
// }

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
    imageUrl: string | null,
    status: 1 | 2
  ): Promise<number> {
    const sql = `INSERT INTO ${TABLES.POSTS} (caption, imageUrl, status) VALUES ($value1, $value2, $value3) RETURNING id`;
    const replacements = { value1: caption, value2: imageUrl, value3: status };

    const result = await Db.insert(sql, replacements);
    if (!result) throw { statusCode: 500, errorMessage: "DB insert failed" };
    const id = result[0][0].id as number;

    return id;
  }

  static async updatePost(id: number, columns: PostsColumn) {
    const setStrings: string[] = [];
    columns.forEach((item) => {
      setStrings.push(`${item.name} = ${item.value}`);
    });

    const sql = `UPDATE ${TABLES.POSTS}
    SET ${setStrings.join}
    WHERE id = ${id};`;

    const result = await Db.update(sql, {});
    console.log(result, "resultss update");
  }

  static async deletePost(id: number): Promise<number> {
    const sql = `DELETE FROM ${TABLES.POSTS} WHERE id = $id RETURNING id;`;
    const replacements = { id };

    const result = await Db.delete(sql, replacements);
    if (!result || !result[0] || !result[0].id)
      throw { statusCode: 404, errorMessage: "Unable to find post" };
    const deletedId = result[0].id as number;

    return deletedId;
  }
}
