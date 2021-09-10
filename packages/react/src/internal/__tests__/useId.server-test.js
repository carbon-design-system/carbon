/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { useId } from '../useId';

describe('useId SSR', () => {
  it('should not generate an id on the server', () => {
    function Test() {
      const id = useId('test');
      return <span id={id}>test</span>;
    }
    const markup = renderToString(<Test />);
    expect(markup.indexOf('id="')).toBe(-1);
  });
});
