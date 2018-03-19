import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { config } from 'config/config';
import { logger } from 'lib/winston.lib';
import { jwtBlacklist } from 'lib/jwt-blacklist.lib';

interface IJwtDecode {
  id: string
  iat: number
  exp: number
}

class Jwt {
  createToken(userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()):string {
    var payload = { id: userId };
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: config.auth.jwtLifetime
    });
  }

  refreshToken(oldToken: string): string {
    let decoded = <IJwtDecode>jwt.decode(oldToken);
    if (!decoded.id) {
      logger.warn(`Could not refresh token because no id: ${oldToken}`)
      return oldToken;
    }

    jwtBlacklist.addToBlacklist(oldToken);
    return this.createToken(new mongoose.Types.ObjectId(decoded.id));
  }

  decodeToken(token: string): IJwtDecode {
    return <IJwtDecode>jwt.decode(token);
  }
}

export const jsonwebtoken = new Jwt();
