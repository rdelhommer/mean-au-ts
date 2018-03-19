import * as jsonwebtoken from 'jsonwebtoken';
import * as cron from 'cron';
import { cronjobber } from 'lib/cron.lib';
import { logger } from 'lib/winston.lib';

class JwtBlacklist {
  // Key = token, Value = expiration
  private blacklist: Map<string, number> = new Map<string, number>();
  private JWT_BLACKLIST_CLEAR_JOB_NAME = 'jwt-blacklist-clear';
  private maxBlacklistLength = 1000000;

  constructor() { 
    // Remove expired tokens every 5 minutes
    cronjobber.startJob(
      '0 */5 * * * * ',
      this.removeExpiredTokens.bind(this),
      this.JWT_BLACKLIST_CLEAR_JOB_NAME);
  }

  isBlacklisted(token: string) {
    return this.blacklist.has(token);
  }

  addToBlacklist(token: string) {
    if (this.blacklist.has(token)) return;

    try {
      let decoded = <any>jsonwebtoken.decode(token);
      if (!decoded) return;

      this.blacklist.set(token, decoded.exp * 1000)

      logger.info(`Added JWT to blacklist - size: ${this.blacklist.size}`)
      if (this.blacklist.size < this.maxBlacklistLength) return;

      // Remove the oldest key in the blacklist if it's too big
      this.blacklist.delete(this.blacklist.keys().next().value)
    } catch (error) {
      logger.error(`Failed to add token to blacklist`)
      logger.error(error.message)
      logger.error(error.stack)
    }
  }

  removeExpiredTokens(): Promise<void> {
    return new Promise((resolve) => {
      let now = Date.now();

      let numDeleted = 0;
      this.blacklist.forEach((v, k) => {
        if (v > now) return;

        numDeleted++;
        this.blacklist.delete(k);
      });

      if (numDeleted > 0) {
        logger.info(`Deleted ${numDeleted} expired JWTs`);
      }

      return resolve();
    });
  }
}

export const jwtBlacklist = new JwtBlacklist();
