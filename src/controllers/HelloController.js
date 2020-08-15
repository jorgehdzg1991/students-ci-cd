import { OK } from 'http-status-codes';
import { respond } from '../utils/response';
import BaseController from './BaseController';

export default class HelloController extends BaseController {
  static basePath = '/api/hello';

  static mountController(app) {
    return new HelloController(app);
  }

  initialize() {
    this.app.get(HelloController.basePath, HelloController.sayHello);
  }

  static sayHello(req, res) {
    respond(res, OK, { hello: 'world' });
  }
}
