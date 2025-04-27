import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/db";
import { Todo } from "../entities/Todo";
const todoRepository = AppDataSource.getRepository(Todo);

module.exports = {
  getTodos,
  createTodos,
};

async function getTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const todos = await todoRepository.find();
    res.json({ status: "success", data: todos });
  } catch (error) {
    next(error);
  }
}

async function createTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let { title } = req.body;
    if (!title) {
      res.status(400).json({ status: "error", message: "Title is required" });
    }
    const newTodo = todoRepository.create({ title });
    const saveTodo = await todoRepository.save(newTodo);
    res.json({ status: "success", data: saveTodo });
  } catch (error) {
    next(error);
  }
}
