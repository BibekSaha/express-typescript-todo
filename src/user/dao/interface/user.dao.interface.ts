import { User } from '@prisma/client';
import { UserCreateDTO } from '../../dto/user.create.dto';
import { UserModifyDTO } from '../../dto/user.modify.dto';
import { UserResponse } from '../../type/user.reponse';

export interface UserDAO {
  getUser(userId: string): Promise<UserResponse | null>;
  patchUser(userId: string, user: UserModifyDTO): Promise<boolean>;
  deleteUser(userId: string): Promise<boolean>;
}
