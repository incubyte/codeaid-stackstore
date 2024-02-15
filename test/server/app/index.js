import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';

describe('CSRF Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
  });

  it('should return 404 for URLs with file extensions', (done) => {
    app.use(require('../middleware/csrf'));

    request(app)
      .get('/api/test.js')
      .expect(404)
      .end(done);
  });

  it('should call next for URLs without file extensions', (done) => {
    const next = sinon.spy();
    app.use(require('../middleware/csrf'));

    request(app)
      .get('/api/test')
      .end(() => {
        expect(next.called).to.be.true;
        done();
      });
  });

  it('should return index.html for all other URLs', (done) => {
    app.use(require('../middleware/csrf'));

    request(app)
      .get('/api/test')
      .expect('Content-Type', 'text/html')
      .expect(200)
      .end(done);
  });
});