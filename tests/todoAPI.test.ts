import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/config/db';

describe('Todo API 完整流程 E2E 測試', () => {
  let todoId: string;
  const nonexistentId = '123e4567-e89b-12d3-a456-426614174000'; // 合法 UUID

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize(); // 確保資料庫先初始化
    }

    const res = await request(app)
      .post('/todos')
      .send({ title: '測試新增 Todo' });

    todoId = res.body.data.id;
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('應該成功查詢所有 todos 並找到剛新增的', async () => {
    const res = await request(app).get('/todos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.find((todo: any) => todo.id === todoId)).toBeDefined();
  });

  it('應該成功更新剛新增的 todo', async () => {
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .send({ title: '已更新 Todo', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('已更新 Todo');
    expect(res.body.data.completed).toBe(true);
  });

  it('PUT /todos/:id 異常 id 應該回傳 404', async () => {
    const updateRes = await request(app)
      .put(`/todos/${nonexistentId}`)
      .send({ title: '任意更新', completed: true });

    expect(updateRes.statusCode).toBe(404);
    expect(updateRes.body.status).toBe('error');
    expect(typeof updateRes.body.message).toBe('string');
  });

  it('應該成功刪除剛新增的 todo', async () => {
    const res = await request(app).delete(`/todos/${todoId}`);

    expect(res.statusCode).toBe(200);
  });

  it('刪除後再次查詢應該找不到該 todo', async () => {
    const res = await request(app).get('/todos');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.find((todo: any) => todo.id === todoId)).toBeUndefined();
  });
});
