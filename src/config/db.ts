import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "../entities/Todo";
import dotenv from "dotenv";

dotenv.config();

console.log("✅ Connecting with config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Todo],
  synchronize: false // 開發階段可以 true，正式環境建議改成 false
  logging: true,
});
