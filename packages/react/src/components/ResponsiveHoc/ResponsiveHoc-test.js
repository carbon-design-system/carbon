import React from 'react';
import ResponsiveHoc from './ResponsiveHoc';
import { mount } from 'enzyme';
import { window, Event } from 'window-or-global';

const resizeWindow = (width) => {
  window.outerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

const render = () =>
  mount(
    <ResponsiveHoc minDeviceWidth={900}>
      <p>Content for ResponsiveHoc goes here.</p>
    </ResponsiveHoc>
  );

describe('ResponsiveHoc', () => {
  describe('renders as expected', () => {
    resizeWindow(800);

    let wrapper = render();

    describe('render p', () => {
      it('should render a p', () => {
        expect(wrapper.find('p').length).toBe(0);
      });
    });

    describe('does not render p', () => {
      resizeWindow(1000);
      let wrapper = render();
      wrapper = render();
      it('should not render p', () => {
        expect(wrapper.find('p').length).toBe(1);
      });
    });
  });
});
