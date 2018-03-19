import { Enums } from "..";

export namespace GeneralDto {
  export class SuccessResponseBody<T = any> {
    handledAs: Enums.UserRoles = undefined
    data: T = undefined
    token?: string = undefined
  }
  
  export class ErrorResponseBody {
    message: string = undefined
  }
  
  export class ReadQuery {
    id: string = undefined
  }
}
