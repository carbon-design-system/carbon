/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React, { useRef } from 'react';
import {
  useInteractiveChildrenNeedDescription,
  useNoInteractiveChildren,
} from './index.jsx';

describe('useNoInteractiveChildren', () => {
  it('should render without errors if no interactive content is found', () => {
    function TestComponent() {
      const ref = useRef(null);
      useNoInteractiveChildren(ref);
      return <span ref={ref}>Content</span>;
    }

    expect(() => {
      render(<TestComponent />);
    }).not.toThrow();
  });

  it('should throw an error if interactive content is found', () => {
    function TestComponent() {
      const ref = useRef(null);
      useNoInteractiveChildren(ref);
      return (
        <div ref={ref}>
          <button type="button">Interactive</button>
        </div>
      );
    }

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('useInteractiveChildrenNeedDescription', () => {
  it('should render without errors if interactive content has `aria-describedby`', () => {
    const TestComponent = () => {
      const ref = useRef(null);

      useInteractiveChildrenNeedDescription(ref);

      return (
        <div ref={ref}>
          <button aria-describedby="helper-text">Interactive</button>
        </div>
      );
    };

    expect(() => {
      render(<TestComponent />);
    }).not.toThrow();
  });

  it('should throw an error if interactive content is missing `aria-describedby`', () => {
    const TestComponent = () => {
      const ref = useRef(null);

      useInteractiveChildrenNeedDescription(ref);

      return (
        <div ref={ref}>
          <button>Interactive</button>
        </div>
      );
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow();
  });
});

describe('noInteractiveChildren hooks in production', () => {
  let originalNodeEnv;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('should not throw in production when `useNoInteractiveChildren` finds interactive content', () => {
    const TestComponent = () => {
      const ref = useRef(null);

      useNoInteractiveChildren(ref);

      return (
        <div ref={ref}>
          <button>Interactive</button>
        </div>
      );
    };

    expect(() => {
      render(<TestComponent />);
    }).not.toThrow();
  });

  it('should not throw in production when `useInteractiveChildrenNeedDescription` finds missing `aria-describedby`', () => {
    const TestComponent = () => {
      const ref = useRef(null);

      useInteractiveChildrenNeedDescription(ref);

      return (
        <div ref={ref}>
          <button>Interactive</button>
        </div>
      );
    };

    expect(() => {
      render(<TestComponent />);
    }).not.toThrow();
  });
});
