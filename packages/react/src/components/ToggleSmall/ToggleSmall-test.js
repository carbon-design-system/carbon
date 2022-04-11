/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';
import { mount } from 'enzyme';

const prefix = 'cds';

describe('ToggleSmallSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<ToggleSmallSkeleton />);
    const input = wrapper.find('input');
    const toggleLabel = wrapper.find(`.${prefix}--toggle__label`);

    it('Has the expected classes', () => {
      expect(input.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(input.hasClass(`${prefix}--toggle`)).toEqual(true);
      expect(toggleLabel.hasClass(`${prefix}--skeleton`)).toEqual(true);
    });
  });
});
