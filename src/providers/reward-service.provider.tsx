import { createContext, useContext } from 'react';
import { RewardServiceData } from '@/types/providers/reward-service.type';
import { BaseMessage, GenericObject, RequestOptions } from '@/types/base.type';
import { Reward } from '@/types/models/reward.type';
import { baseService } from '@/services/base.service';
import { DictionaryContext } from '@/providers/dictionary.provider';
import { SnackbarContext } from '@/providers/snackbar.provider';

export const RewardServiceContext = createContext({} as RewardServiceData);

export function RewardServiceProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useContext(DictionaryContext);
  const { openSnackbar } = useContext(SnackbarContext);

  async function findAll(query?: GenericObject): Promise<Reward[]> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.query = query;
    options.uri = '/rewards';

    return baseService.get(options, locale, openSnackbar);
  }

  async function findOne(id: string): Promise<Reward> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/rewards/${id}`;

    return baseService.get(options, locale, openSnackbar);
  }

  async function upsert(data: Reward): Promise<Reward> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.data = data;
    options.uri = '/rewards';

    return baseService.post(options, locale, openSnackbar);
  }

  async function claim(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/rewards/${id}/claim`;

    return baseService.put(options, locale, openSnackbar);
  }

  async function remove(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/rewards/${id}`;

    return baseService.delete(options, locale, openSnackbar);
  }

  return (
    <RewardServiceContext.Provider value={{
      findAll,
      findOne,
      upsert,
      claim,
      remove
    }}>
      { children }
    </RewardServiceContext.Provider>
  );
}