import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import router from './api';

// Create Express server
const app = express();

app.set('port', 4200);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorHandler());

export default app;
