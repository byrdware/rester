/* eslint-env mocha */
/* jshint mocha: true */

'use strict';

const debug = require('debug')('rester:test');
const expect = require('chai').expect;
const app = require('../app.js');
const { server } = require('./server.js');

const port = 3369;

describe('Rester', function() {

  before(function(done) {
    debug({ server: server });
    server.listen(port);
    server.on('listening', () => {
      debug('server listening');
      done();
    });
    server.on('error', (err) => {
      debug(`${err.name}: ${err.message}`);
      done(err);
    });
  });

  after(function(done) {
    server.close(() => { done(); });
  });

  it('should substitute variables', function(done) {
    const vars = { num: 1, str: 'hello world', obj: { foo: 'bar' } };
    const values = [':num',':str',':obj',':foo'];
    const replaced = app._substitute(vars, values);
    expect(replaced[0]).to.equal('1');
    expect(replaced[1]).to.equal('hello world');
    expect(replaced[2]).to.equal('[object Object]');
    expect(replaced[3]).to.equal(':foo');
    done();
  });

  it('should gracefully handle empty or missing vars during substitution', function(done) {
    const values = [':num',':str',':obj',':foo'];
    const replaced = app._substitute(null, values);
    expect(replaced[0]).to.equal(':num');
    expect(replaced[1]).to.equal(':str');
    expect(replaced[2]).to.equal(':obj');
    expect(replaced[3]).to.equal(':foo');
    done();
  });

  it('should gracefully handle empty or missing values during substitution', function(done) {
    const vars = { num: 1, str: 'hello world', obj: { foo: 'bar' } };
    const replaced = app._substitute(vars, null);
    expect(replaced).to.be.an('array').and.to.be.empty;
    done();
  });

  it('should gracefully handle partial matches during substitution', function(done) {
    const vars = { num: 1, obj: { foo: 'bar' } };
    const values = [':num',':str',':obj',':foo'];
    const replaced = app._substitute(vars, values);
    expect(replaced[0]).to.equal('1');
    expect(replaced[1]).to.equal(':str');
    expect(replaced[2]).to.equal('[object Object]');
    expect(replaced[3]).to.equal(':foo');
    done();
  });

  it('should retrieve a variables object', function(done) {
    var vars = [{
      key: 'numResults',
      value: '10'
    },{
      key: 'id',
      value: 'uLAkVuFVWvLN1OGp21RQ'
    }];
    const variables = app._getVariables(vars);
    expect(variables.numResults).to.equal('10');
    expect(variables.id).to.equal('uLAkVuFVWvLN1OGp21RQ');
    done();
  });

  it('should retrieve a headers object', function(done) {
    var hdrs = [{
      key: 'Content-Type',
      value: 'application/json',
      type: 'text'
    },{
      key: 'x-access-token',
      value: null,
      type: 'text'
    }];
    app._xAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiY25AcGxhY2UuY29tIiwiZmlyc3ROYW1lIjoiQ2hhcmxlcyIsImxhc3ROYW1lIjoiTmVtb3kifSwiaWF0IjoxNTY2NTczMjAyLCJleHAiOjE1NjY1NzY4MDJ9.X81vTt4DsO5xtbxuMlY9QbtIJFbiTSBYR85_4ux3jjg';
    const headers = app._getHeaders(hdrs);
    expect(headers['Content-Type']).to.equal('application/json');
    expect(headers['x-access-token']).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiY25AcGxhY2UuY29tIiwiZmlyc3ROYW1lIjoiQ2hhcmxlcyIsImxhc3ROYW1lIjoiTmVtb3kifSwiaWF0IjoxNTY2NTczMjAyLCJleHAiOjE1NjY1NzY4MDJ9.X81vTt4DsO5xtbxuMlY9QbtIJFbiTSBYR85_4ux3jjg');
    done();
  });

  it('should retrieve a query object', function(done) {
    var q = [{
      key: 'title',
      value: 'Christine'
    },{
      key: 'author',
      value: 'Stephen King'
    }];
    const query = app._getQuery(q);
    expect(query.author).to.equal('Stephen King');
    expect(query.title).to.equal('Christine');
    done();
  });

  it('should retrieve a body object', function(done) {
    var raw =  '{\n\t"books": [{\n        "title": "Harry Potter",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },{\n        "title": "Harry Potter 2",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },\n    {\n        "title": "Harry Potter 3",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },\n    {\n        "title": "Harry Potter 4",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },\n    {\n        "title": "Cujo",\n        "author": "Stephen King",\n        "rating": 5,\n        "synopsis": "Beethoven gets rabies.",\n        "numPages": 250,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    }]\n}';
    var body = app._getBody(raw);
    expect(body.books).to.be.an('array');
    expect(body.books.length).to.equal(5);
    expect(body.books[0].title).to.equal('Harry Potter');
    expect(body.books[0].author).to.equal('JK Rowling');
    expect(body.books[0].rating).to.equal(5);
    expect(body.books[0].synopsis).to.equal('A young boy locked under some stairs escapes to a fake reality full of wizards.');
    expect(body.books[0].numPages).to.equal(500);
    expect(body.books[0].pubDate).to.equal('Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)');
    expect(body.books[0].cover).to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB');
    done();
  });

  it('should gracefully recover from malformed body objects', function(done) {
    var body = app._getBody('foo');
    expect(body).to.be.empty;
    body = app._getBody(undefined);
    expect(body).to.be.empty;
    body = app._getBody(this);
    expect(body).to.be.empty;
    done();
  });

  it('should run a single test', function(done) {
    var test = {
      name: 'Test test',
      request: {
        method: 'POST',
        header: [{
          key: 'Content-Type',
          name: 'Content-Type',
          value: 'application/json',
          type: 'text'
        }],
        body: {
          mode: 'raw',
          raw: '{\n\t"email": "nobody@nowhere.net",\n\t"password": "2lAokwCjazJo89R3tnKv9lWz83O"\n}'
        },
        url: {
          raw: 'http://localhost:3000/user/login',
          protocol: 'http',
          host: [ 'localhost' ],
          port: '3000',
          path: [ 'user', 'login' ]
        }
      },
      response: []
    };
    app._exec(test, null, done);
  });

  it('should run a suite of tests', function(done) {
    app.run('./test/test-suite.js', null, null, done);
  });

});
