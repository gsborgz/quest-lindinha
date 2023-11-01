import { createContext, useContext } from 'react';
import { QuestServiceData } from '@/types/providers/quest-service.type';
import { BaseMessage, GenericObject, RequestOptions } from '@/types/base.type';
import { Quest } from '@/types/models/quest.type';
import { baseService } from '@/services/base.service';
import { DictionaryContext } from '@/providers/dictionary.provider';
import { SnackbarContext } from '@/providers/snackbar.provider';

export const QuestServiceContext = createContext({} as QuestServiceData);

export function QuestServiceProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useContext(DictionaryContext);
  const { openSnackbar } = useContext(SnackbarContext);
  
  async function findAll(query?: GenericObject): Promise<Quest[]> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.query = query;
    options.uri = '/quests';

    return baseService.get(options, locale, openSnackbar);
  }

  async function findOne(id: string): Promise<Quest> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/quests/${id}`;

    return baseService.get(options, locale, openSnackbar);
  }

  async function upsert(data: Quest): Promise<Quest> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.data = data;
    options.uri = '/quests';

    return baseService.post(options, locale, openSnackbar);
  }

  async function complete(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/quests/${id}/complete`;

    return baseService.put(options, locale, openSnackbar);
  }

  async function remove(id: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/quests/${id}`;

    return baseService.delete(options, locale, openSnackbar);
  }
  
  return (
    <QuestServiceContext.Provider value={{
      findAll,
      findOne,
      upsert,
      complete,
      remove
    }}>
      { children }
    </QuestServiceContext.Provider>
  );
}