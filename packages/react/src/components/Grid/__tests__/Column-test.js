/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import { settings } from 'carbon-components';
import React from 'react';
import { Column } from '../';

const { prefix } = settings;

describe('Column', () => {
  afterEach(cleanup);

  it('should support a custom element as the root node', () => {
    const { container } = render(<Column as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom className', () => {
    const { container } = render(<Column className="test" />);
    expect(container.firstChild.classList.contains('test')).toBe(true);
  });

  it('should pass un-used props to the top-level node that is rendered', () => {
    const { container } = render(<Column id="test" />);
    expect(container.firstChild.getAttribute('id')).toBe('test');
  });

  it('should render `children` that are given', () => {
    const { container } = render(
      <Column>
        <span id="test">Test</span>
      </Column>
    );
    const testNode = container.querySelector('#test');
    expect(testNode).toBeInstanceOf(HTMLElement);
  });

  it('should default to rendering a column that auto-spans', () => {
    const { container } = render(<Column />);
    expect(container.firstChild.classList.contains(`${prefix}--col`)).toBe(
      true
    );
  });

  it('should set the column span per breakpoint with a number', () => {
    const breakpoints = ['sm', 'md', 'lg', 'xlg', 'max'];
    const spans = [1, 2, 3, 4, 5];
    const props = {};

    for (let i = 0; i < breakpoints.length; i++) {
      const name = breakpoints[i];
      props[name] = spans[i];
    }

    const { container } = render(<Column {...props} />);
    const { firstChild: column } = container;

    for (let i = 0; i < column.classList.length; i++) {
      const name = breakpoints[i];
      const span = spans[i];
      const className = column.classList[i];
      expect(className).toEqual(expect.stringContaining(`col-${name}-${span}`));
    }
  });

  it('should set the column span to auto if a boolean is set to true for a breakpoint', () => {
    const breakpoints = ['sm', 'md', 'lg', 'xlg', 'max'];
    const props = {};

    for (let i = 0; i < breakpoints.length; i++) {
      const name = breakpoints[i];
      props[name] = true;
    }

    const { container } = render(<Column {...props} />);
    const { firstChild: column } = container;
    for (let i = 0; i < column.classList.length; i++) {
      const name = breakpoints[i];
      const className = column.classList[i];
      expect(className).toEqual(expect.stringContaining(`col-${name}`));
    }
  });

  it.each(['sm', 'md', 'lg', 'xlg', 'max'])(
    'should support specifying column span and offset as an object for breakpoint %s',
    (breakpoint) => {
      const { container } = render(
        React.createElement(Column, {
          [breakpoint]: {
            span: 1,
            offset: 1,
          },
        })
      );
      expect(container.firstChild.className).toEqual(
        expect.stringContaining(`col-${breakpoint}-1`)
      );
      expect(container.firstChild.className).toEqual(
        expect.stringContaining(`offset-${breakpoint}-1`)
      );
    }
  );
});
