import { HttpError } from './HttpError';

export class HttpRequest {
  public controller: AbortController = new AbortController();

  private innerPromise: Promise<Response>;

  constructor(url: string, option: RequestInit) {
    const { signal } = this.controller;
    this.innerPromise = fetch(url, {
      signal,
      ...option,
    }).then(response => {
      HttpError.throw(response);
      return response;
    });
  }

  abort(): HttpRequest {
    this.controller.abort();
    return this;
  }

  then(
    onFulfilled: (value: Response) => Response | PromiseLike<Response> | any,
    onRejected?: (reason: any) => PromiseLike<never>,
  ): HttpRequest {
    this.innerPromise.then(onFulfilled, onRejected);
    return this;
  }

  catch(
    onRejected: (reason: HttpError) => PromiseLike<never> | any,
  ): HttpRequest {
    this.innerPromise.catch(onRejected);
    return this;
  }

  finally(
    onFinally?: (() => void) | undefined | null,
  ): HttpRequest {
    this.innerPromise.finally(onFinally);
    return this;
  }
}
