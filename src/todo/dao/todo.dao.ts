import { prisma } from '../../../prisma';
import { TodoCreateDTO } from '../dto/todo.create.dto';
import { TodoModifyDTO } from '../dto/todo.modify.dto';
import { TodoDAO } from './interface/todo.dao.interface';

class TodoDAOImpl implements TodoDAO {
  private dao = prisma.todo;

  async addTodo(todo: TodoCreateDTO, userId: string) {
    const createdTodo = await this.dao.create({
      data: {
        ...todo,
        userId
      }
    });
    return createdTodo;
  }

  async readTodo(todoId: string, userId: string) {
    const todo = await this.dao.findFirst({
      where: { id: todoId, userId }
    });
    return todo;
  }

  async readTodos(userId: string) {
    const todos = await this.dao.findMany({
      where: { userId }
    });
    return todos;
  }

  async updateTodo(todo: TodoModifyDTO, todoId: string, userId: string) {
   const { count } = await this.dao.updateMany({
      where: { id: todoId, userId },
      data: todo
    });

    return count > 0;
  }

  async deleteTodo(todoId: string, userId: string) {
    const { count } = await this.dao.deleteMany({
      where: { id: todoId, userId }
    });
    return count > 0;
  }
}

export const todoDAOImpl = new TodoDAOImpl();
