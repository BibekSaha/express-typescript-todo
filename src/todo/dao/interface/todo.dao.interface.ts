import { Todo } from '@prisma/client';
import { TodoCreateDTO } from '../../dto/todo.create.dto';
import { TodoModifyDTO } from '../../dto/todo.modify.dto';

export interface TodoDAO {
  addTodo: (todo: TodoCreateDTO, userId: string) => Promise<Todo>;
  readTodo: (todoId: string, userId: string) => Promise<Todo | null>;
  readTodos: (userId: string) => Promise<Todo[]>;
  updateTodo: (todo: TodoModifyDTO, todoId: string, userId: string) => Promise<boolean>;
  deleteTodo: (todoId: string, userId: string) => Promise<boolean>;
}
