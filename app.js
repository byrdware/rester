'use strict';

const debug = require('debug')('rester:app');
const async = require('async');
const path = require('path');
const request = require('superagent');
const now = require('performance-now');

class Rester {
  
  constructor() {
    this._xAccessToken = null;
    this._variables = {};
    this._results = {
      name: null,
      success: 0,
      failure: 0,
      errors: []
    };
  }

  // TODO: Refactor to allow partial matches, this is funky, and not good funky
  _substitute(vars, values) {
    debug({vars: vars, values: values});
    const count = values.length;
    var newValues = [];
    if (!vars || !Object.keys(vars).length) {
      newValues = values;
    } else if (values && typeof values === 'object' && Object.keys(values).length) {
      Object.keys(vars).forEach(key => {
        const re = new RegExp(`:${key}`, 'g');
        debug({re: re});
        for (var i = 0; i < count; i++) {
          debug({i: i, value: values[i], var: vars[key]});
          if (typeof newValues[i] === 'undefined') {        
            const val = values[i].replace(re, vars[key]);
            newValues[i] = val;
            debug({added: newValues[i]});
          } else {
            const val = newValues[i].match(re, vars[key]);
            if (val !== null) {
              newValues[i] = newValues[i].replace(re, vars[key]);
              debug({replaced: newValues[i]});
            }
          }
        }
      });
    }
    return newValues;
  }

  _getVariables(vars) {
    const variables = {};
    if (vars) {
      vars.forEach(v => {
        variables[v.key] = v.value;
      });
    }
    debug({variables: variables});
    return variables;
  }

  _getHeaders(hdrs) {
    const headers = {};
    if (hdrs) {
      hdrs.forEach(h => {
        if (h.key && h.key.length) {
          if (h.key === 'x-access-token' && this._xAccessToken) {
            headers[h.key] = this._xAccessToken;
          } else {
            headers[h.key] = h.value;
          }
        }
      });
    }
    if (this._xAccessToken && (Object.keys(headers).length < 1 || !headers['x-access-token'])) {
      headers['x-access-token'] = this._xAccessToken;
    }
    debug({headers: headers});
    return headers;
  }

  _getQuery(q) {
    const query = {};
    if (q) {
      q.forEach(v => {
        if (v.key && v.key.length) {
          query[v.key] = v.value;
        }
      });
    }
    debug({query: query});
    return query;
  }

  _getBody(raw) {
    var body = {};
    if (raw) {
      try {
        body = JSON.parse(raw);
      } catch (ex) {
        debug(`${ex.name}: ${ex.message}`);
      }
    }
    debug({body: body});
    return body;
  }

  _exec(test, log, callback) {
    const variables = this._getVariables(test.request.url.variable);
    const headers = this._getHeaders(test.request.header);
    const query = this._getQuery(test.request.url.query);
    const body = this._getBody(test.request.body && test.request.body.raw ? test.request.body.raw : null);

    const { url } = test.request;
    const uri = `${url.protocol}://${url.host[0]}:${url.port}/${this._substitute(variables, url.path).join('/')}`;

    log && log(`  ${test.name}`);
    
    request(test.request.method, uri)
      .timeout({
        response: 2000,
        deadline: 5000
      })
      .set(Object.keys(headers).length ? headers : undefined)
      .query(Object.keys(query).length ? query : undefined)
      .send(Object.keys(body).length ? body : undefined)
      .then(res => {
        if (res.status < 200 || res.status > 299) {
          this._results.failure++;
          var msg = `HTTP request failed with status code ${res.status}`;
          log && log(`    ${this._results.failure}) ${test.request.method} ${uri}`);
          log && log(`      ${msg}`);
          this._results.errors.push(new Error(msg));
          callback();
        } else {
          this._results.success++;
          if (res.body.auth && res.body.token) {
            this._xAccessToken = res.body.token;
          }
          // TODO: Extract user-defined properties and store in this._variables
          log && log(`    √ ${test.request.method} ${uri}`);
          callback();
        }
      })
      .catch(err => {
        this._results.failure++;
        log && log(`    ${this._results.failure}) ${test.request.method} ${uri}`);
        log && log(`      ${err.name}: ${err.message}`);
        this._results.errors.push(err);
        callback();
      });
  }

  run(fileName, testName, log, callback) {
    var test = null;

    try {
      test = require(fileName);
    } catch (ex) {
      log(`${ex.name}: ${ex.message}`);
      return false;
    }

    debug(test);
    this._results.name = test.info.name;

    const start = now();

    async.eachSeries(test.item, (item, itemDone) => {
      if (testName && testName.length && item.name !== testName) {
        itemDone();
      } else {
        this._exec(item, log, itemDone);
      }
    }, (err) => {
      const elapsed = (now()-start).toFixed(0);
      callback(err, this._results, elapsed);
    });

    return true;
  }

}

module.exports = new Rester();
