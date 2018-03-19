import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { logger } from 'lib/winston.lib';
import { config } from 'config/config';
import { authRouter } from 'api/auth/auth.router';
import { cleanJwtIfBlacklisted, authenticate, authWorkflow } from 'application/auth/strategies/jwt.strategy';
import { meRouter } from 'api/me/me.router';

class App {
  private express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.staticContent();
    this.apiRoutes();
  }

  start() {
    const server = http.createServer(this.express);
    server.on('error', (err: Error) => {
      logger.error('Could not start server to due the following error')
      logger.error(err.message);
    });

    server.on('listening', () => {
      logger.info(`Started server at ${config.express.host}:${config.express.port}`)
    });

    server.listen(config.express.port, config.express.host);
  }

  private middleware(): void {
    // logger
    this.express.use(morgan('dev'));

    // body parser
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    // Authentication
    this.express.use(/\/api\/(?!auth).*/, authWorkflow);
  }

  private staticContent() {
    this.express.use('/', express.static(path.resolve('./dist/public')));
  }

  private apiRoutes(): void {
    this.express.use('/api/auth', authRouter);
    this.express.use('/api/me', meRouter);
  }
}

export const appRouter = new App();