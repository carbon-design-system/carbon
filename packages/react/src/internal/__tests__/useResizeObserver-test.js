/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import { useResizeObserver } from '../useResizeObserver';
import { mockHTMLElement } from '../__mocks__/mockHTMLElement';

/**
 * @param {number} base - Represents the initial size used for the resizing example
 */
const sizes = (base) => ({
  offsetWidth: {
    ['observed-el']: base,
  },
  offsetHeight: { ['observed-el']: base / 2 },
});

/**
 * @param {HTMLElement} el - The element being mocked for resizing functionality
 * @param {string} property - HTML property being mocked (in this scenario, these properties come from sizes())
 */
const testSizes = (el, property) => {
  const classes = el.getAttribute('class').split(' ');
  const container = el.closest('.test-container');

  const base = container ? parseInt(container.style.width, 10) : 400;
  const propSizes = sizes(base)[property];

  if (propSizes) {
    for (let cls of classes) {
      const val = propSizes[cls] ? propSizes[cls] : -1;
      if (val >= 0) {
        return val;
      }
    }
  }

  // The test should never get here as all cases should be catered for in setup.
  return base;
};

const mockSizes = () => {
  const mocks = {};

  const keys = Object.keys(sizes(-1));
  for (let i = 0; i < keys.length; i++) {
    mocks[keys[i]] = {
      get: function () {
        return testSizes(this, keys[i]);
      },
    };
  }

  return mocks;
};

const TestComponent = () => {
  const observedElement = useRef(null);
  const { width, height } = useResizeObserver({ ref: observedElement });
  const [content, setContent] = useState(-1);

  useEffect(() => {
    setContent(`width: ${width}, height: ${height}`);
  }, [height, width]);

  return (
    <div ref={observedElement} className="observed-el">
      {content}
    </div>
  );
};

describe('useResizeObserver', () => {
  const { ResizeObserver } = window;
  let mockElement;

  beforeEach(() => {
    mockElement = mockHTMLElement(mockSizes());
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    mockElement.mockRestore();
    window.ResizeObserver = ResizeObserver;
  });

  it('returns the initial size of the component', () => {
    render(<TestComponent />);
    screen.getByText('width: 400, height: 200');
  });
});
