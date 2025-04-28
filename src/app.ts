import express from "express";
import { setupSwagger } from "./config/swagger";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

setupSwagger(app);
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Kaiso Backend!");
});

export default app;
