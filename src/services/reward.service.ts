import BaseService from '@/services/base.service';
import { Reward } from '@/types/reward.type';

export default class RewardService extends BaseService {

  public async findAll(): Promise<Reward[] | null> {
    const headers = this.getAuthorizationHeader();

    return this.get('/rewards', headers);
  }

  public async upsert(data: Reward): Promise<Reward | null> {
    const headers = this.getAuthorizationHeader();

    return this.post('/rewards', data, headers);
  }

  public async claim(id: string): Promise<any | null> {
    const headers = this.getAuthorizationHeader();

    return this.put(`/rewards/${id}/claim`, headers);
  }

  public async remove(id: string): Promise<any | null> {
    const headers = this.getAuthorizationHeader();

    return this.delete(`/rewards/${id}`, headers);
  }

}

export const rewardService = new RewardService();
