import { Sequelize, QueryTypes } from "sequelize";
// const dbUrl = process.env.DB_CONNECTION_URI || "";
const port = Number(process.env.DB_PORT);

export const dbConnection = new Sequelize("insta", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
  port: port,
});

export class Db {
  static async select(sql: string, replacements: any): Promise<any[]> {
    return dbConnection.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });
  }

  static async insert(sql: string, replacements: any): Promise<[any, any]> {
    return dbConnection.query(sql, {
      bind: replacements,
      type: QueryTypes.INSERT,
    });
  }

  static async delete(sql: string, replacements: any): Promise<any> {
    return dbConnection.query(sql, {
      bind: replacements,
      type: QueryTypes.DELETE,
    });
  }

  static async update(sql: string, replacements: any): Promise<any> {
    return dbConnection.query(sql, {
      bind: replacements,
      type: QueryTypes.UPDATE,
    });
  }
}
