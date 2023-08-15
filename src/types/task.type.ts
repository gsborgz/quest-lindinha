export class Task {
  public _id: string;
  public name: string;
  public date: Date;
  public value: number;
  public status: TaskStatus;
  public user_id: string;
  public created_at: Date;
  public updated_at: Date;
}

export enum TaskStatus {
  PENDING = 'pending',
  FINISHED = 'finished',
  EXPIRED = 'expired'
}
