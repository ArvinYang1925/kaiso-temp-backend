import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/db";
import { Todo } from "../entities/Todo";
import { validate as isUUID } from "uuid";

const todoRepository = AppDataSource.getRepository(Todo);

/**
 * 獲取所有待辦事項
 */
export async function getTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const todos = await todoRepository.find();
    res.json({
      status: "success",
      data: todos,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 獲取單個待辦事項
 */
export async function getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    // 確保 ID 是有效的 UUID
    if (!isUUID(id)) {
      res.status(400).json({
        status: "error",
        message: "請提供有效的 UUID",
      });
      return;
    }

    const todo = await todoRepository.findOneBy({ id });

    if (!todo) {
      res.status(404).json({
        status: "error",
        message: `找不到 ID 為 ${id} 的待辦事項`,
      });
      return;
    }

    res.json({ status: "success", data: todo });
  } catch (error) {
    next(error);
  }
}

/**
 * 創建新的待辦事項
 */
export async function createTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title } = req.body;

    // 驗證輸入
    if (!title || title.trim() === "") {
      res.status(400).json({
        status: "error",
        message: "標題是必填欄位且不能為空",
      });
      return;
    }

    const newTodo = todoRepository.create({
      title: title.trim(),
      completed: false,
    });

    const savedTodo = await todoRepository.save(newTodo);
    res.status(201).json({ status: "success", data: savedTodo });
  } catch (error) {
    next(error);
  }
}

/**
 * 更新待辦事項
 */
export async function updateTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    // 確保 ID 是有效的數字
    if (!isUUID(id)) {
      res.status(400).json({
        status: "error",
        message: "請提供有效的 ID",
      });
      return;
    }

    const { title, completed } = req.body;
    const todo = await todoRepository.findOneBy({ id });

    if (!todo) {
      res.status(404).json({
        status: "error",
        message: `找不到 ID 為 ${id} 的待辦事項`,
      });
      return;
    }

    // 更新待辦事項的欄位
    if (title !== undefined) todo.title = title.trim();
    if (completed !== undefined) todo.completed = !!completed; // 確保是布林值

    const updatedTodo = await todoRepository.save(todo);
    res.json({ status: "success", data: updatedTodo });
  } catch (error) {
    next(error);
  }
}

/**
 * 刪除待辦事項
 */
export async function deleteTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      res.status(400).json({
        status: "error",
        message: "請提供有效的 ID",
      });
      return;
    }

    // 先檢查待辦事項是否存在
    const todo = await todoRepository.findOneBy({ id });

    if (!todo) {
      res.status(404).json({
        status: "error",
        message: `找不到 ID 為 ${id} 的待辦事項`,
      });
      return;
    }

    // 刪除待辦事項
    await todoRepository.remove(todo);

    res.json({
      status: "success",
      message: "待辦事項已成功刪除",
    });
  } catch (error) {
    next(error);
  }
}
