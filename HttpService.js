class HttpError extends Error {
  constructor({
    status = 500,
    statusText = '',
    url = '',
    type = '',
  }) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.type = type;
  }

  static throw(response) {
    if (!response.ok) {
      throw new HttpError(response,);
    }
  }
}

class Request {
  constructor(url, option) {
    const controller = new AbortController();
    const { signal } = controller;
    this.innerPromise = new Promise((resolve, reject) => {
      fetch(url, {
        signal,
        ...option,
      }).then(response => {
        HttpError.throw(response);
        resolve(response.json());
      })
    });
    this.controller = controller;
  }

  abort() {
    this.controller.abort();
    return this;
  }

  then(onFulfilled, onRejected) {
    this.innerPromise.then(onFulfilled, onRejected);
    return this;
  }

  catch(onrejected) {
    this.innerPromise.catch(onrejected);
    return this;
  }

  finally(onFinally) {
    this.innerPromise.finally(onFinally);
    return this;
  }
}

class HttpService {
  static METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  };

  static MODES = {
    NO_CORS: 'no-cors',
    CORS: 'cors',
    SAME_ORIGIN: 'same-origin',
  };

  static HEADERS_KEYS = {
    CONTENT_TYPE: 'Content-Type'
  };

  static HEADERS_VALUES = {
    APPLICATION_JSON: 'application/json'
  };

  request(url, option = {
    method: HttpService.METHODS.GET,
    headers: new Headers({
      [HttpService.HEADERS_KEYS.CONTENT_TYPE]: HttpService.HEADERS_VALUES.APPLICATION_JSON,
    })
  }) {
    return new Request(url, option);
  }

  get(url, option) {
    return this.request(url, {
      method: HttpService.METHODS.GET,
      ...option,
    })
  }

  post(url, option) {
    return this.request(url, {
      method: HttpService.METHODS.POST,
      ...option,
    })
  }

  put(url, option) {
    return this.request(url, {
      method: HttpService.METHODS.PUT,
      ...option,
    })
  }

  delete(url, option) {
    return this.request(url, {
      method: HttpService.METHODS.DELETE,
      ...option,
    })
  }

  patch(url, option) {
    return this.request(url, {
      method: HttpService.METHODS.PATCH,
      ...option,
    })
  }
}

class HttpRequest {
  constructor() {
    this.http = new HttpService();
    this.url = ''
    this.headers = new Headers();
    this.method = HttpService.METHODS.GET;
    this.body = null;
  }

  setHttpMethod(method) {
    this.method = method
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setHttpHeader(key, value) {
    this.headers.set(key, value);
  }

  setHttpHeaders(headers) {
    if (headers instanceof Headers) {
      this.headers = headers;
    } else {
      this.headers = new Headers(headers);
    }
    return this;
  }

  setHttpBody(body) {
    this.body = body;
    return this;
  }

  setHttpCache(cache) {
    this.cache = cache;
    return this;
  }

  setHttpCredentials(credentials) {
    this.credentials = credentials;
    return this;
  }

  setHttpIntegrity(integrity) {
    this.integrity = integrity;
    return this;
  }

  setHttpKeepalive(keepalive) {
    this.keepalive = keepalive;
    return this;
  }

  setHttpMode(mode) {
    this.mode = mode;
    return this;
  }

  setHttpRedirect(redirect) {
    this.redirect = redirect;
    return this;
  }

  setHttpWindow(window) {
    this.window = window;
    return this;
  }

  setHttpSignal(signal) {
    this.signal = signal
    return this;
  }

  setHttpReferrer(referrer) {
    this.referrer = referrer;
    return this;
  }

  setHttpReferrerPolicy(referrerPolicy) {
    this.referrerPolicy = referrerPolicy;
    return this;
  }

  execute() {
    const { url, http, ...options } = this;
    return http.request(url, options);
  }
}

const http = new HttpService();

http
.get('https://api.github.com/users/?page=0&per_page=20')
.then(console.log)
.abort();

new HttpRequest()
.setHttpMethod(HttpService.METHODS.GET)
.setUrl('https://api.github.com/users/?page=0&per_page=20')
.setHttpHeaders({
  [HttpService.HEADERS_KEYS.CONTENT_TYPE]: HttpService.HEADERS_VALUES.APPLICATION_JSON,
})
.execute()
.then(console.log);
