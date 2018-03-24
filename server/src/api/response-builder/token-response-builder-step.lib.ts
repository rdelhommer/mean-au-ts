import { IResponseBuilderStep } from "api/response-builder/response-builder-step.lib";
import { jsonwebtoken } from "lib/jsonwebtoken.lib";
import { getTokenFromRequest } from "application/auth/strategies/jwt.strategy";
import { GeneralDto } from "mean-au-ts-shared";
import { IAuthenticatedRequest } from "application/request-handler";

export class TokenResponseBuilderStep implements IResponseBuilderStep {
  pipe(response: GeneralDto.SuccessResponseBody, req: IAuthenticatedRequest<void>): GeneralDto.SuccessResponseBody {
    if (!req.user || req.user.isAnonymous()) {
      return response;
    }

    if (req.route.path === '/signin' || req.route.path === '/signup') {
      // Create a new token
      response.token = jsonwebtoken.createToken(req.user.id)
    } else {
      // Refresh the current request's token
      response.token = jsonwebtoken.refreshToken(getTokenFromRequest(req));
    }

    return response;
  }
}
