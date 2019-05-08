// Simple test to ensure the components can at least be loaded in Node.js
// Note: this test is *not* run by Jest because Jest's pollyfills mask some errors

'use strict';

var assert = require('assert');
var carbonComponentsReact = require('../lib');
assert(carbonComponentsReact);
console.log('server-side-rendering load test passed'); // eslint-disable-line no-console
