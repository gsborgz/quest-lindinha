import BaseApi from '@api/base.api';
import { UpsertRewardData } from '@type/reward.type';

export default class RewardApi extends BaseApi {

  public async findAll() {
    return this.get('/rewards');
  }

  public async upsert(data: UpsertRewardData) {
    return this.post('/rewards', data);
  }

  public async claim(id: string) {
    return this.put(`/rewards/${id}/claim`);
  }

  public async remove(id: string) {
    return this.delete(`/rewards/${id}`);
  }

}

export const rewardApi = new RewardApi();
