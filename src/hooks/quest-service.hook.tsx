'use client'

import { QuestServiceData } from '@/types/hooks/quest-service.type';
import { useBaseService } from '@/hooks/base-service.hook';
import { BaseMessage, GenericObject, RequestOptions } from '@/types/base.type';
import { Quest } from '@/types/models/quest.type';

export function useQuestService(): QuestServiceData {
  const baseService = useBaseService();

  async function findAll(query?: GenericObject): Promise<Quest[]> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.query = query;
    options.uri = '/quests';

    return baseService.get(options);
  }

  async function findOne(id: string): Promise<Quest> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/quests/${id}`;

    return baseService.get(options);
  }

  async function upsert(data: Quest): Promise<Quest> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.data = data;
    options.uri = '/quests';

    return baseService.post(options);
  }

  async function complete(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/quests/${id}/complete`;

    return baseService.put(options);
  }

  async function remove(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/quests/${id}`;

    return baseService.delete(options);
  }
  
  return {
    complete,
    findAll,
    findOne,
    remove,
    upsert
  };
}