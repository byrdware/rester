/* Ignoring this in test code: */
/*   eslint-disable no-unused-vars */
/*   jshint unused: false */

var debug = require('debug')('test:server');
var http = require('http');
var express = require('express');
var createError = require('http-errors');
var uuid = require('uuid/v4');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var router = express.Router();

router.post('/user/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    var token = uuid();
    debug({login: {token: token}});
    req.app.set('token', token);
    res.json({ success: true, auth: true, token: token });
  } else {
    next(createError(401));
  }
});

router.get('/user/logout', function(req, res/* , next */) {
  req.app.set('token', undefined);
  res.json({ success: true });
});

router.use(function(req, res, next) {
  var token = req.header('x-access-token');
  debug({validate: {token: token}});
  if (!req.app.get('token') || token !== req.app.get('token')) {
    next(createError(403));
  } else {
    next();
  }
});

router.get('/', function(req, res/* , next */) {
  res.json({ success: true });
});

router.get('/:count', function(req, res/* , next */) {
  res.json({ success: true });
});

router.get('/search', function(req, res/* , next */) {
  res.json({ success: true });
});

router.post('/create', function(req, res/* , next */) {
  res.json({ success: true });
});

router.put('/update/:id', function(req, res/* , next */) {
  res.json({ success: true });
});

router.delete('/delete/:id', function(req, res/* , next */) {
  res.json({ success: true });
});

app.use('/', router);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  debug(`${err.name}: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    error: {
      status: err.status,
      type: err.name,
      message: err.message
    }
  });
});

var server = http.createServer(app);

module.exports = {
  server
};
