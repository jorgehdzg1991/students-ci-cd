import { OK } from 'http-status-codes';
import { respond } from '../utils/response';
import Controller from '../models/Controller';

export default class HelloController extends Controller {
  static basePath = '/api/hello';

  static mountController(app) {
    return new HelloController(app);
  }

  initialize() {
    this.app.get(HelloController.basePath, HelloController.sayHello);
  }

  static sayHello(req, res) {
    try {
      respond(res, OK, { hello: 'world' });
    } catch (e) {
      HelloController.handleUnknownError(res, e);
    }
  }
}
