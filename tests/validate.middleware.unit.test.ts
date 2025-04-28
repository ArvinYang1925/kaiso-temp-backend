import { validate } from '../src/middlewares/validate';
import { createTodoSchema } from '../src/schemas/todo.schema';
import { Request, Response, NextFunction } from 'express';

describe('Middleware 驗證測試', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('若資料不符 Schema，應該回傳 400 錯誤', async () => {
    const middleware = validate(createTodoSchema);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String),
      })
    );
  });

  it('若資料符合 Schema，應該呼叫 next()', async () => {
    req.body = { title: '合法 Todo' };
    const middleware = validate(createTodoSchema);

    await middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });
});