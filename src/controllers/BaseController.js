import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { sendResponse } from '../utils/response';

export default class BaseController {
  static basePath = '';

  app;

  constructor(app) {
    this.app = app;
    this.initialize();
  }

  // eslint-disable-next-line class-methods-use-this
  initialize() {
    throw new Error('Method not implemented. Please use a proper sub-class.');
  }

  static mountController() {
    throw new Error('Method not implemented. Please use a proper sub-class.');
  }

  // eslint-disable-next-line class-methods-use-this
  respond(res, status, data) {
    sendResponse(res, status, data);
  }

  // eslint-disable-next-line class-methods-use-this
  handleUnknownError(res, e) {
    console.error(e);
    sendResponse(res, INTERNAL_SERVER_ERROR, {
      message: e.message
    });
  }
}
