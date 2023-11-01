import { GenericObject, RequestOptions } from '@/types/base.type';

export type BaseServiceData = {
  get: <E>(options: RequestOptions) => Promise<E>;
  post: <E>(options: RequestOptions) => Promise<E>;
  put: <E>(options: RequestOptions) => Promise<E>;
  delete: <E>(options: RequestOptions) => Promise<E>;
  getAuthorizationHeader: () => GenericObject;
}