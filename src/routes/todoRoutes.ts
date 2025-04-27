import { Router } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController";
import { validate } from "../middlewares/validate";
import { createTodoSchema } from "../schemas/todo.schema";

const router = Router();

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: 取得所有待辦事項
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: 成功取得所有 todos
 */
router.get("/", getTodos);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: 建立新的待辦事項
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "買牛奶"
 *     responses:
 *       200:
 *         description: 成功建立 todo
 */
router.post("/", validate(createTodoSchema), createTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: 更新指定的待辦事項
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "更新後的標題"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: 成功更新 todo
 */
router.put("/:id", validate(createTodoSchema), updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: 刪除指定的待辦事項
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功刪除 todo
 */
router.delete("/:id", deleteTodo);

export default router;
