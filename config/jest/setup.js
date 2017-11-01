'use strict';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

require('../polyfills');

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-15');

// Configure enzyme to work with React 15 for now
enzyme.configure({ adapter: new Adapter() });

// Starting with React 16, we'll have to polyfill this in test environments.
global.requestAnimationFrame = function(callback) {
  callback();
};
