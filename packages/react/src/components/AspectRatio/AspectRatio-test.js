/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import React from 'react';
import AspectRatio from '../AspectRatio';

describe('AspectRatio', () => {
  it('should render', () => {
    const wrapper = mount(
      <AspectRatio>
        <div />
      </AspectRatio>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support a custom `className` prop', () => {
    const wrapper = mount(
      <AspectRatio className="custom-class">
        <div />
      </AspectRatio>
    );
    expect(wrapper.children().find('.custom-class').length).toBe(1);
  });

  it.each(['16x9', '2x1', '4x3', '1x1', '1x2'])(
    'should support an aspect ratio of %s',
    ratio => {
      const wrapper = mount(
        <AspectRatio ratio={ratio}>
          <div />
        </AspectRatio>
      );
      // Rough heuristic to check for the bx--aspect-ratio--WxH class name on
      // the containing node
      expect(wrapper.children().prop('className')).toEqual(
        expect.stringContaining(ratio)
      );
    }
  );
});
