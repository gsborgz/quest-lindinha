import BaseService from '@/services/base.service';
import { Quest } from '@/types/models/quest.type';
import { RequestOptions } from '@/types/base.type';

export default class QuestService extends BaseService {

  public async findAll(query?: Record<string, any>): Promise<Quest[]> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.query = query;
    options.uri = '/quests';

    return this.get(options);
  }

  public async upsert(data: Quest): Promise<Quest> {
    const options = new RequestOptions();

    options.data = data;
    options.headers = this.getAuthorizationHeader();
    options.uri = '/quests';

    return this.post(options);
  }

  public async complete(id: string): Promise<any> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = `/quests/${id}/complete`;

    return this.put(options);
  }

  public async remove(id: string): Promise<any> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = `/quests/${id}`;

    return this.delete(options);
  }

}

export const questService = new QuestService();
