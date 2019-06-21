/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

global.__DEV__ = true;

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  // TODO: replace with async version
  // setTimeout(callback);
  callback();
};

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
