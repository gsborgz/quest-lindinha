import BaseService from '@/services/base.service';
import { Task } from '@/types/task.type';

export default class TaskService extends BaseService {

  public async findAll(): Promise<Task[] | null> {
    return this.get('/tasks');
  }

  public async upsert(data: Task): Promise<Task | null> {
    return this.post('/tasks', data);
  }

  public async finish(id: string): Promise<any | null> {
    return this.put(`/tasks/${id}/finish`);
  }

  public async remove(id: string): Promise<any | null> {
    return this.delete(`/tasks/${id}`);
  }

}

export const taskService = new TaskService();
