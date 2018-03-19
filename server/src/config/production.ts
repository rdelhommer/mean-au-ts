import { DefaultConfig } from "config/default";

export class ProductionConfig extends DefaultConfig {
  constructor() {
    super();

    // PRODUCTION CONFIG OVERRIDES
    this.express.host = process.env.HOST
    this.express.port = Number(process.env.PORT)
    
    this.mongo.uri = process.env.MONGODB_URI;
    this.mongo.debug = false;

    this.logger.level = 'info';
  }
}
