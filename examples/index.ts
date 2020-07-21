import {
  HttpService,
  HttpRequest,
  HttpError,
  HttpRequestBuilder,
} from '../lib';

// HttpService

const http: HttpService = new HttpService();

const request: HttpRequest = http.get(
  `https://api.github.com/users?${
    HttpService.serializeQueryParams({
      page: 0,
      per_page: 20,
    })}
  `,
)
  .then(res => res.json())
  .then(response => {
    console.log(response);
  })
  .catch(({
    message,
    status,
    url,
  }: HttpError) => {
    console.log(message);
    console.log(status);
    console.log(url);
  });

if ('when need') {
  request.abort();
}

// HttpRequestBuilder

const requestBuilder: HttpRequestBuilder = new HttpRequestBuilder()
  .setHttpMethod('GET')
  .setUrl(
    `https://api.github.com/users?${
      HttpService.serializeQueryParams({
        page: 0,
        per_page: 20,
      })}
    `,
  )
  .setHttpCredentials('same-origin')
  .setHttpCache('no-cache')
  .setHttpHeaders({
    'Content-Type': 'application/json',
  })
  .setHttpHeader('Authorization', 'Bearer access_token');

const requestByBuilder: HttpRequest = requestBuilder.execute();
