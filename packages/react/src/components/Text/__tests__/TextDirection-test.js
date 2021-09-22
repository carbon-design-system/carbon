/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { TextDirection } from '../';
import { TextDirectionContext } from '../TextDirectionContext';

describe('TextDirection', () => {
  it('should set the direction in context', () => {
    const calls = [];

    function TestComponent() {
      const context = React.useContext(TextDirectionContext);
      calls.push(context);
      return null;
    }

    const getTextDirection = jest.fn();

    render(
      <TextDirection>
        <TestComponent />
        <TextDirection dir="rtl">
          <TestComponent />
        </TextDirection>
        <TextDirection getTextDirection={getTextDirection}>
          <TestComponent />
        </TextDirection>
      </TextDirection>
    );

    expect(calls[0]).toEqual({
      direction: 'auto',
      getTextDirection: {
        current: undefined,
      },
    });
    expect(calls[1]).toEqual({
      direction: 'rtl',
      getTextDirection: {
        current: undefined,
      },
    });
    expect(calls[2]).toEqual({
      direction: 'auto',
      getTextDirection: {
        current: getTextDirection,
      },
    });
  });
});
