export class Reward {
  public _id: string;
  public name: string;
  public description: string;
  public value: number;
  public status: RewardStatus;
  public user_id: string;
  public created_at: Date;
  public updated_at: Date;
}

export type RewardDialogData = {
  reward?: Reward;
}

export type RewardButtonData = {
  reward?: Reward;
}

export enum RewardStatus {
  AVAILABLE = 'available',
  CLAIMED = 'claimed',
}
