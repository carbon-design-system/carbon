import React from 'react';
import Loading from '../Loading';
import { shallow, mount } from 'enzyme';

describe('Loading', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Loading className="extra-class" />
    );

    const loader = wrapper.find('div');
    const svg = wrapper.find('svg');

    it('should render a loader', () => {
      expect(loader.length).toEqual(1);
    });

    it('shoud render an svg', () => {
      expect(svg.length).toEqual(1);
    });

    it('has the expected classes', () => {
      expect(loader.hasClass('bx--loading')).toEqual(true);
    });

    it('svg has the correct class', () => {
      expect(svg.hasClass('bx--loading__svg')).toEqual(true);
    });

    it('has the expected classes (IE)', () => {
      const isIE = window.ActiveXObject || 'ActiveXObject' in window;
      if (isIE) expect(loader.hasClass('bx--loading--ie')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(loader.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Sets props and state as expected', () => {
    const wrapper = mount(
      <Loading className="extra-class" />
    );

    const loader = wrapper.find('div');

    it('should remove and add bx--loading--stop class', () => {
      wrapper.setProps({ active: false });
      expect(loader.hasClass('bx--loading--stop')).toEqual(true);
      wrapper.setProps({ active: true });
      expect(loader.hasClass('bx--loading--stop')).toEqual(false);
    });

    it('should remove and add bx--loading--stop class (IE)', () => {
      const isIE = window.ActiveXObject || 'ActiveXObject' in window;
      if (isIE) expect(loader.hasClass('bx--loading--ie')).toEqual(true);
      wrapper.setProps({ active: false });
      expect(loader.hasClass('bx--loading--stop--ie')).toEqual(false);
    });
  });
});
