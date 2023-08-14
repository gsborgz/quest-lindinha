export class UpsertRewardData {
  public name: string;
  public description: string;
  public value: number;
  public status: RewardStatus;
  public user_id: string;
}

export enum RewardStatus {
  AVAILABLE = 'available',
  CLAIMED = 'claimed',
}
