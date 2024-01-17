import express from 'express';
import session from 'express-session';
import request from 'supertest';
import app from './app'; // assuming the code provided is in a file named app.js

describe('Session Middleware', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should set the domain attribute in the session cookie', async () => {
    const response = await request(server).get('/session');
    expect(response.headers['set-cookie']).toContain('domain=example.com');
  });
});