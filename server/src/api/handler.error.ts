export class HandlerError extends Error {
  constructor(public httpCode: number, message: string) {
    super(message)
  }

  static fromError(httpCode: number, err: Error): HandlerError {
    return Object.assign(new HandlerError(httpCode, err.message), err);
  }
}