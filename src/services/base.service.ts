const url = process.env.API_URL || 'http://localhost:3333';

export default class BaseService {

  public async get<E>(uri: string, headers?: Record<string, any>): Promise<E | null> {
    const config = {
      method: 'GET',
      headers
    };

    return this.dataFetch<E>(uri, config);
  }

  public async post<E>(uri: string, data: Record<string, any>, headers?: Record<string, any>): Promise<E | null> {
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    return this.dataFetch<E>(uri, config);
  }

  public async put<E>(uri: string, data?: Record<string, any>, headers?: Record<string, any>): Promise<E | null> {
    const config: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (data) {
      config['body'] = JSON.stringify(data);
    }

    return this.dataFetch<E>(uri, config);
  }

  public async delete<E>(uri: string, headers?: Record<string, any>): Promise<E | null> {
    const config: RequestInit = {
      method: 'DELETE',
      headers
    };

    return this.dataFetch<E>(uri, config);
  }

  private async dataFetch<E>(uri: string, config?: RequestInit): Promise<E | null> {
    try {
      const response = await fetch(`${url}${uri}`, config);

      if (response.ok) {
        return response.json() as E;
      }

      return null;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

}

export const baseService = new BaseService();
