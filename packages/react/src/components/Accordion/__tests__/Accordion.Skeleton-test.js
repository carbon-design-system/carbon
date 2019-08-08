/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import { mount } from 'enzyme';
import React from 'react';
import AccordionSkeleton from '../Accordion.Skeleton';
import SkeletonText from '../../SkeletonText';

const { prefix } = settings;

describe('AccordionSkeleton', () => {
  it('should render', () => {
    const wrapper = mount(<AccordionSkeleton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support rendering without any open items', () => {
    const wrapper = mount(<AccordionSkeleton open={false} />);
    expect(wrapper.contains(<SkeletonText width="90%" />)).toEqual(false);
  });

  it('should support rendering a custom number of items', () => {
    const count = 8;
    const wrapper = mount(<AccordionSkeleton count={count} />);
    expect(wrapper.find(`.${prefix}--accordion__item`)).toHaveLength(count);
  });
});
