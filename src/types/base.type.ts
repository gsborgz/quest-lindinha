export class BaseMessage {

  public message: string;

}

export class RequestOptions {

  headers?: Record<string, any>;
  query?: Record<string, any>;
  data?: Record<string, any>;
  uri: string;

}