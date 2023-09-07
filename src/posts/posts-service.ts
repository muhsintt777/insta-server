import { TABLES } from "@/configs/constants";
import { Db } from "@/configs/db";

// interface AddpostReplacements {}

export class PostsService {
  static async getPost(id: number) {
    console.log(id, "id");
  }

  static async getAllPost() {}

  static async addPost(caption: string, imageUrl: string | null) {
    const sql = `INSERT INTO ${TABLES.POSTS} (caption, imageUrl)
      VALUES (:caption, :imageUrl);`;

    const result = await Db.insert(sql, {
      caption: caption,
      imageUrl: imageUrl,
    });

    console.log(result);
  }
}
