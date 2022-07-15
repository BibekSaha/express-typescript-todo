import { User } from '@prisma/client';
import { AuthSigninDTO } from '../../dto/auth.signin.dto';
import { UserCreateDTO } from '../../dto/user.create.dto';

export interface AuthDAO {
  signup(user: UserCreateDTO): Promise<User>;
  signin(credentials: AuthSigninDTO): Promise<User>;
}
