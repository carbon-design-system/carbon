/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React, { useRef } from 'react';
import { FeatureFlags } from '../index';
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
  it('warns without throwing in v11', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).not.toThrow();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(`Warning: ${validationMessage}`)
    );

    spy.mockRestore();
  });

  it('throws when the v12 release flag is enabled', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(
        <FeatureFlags enableV12Release>
          <TestComponent />
        </FeatureFlags>
      )
    ).toThrow(validationMessage);

    spy.mockRestore();
  });
});
