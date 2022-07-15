import { Router } from 'express';
import { CommonRouting } from '../../common/routing/common.routing';
import { authController } from '../controllers/auth.controller';

export class AuthRouting extends CommonRouting {
  constructor(
    name: string = 'AuthRoutes'
  ) {
    super(Router(), name);
  }

  configureRoute(): Router {
    this.router.post('/signup', authController.signup);
    this.router.post('/signin', authController.signin);
    this.router.post('/signout', authController.signout);
    return this.router;
  }
}
