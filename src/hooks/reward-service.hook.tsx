'use client'

import { BaseMessage, GenericObject, RequestOptions } from '@src/types/base.type';
import { Reward } from '@src/types/models/reward.type';
import { useBaseService } from '@src/hooks/base-service.hook';

export type RewardServiceData = {
  findAll: (query?: GenericObject) => Promise<Reward[]>;
  findOne: (id: string) => Promise<Reward>;
  upsert: (data: Reward) => Promise<Reward>;
  claim: (id: string) => Promise<BaseMessage>;
  remove: (id: string) => Promise<BaseMessage>;
}

export function useRewardService(): RewardServiceData {
  const baseService = useBaseService();

  async function findAll(query?: GenericObject): Promise<Reward[]> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.query = query;
    options.uri = '/rewards';

    return baseService.get(options);
  }

  async function findOne(id: string): Promise<Reward> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/rewards/${id}`;

    return baseService.get(options);
  }

  async function upsert(data: Reward): Promise<Reward> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.data = data;
    options.uri = '/rewards';

    return baseService.post(options);
  }

  async function claim(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/rewards/${id}/claim`;

    return baseService.put(options);
  }

  async function remove(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/rewards/${id}`;

    return baseService.delete(options);
  }

  return {
    findAll,
    findOne,
    upsert,
    claim,
    remove
  };
}