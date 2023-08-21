
export default class BaseService {

  protected async get<E>(uri: string, headers?: Record<string, any>): Promise<E | null> {
    const config = {
      method: 'GET',
      headers
    };

    return this.dataFetch<E>(uri, config);
  }

  protected async post<E>(uri: string, data: Record<string, any>, headers?: Record<string, any>): Promise<E | null> {
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

  protected async put<E>(uri: string, data?: Record<string, any>, headers?: Record<string, any>): Promise<E | null> {
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

  protected async delete<E>(uri: string, headers?: Record<string, any>): Promise<E | null> {
    const config: RequestInit = {
      method: 'DELETE',
      headers
    };

    return this.dataFetch<E>(uri, config);
  }

  protected getAuthorizationHeader(): Record<string, any> {
    const token = localStorage.getItem('token');

    return {
      authorization: `${token}`
    };
  }

  private async dataFetch<E>(uri: string, config?: RequestInit): Promise<E | null> {
    try {
      const response = await fetch(`${process.env.API_URL}${uri}`, config);

      if (response.status === 401) {
        return null as E;
      }

      if (response.ok) {
        return response.json() as E;
      }

      return null;
    } catch (error) {
      console.log(error);

      return null as E;
    }
  }

}
