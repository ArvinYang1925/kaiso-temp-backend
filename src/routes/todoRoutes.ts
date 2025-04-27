import { Router } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController";
import { validate } from "../middlewares/validate";
import { createTodoSchema } from "../schemas/todo.schema";

const router = Router();

router.get("/", getTodos);
router.post("/", validate(createTodoSchema), createTodo);
router.put("/:id", validate(createTodoSchema), updateTodo);
router.delete("/:id", deleteTodo);

export default router;
