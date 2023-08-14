export class UpsertTaskData {
  public name: string;
  public date: Date;
  public value: number;
  public status: TaskStatus;
  public user_id: string;
}

export enum TaskStatus {
  PENDING = 'pending',
  FINISHED = 'finished',
  EXPIRED = 'expired'
}
