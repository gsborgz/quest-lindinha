export class Quest {
  public _id: string;
  public name: string;
  public date: Date;
  public value: number;
  public status: QuestStatus;
  public user_id: string;
  public created_at: Date;
  public updated_at: Date;
}

export enum QuestStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export type QuestDialogData = {
  quest?: Quest;
}

export type QuestButtonData = {
  quest?: Quest;
}

