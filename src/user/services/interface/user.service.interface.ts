import { UserCreateDTO } from '../../dto/user.create.dto';
import { UserModifyDTO } from '../../dto/user.modify.dto';
import { UserResponse } from '../../type/user.reponse';

export interface UserService {
  read(userId: string): Promise<UserResponse | null>;
  update(userId: string, user: UserModifyDTO): Promise<boolean>;
  delete(userId: string): Promise<boolean>;
}
