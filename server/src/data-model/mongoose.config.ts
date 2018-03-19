import * as mongoose from 'mongoose'
import { Db } from 'mongodb';
import * as path from 'path'
import * as childProcess from 'child_process'
import * as fs from 'fs'
import { IUserModel } from 'data-model/user/user.model';
import { config } from 'config/config';
import { logger } from 'lib/winston.lib';
import { UserModel } from 'data-model/user/user.schema';

class Mongoose {
  db: Db
  
  get User(): mongoose.Model<IUserModel> {
    return UserModel;
  }

  loadModel<TModel extends mongoose.Document>(name: string, Schema: mongoose.Schema) {
    mongoose.model<TModel>(name, Schema);
  };

  connect(): Promise<any> {
    return new Promise(resolve => {
      return mongoose.connect(
        config.mongo.uri, 
        config.mongo.options, 
        (err) => {
          if (err) {
            logger.error('Could not connect to MongoDB!');
            logger.error(err.message);
            throw err;
          }

          mongoose.set('debug', config.mongo.debug);
          this.db = mongoose.connection.db;

          logger.info(`Connected to MongoDB at: ${config.mongo.uri}`)
          resolve();
        })
    })
  };

  disconnect(): Promise<void> {
    return mongoose.disconnect().then(() => {
      logger.info('Disconnected from MongoDB');
    })
  }

  seed() {
    if (!config.mongo.seed) return;

    let db = config.mongo.db;
    
    // drop the current db
    logger.debug(`MongoDB - Dropping database: ${db}`)
    childProcess.execSync(`mongo ${db} --eval "db.dropDatabase()"`);
    
    // seed it
    fs.readdirSync(path.join(process.cwd(), 'seed', )).forEach((f) => {
      let collection = f.split('.')[0];
      let command = `mongoimport -d ${db} -c ${collection} --file seed/${f}`
      logger.debug(`MongoDB - Seeding: ${db}/${collection}`)
      childProcess.execSync(command);
    });
  }
}

export const database = new Mongoose()