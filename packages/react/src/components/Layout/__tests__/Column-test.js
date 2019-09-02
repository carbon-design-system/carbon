/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { unstable_Column as Column } from '../';

describe('Column', () => {
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
    mount(<Column as={CustomComponent} />, {
      attachTo: mountNode,
    });

    expect(CustomComponent).toHaveBeenCalledTimes(1);
    expect(mountNode.querySelector('section')).toBeInstanceOf(HTMLElement);
  });

  it('should allow custom class names', () => {
    const className = 'custom-class';
    mount(<Column className={className} />, {
      attachTo: mountNode,
    });
    expect(mountNode.querySelector('.custom-class')).toBeInstanceOf(
      HTMLDivElement
    );
  });

  it('should support different column modes', () => {
    const modes = [
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
      mount(<Column {...props} />, {
        attachTo: mountNode,
      });
      expect(mountNode.firstChild.className).toEqual(
        expect.stringContaining(mode.className)
      );
    }
  });

  it('should support specifying column span', () => {
    const checkClassName = element => {
      const { className } = element;
      expect(className).toEqual(expect.stringContaining('col-sm-4'));
      expect(className).toEqual(expect.stringContaining('col-md-8'));
      expect(className).toEqual(expect.stringContaining('col-lg-10'));
      expect(className).toEqual(expect.stringContaining('col-xlg-12'));
      expect(className).toEqual(expect.stringContaining('col-max-16'));
    };

    mount(<Column span={[4, 8, 10, 12, 16]} />, {
      attachTo: mountNode,
    });
    checkClassName(mountNode.firstChild);

    mount(<Column span={{ sm: 4, md: 8, lg: 10, xlg: 12, max: 16 }} />, {
      attachTo: mountNode,
    });
    checkClassName(mountNode.firstChild);
  });

  it('should support specifying offset amount', () => {
    const checkClassName = element => {
      const { className } = element;
      expect(className).toEqual(expect.stringContaining('offset-sm-4'));
      expect(className).toEqual(expect.stringContaining('offset-md-8'));
      expect(className).toEqual(expect.stringContaining('offset-lg-10'));
      expect(className).toEqual(expect.stringContaining('offset-xlg-12'));
      expect(className).toEqual(expect.stringContaining('offset-max-16'));
    };

    mount(<Column offset={[4, 8, 10, 12, 16]} />, {
      attachTo: mountNode,
    });
    checkClassName(mountNode.firstChild);

    mount(<Column offset={{ sm: 4, md: 8, lg: 10, xlg: 12, max: 16 }} />, {
      attachTo: mountNode,
    });
    checkClassName(mountNode.firstChild);
  });
});
