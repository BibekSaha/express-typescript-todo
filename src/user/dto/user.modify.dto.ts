import { UserCreateDTO } from './user.create.dto';

export interface UserModifyDTO extends Partial<UserCreateDTO> {};
