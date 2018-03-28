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
import { ResponseErrorInterceptor } from './interceptors/response-error.interceptor';

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
    private responseInterceptor: ResponseInterceptor,
    private responseErrorInterceptor: ResponseErrorInterceptor
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
          response: this.responseInterceptor.run.bind(this.responseInterceptor),
          responseError: this.responseErrorInterceptor.run.bind(this.responseErrorInterceptor),
        });

        return config;
    });
  }

  private sendRequest(url: string, method: string, body: object, toastError: boolean = true): Promise<GeneralDto.SuccessResponseBody> {
    return this.httpClient.fetch(url, {
      method: method,
      body: body ? json(body) : undefined
    }).then((response: Response) => {
      return response.json();
    }).catch((error: Error) => {
      if (toastError) {
        toastr.error(error.message)
      }

      throw error;
    });
  }

  get(url: string, params?: object, toastError: boolean = true): Promise<GeneralDto.SuccessResponseBody> {
    let stringifiedParams = buildQueryString(params);
    return this.sendRequest(`${url}?${stringifiedParams}`, Methods.GET, null, toastError);
  }

  post(url: string, body?: object, toastError: boolean = true): Promise<GeneralDto.SuccessResponseBody> {
    return this.sendRequest(url, Methods.POST, body, toastError);
  }

  delete(url: string, body?: object, toastError: boolean = true): Promise<GeneralDto.SuccessResponseBody> {
    return this.sendRequest(url, Methods.DELETE, body, toastError);

  }

  put(url: string, body?: object, toastError: boolean = true): Promise<GeneralDto.SuccessResponseBody> {
    return this.sendRequest(url, Methods.PUT, body, toastError);

  }
}
