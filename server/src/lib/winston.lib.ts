import * as winston from "winston";
import { config } from "config/config";
const chalk = require('chalk');

class AppLogger extends winston.Logger {
  constructor(logLevel: winston.NPMLoggingLevel | 'build') {
    super({
      transports: [
        new (winston.transports.Console)({
          level: logLevel,
          timestamp: () => { 
            return `[${chalk.grey(new Date())}]`; 
          },
          colorize: true
        })
      ],
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        build: 5
      }
    }); 

    winston.addColors({ build: 'magenta' });
  }

  setLogLevel(newLevel) {
    this.transports.console.level = newLevel; 
  }
}

export const logger = new AppLogger(config.logger.level);
