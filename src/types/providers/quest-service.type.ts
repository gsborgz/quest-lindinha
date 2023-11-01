import { BaseMessage, GenericObject } from '@/types/base.type';
import { Quest } from '@/types/models/quest.type';

export type QuestServiceData = {
  findAll: (query?: GenericObject) => Promise<Quest[]>;
  findOne: (id: string) => Promise<Quest>;
  upsert: (data: Quest) => Promise<Quest>;
  complete: (id: string) => Promise<BaseMessage>;
  remove: (id: string) => Promise<BaseMessage>;
}