/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO
import { createRunner, accordion } from '../../../../spec/src';

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Accordion from '../Accordion';
import AccordionSkeleton from '../Accordion/Accordion.Skeleton';
import AccordionItem from '../AccordionItem';
import SkeletonText from '../SkeletonText';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Accordion', () => {
  describe.only('spec', () => {
    const runner = createRunner(accordion, {
      globals: {
        describe,
        beforeEach,
        afterEach,
        test,
      },
      only: [
        // 'accordion.markup',
        // 'accordion.header.interaction.expand.mouse',
        // 'accordion.header.interaction.collapse.mouse',
        'accordion.header.interaction.expand.keyboard.enter',
      ],
    });

    runner.beforeEach(context => {
      const node = document.createElement('div');
      document.body.appendChild(node);

      act(() => {
        ReactDOM.render(
          <Accordion>
            {context.children.map(child => (
              <AccordionItem key={child.header} title={child.header}>
                {child.panel}
              </AccordionItem>
            ))}
          </Accordion>,
          node
        );
      });

      return node.firstChild;
    });

    runner.afterEach(node => {
      node.parentNode.removeChild(node);
    });

    runner.test();
  });

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
