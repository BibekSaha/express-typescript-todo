import { NextFunction, Request, Response } from 'express';
import { Todo } from '@prisma/client';
import { ResponseMessage } from '../../common/type/responseMessage';
import { todoServiceImpl } from '../services/todo.service';
import { TodoParam } from './interface/todoParam.interface';
import { TodoCreateDTO } from '../dto/todo.create.dto';
import { TodoModifyDTO } from '../dto/todo.modify.dto';

class TodoController {
  private notAuthorizedError = new Error('Not Authorized');
  private actionNotPerformed = new Error('Action Not Performed');

  async getTodo(
    req: Request<TodoParam, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthorizedError;
      const { todoId } = req.params;
      const todo = await todoServiceImpl.read(todoId, userId);
      return res.
        status(200)
        .json(ResponseMessage<Todo | null>.build(todo));
    } catch (err) {
      next(err);
    }
  }

  async getTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthorizedError;
      const todos: Todo[] = await todoServiceImpl.readAll(userId);
      return res
        .status(200)
        .json(ResponseMessage<Todo[]>.build(todos));
    } catch (err) {
      next(err);
    }
  }

  async createTodo(
    req: Request<{}, {}, TodoCreateDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthorizedError;
      const todo = await todoServiceImpl.create(req.body, userId);
      return res
        .status(201)
        .json(ResponseMessage<Todo>.build(todo));
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(
    req: Request<TodoParam, {}, TodoModifyDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthorizedError;
      const { todoId } = req.params;
      const update = await todoServiceImpl.update(req.body, todoId, userId);
      if (!update) throw this.actionNotPerformed;
      return res
        .status(204)
        .json();
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(
    req: Request<TodoParam, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthorizedError;
      const { todoId } = req.params;
      const deletedTodo = await todoServiceImpl.delete(todoId, userId);
      if (!deletedTodo) throw this.actionNotPerformed;
      return res
        .status(204)
        .json();
    } catch (err) {
      next(err);
    }
  }
}

export const todoController = new TodoController();
