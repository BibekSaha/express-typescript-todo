import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../../prisma';
import { AuthSigninDTO } from '../dto/auth.signin.dto';
import { UserCreateDTO } from '../dto/user.create.dto';
import { AuthDAO } from './interface/auth.dao.interface';

class AuthDAOImpl implements AuthDAO {
  private dao = prisma.user;
  private saltRounds: number = 8;

  async signup(user: UserCreateDTO): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, this.saltRounds);
      const createdUser = await this.dao.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
      return createdUser;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002')
          return Promise.reject({
            status: 'error',
            errorCode: err.code,
            message: 'Email already exists',
          });
      }
      throw err;
    }
  }

  async signin(credentials: AuthSigninDTO): Promise<User> {
    const rejectObject = {
      status: 'error',
      errorCode: 'P2003',
      message: 'Email or Password is incorrect',
    };

    const user = await this.dao.findUnique({
      where: {
        email: credentials.email
      },
    });
  
    if (!user) return Promise.reject(rejectObject);

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) return Promise.reject(rejectObject);

    return user;
  }
}

export const authDAOImpl =  new AuthDAOImpl();
