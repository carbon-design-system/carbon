/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';
import FormLabel from '../FormLabel';

describe('FormLabel', () => {
  it('should render', () => {
    const wrapper = shallow(<FormLabel />);
    expect(wrapper).toMatchSnapshot();
  });
});
