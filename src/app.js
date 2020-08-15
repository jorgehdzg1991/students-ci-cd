import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import HelloController from './controllers/HelloController';

const app = express();
app.use(cors());
app.use(bodyParser.json());

HelloController.mountController(app);

export default app;
