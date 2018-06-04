import React from 'react';
import Icon from '../Icon';
import TooltipSimple from '../TooltipSimple';
import { mount } from 'enzyme';

describe('TooltipSimple', () => {
  describe('Renders as expected with defaults', () => {
    const wrapper = mount(
      <TooltipSimple text="Basic TooltipSimple Text" className="extra-class">
        <a href="/">A Link</a>
      </TooltipSimple>
    );
    const tooltipWrapper = wrapper.find('.bx--tooltip--simple').first();
    const tooltip = wrapper.find('.bx--tooltip--simple__top').first();

    describe('tooltip container', () => {
      it('renders a tooltip container', () => {
        expect(tooltipWrapper.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(tooltip.hasClass('bx--tooltip--simple__top')).toEqual(true);
      });

      it('applies extra classes to the tooltip container', () => {
        expect(tooltipWrapper.hasClass('extra-class')).toEqual(true);
      });

      it('has the tooltip text specified', () => {
        expect(tooltip.props()['data-tooltip-text']).toEqual(
          'Basic TooltipSimple Text'
        );
      });
    });

    describe('children', () => {
      it('should wrap the children in the tooltip container', () => {
        const child = tooltipWrapper.find('a').first();
        expect(child.length).toEqual(1);
      });
    });
  });

  describe('Renders as expected with specified properties', () => {
    const wrapper = mount(
      <TooltipSimple
        text="Basic TooltipSimple Text"
        position="bottom"
        showIcon={false}>
        <a href="/">A Link</a>
      </TooltipSimple>
    );
    const tooltip = wrapper.find('.bx--tooltip--simple__bottom').first();
    describe('tooltip container', () => {
      it("sets the tooltip's position", () => {
        expect(tooltip.hasClass('bx--tooltip--simple__bottom')).toEqual(true);
      });

      it('does not render info icon', () => {
        const icon = tooltip.find(Icon);
        expect(icon.length).toBe(0);
      });
    });
  });
});
