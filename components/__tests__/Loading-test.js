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
  });

  describe('Has expected IE classes in IE environment', () => {
    let wrapper;
    let loader;

    beforeAll(() => {
      window.ActiveXObject = {};
      wrapper = mount(
        <Loading className="extra-class" />
      );
      loader = wrapper.find('div');
    });

    afterAll(() => {
      window.ActiveXObject = undefined;
    });

    it('has the expected classes', () => {
      expect(loader.hasClass('bx--loading')).toEqual(true);
      expect(loader.hasClass('bx--loading--ie')).toEqual(true);
    });

    it('should remove and add bx--loading--stop--ie class', () => {
      wrapper.setProps({ active: false });
      expect(loader.hasClass('bx--loading--stop')).toEqual(true);
      expect(loader.hasClass('bx--loading--stop--ie')).toEqual(true);
      wrapper.setProps({ active: true });
      expect(loader.hasClass('bx--loading--stop--ie')).toEqual(false);
    });
  });
});
