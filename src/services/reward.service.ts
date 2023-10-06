import BaseService from '@/services/base.service';
import { Reward } from '@/types/models/reward.type';
import { BaseMessage, RequestOptions } from '@/types/base.type';

export default class RewardService extends BaseService {

  public async findAll(query?: Record<string, any>): Promise<Reward[]> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.query = query;
    options.uri = '/rewards';

    return this.get(options);
  }

  public async findOne(id: string): Promise<Reward> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = `/rewards/${id}`;

    return this.get(options);
  }

  public async upsert(data: Reward): Promise<Reward> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.data = data;
    options.uri = '/rewards';

    return this.post(options);
  }

  public async claim(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = `/rewards/${id}/claim`;

    return this.put(options);
  }

  public async remove(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = `/rewards/${id}`;

    return this.delete(options);
  }

}

export const rewardService = new RewardService();
