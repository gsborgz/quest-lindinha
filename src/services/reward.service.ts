import BaseService from '@/services/base.service';
import { Reward } from '@/types/reward.type';

export default class RewardService extends BaseService {

  public async findAll(): Promise<Reward[] | null> {
    return this.get('/rewards');
  }

  public async upsert(data: Reward): Promise<Reward | null> {
    return this.post('/rewards', data);
  }

  public async claim(id: string): Promise<any | null> {
    return this.put(`/rewards/${id}/claim`);
  }

  public async remove(id: string): Promise<any | null> {
    return this.delete(`/rewards/${id}`);
  }

}

export const rewardService = new RewardService();
