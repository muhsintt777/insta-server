import { Sequelize, QueryTypes } from "sequelize";

export const dbConnection = new Sequelize(
  "postgres://admin:password@localhost:5432/insta"
);

export class Db {
  static async select(sql: string, replacements: any) {
    return dbConnection.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });
  }

  static async insert(sql: string, replacements: any) {
    return dbConnection.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });
  }

  static async update() {}
  static async delete() {}
}
