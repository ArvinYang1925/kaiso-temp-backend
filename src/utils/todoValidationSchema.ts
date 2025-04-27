// todoSchema.ts
import { z } from "zod";

// 定義一個 Todo 項目的資料格式
export const TodoSchema = z.object({
  title: z.string().min(1, "內容不能為空"), // 至少要有 1 個字
});

export const UpdateTodoSchema = z.object({
  title: z.string().min(1, "內容不能為空").optional(),
  completed: z.boolean().optional(),
});

// 如果要一次驗證一個陣列
export const TodoListSchema = z.array(TodoSchema);

// 自動推導 TypeScript 類型
export type Todo = z.infer<typeof TodoSchema>;
