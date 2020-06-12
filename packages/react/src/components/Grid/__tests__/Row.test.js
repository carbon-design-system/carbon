/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { Row } from '../';

describe('Row', () => {
  afterEach(cleanup);

  it('should support a custom element as the root node', () => {
    const { container } = render(<Row as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom className', () => {
    const { container } = render(<Row className="test" />);
    expect(container.firstChild.classList.contains('test')).toBe(true);
  });

  it('should pass un-used props to the top-level node that is rendered', () => {
    const { container } = render(<Row id="test" />);
    expect(container.firstChild.getAttribute('id')).toBe('test');
  });

  it('should render `children` that are given', () => {
    const { container } = render(
      <Row>
        <span id="test">Test</span>
      </Row>
    );
    const testNode = container.querySelector('#test');
    expect(testNode).toBeInstanceOf(HTMLElement);
  });

  it('should support setting the condensed class through the `condensed` prop', () => {
    const { container } = render(<Row condensed />);
    expect(container.firstChild.className).toEqual(
      expect.stringContaining('row--condensed')
    );
  });
});
