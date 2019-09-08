import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { uptimeMonitoring } from './middlewares/uptime_monitoring';
import { errorHandler } from './middlewares/error_handler';
import { BaseModel, FilmModel } from './models';
import connect from './database';

const port = process.env.PORT ? process.env.PORT : 30000;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.text());
app.use(cors());
app.use(morgan('dev'));

app.use('/health', uptimeMonitoring);

const listen = async () => {
  try {
    const db = await connect();
    if (db) console.log('\x1b[33mConnection with database established', '\x1b[0m');

    app.set('baseModel', new BaseModel(db));
    app.set('filmModel', new FilmModel(db));

    const listening = await app.listen(port);
  
    if (listening) console.log(`\x1b[33mAPI listening on localhost: ${port} \x1b[0m`);
    
    app.use('/v1', routes);
    app.use(errorHandler);
  
    return listen;
  } catch (err) {
    throw err;
  }
};

listen().catch(err => {
  console.error(err.message);
  process.exit(1);
});

export default app;
