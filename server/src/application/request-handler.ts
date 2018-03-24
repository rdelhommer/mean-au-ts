import { IUserModel } from "data-model/user/user.model";
import { Request } from 'express';

export interface ITypedRequest<TBody> extends Request {
  body: TBody
}

export interface IAuthenticatedRequest<TBody> extends ITypedRequest<TBody> {
  user: IUserModel
}

export interface IRequestHandler<TRequestBody, TResponseData> {
  validate(req: IAuthenticatedRequest<TRequestBody>): Promise<IAuthenticatedRequest<TRequestBody>>
  execute(req: IAuthenticatedRequest<TRequestBody>): Promise<TResponseData>
}
