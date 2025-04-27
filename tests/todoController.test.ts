import { createTodo } from '../src/controllers/todoController';

import { Request, Response, NextFunction } from 'express';

jest.mock('../src/config/db', () => ({
    AppDataSource: {
      getRepository: jest.fn().mockReturnValue({
        create: jest.fn().mockImplementation((data) => ({ id: '1', ...data })),
        save: jest.fn().mockImplementation((data) => Promise.resolve(data)),
      }),
    },
  }));
  
  describe('Todo 控制器測試', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
  
    beforeEach(() => {
      req = { body: { title: '測試 Todo' } };
      res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      next = jest.fn();
    });
  
    describe('createTodo - 成功案例', () => {
      it('應該成功建立 todo 並回傳成功訊息', async () => {
        await createTodo(req as Request, res as Response, next);
  
        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 'success',
            data: expect.objectContaining({ title: '測試 Todo' }),
          })
        );
      });
    });
  });