/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonText from '../SkeletonText';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('SkeletonText', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SkeletonText />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton__text`)).toEqual(true);
    });
  });
});

describe('SkeletonText Heading', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SkeletonText heading />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton__heading`)).toEqual(true);
    });
  });
});
