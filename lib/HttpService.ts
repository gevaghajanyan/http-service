import { HttpRequest } from './HttpRequest';

export class HttpService {
  static METHODS = {
    GET: 'GET',
    HEAD: 'HEAD',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    CONNECT: 'CONNECT',
    OPTIONS: 'OPTIONS',
    TRACE: 'TRACE',
    PATCH: 'PATCH',
  };

  static serializeQueryParams = (obj: {
    [key: string]: any
  } = {}) => {
    return Object.keys(obj).reduce((acc, prop) => {
      const val = obj[prop];
      if (val || val === false || val === 0) {
        return acc.concat(`${encodeURIComponent(prop)}=${encodeURIComponent(val)}`);
      }
      return acc;
    }, []).join('&');
  };

  private defaultHeaders: RequestInit = {
    method: HttpService.METHODS.GET,
  };

  public request(url: string, option: RequestInit = {
    method: HttpService.METHODS.GET,
  }): HttpRequest {
    return new HttpRequest(url, {
      ...this.defaultHeaders,
      ...option,
    });
  }

  public get(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.GET,
    });
  }

  public head(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.HEAD,
    });
  }

  public post(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.POST,
    });
  }

  public put(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.PUT,
    });
  }

  public delete(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.DELETE,
    });
  }

  public connect(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.CONNECT,
    });
  }

  public options(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.OPTIONS,
    });
  }

  public trace(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.TRACE,
    });
  }

  public patch(url: string, option?: RequestInit): HttpRequest {
    return this.request(url, {
      ...option,
      method: HttpService.METHODS.PATCH,
    });
  }

  public setDefaultHeaders(headers: RequestInit): HttpService {
    this.defaultHeaders = headers;
    return this;
  }
}
