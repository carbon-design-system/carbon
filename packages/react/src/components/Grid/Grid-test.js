/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Grid from '../Grid';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('<Grid />', () => {
  describe('Renders as expected', () => {
    const Child = () => <span>An Item</span>;
    const wrapper = shallow(
      <Grid className="extra-class" style={{ border: '5px' }}>
        <Child />
      </Grid>
    );
    const wrapperCondensed = shallow(<Grid condensed />);
    const wrapperFullWidth = shallow(<Grid fullWidth />);
    const wrapperNoGutter = shallow(<Grid noGutter />);
    const wrapperAsSection = shallow(<Grid as="section" />);

    it('should support a custom element as the root node', () => {
      expect(wrapperAsSection.is('section')).toEqual(true);
    });

    it('has the expected base class', () => {
      expect(wrapper.hasClass(`${prefix}--grid`)).toEqual(true);
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

    it('does not render classes when passed falsey noGutter, fullWidth, or condensed props', () => {
      wrapper.setProps({ noGutter: false, fullWidth: false, condensed: false });
      expect(wrapperNoGutter.hasClass(`${prefix}--no-gutter`)).toEqual(false);
      expect(wrapperNoGutter.hasClass(`${prefix}--grid--full-width`)).toEqual(
        false
      );
      expect(wrapperNoGutter.hasClass(`${prefix}--grid--condensed`)).toEqual(
        false
      );
    });

    it('should render child content', () => {
      expect(wrapper.find(Child).length).toEqual(1);
    });
  });
});

describe('<Grid.Row />', () => {
  describe('Renders as expected', () => {
    const Child = () => <span>An Item</span>;
    const wrapper = shallow(
      <Grid.Row className="extra-class" style={{ border: '5px' }}>
        <Child />
      </Grid.Row>
    );
    const wrapperCondensed = shallow(<Grid.Row condensed />);
    const wrapperNoGutter = shallow(<Grid.Row noGutter />);
    const wrapperAsSection = shallow(<Grid.Row as="section" />);

    it('should support a custom element as the root node', () => {
      expect(wrapperAsSection.is('section')).toEqual(true);
    });

    it('has the expected base class', () => {
      expect(wrapper.hasClass(`${prefix}--row`)).toEqual(true);
    });

    it('renders extra classes passed in via className & passes thru unknown props', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
      expect(wrapper.prop('style')).toBeTruthy();
    });

    it('has condensed class if condensed', () => {
      expect(wrapperCondensed.hasClass(`${prefix}--row--condensed`)).toEqual(
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

    it('does not render classes when passed falsey noGutter or condensed', () => {
      wrapper.setProps({ noGutter: false, condensed: false });
      expect(wrapperNoGutter.hasClass(`${prefix}--no-gutter`)).toEqual(false);
      expect(wrapperNoGutter.hasClass(`${prefix}--row--condensed`)).toEqual(
        false
      );
    });

    it('should render child content', () => {
      expect(wrapper.find(Child).length).toEqual(1);
    });
  });
});

describe('<Grid.Col />', () => {
  describe('Renders as expected', () => {
    const Child = () => <span>An Item</span>;
    const wrapper = shallow(
      <Grid.Col className="extra-class" style={{ border: '5px' }}>
        <Child />
      </Grid.Col>
    );
    const wrapperNoGutter = shallow(<Grid.Col noGutter />);
    const wrapperAsSection = shallow(<Grid.Col as="section" />);
    const wrapperSpan = shallow(
      <Grid.Col sm={4} md={8} lg={10} xlg={12} max={16} />
    );
    const wrapperOffset = shallow(
      <Grid.Col
        smOffset={4}
        mdOffset={8}
        lgOffset={10}
        xlgOffset={12}
        maxOffset={16}
      />
    );

    it('should support a custom element as the root node', () => {
      expect(wrapperAsSection.is('section')).toEqual(true);
    });
    it('has the expected base class', () => {
      expect(wrapper.hasClass(`${prefix}--col`)).toEqual(true);
    });

    it('renders extra classes passed in via className & passes thru unknown props', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
      expect(wrapper.prop('style')).toBeTruthy();
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

    it('does not render class when passed falsey noGutter', () => {
      wrapper.setProps({ noGutter: false });
      expect(wrapperNoGutter.hasClass(`${prefix}--no-gutter`)).toEqual(false);
    });

    it('should render child content', () => {
      expect(wrapper.find(Child).length).toEqual(1);
    });

    it('should support specifying column span', () => {
      expect(wrapperSpan.hasClass(`${prefix}--col-sm-4`)).toEqual(true);
      expect(wrapperSpan.hasClass(`${prefix}--col-md-8`)).toEqual(true);
      expect(wrapperSpan.hasClass(`${prefix}--col-lg-10`)).toEqual(true);
      expect(wrapperSpan.hasClass(`${prefix}--col-xlg-12`)).toEqual(true);
      expect(wrapperSpan.hasClass(`${prefix}--col-max-16`)).toEqual(true);
    });

    it('should support specifying offset', () => {
      expect(wrapperOffset.hasClass(`${prefix}--offset-sm-4`)).toEqual(true);
      expect(wrapperOffset.hasClass(`${prefix}--offset-md-8`)).toEqual(true);
      expect(wrapperOffset.hasClass(`${prefix}--offset-lg-10`)).toEqual(true);
      expect(wrapperOffset.hasClass(`${prefix}--offset-xlg-12`)).toEqual(true);
      expect(wrapperOffset.hasClass(`${prefix}--offset-max-16`)).toEqual(true);
    });

    it('should NOT render offset class when falsey', () => {
      const offset = 0;
      wrapper.setProps({ smOffset: offset });
      expect(wrapper.hasClass(`${prefix}--offset-sm-${offset}`)).toEqual(false);
    });
  });
});
