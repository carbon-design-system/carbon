/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Accordion from '../Accordion';
import AccordionSkeleton from '../Accordion/Accordion.Skeleton';
import SkeletonText from '../SkeletonText';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Accordion', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Accordion className="extra-class">
        <div className="child">Test</div>
      </Accordion>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--accordion`)).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('AccordionSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<AccordionSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--accordion`)).toEqual(true);
    });

    it('Renders first item as expected', () => {
      expect(wrapper.contains(<SkeletonText width="90%" />)).toEqual(true);
    });

    it('Renders without opened item', () => {
      const noOpenedItem = shallow(<AccordionSkeleton open={false} />);
      expect(noOpenedItem.contains(<SkeletonText width="90%" />)).toEqual(
        false
      );
    });

    it('Renders number of items as expected', () => {
      const fullWrapper = mount(<AccordionSkeleton />);
      expect(fullWrapper.find(`.${prefix}--accordion__item`)).toHaveLength(4);
    });

    it('Renders custom number of items', () => {
      const fullWrapper = mount(<AccordionSkeleton count={8} />);
      expect(fullWrapper.find(`.${prefix}--accordion__item`)).toHaveLength(8);
    });
  });
});
