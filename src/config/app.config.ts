import express, { Application, NextFunction, Request, Response } from 'express';
import { CommonRouting } from '../common/routing/common.routing';
import { UserRouting } from '../user/routing/user.routing';
import { TodoRouting } from '../todo/routing/todo.routing';
import { AuthRouting } from '../auth/routing/auth.routing';

class AppConfiguration {
  private app: Application;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure() {
    this.app.use(express.json());

    const userRouter: CommonRouting = new UserRouting();
    const todoRouter: CommonRouting = new TodoRouting();
    const authRouter: CommonRouting = new AuthRouting();

    this.app.use('/api/v1/users', userRouter.configureRoute());
    this.app.use('/api/v1/todos', todoRouter.configureRoute());
    this.app.use('/api/v1/auth', authRouter.configureRoute());

    this.app.use((
      err: express.ErrorRequestHandler,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      });
    });


  }

  get App() {
    return this.app;
  }
}

export const appConfig = new AppConfiguration();
