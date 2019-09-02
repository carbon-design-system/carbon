/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { unstable_Grid as Grid } from '../';

describe('Grid', () => {
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
    mount(<Grid as={CustomComponent} />, {
      attachTo: mountNode,
    });

    expect(CustomComponent).toHaveBeenCalledTimes(1);
    expect(mountNode.querySelector('section')).toBeInstanceOf(HTMLElement);
  });

  it('should allow custom class names', () => {
    const className = 'custom-class';
    mount(<Grid className={className} />, {
      attachTo: mountNode,
    });
    expect(mountNode.querySelector('.custom-class')).toBeInstanceOf(
      HTMLDivElement
    );
  });

  it('should support different grid modes', () => {
    const modes = [
      {
        prop: 'condensed',
        className: 'grid--condensed',
      },
      {
        prop: 'fullWidth',
        className: 'grid--full-width',
      },
    ];

    for (const mode of modes) {
      const props = {
        [mode.prop]: true,
      };
      mount(<Grid {...props} />, {
        attachTo: mountNode,
      });
      expect(mountNode.firstChild.className).toEqual(
        expect.stringContaining(mode.className)
      );
    }
  });
});
