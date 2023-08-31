export class BaseMessage {

  public message: string;

}

export class RequestOptions {

  uri: string;
  data?: Record<string, any>;
  query?: Record<string, any>;
  headers?: Record<string, any>;

}