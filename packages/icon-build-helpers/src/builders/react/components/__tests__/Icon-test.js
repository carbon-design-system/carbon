/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'react-dom';
import Icon from '../Icon';

describe('Icon', () => {
  let mountNode;

  beforeEach(() => {
    mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
  });

  afterEach(() => {
    mountNode.parentNode.removeChild(mountNode);
  });

  it('should render', () => {
    expect(() => {
      render(
        <Icon width={16} height={16} viewBox="0 0 16 16">
          <circle cx={8} cy={8} r={8} />
        </Icon>,
        mountNode
      );
    }).not.toThrow();
  });

  it('should treat focusable as a string', () => {
    render(
      <Icon width={16} height={16} viewBox="0 0 16 16">
        <circle cx={8} cy={8} r={8} />
      </Icon>,
      mountNode
    );

    const getContainer = () => mountNode.querySelector('svg');
    expect(getContainer().getAttribute('focusable')).toBe('false');

    render(<Icon focusable />, mountNode);
    expect(getContainer().getAttribute('focusable')).toBe('true');
  });

  it('should forward refs to the rendered SVG DOM element', () => {
    let svg;
    const ref = jest.fn((node) => {
      svg = node;
    });
    render(<Icon ref={ref} />, mountNode);
    expect(svg).toEqual(mountNode.querySelector('svg'));
  });

  it('should be focusable if an aria label and tab index is used', () => {
    const getContainer = () => mountNode.querySelector('svg');

    // Test without a tabIndex, should not be focusable
    render(
      <Icon width={16} height={16} viewBox="0 0 16 16" aria-label="Mock icon">
        <circle cx={8} cy={8} r={8} />
      </Icon>,
      mountNode
    );

    expect(getContainer().getAttribute('aria-label')).toBeDefined();
    getContainer().focus();
    expect(document.activeElement === getContainer()).toBe(false);

    // Test without aria-label and with tabIndex, should not be focusable
    // because we require a label in that case
    render(
      <Icon width={16} height={16} viewBox="0 0 16 16" tabIndex="0">
        <circle cx={8} cy={8} r={8} />
      </Icon>,
      mountNode
    );

    expect(getContainer().getAttribute('aria-label')).toBeDefined();
    getContainer().focus();
    expect(document.activeElement === getContainer()).toBe(false);

    // Test with aria-label and tabIndex, should be focusable
    render(
      <Icon
        width={16}
        height={16}
        viewBox="0 0 16 16"
        aria-label="Mock icon"
        tabIndex="0">
        <circle cx={8} cy={8} r={8} />
      </Icon>,
      mountNode
    );

    expect(getContainer().getAttribute('aria-label')).toBeDefined();
    getContainer().focus();
    expect(document.activeElement === getContainer()).toBe(true);
  });
});
