/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Grid from // GridRow,
// GridCol,
'../Grid';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('<Grid />', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Grid className="extra-class" style={{ border: '5px' }} />
    );
    const wrapperCondensed = shallow(<Grid condensed />);
    const wrapperFullWidth = shallow(<Grid fullWidth />);
    const wrapperNoGutter = shallow(<Grid noGutter />);

    it('has the expected base class', () => {
      expect(wrapper.hasClass(`${prefix}--grid`)).toEqual(true);
    });

    it('renders as div', () => {
      expect(wrapper.is('div')).toEqual(true);
    });

    it('renders extra classes passed in via className & passes thru unknown props', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
      expect(wrapper.prop('style')).toBeTruthy();
    });

    it('has condensed class if condensed', () => {
      expect(wrapperCondensed.hasClass(`${prefix}--grid--condensed`)).toEqual(
        true
      );
    });

    it('has full-width class if full-width', () => {
      expect(wrapperFullWidth.hasClass(`${prefix}--grid--full-width`)).toEqual(
        true
      );
    });

    it('has correct gutter classes when passed true, left, or right', () => {
      expect(wrapperNoGutter.hasClass(`${prefix}--no-gutter`)).toEqual(true);
      wrapperNoGutter.setProps({ noGutter: 'left' });
      expect(wrapperNoGutter.hasClass(`${prefix}--no-gutter--left`)).toEqual(
        true
      );
      wrapperNoGutter.setProps({ noGutter: 'right' });
      expect(wrapperNoGutter.hasClass(`${prefix}--no-gutter--right`)).toEqual(
        true
      );
    });

    it('does not render classes when passed falsey prop', () => {
      wrapper.setProps({ noGutter: false });
      wrapper.setProps({ fullWidth: false });
      wrapper.setProps({ condensed: false });
      expect(wrapperNoGutter.hasClass(`${prefix}--no-gutter`)).toEqual(false);
      expect(wrapperNoGutter.hasClass(`${prefix}--grid--full-width`)).toEqual(
        false
      );
      expect(wrapperNoGutter.hasClass(`${prefix}--grid--condensed`)).toEqual(
        false
      );
    });
  });
});
