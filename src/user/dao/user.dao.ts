import { Prisma } from '@prisma/client';
import { prisma } from '../../../prisma';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserModifyDTO } from '../dto/user.modify.dto';
import { UserResponse } from '../type/user.reponse';
import { UserDAO } from './interface/user.dao.interface';

class UserDAOImpl implements UserDAO {
  private dao = prisma.user;

  async getUser(userId: string) {
    const user = await this.dao.findFirst({
      where: { id: userId }
    });
    if (!user) return Promise.resolve(null);
    return new UserResponse(user);
  }

  async patchUser(userId: string, user: UserModifyDTO) {
    const { count } = await this.dao.updateMany({
      where: { id: userId },
      data: user
    });
    return count > 0;
  }

  async deleteUser(userId: string) {
    const { count } = await this.dao.deleteMany({
      where: { id: userId }
    });
    return count > 0;
  }
}

export const userDAOImpl = new UserDAOImpl();
