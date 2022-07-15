import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

enum TOKEN_ERROR {
  TOKEN_NOT_VALID, AUTHORIZATION_HEADER_NOT_AVAILABLE
};

export const authenticatedMiddleware = async (
  req: Request, res: Response, next: NextFunction
) => {
  let errorCode: TOKEN_ERROR = TOKEN_ERROR.TOKEN_NOT_VALID;
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      errorCode = TOKEN_ERROR.AUTHORIZATION_HEADER_NOT_AVAILABLE;
      throw new Error();
    }
    const { SECRET_KEY = 'superSecretKey' } = process.env;
    // NOTE TO SELF: DO NOT DO IT LIKE THIS
    const payload: any = jwt.verify(token, SECRET_KEY);
    req.attributes = {
      userId: payload.data.userId
    };
    next();
  } catch (err) {
    if (errorCode === TOKEN_ERROR.TOKEN_NOT_VALID)
      return res.status(400).json({
        status: 'error',
        message: 'Token not valid'
      });
    
    if (errorCode === TOKEN_ERROR.AUTHORIZATION_HEADER_NOT_AVAILABLE)
      return res.status(400).json({
        status: 'error',
        message: 'Authorization header not available'
      });
  }
};
