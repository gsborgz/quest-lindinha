import { Reward } from '@/types/reward.type';
import { Quest } from '@/types/quest.type';

export class User {
  public _id: string;
  public name: string;
  public email: string;
  public password: string;
  public credits: number;
  public quests: Quest[];
  public rewards: Reward[];
  public created_at: Date;
  public updated_at: Date;
}
