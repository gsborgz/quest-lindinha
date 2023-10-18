export class BaseMessage {

  public message: string;

}

export class RequestOptions {

  uri: string;
  data?: GenericObject;
  query?: GenericObject;
  headers?: GenericObject;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericObject = Record<string, any>;