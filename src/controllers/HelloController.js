import { OK } from 'http-status-codes';
import BaseController from './BaseController';

export default class HelloController extends BaseController {
  static basePath = '/api/hello';

  static mountController(app) {
    return new HelloController(app);
  }

  initialize() {
    this.app.get(HelloController.basePath, this.sayHello.bind(this));
  }

  sayHello(req, res) {
    this.respond(res, OK, { hello: 'world' });
  }
}
