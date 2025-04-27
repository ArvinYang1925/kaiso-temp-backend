import "reflect-metadata";
import dotenv from "dotenv";
import express from "express"; // 載入 Express
import { AppDataSource } from "./config/db";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//路由設定
app.use("/todos", todoRoutes);

// 首頁路由
app.get("/", (req, res) => {
  res.send("Hello, Kaiso Backend!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
