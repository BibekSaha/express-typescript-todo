import { NextFunction, Request, Response } from 'express';
import { ResponseMessage } from '../../common/type/responseMessage';
import { UserModifyDTO } from '../dto/user.modify.dto';
import { userServiceImpl } from '../services/user.service';

class UserController {
  private notAuthenticatedError = new Error('Not Authenticated');
  private actionNotPerformed = new Error('Action Not Performed');

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthenticatedError;
      const user = await userServiceImpl.read(userId);
      if (!user) return res.status(404).json({
        status: 'error',
        error: {
          message: 'User not found'
        }
      });
      return res.status(200).json(ResponseMessage.build(user));
    } catch (err) {
      next(err);
    }
  }

  async patchUser(
    req: Request<{}, {}, UserModifyDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthenticatedError;
      const userUpdate = await userServiceImpl.update(userId, req.body);
      if (!userUpdate) throw this.actionNotPerformed;
      return res.status(204).json();
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.attributes;
      if (!userId) throw this.notAuthenticatedError;
      const deletedUser = await userServiceImpl.delete(userId);
      if (!deletedUser) throw this.actionNotPerformed;
      return res
        .redirect('/api/v1/users/signout');
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
