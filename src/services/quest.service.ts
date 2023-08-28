import BaseService from '@/services/base.service';
import { Quest } from '@/types/quest.type';

export default class QuestService extends BaseService {

  public async findAll(): Promise<Quest[] | null> {
    const headers = this.getAuthorizationHeader();

    return this.get('/quests', headers);
  }

  public async upsert(data: Quest): Promise<Quest | null> {
    const headers = this.getAuthorizationHeader();

    return this.post('/quests', data, headers);
  }

  public async finish(id: string): Promise<any | null> {
    const headers = this.getAuthorizationHeader();

    return this.put(`/quests/${id}/complete`, headers);
  }

  public async remove(id: string): Promise<any | null> {
    const headers = this.getAuthorizationHeader();

    return this.delete(`/quests/${id}`, headers);
  }

}

export const questService = new QuestService();
