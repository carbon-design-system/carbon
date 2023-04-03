/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { Column } from '../';

const prefix = 'cds';

describe('Column', () => {
  it('should support a custom element as the root node', () => {
    const { container } = render(<Column as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom className', () => {
    const { container } = render(<Column className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should pass un-used props to the top-level node that is rendered', () => {
    const { container } = render(<Column id="test" />);
    expect(container.firstChild).toHaveAttribute('id', 'test');
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
    expect(container.firstChild).toHaveClass(`${prefix}--col`);
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

  describe('next', () => {
    let Column;
    let Grid;
    let cleanup;
    let render;
    let screen;

    beforeEach(() => {
      jest.resetModules();
      const FeatureFlags = require('@carbon/feature-flags');
      FeatureFlags.enable('enable-css-grid');

      cleanup = require('@testing-library/react/pure').cleanup;
      render = require('@testing-library/react/pure').render;
      screen = require('@testing-library/react/pure').screen;
      Grid = require('../Grid').Grid;
      Column = require('../Column').default;
    });

    afterEach(() => {
      cleanup();
    });

    describe.each(['sm', 'md', 'lg', 'xlg', 'max'])('%s', (breakpoint) => {
      it.each([
        ['span', { span: 2 }, ['col-span-2']],
        ['span, offset', { span: 2, offset: 1 }, ['col-span-2', 'col-start-2']],
        ['span, start', { span: 2, start: 1 }, ['col-span-2', 'col-start-1']],
        ['span, end', { span: 2, end: 3 }, ['col-span-2', 'col-end-3']],
        ['start, end', { start: 1, end: 3 }, ['col-start-1', 'col-end-3']],
      ])(
        'should support %s in the breakpoint prop',
        (_name, input, expected) => {
          const props = {
            [breakpoint]: input,
          };
          render(
            <Grid>
              <Column data-testid="column" {...props} />
            </Grid>
          );
          const classes = expected.map((className) => {
            return `${prefix}--${breakpoint}:${className}`;
          });
          expect(screen.getByTestId('column')).toHaveClass(...classes);
        }
      );
    });
  });
});
