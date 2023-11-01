import { BaseMessage, GenericObject } from '@/types/base.type';
import { Reward } from '@/types/models/reward.type';

export type RewardServiceData = {
  findAll: (query?: GenericObject) => Promise<Reward[]>;
  findOne: (id: string) => Promise<Reward>;
  upsert: (data: Reward) => Promise<Reward>;
  claim: (id: string) => Promise<BaseMessage>;
  remove: (id: string) => Promise<BaseMessage>;
}
