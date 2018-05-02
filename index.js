'use strict';

var zauth;
if (process.browser) {
  zauth = require('./lib/zauth-browserify');
} else {
  zauth = require('./lib/zauth-node');

  // add node-specific encrypt/decrypt
  zauth.encrypt = require('./lib/encrypt');
  zauth.decrypt = require('./lib/decrypt');
  zauth.middleware = require('./lib/middleware/zauth');
}

module.exports = zauth;
