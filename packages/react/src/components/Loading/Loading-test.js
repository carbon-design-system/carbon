/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from '../Loading';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Loading', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<Loading className="extra-class" />);
    const overlay = wrapper.find(`.${prefix}--loading-overlay`);
    const loader = wrapper.find(`.${prefix}--loading`);
    const svg = loader.find('svg');

    it('should render with an overlay', () => {
      expect(overlay.length).toEqual(1);
    });

    it('should render with a loader', () => {
      expect(loader.length).toEqual(1);
    });

    it('shoud render an svg', () => {
      expect(svg.length).toEqual(1);
    });

    it('overlay has the expected class', () => {
      expect(overlay.hasClass(`${prefix}--loading-overlay`)).toEqual(true);
    });

    it('loader has the expected classes', () => {
      expect(loader.hasClass(`${prefix}--loading`)).toEqual(true);
    });

    it('svg has the correct class', () => {
      expect(svg.hasClass(`${prefix}--loading__svg`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(loader.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Sets props and state as expected', () => {
    const wrapper = mount(<Loading className="extra-class" />);

    it(`should remove and add ${prefix}--loading--stop class`, () => {
      wrapper.setProps({ active: false });
      expect(
        wrapper.find(`.${prefix}--loading`).hasClass(`${prefix}--loading--stop`)
      ).toEqual(true);
      wrapper.setProps({ active: true });
      expect(
        wrapper.find(`.${prefix}--loading`).hasClass(`${prefix}--loading--stop`)
      ).toEqual(false);
    });

    it('should not render overlay when withOverlay is set to false', () => {
      wrapper.setProps({ withOverlay: false });
      const overlay = wrapper.find(`.${prefix}--loading-overlay`);
      expect(overlay.length).toEqual(0);
    });
  });
});
