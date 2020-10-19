/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { deferComponentRender } from '../deferComponentRender';

function TestComponent() {
  return 'test';
}

describe('deferComponentRender.server', () => {
  it('should render the deferred component on the server', () => {
    const Deferred = deferComponentRender(TestComponent);
    const html = renderToString(<Deferred />);
    expect(html).toEqual('test');
  });
});
