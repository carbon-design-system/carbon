/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { unstable_Row as Row } from '../';

describe('Row', () => {
  let mountNode;

  beforeEach(() => {
    mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
  });

  afterEach(() => {
    mountNode.parentNode.removeChild(mountNode);
  });

  it('should support a custom element as the root node', () => {
    const CustomComponent = jest.fn(props => <section {...props} />);
    mount(<Row as={CustomComponent} />, {
      attachTo: mountNode,
    });

    expect(CustomComponent).toHaveBeenCalledTimes(1);
    expect(mountNode.querySelector('section')).toBeInstanceOf(HTMLElement);
  });

  it('should allow custom class names', () => {
    const className = 'custom-class';
    mount(<Row className={className} />, {
      attachTo: mountNode,
    });
    expect(mountNode.querySelector('.custom-class')).toBeInstanceOf(
      HTMLDivElement
    );
  });

  it('should support different row modes', () => {
    const modes = [
      {
        prop: 'condensed',
        className: 'row--condensed',
      },
      {
        prop: 'noGutter',
        className: 'no-gutter',
      },
      {
        prop: 'noGutterLeft',
        className: 'no-gutter--left',
      },
      {
        prop: 'noGutterRight',
        className: 'no-gutter--right',
      },
    ];

    for (const mode of modes) {
      const props = {
        [mode.prop]: true,
      };
      mount(<Row {...props} />, {
        attachTo: mountNode,
      });
      expect(mountNode.firstChild.className).toEqual(
        expect.stringContaining(mode.className)
      );
    }
  });
});
