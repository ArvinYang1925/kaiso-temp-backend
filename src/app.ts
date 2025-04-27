import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/db";
import todoRoutes from "./routes/todoRoutes";
import { setupSwagger } from "./config/swagger"; // <--- 新增
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

setupSwagger(app); // <--- 加這行

app.use("/todos", todoRoutes); // 加上 Todo 路由

app.get("/", (req, res) => {
  res.send("Hello, Kaiso Backend!");
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 DB Connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

export default app;
