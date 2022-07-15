import { TodoService } from './interfaces/todo.service.interface';
import { TodoDAO } from '../dao/interface/todo.dao.interface';
import { todoDAOImpl } from '../dao/todo.dao';
import { TodoCreateDTO } from '../dto/todo.create.dto';
import { TodoModifyDTO } from '../dto/todo.modify.dto';

class TodoServiceImpl implements TodoService {
  private todoDAO: TodoDAO = todoDAOImpl;

  async create(todo: TodoCreateDTO, userId: string) {
    return this.todoDAO.addTodo(todo, userId);
  }

  async read(todoId: string, userId: string) {
    return this.todoDAO.readTodo(todoId, userId);
  }

  async readAll(userId: string) {
    return this.todoDAO.readTodos(userId);
  }

  async update(modifyTodo: TodoModifyDTO, todoId: string, userId: string) {
    return this.todoDAO.updateTodo(modifyTodo, todoId, userId);
  }

  async delete(todoId: string, userId: string) {
    return this.todoDAO.deleteTodo(todoId, userId);
  }
}

export const todoServiceImpl = new TodoServiceImpl();
