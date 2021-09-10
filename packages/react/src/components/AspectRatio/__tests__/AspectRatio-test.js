/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { AspectRatio } from '../';

describe('AspectRatio', () => {
  it('should support rendering content in different aspect ratios', () => {
    const ratios = ['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'];

    for (const ratio of ratios) {
      const mountNode = document.createElement('div');
      ReactDOM.render(
        <AspectRatio ratio={ratio}>{ratio}</AspectRatio>,
        mountNode
      );

      // Verify the aspect ratio class exists on the container
      const container = mountNode.firstChild;
      const classes = Array.from(container.classList);
      const ratioClass = classes.find((className) => {
        return className.includes(ratio);
      });
      expect(ratioClass).not.toBe(null);
    }
  });

  describe('Component API', () => {
    let mountNode;

    beforeEach(() => {
      mountNode = document.createElement('div');
      document.body.appendChild(mountNode);
    });

    afterEach(() => {
      document.body.removeChild(mountNode);
    });

    it('should pass in a given className to the outermost node', () => {
      ReactDOM.render(
        <AspectRatio className="test" data-testid="test">
          test
        </AspectRatio>,
        mountNode
      );

      const container = document.querySelector('[data-testid="test"]');
      expect(container).not.toBe(null);
      expect(container.classList.contains('test')).toBe(true);
    });

    it('should forward extra props to the outermost node', () => {
      const onClick = jest.fn();
      ReactDOM.render(
        <AspectRatio data-testid="test" onClick={onClick}>
          test
        </AspectRatio>,
        mountNode
      );
      const container = mountNode.firstChild;
      expect(container).not.toBe(null);
      expect(container.getAttribute('data-testid')).toBe('test');

      Simulate.click(container);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should support rendering custom elements with the `as` prop', () => {
      function Test() {
        return (
          <>
            <AspectRatio as="section">test</AspectRatio>
            <AspectRatio
              className="test"
              as={(props) => <article {...props} />}>
              test as component
            </AspectRatio>
          </>
        );
      }

      ReactDOM.render(<Test />, mountNode);

      const section = document.querySelector('section');
      expect(section).not.toBe(null);

      const article = document.querySelector('article');
      expect(article).not.toBe(null);

      // Make sure props are forwarded to a custom base component
      expect(article.classList.contains('test')).toBe(true);
    });
  });
});
