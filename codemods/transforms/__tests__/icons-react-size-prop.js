/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

describe('icons-react-size-prop', () => {
  let mock;

  beforeEach(() => {
    mock = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    mock.mockRestore();
  });

  defineTest(
    __dirname,
    'icons-react-size-prop',
    {
      printOptions: {
        quote: 'single',
      },
    },
    'icons-react-size-prop-rename',
    {
      parser: 'babylon',
    }
  );

  defineTest(
    __dirname,
    'icons-react-size-prop',
    {
      printOptions: {
        quote: 'single',
      },
    },
    'icons-react-size-prop-with-prop',
    {
      parser: 'babylon',
    }
  );

  defineTest(
    __dirname,
    'icons-react-size-prop',
    {
      printOptions: {
        quote: 'single',
      },
    },
    'icons-react-size-prop-object-key',
    {
      parser: 'babylon',
    }
  );
});
