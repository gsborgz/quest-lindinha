import { GenericObject, RequestOptions } from '@/types/base.type';
import { LocaleFunction } from '@/types/providers/dictionary.type';
import { OpenSnackbarFunction, SnackbarType } from '@/types/components/snackbar.type';

export default class BaseService {

  public async get<E>(options: RequestOptions, locale: LocaleFunction, openSnackbar: OpenSnackbarFunction): Promise<E> {
    const config = {
      method: 'GET',
      headers: options.headers,
    };

    return this.dataFetch<E>(options.uri, config, locale, openSnackbar, options.query);
  }

  public async post<E>(options: RequestOptions, locale: LocaleFunction, openSnackbar: OpenSnackbarFunction): Promise<E> {
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify(options.data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    return this.dataFetch<E>(options.uri, config, locale, openSnackbar, options.query);
  }

  public async put<E>(options: RequestOptions, locale: LocaleFunction, openSnackbar: OpenSnackbarFunction): Promise<E> {    
    const config: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    if (options.data) {
      config['body'] = JSON.stringify(options.data);
    }

    return this.dataFetch<E>(options.uri, config, locale, openSnackbar, options.query);
  }

  public async delete<E>(options: RequestOptions, locale: LocaleFunction, openSnackbar: OpenSnackbarFunction): Promise<E> {
    const config: RequestInit = {
      method: 'DELETE',
      headers: options.headers
    };

    return this.dataFetch<E>(options.uri, config, locale, openSnackbar, options.query);
  }

  public getAuthorizationHeader(): GenericObject {
    const token = localStorage.getItem('token');

    return {
      authorization: `${token}`
    };
  }

  private async dataFetch<E>(uri: string, config: RequestInit, locale: LocaleFunction, openSnackbar: OpenSnackbarFunction, query?: GenericObject): Promise<E> {
    const url = new URL(`${process.env.API_URL}${uri}`);

    if (query) {
      Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    }

    const response = await fetch(url, config);

    if (response.ok) {
      return response.json();
    }

    const body = await response.json();
    const message = locale(body.message);

    openSnackbar(message, SnackbarType.ERROR);

    throw new Error(message);
  }

}

export const baseService = new BaseService();
