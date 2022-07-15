import { Todo } from '@prisma/client';
import { TodoCreateDTO } from '../../dto/todo.create.dto';
import { TodoModifyDTO } from '../../dto/todo.modify.dto';

export interface TodoService {
  create: (todo: TodoCreateDTO, userId: string) => Promise<Todo>;
  read: (todoId: string, userId: string) => Promise<Todo | null>;
  readAll: (userId: string) => Promise<Todo[]>;
  update: (todo: TodoModifyDTO, todoId: string, userId: string) => Promise<boolean>;
  delete: (todoId: string, userId: string) => Promise<boolean>;
}
