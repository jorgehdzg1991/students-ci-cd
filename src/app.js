import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import HelloController from './controllers/HelloController';
import StudentsController from './controllers/StudentsController';

const app = express();
app.use(cors());
app.use(bodyParser.json());

HelloController.mountController(app);
StudentsController.mountController(app);

export default app;
