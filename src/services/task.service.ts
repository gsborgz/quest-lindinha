import BaseService from '@/services/base.service';
import { Task } from '@/types/task.type';

export default class TaskService extends BaseService {

  public async findAll() {
    return this.get('/tasks');
  }

  public async upsert(data: Task) {
    return this.post('/tasks', data);
  }

  public async finish(id: string) {
    return this.put(`/tasks/${id}/finish`);
  }

  public async remove(id: string) {
    return this.delete(`/tasks/${id}`);
  }

}

export const taskService = new TaskService();
