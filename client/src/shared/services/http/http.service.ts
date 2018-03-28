import { GeneralDto } from "mean-au-ts-shared";

export abstract class IHttp {
  abstract get(url: string, params?: object, toastError?: boolean): Promise<GeneralDto.SuccessResponseBody>;
  abstract post(url: string, body?: object, toastError?: boolean): Promise<GeneralDto.SuccessResponseBody>;
  abstract delete(url: string, body?: object, toastError?: boolean): Promise<GeneralDto.SuccessResponseBody>;
  abstract put(url: string, body?: object, toastError?: boolean): Promise<GeneralDto.SuccessResponseBody>;
}
