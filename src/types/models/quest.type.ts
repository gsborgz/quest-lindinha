export class Quest {
  public _id: string;
  public name: string;
  public description: string;
  public date: Date;
  public value: number;
  public status: QuestStatus;
  public user_id: string;
  public created_at: Date;
  public updated_at: Date;
}

export enum QuestStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export type QuestButtonData = {
  full?: boolean;
}

export type QuestDialogData = {
  questId?: string;
}

export type QuestCardProps = {
  quest: Quest;
}

export type CompleteQuestButtonProps = {
  value: number;
  questId: string;
  addAction?: () => void;
}