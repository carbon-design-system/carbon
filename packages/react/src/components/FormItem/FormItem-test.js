/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';
import FormItem from '../FormItem';

describe('FormItem', () => {
  it('should render', () => {
    const wrapper = shallow(<FormItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
