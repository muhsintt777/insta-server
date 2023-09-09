import { Db } from "configs/db";
import { TABLES } from "configs/constants";

export class PostsService {
  static async getPost(id: number) {
    console.log(id, "id");
  }

  static async getAllPost() {}

  static async addPost(
    caption: string,
    imageUrl: string | null
  ): Promise<number> {
    const sql = `INSERT INTO ${TABLES.POSTS} (caption, imageUrl)
      VALUES (:caption, :imageUrl);`;

    const result = await Db.insert(sql, {
      caption: caption,
      imageUrl: imageUrl,
    });

    if (!result) throw { statusCode: 500, errorMessage: "DB insert failed" };

    console.log(result);
    return 0;
  }
}
