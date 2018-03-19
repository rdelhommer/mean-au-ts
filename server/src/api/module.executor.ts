import { Request, Response, NextFunction } from 'express';
import { IResponseBuilder } from 'api/response-builder/response-builder.lib';
import { HandlerError } from 'api/handler.error';
import { logger } from 'lib/winston.lib';
import { GeneralDto, Utilities } from 'mean-au-ts-shared';
import { IRequestHandler, IAuthenticatedRequest } from 'application/request-handler';

export class ModuleExecutor {
  responseBuilder: IResponseBuilder

  execute<TRequestBody = any, TResponseData = void>(
    handler: IRequestHandler<TRequestBody, TResponseData>,
    ExpectedBody: new () => TRequestBody
  ) {
    return (req: IAuthenticatedRequest, res: Response) => {
      try {
        if (ExpectedBody) {
          // transform the request body into the expected type.
          // this discards any extra properties that are not desired.
          req.body = Utilities.castTo<TRequestBody>(req.body, ExpectedBody);
        }

        // handle the request
        handler.validate(req)
          .then(handler.execute)
          .then(responseData => {
            if (!this.responseBuilder) {
              return res.json(responseData);
            }
    
            return res.json(this.responseBuilder.buildResponse(req, responseData));
          }).catch((err: HandlerError) => {
            let body: GeneralDto.ErrorResponseBody;
            if (err.constructor === HandlerError) {
              body = {
                message: err.message
              }
    
              return res.status(err.httpCode || 500).send(body);
            }
    
            logger.error(err.message)
            logger.error(err.stack)
    
            body = {
              message: 'An error occurred'
            }
    
            return res.status(500).send(body)
          })
      } catch (err) {
          logger.error(err.message)
          logger.error(err.stack)
  
          return res.status(500).send({
            message: 'An error occurred'
          })
      }
    }
  }
}
