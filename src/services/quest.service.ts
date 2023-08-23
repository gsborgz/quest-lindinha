import BaseService from '@/services/base.service';
import { Quest } from '@/types/quest.type';

export default class QuestService extends BaseService {

  public async findAll(): Promise<Quest[] | null> {
    return this.get('/quests');
  }

  public async upsert(data: Quest): Promise<Quest | null> {
    return this.post('/quests', data);
  }

  public async finish(id: string): Promise<any | null> {
    return this.put(`/quests/${id}/complete`);
  }

  public async remove(id: string): Promise<any | null> {
    return this.delete(`/quests/${id}`);
  }

}

export const questService = new QuestService();
