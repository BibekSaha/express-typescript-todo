import { User } from '@prisma/client';
import { authDAOImpl } from '../dao/auth.dao';
import { AuthDAO } from '../dao/interface/auth.dao.interface';
import { AuthSigninDTO } from '../dto/auth.signin.dto';
import { UserCreateDTO } from '../dto/user.create.dto';
import { AuthService } from './interface/auth.service.interface';

class AuthServiceImpl implements AuthService {
  private authDAO: AuthDAO = authDAOImpl;

  async signup(user: UserCreateDTO): Promise<User> {
    return this.authDAO.signup(user);
  }

  async signin(credentials: AuthSigninDTO): Promise<User> {
    return this.authDAO.signin(credentials);
  }
}

export const authServiceImpl = new AuthServiceImpl();
