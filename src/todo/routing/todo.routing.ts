import { Router } from 'express';
import { authenticatedMiddleware } from '../../common/middlewares/authenticated.middleware';
import { CommonRouting } from '../../common/routing/common.routing';
import { todoController } from '../controllers/todo.controller';

export class TodoRouting extends CommonRouting {
  private todoController = todoController;

  constructor(
    name: string = 'TodoRoutes'
  ) {
    super(Router(), name);
  }

  private applyMiddlewares() {
    this.router.use(authenticatedMiddleware);
  }

  configureRoute(): Router {
    this.applyMiddlewares();

    this.router
      .route('/')
      .get(this.todoController.getTodos)
      .post(this.todoController.createTodo);

    this.router
      .route('/:todoId')
      .get(this.todoController.getTodo)
      .patch(this.todoController.updateTodo)
      .delete(this.todoController.deleteTodo);

    return this.router;
  }
}