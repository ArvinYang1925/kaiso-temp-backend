import "reflect-metadata";
import { AppDataSource } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 DB Connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed! 錯誤細節如下:");
    console.error(err);
    process.exit(1); // 出錯就直接結束
  });
