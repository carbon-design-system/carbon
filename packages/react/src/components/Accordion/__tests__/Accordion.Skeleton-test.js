/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import React from 'react';
import AccordionSkeleton from '../Accordion.Skeleton';
import SkeletonText from '../../SkeletonText';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

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

  it('should align to the left if prop isFlush is passed', () => {
    render(<AccordionSkeleton count={8} isFlush data-testid="skeleton-1" />);

    expect(screen.getByTestId('skeleton-1')).toHaveClass(
      `${prefix}--accordion--flush`
    );
  });

  it('should not align to left if align="start"', () => {
    render(
      <AccordionSkeleton
        count={8}
        isFlush
        data-testid="skeleton-2"
        align="start"
      />
    );
    expect(screen.getByTestId('skeleton-2')).not.toHaveClass(
      `${prefix}--accordion--flush`
    );
  });
});
