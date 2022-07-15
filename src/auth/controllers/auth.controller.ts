import { NextFunction, Request, Response } from 'express';
import { ResponseMessage } from '../../common/type/responseMessage';
import { generateJwt } from '../../common/utils/generateJwt';
import { UserResponse } from '../../user/type/user.reponse';
import { AuthSigninDTO } from '../dto/auth.signin.dto';
import { UserCreateDTO } from '../dto/user.create.dto';
import { authServiceImpl } from '../services/auth.service';
import { SigninSuccess } from '../type/signinSuccess';

class AuthController {
  async signup (
    req: Request<{}, {}, UserCreateDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authServiceImpl.signup(req.body);
      res.cookie('jwtToken', generateJwt({ userId: user.id }));
      return res.status(200).json(ResponseMessage.build(new UserResponse(user)));
    } catch (err: any) {
      if (err.errorCode == 'P2002')
        return res.status(400).json(err);
      next(err);
    }
  }

  async signin(
    req: Request<{}, {}, AuthSigninDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authServiceImpl.signin(req.body);
      const jwtToken = generateJwt({ userId: user.id });
      res.cookie('jwtToken', jwtToken);
      return res
        .status(200)
        .json(ResponseMessage<SigninSuccess>.build({
          token: jwtToken
        }));
    } catch (err: any) {
      if (err.errorCode === 'P2003')
        return res.status(403).json(err);
      next(err);
    }
  }

  async signout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.clearCookie('jwtToken').status(204).json();
  }
}

export const authController = new AuthController();
