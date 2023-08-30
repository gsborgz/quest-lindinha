import { RequestOptions } from '@/types/base.type';

export default class BaseService {

  protected async get<E>(options: RequestOptions): Promise<E> {
    const config = {
      method: 'GET',
      headers: options.headers,
    };

    return this.dataFetch<E>(options.uri, config, options.query);
  }

  protected async post<E>(options: RequestOptions): Promise<E> {
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify(options.data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    return this.dataFetch<E>(options.uri, config, options.query);
  }

  protected async put<E>(options: RequestOptions): Promise<E> {    
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

    return this.dataFetch<E>(options.uri, config, options.query);
  }

  protected async delete<E>(options: RequestOptions): Promise<E> {
    const config: RequestInit = {
      method: 'DELETE',
      headers: options.headers
    };

    return this.dataFetch<E>(options.uri, config, options.query);
  }

  protected getAuthorizationHeader(): Record<string, any> {
    const token = localStorage.getItem('token');

    return {
      authorization: `${token}`
    };
  }

  private async dataFetch<E>(uri: string, config: RequestInit, query?: Record<string, any>): Promise<E> {
    const url = new URL(`${process.env.API_URL}${uri}`);

    if (query) {
      Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    }

    return fetch(url, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .catch(error => {
        throw new Error(error);
      });
  }

}
