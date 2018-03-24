import { Interfaces } from "config/config";
import { SharedConfig } from "mean-au-ts-shared";

export class DefaultConfig implements Interfaces.IConfig {
  sendGrid: Interfaces.ISendGrid
  auth: Interfaces.IAuth;
  username: Interfaces.IUsername
  express: Interfaces.IExpress
  geocoder: Interfaces.IGeocoder
  mongo: Interfaces.IMongo
  generator: Interfaces.Generator
  logger: Interfaces.ILogger
  shared: {
    app: SharedConfig.ISharedAppConfig
  }

  constructor() {
    this.sendGrid = {
      apiToken: process.env.SENDGRID_API_KEY,
      from: 'beep-boop@mean-au-ts.net'
    }

    this.express = {
      host: 'localhost',
      port: 3030,
      public: '../public/'
    }

    this.auth = {
      isSignupDisabled: false,
      jwtSecret: '<CHANGE-THIS-TO-SOMETHING-SECRET>',
      // jwt expires after 30 minutes
      jwtLifetime: 30 * 60,
      domain: `http://${this.express.host}:${this.express.port}`,
      resetPasswordLifetimeHours: 24
    }

    this.username = {
      illegalUsernames: [
        'food2soil',
        'administrator',
        'password',
        'admin',
        'user',
        'unknown',
        'anonymous',
        'null',
        'undefined',
        'api'
      ]
    }

    this.mongo = {
      host: 'localhost',
      port: 27017,
      db: 'f2s',
      uri: '',
      debug: true,
      seed: process.env.MONGO_SEED === 'true'
    };

    this.mongo.uri = `mongodb://${this.mongo.host}:${this.mongo.port}/${this.mongo.db}`

    this.generator = {
      gallonsPerBucket: 6.5,
      gallonsPerCart: 12
    }

    this.geocoder = {
      provider: 'google',
      httpAdapter: 'https',
      apiKey: 'AIzaSyDZ3qachnbE0TYgkqQnYd1Vyx_GB7VEBDY',
      formatter: null
    }

    this.logger = {
      level: 'build'
    }

    this.shared = {
      app: SharedConfig.app
    }
  }
}
