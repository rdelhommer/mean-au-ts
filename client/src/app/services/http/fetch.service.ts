import 'whatwg-fetch';
import { lazy, autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { IHttp } from './http.service';
import { buildQueryString } from 'aurelia-path';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { GeneralDto } from 'mean-au-ts-shared';
import * as toastr from 'toastr';
import { Router } from 'aurelia-router';

enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

@autoinject
export class Fetch implements IHttp{
  constructor(
    private httpClient: HttpClient,
    private requestInterceptor: RequestInterceptor,
    private responseInterceptor: ResponseInterceptor
  ) {
    this.configure();
  }

  private configure() {
    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request: this.requestInterceptor.run.bind(this.requestInterceptor),
          response: this.responseInterceptor.run.bind(this.responseInterceptor)
        });

        return config;
    });
  }

  private sendRequest(url: string, method: string, body?: object): Promise<GeneralDto.SuccessResponseBody> {
    return this.httpClient.fetch(url, {
      method: method,
      body: body ? json(body) : undefined
    }).then((response: Response) => {
      return response.json();
    }).catch((response: Response) => {
      return response.json().then((body: GeneralDto.ErrorResponseBody) => {
        toastr.error(body.message)
        throw new Error(body.message)
      })
    });
  }

  get(url: string, params?: object): Promise<GeneralDto.SuccessResponseBody> {
    let stringifiedParams = buildQueryString(params);
    return this.sendRequest(`${url}${stringifiedParams}`, Methods.GET);
  }

  post(url: string, body?: object): Promise<GeneralDto.SuccessResponseBody> {
    return this.sendRequest(url, Methods.POST, body);
  }

  delete(url: string, body?: object): Promise<GeneralDto.SuccessResponseBody> {
    return this.sendRequest(url, Methods.DELETE, body);

  }

  put(url: string, body?: object): Promise<GeneralDto.SuccessResponseBody> {
    return this.sendRequest(url, Methods.PUT, body);

  }
}
