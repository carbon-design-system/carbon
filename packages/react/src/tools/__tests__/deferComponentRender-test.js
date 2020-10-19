/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { deferComponentRender } from '../deferComponentRender';

jest.useFakeTimers();

function TestComponent() {
  return <div data-testid="test">test</div>;
}

describe('deferComponentRender', () => {
  let mountNode;

  beforeEach(() => {
    mountNode = document.createElement('div');
  });

  it('should defer rendering the deferred component on the client', () => {
    const Deferred = deferComponentRender(TestComponent);
    ReactDOM.render(<Deferred />, mountNode);
    expect(mountNode.querySelector('[data-testid="test"]')).toBe(null);

    act(() => {
      jest.runAllTimers();
      jest.runAllTimers();
    });

    const testNode = mountNode.querySelector('[data-testid="test"]');
    expect(testNode).toBeTruthy();
    expect(testNode.textContent).toBe('test');
  });
});
