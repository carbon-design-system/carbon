'use strict';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

global.__DEV__ = true;

require('../polyfills');

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
