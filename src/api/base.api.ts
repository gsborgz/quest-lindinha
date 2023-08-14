const url = process.env.API_URL || 'http://localhost:3333';

export default class BaseApi {

  public async get(uri: string, headers?: Record<string, any>) {
    const config = {
      method: 'GET',
      headers
    };

    return this.dataFetch(uri, config);
  }

  public async post(uri: string, data: Record<string, any>, headers?: Record<string, any>) {
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    return this.dataFetch(uri, config);
  }

  public async put(uri: string, data?: Record<string, any>, headers?: Record<string, any>) {
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

    return this.dataFetch(uri, config);
  }

  public async delete(uri: string, headers?: Record<string, any>) {
    const config: RequestInit = {
      method: 'DELETE',
      headers
    };

    return this.dataFetch(uri, config);
  }

  private async dataFetch(uri: string, config?: RequestInit) {
    try {
      const response = await fetch(`${url}${uri}`, config);
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

}

export const baseApi = new BaseApi();
