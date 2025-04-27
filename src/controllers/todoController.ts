import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/db";
import { Todo } from "../entities/Todo";
const todoRepository = AppDataSource.getRepository(Todo);

export async function getTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const todos = await todoRepository.find();
    res.json({ status: "success", data: todos });
  } catch (error) {
    next(error);
  }
}

export async function createTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
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

export async function updateTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let { id } = req.params;
    let { title, completed } = req.body;
    let todo = await todoRepository.findOneBy({ id });
    if (!todo) {
      res.status(404).json({ status: "error", message: "Todo not found" });
      return;
    }
    todo.title = title !== undefined ? title : todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;
    const updatedTodo = await todoRepository.save(todo);
    res.json({ status: "success", data: updatedTodo });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const result = await todoRepository.delete({ id });
    if (result.affected === 0) {
      res.status(404).json({ status: "error", message: "Todo not found" });
      return;
    }
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
}
