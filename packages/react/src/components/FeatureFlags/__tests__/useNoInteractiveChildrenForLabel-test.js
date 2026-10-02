/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React, { useRef } from 'react';
import { useNoInteractiveChildrenForLabel } from '../useNoInteractiveChildrenForLabel';

const validationMessage =
  'The TestComponent `labelText` prop must have no interactive content';

const TestComponent = () => {
  const ref = useRef(null);
  useNoInteractiveChildrenForLabel(ref, validationMessage);

  return (
    <label ref={ref}>
      Label <button type="button">Help</button>
    </label>
  );
};

describe('useNoInteractiveChildrenForLabel', () => {
  it('throws when using interactive content in label', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      expect(() => render(<TestComponent />)).toThrow(validationMessage);
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Error: ${validationMessage}`)
      );
    } finally {
      spy.mockRestore();
      errorSpy.mockRestore();
    }
  });
});
