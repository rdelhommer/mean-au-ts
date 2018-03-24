import 'aurelia-polyfills';
import { database } from "data-model/mongoose.config";
import { appRouter } from "api/express.config";

database.connect()
  .then(() => {
    database.seed();
    appRouter.start();
  })
