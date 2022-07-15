import { UserDAO } from '../dao/interface/user.dao.interface';
import { userDAOImpl } from '../dao/user.dao';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserModifyDTO } from '../dto/user.modify.dto';
import { UserService } from './interface/user.service.interface';

class UserServiceImpl implements UserService {
  private userDAO: UserDAO = userDAOImpl;

  read(userId: string) {
    return this.userDAO.getUser(userId);
  }

  update(userId: string, user: UserModifyDTO) {
    return this.userDAO.patchUser(userId, user);
  }

  delete(userId: string) {
    return this.userDAO.deleteUser(userId);
  }
}

export const userServiceImpl = new UserServiceImpl();
