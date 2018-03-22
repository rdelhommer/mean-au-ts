import { Request, Response, NextFunction } from 'express';
import { database } from 'data-model/mongoose.config';
import { jwtBlacklist } from 'lib/jwt-blacklist.lib';
import { logger } from 'lib/winston.lib';
import { jsonwebtoken } from 'lib/jsonwebtoken.lib';
import { IUserModel } from 'data-model/user/user.model';
import { Enums } from 'mean-au-ts-shared';

export const authWorkflow = [
  checkJwtExpired,
  cleanJwtIfBlacklisted,
  authenticate
]

// Literally just pipe the found user - or dummy public user - along
// DTO masks prevent users from seeing sensitive data beyond their access level (i.e. role)
// Certain routes are protected by role (see module.router.ts - restrictToRoles())
export function authenticate(req: Request, res: Response, next: NextFunction) {
  // Extract and decode the token from our request
  let token = getTokenFromRequest(req);
  let decoded = jsonwebtoken.decodeToken(token);

  // Add a default anonymous user that will be overriden by the authentication
  req.user = new database.User({
    roles: [Enums.UserRoles.Anonymous]
  });

  // Return with the anonymous user if there's no token
  if (!decoded || !decoded.id) return next();

  database.User.findById(decoded.id)
    .then(user => {
      if (user) {
        // Assign the user associated with the token to the request
        req.user = user;
      }

      return next();
    })
    .catch(err => {
      logger.error(err.message)
      logger.error(err.stack)

      return res.status(500).json({
        message: 'An error occurred while authenticating your request'
      })
    });
};

export function getTokenFromRequest(req: Request): string | undefined {
  if (!req.headers.authorization) return;

  return req.headers.authorization.toString().substring(4);
}

export function checkJwtExpired(req: Request, res: Response, next: NextFunction) {
  let token = getTokenFromRequest(req);
  let decoded = jsonwebtoken.decodeToken(token);

  if (decoded && decoded.exp * 1000 < Date.now()) {
    return res.status(401).send({
      message: 'Your login session has expired. Please sign in again.'
    })
  }

  return next();
}

// removes blacklisted tokens from the request header
export function cleanJwtIfBlacklisted(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) return next();

  let token = getTokenFromRequest(req);
  if (jwtBlacklist.isBlacklisted(token)) {
    let decoded = jsonwebtoken.decodeToken(token);
    logger.warn(`Request received with blacklisted token for user: ${decoded.id}`)
    delete req.headers.authorization;
  }

  return next();
}
