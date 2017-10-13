'use strict';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

require('../polyfills');

// Starting with React 16, we'll have to polyfill this in test environments.
global.requestAnimationFrame = function(callback) {
  callback();
};
