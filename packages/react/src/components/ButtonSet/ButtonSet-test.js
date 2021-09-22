/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ButtonSet from '../ButtonSet';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('ButtonSet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ButtonSet className="extra-class" />);
  });

  it('should render empty set as expected', () => {
    expect(wrapper.find('.child').length).toBe(0);
  });

  it('should render nonempty set as expected', () => {
    wrapper = shallow(
      <ButtonSet>
        <div className="test-child" />
        <div className="test-child" />
      </ButtonSet>
    );
    expect(wrapper.find('.test-child').length).toBe(2);
  });

  it('should render wrapper as expected', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should have the expected classes in a horizontal set', () => {
    expect(wrapper.hasClass(`${prefix}--btn-set`)).toEqual(true);
  });

  it('should have the expected classes in a vertical set', () => {
    wrapper.setProps({ stacked: true });
    expect(wrapper.hasClass(`${prefix}--btn-set`)).toEqual(true);
    expect(wrapper.hasClass(`${prefix}--btn-set--stacked`)).toEqual(true);
  });
});
