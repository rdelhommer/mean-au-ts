import { Request, Response } from "express";
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { getTokenFromRequest } from "application/auth/strategies/jwt.strategy";
import { jwtBlacklist } from "lib/jwt-blacklist.lib";
import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";

class SignOutHandler implements IRequestHandler {
    validate(req: IAuthenticatedRequest<any>): Promise<IAuthenticatedRequest<any>> {
        return Promise.resolve(req);
    }

    execute(req: IAuthenticatedRequest<any>): Promise<void> {
        // Blacklist the token from this request
        jwtBlacklist.addToBlacklist(getTokenFromRequest(req));
        delete req.user;

        return Promise.resolve();
    }
}

export const signOutHandler = new SignOutHandler();
