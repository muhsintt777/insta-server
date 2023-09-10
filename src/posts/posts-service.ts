import { Db } from "configs/db";
import { TABLES } from "configs/constants";

export class PostsService {
  static async getPost(id: number) {
    console.log(id, "id");
  }

  static async getAllPost() {
    const sql = "SELECT * FROM posts";
    const result = await Db.select(sql, {});
    if (!result) throw { statusCode: 500, errorMessage: "DB selection failed" };
    console.log(result, "select resu");
    return 0;
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
