/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { useDeprecatedImport } from '../useDeprecatedImport';

describe('useDeprecatedImport', () => {
  const oldEnv = process.env.NODE_ENV;
  const oldError = console.error;
  const errorSpy = jest.fn();
  const message = 'Import is wrong';

  function Test() {
    useDeprecatedImport(message);
    return <span>test</span>;
  }

  beforeEach(() => {
    console.error = errorSpy;
  });

  afterEach(() => {
    errorSpy.mockReset();
    process.env.NODE_ENV = oldEnv;
    console.error = oldError;
    cleanup();
  });

  it('should not throw import error on production', () => {
    process.env.NODE_ENV = 'production';

    render(<Test />);

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should throws import error on not-production', () => {
    process.env.NODE_ENV = 'not-production';

    render(<Test />);

    expect(errorSpy).toHaveBeenCalledWith(message);
  });
});
