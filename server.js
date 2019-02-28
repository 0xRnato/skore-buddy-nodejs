const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

require('./config/loadEnv')();

const Logger = require('./helpers/logger');
const webhookRoute = require('./routes/webhook');

const app = express();
const logger = new Logger();

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err}`);
});

process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled Rejection at: ${p} - reason: ${reason}`);
});

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(helmet());
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization',
  );
  next();
});

app.post('/webhook', webhookRoute);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  else {
    logger.info(
      `Server online - http://localhost:${process.env.PORT} - Env: ${
        process.env.NODE_ENV
      }`,
    );
  }
});
