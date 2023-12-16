'use client'

import { useContext } from 'react';
import { useDictionary } from '@src/hooks/dictionary.hook';
import { SnackbarContext } from '@src/providers/snackbar.provider';
import { SnackbarType } from '@src/types/components/snackbar.type';
import { GenericObject, RequestOptions } from '@src/types/base.type';

export type BaseServiceData = {
  get: <E>(options: RequestOptions) => Promise<E>;
  post: <E>(options: RequestOptions) => Promise<E>;
  put: <E>(options: RequestOptions) => Promise<E>;
  delete: <E>(options: RequestOptions) => Promise<E>;
  getAuthorizationHeader: () => GenericObject;
}

export function useBaseService(): BaseServiceData {
  const { openSnackbar } = useContext(SnackbarContext);
  const { locale } = useDictionary();

  async function get<E>(options: RequestOptions): Promise<E> {
    const config = {
      method: 'GET',
      headers: options.headers,
    };

    return dataFetch<E>(options.uri, config, options.query);
  }

  async function post<E>(options: RequestOptions): Promise<E> {
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify(options.data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    return dataFetch<E>(options.uri, config, options.query);
  }

  async function put<E>(options: RequestOptions): Promise<E> {    
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

    return dataFetch<E>(options.uri, config, options.query);
  }

  async function deleteData<E>(options: RequestOptions): Promise<E> {
    const config: RequestInit = {
      method: 'DELETE',
      headers: options.headers
    };

    return dataFetch<E>(options.uri, config, options.query);
  }

  function getAuthorizationHeader(): GenericObject {
    const token = localStorage.getItem('token');

    return {
      authorization: `${token}`
    };
  }

  async function dataFetch<E>(uri: string, config: RequestInit, query?: GenericObject): Promise<E> {
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

  return {
    get,
    post,
    put,
    delete: deleteData,
    getAuthorizationHeader
  };
}