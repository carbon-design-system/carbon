/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import useId from '../useId';

function TestComponent() {
  const id = useId();
  return <span>{id}</span>;
}

test('increments per-call', () => {
  const node = document.createElement('div');
  document.body.appendChild(node);

  const count = 3;
  const children = Array.from({ length: count }, (_, key) => (
    <TestComponent key={key} />
  ));

  act(() => {
    ReactDOM.render(<>{children}</>, node);
  });

  for (let i = 0; i < count; i++) {
    expect(node.childNodes[i].textContent).toBe(`${i + 1}`);
  }

  document.body.removeChild(node);
});
