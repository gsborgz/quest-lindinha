import BaseApi from '@api/base.api';
import { UpsertTaskData } from '@type/task.type';

export default class TaskApi extends BaseApi {

  public async findAll() {
    return this.get('/tasks');
  }

  public async upsert(data: UpsertTaskData) {
    return this.post('/tasks', data);
  }

  public async finish(id: string) {
    return this.put(`/tasks/${id}/finish`);
  }

  public async remove(id: string) {
    return this.delete(`/tasks/${id}`);
  }

}

export const taskApi = new TaskApi();
