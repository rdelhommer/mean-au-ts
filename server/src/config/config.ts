import { ConnectionOptions } from 'mongoose';
import * as NodeGeocoder from 'node-geocoder'
import * as winston from 'winston';
import { DefaultConfig } from 'config/default';
import { ProductionConfig } from 'config/production';
import { SharedConfig } from 'mean-au-ts-shared';

export namespace Interfaces {
  export interface ISendGrid {
    from: string
    apiToken: string
  }

  export interface IAuth {
    isSignupDisabled: boolean
    jwtSecret: string
    jwtLifetime: number
    domain: string
    resetPasswordLifetimeHours: number
  }

  export interface IUsername {
    illegalUsernames: string[]
  }

  export interface IExpress {
    host: string
    port: number
    public: string
  }

  export interface IGeocoder extends NodeGeocoder.Options { }

  export interface IMongo {
    host: string
    port: number
    db: string
    uri: string
    debug: string | boolean
    options?: ConnectionOptions
    seed: boolean
  }

  export interface Generator {
    gallonsPerBucket: number
    gallonsPerCart: number
  }

  export interface ILogger {
    level: winston.NPMLoggingLevel | 'build';
  }

  export interface IConfig {
    sendGrid: ISendGrid
    auth: IAuth
    username: IUsername
    express: IExpress
    geocoder: IGeocoder
    mongo: IMongo
    generator: Generator
    logger: ILogger
    shared: {
      app: SharedConfig.ISharedAppConfig
    }
  }
}

let EnvConfig = DefaultConfig;
switch (process.env.NODE_ENV) {
  case 'production':
    EnvConfig = ProductionConfig
    break;
  default:
    break;
}

export const config: Interfaces.IConfig = new EnvConfig();
