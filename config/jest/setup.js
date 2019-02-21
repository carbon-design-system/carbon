'use strict';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

import { breakingChangesX } from '../../src/internal/FeatureFlags';

global.__DEV__ = true;

global.describeBreakingChangesXFeatures = (name, callback) => {
  if (!breakingChangesX) {
    describe(name, callback);
  } else {
    describe(name, () => {
      it('dummy', () => {});
    });
  }
};

require('../polyfills');

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
