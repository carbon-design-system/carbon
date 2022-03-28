/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonIcon from '../SkeletonIcon';
import { shallow } from 'enzyme';

const prefix = 'cds';

describe('SkeletonIcon', () => {
  const wrapper = shallow(<SkeletonIcon />);

  it('Has the expected classes', () => {
    expect(wrapper.hasClass(`${prefix}--icon--skeleton`)).toEqual(true);
  });
});
