import expect from 'expect';
import sinon from 'sinon';
import request from 'supertest';
import { OK } from 'http-status-codes';
import app from '../src/app';

describe('app tests', () => {
  let sandbox;

  const environment = {};

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    sandbox.stub(process, 'env').value(environment);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should say hello', done => {
    request(app)
      .get('/api/hello')
      .expect('Content-Type', /json/)
      .expect(OK)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          const { body } = res;
          expect(body.hello).toBe('world');
          done();
        }
      });
  });
});
