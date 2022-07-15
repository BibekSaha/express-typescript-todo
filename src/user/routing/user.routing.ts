import { Router } from 'express';
import { authenticatedMiddleware } from '../../common/middlewares/authenticated.middleware';
import { CommonRouting } from '../../common/routing/common.routing';
import { userController } from '../controllers/user.controller';

export class UserRouting extends CommonRouting {
  private userController = userController;

  constructor(
    name: string = 'UsersRoutes'
  ) {
    super(Router(), name);
  }

  private applyMiddlewares() {
    this.router.use(authenticatedMiddleware);
  }

  configureRoute(): Router {
    this.applyMiddlewares();
    this.router
      .route('/me')
      .get(this.userController.getUser)
      .patch(this.userController.patchUser)
      .delete(this.userController.deleteUser);
      
    return this.router;
  }
}
