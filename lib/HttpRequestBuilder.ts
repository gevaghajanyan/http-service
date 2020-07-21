import { HttpService } from './HttpService';
import { HttpRequest } from './HttpRequest';

export class HttpRequestBuilder implements RequestInit {
  public http: HttpService;

  public url: string;

  body?: BodyInit | null;

  cache?: RequestCache;

  credentials?: RequestCredentials;

  headers?: Headers;

  integrity?: string;

  keepalive?: boolean;

  method?: string;

  mode?: RequestMode;

  redirect?: RequestRedirect;

  referrer?: string;

  referrerPolicy?: ReferrerPolicy;

  signal?: AbortSignal | null;

  window?: any;

  constructor() {
    this.http = new HttpService();
    this.url = '';
    this.headers = new Headers();
    this.method = HttpService.METHODS.GET;
    this.body = null;
  }

  setHttpMethod(method: string): HttpRequestBuilder {
    this.method = method;
    return this;
  }

  setUrl(url: string): HttpRequestBuilder {
    this.url = url;
    return this;
  }

  setHttpHeader(key: string, value: string): HttpRequestBuilder {
    this.headers.set(key, value);
    return this;
  }

  setHttpHeaders(headers: HeadersInit): HttpRequestBuilder {
    if (headers instanceof Headers) {
      this.headers = headers;
    } else {
      this.headers = new Headers(headers);
    }
    return this;
  }

  setHttpBody(body: BodyInit): HttpRequestBuilder {
    this.body = body;
    return this;
  }

  setHttpCache(cache: RequestCache): HttpRequestBuilder {
    this.cache = cache;
    return this;
  }

  setHttpCredentials(credentials: RequestCredentials): HttpRequestBuilder {
    this.credentials = credentials;
    return this;
  }

  setHttpIntegrity(integrity: string): HttpRequestBuilder {
    this.integrity = integrity;
    return this;
  }

  setHttpKeepalive(keepalive: boolean): HttpRequestBuilder {
    this.keepalive = keepalive;
    return this;
  }

  setHttpMode(mode: RequestMode): HttpRequestBuilder {
    this.mode = mode;
    return this;
  }

  setHttpRedirect(redirect: RequestRedirect): HttpRequestBuilder {
    this.redirect = redirect;
    return this;
  }

  setHttpWindow(window: any): HttpRequestBuilder {
    this.window = window;
    return this;
  }

  setHttpSignal(signal: AbortSignal): HttpRequestBuilder {
    this.signal = signal;
    return this;
  }

  setHttpReferrer(referrer: string): HttpRequestBuilder {
    this.referrer = referrer;
    return this;
  }

  setHttpReferrerPolicy(referrerPolicy: ReferrerPolicy): HttpRequestBuilder {
    this.referrerPolicy = referrerPolicy;
    return this;
  }

  execute(): HttpRequest {
    const { url, http, ...options } = this;
    return http.request(url, options);
  }
}
