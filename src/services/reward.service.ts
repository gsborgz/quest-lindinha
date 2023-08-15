import BaseService from '@/services/base.service';
import { Reward } from '@/types/reward.type';

export default class RewardService extends BaseService {

  public async findAll() {
    return this.get('/rewards');
  }

  public async upsert(data: Reward) {
    return this.post('/rewards', data);
  }

  public async claim(id: string) {
    return this.put(`/rewards/${id}/claim`);
  }

  public async remove(id: string) {
    return this.delete(`/rewards/${id}`);
  }

}

export const rewardService = new RewardService();
