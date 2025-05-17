import { Post, PostsColumn } from './posts';

export class PostsService {
  static async getPost(id: number) {
    console.log(id, 'id');
  }

  static async getAllPost() {
    const sql = 'SELECT * FROM posts';
  }

  static async addPost(
    caption: string,
    imageUrl: string | null,
    status: 1 | 2,
  ) {}

  static async updatePost(id: number, columns: PostsColumn) {
    const setStrings: string[] = [];
    columns.forEach((item) => {
      setStrings.push(`${item.name} = ${item.value}`);
    });

    const sql = `UPDATE ${'post'}
    SET ${setStrings.join}
    WHERE id = ${id};`;
  }

  static async deletePost(id: number) {
    const sql = `DELETE FROM ${'post'} WHERE id = $id RETURNING id;`;
    const replacements = { id };
  }
}
