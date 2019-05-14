/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Slider from '../Slider';
import SliderSkeleton from '../Slider/Slider.Skeleton';
import { mount, shallow } from 'enzyme';
import 'requestanimationframe';
import { settings } from 'carbon-components';

const { prefix } = settings;
describe('Slider', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Slider
        id="slider"
        className="extra-class"
        value={50}
        min={0}
        max={100}
        step={1}
      />
    );

    it('renders children as expected', () => {
      expect(wrapper.find(`.${prefix}--text-input`).length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.find(`.${prefix}--slider`).length).toBe(1);
    });

    it('renders extra classes passed in via className', () => {
      expect(
        wrapper.find(`.${prefix}--slider`).hasClass('extra-class')
      ).toEqual(true);
    });

    it('can be disabled', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toEqual(true);
    });

    it('can set value via props', () => {
      wrapper.setProps({ value: 55 });
      expect(wrapper.props().value).toEqual(55);
    });

    it('should specify light version as expected', () => {
      expect(wrapper.props().light).toEqual(false);
      wrapper.setProps({ light: true });
      expect(wrapper.props().light).toEqual(true);
    });
  });

  describe('Supporting label', () => {
    it('concatenates the value and the label by default', () => {
      const wrapper = mount(
        <Slider min={0} minLabel="min" max={100} maxLabel="max" value={0} />
      );
      expect(
        wrapper
          .find(`.${prefix}--slider__range-label`)
          .first()
          .text()
      ).toBe('0min');
      expect(
        wrapper
          .find(`.${prefix}--slider__range-label`)
          .last()
          .text()
      ).toBe('100max');
    });

    it('supports custom formatting of the label', () => {
      const wrapper = mount(
        <Slider
          min={0}
          minLabel="min"
          max={100}
          maxLabel="max"
          formatLabel={(value, label) => `${value}-${label}`}
          value={0}
        />
      );
      expect(
        wrapper
          .find(`.${prefix}--slider__range-label`)
          .first()
          .text()
      ).toBe('0-min');
      expect(
        wrapper
          .find(`.${prefix}--slider__range-label`)
          .last()
          .text()
      ).toBe('100-max');
    });
  });

  describe('updatePosition method', () => {
    const handleChange = jest.fn();
    const handleRelease = jest.fn();
    const wrapper = mount(
      <Slider
        id="slider"
        className="extra-class"
        value={50}
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
        onRelease={handleRelease}
      />
    );

    it('sets correct state from event with a right/up keydown', () => {
      const evt = {
        type: 'keydown',
        which: '38',
      };
      wrapper.instance().updatePosition(evt);
      expect(handleChange).lastCalledWith({ value: 51 });
      expect(wrapper.state().value).toEqual(51);
    });

    it('sets correct state from event with a left/down keydown', () => {
      const evt = {
        type: 'keydown',
        which: '40',
      };
      wrapper.instance().updatePosition(evt);
      expect(handleChange).lastCalledWith({ value: 50 });
      expect(wrapper.state().value).toEqual(50);
    });

    it('sets correct state from event with a clientX', () => {
      const evt = {
        type: 'click',
        clientX: '1000',
      };
      wrapper.instance().updatePosition(evt);
      expect(handleChange).lastCalledWith({ value: 100 });
      expect(wrapper.state().value).toEqual(100);
    });

    describe('user is holding the handle', () => {
      it('does not call onRelease', () => {
        handleRelease.mockClear();
        expect(handleRelease).not.toHaveBeenCalled();

        wrapper.instance().handleMouseStart();
        wrapper.instance().updatePosition();
        expect(handleRelease).not.toHaveBeenCalled();
      });
    });

    describe('user releases the handle', () => {
      it('calls onRelease', () => {
        handleRelease.mockClear();
        expect(handleRelease).not.toHaveBeenCalled();
        wrapper.setState({
          holding: false,
        });
        wrapper.instance().updatePosition();
        expect(handleRelease).toHaveBeenCalled();
      });
    });
  });
});

describe('SliderSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SliderSkeleton />);

    const slider = wrapper.find(`.${prefix}--slider-container`);

    it('Has the expected classes', () => {
      expect(slider.hasClass(`${prefix}--skeleton`)).toEqual(true);
    });
  });
});
