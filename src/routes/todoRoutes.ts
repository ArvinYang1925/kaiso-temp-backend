import { Router } from "express";
import { getTodos, createTodo, updateTodo } from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);

export default router;
