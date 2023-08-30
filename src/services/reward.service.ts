import BaseService from '@/services/base.service';
import { Reward } from '@/types/reward.type';
import { RequestOptions } from '@/types/base.type';

export default class RewardService extends BaseService {

  public async findAll(query?: Record<string, any>): Promise<Reward[]> {
    const options = new RequestOptions();

    options.query = query;
    options.uri = '/rewards';
    options.headers = this.getAuthorizationHeader();

    return this.get(options);
  }

  public async upsert(data: Reward): Promise<Reward> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/rewards';
    options.headers = this.getAuthorizationHeader();

    return this.post(options);
  }

  public async claim(id: string): Promise<any> {
    const options = new RequestOptions();

    options.uri = `/rewards/${id}/claim`;
    options.headers = this.getAuthorizationHeader();

    return this.put(options);
  }

  public async remove(id: string): Promise<any> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = `/rewards/${id}`;

    return this.delete(options);
  }

}

export const rewardService = new RewardService();
