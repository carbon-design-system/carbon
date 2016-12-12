import React from 'react';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import { mount } from 'enzyme';

describe('Tooltip', () => {
  describe('Renders as expected with defaults', () => {
    const wrapper = mount(
      <Tooltip text="Basic Tooltip Text" className="extra-class"><a href="#">A Link</a></Tooltip>
    );
    const tooltip = wrapper.find('div').first();

    describe('tooltip container', () => {
      it('renders a tooltip container', () => {
        expect(tooltip.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(tooltip.hasClass('bx--tooltip__top')).toEqual(true);
      });

      it('applies extra classes to the tooltip container', () => {
        expect(tooltip.hasClass('extra-class')).toEqual(true);
      });

      it('has the tooltip text specified', () => {
        expect(tooltip.props()['data-tooltip']).toEqual('Basic Tooltip Text');
      });

      it('renders the info icon', () => {
        const icon = tooltip.find(Icon);
        expect(icon.length).toBe(1);
        expect(icon.props().className).toBe('bx--tooltip__icon');
        expect(icon.props().name).toBe('info');
      });
    });

    describe('children', () => {
      it('should wrap the children in the tooltip container', () => {
        const child = tooltip.find('a').first();
        expect(child.length).toEqual(1);
      });
    });
  });

  describe('Renders as expected with specified properties', () => {
    const wrapper = mount(
      <Tooltip text="Basic Tooltip Text" position="bottom"><a href="#">A Link</a></Tooltip>
    );
    const tooltip = wrapper.find('div').first();
    describe('tooltip container', () => {
      it('sets the tooltip\'s position', () => {
        expect(tooltip.hasClass('bx--tooltip__bottom')).toEqual(true);
      });
    });
  });
});
