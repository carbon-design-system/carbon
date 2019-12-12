/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Tag from '../Tag';
import TagSkeleton from '../Tag/Tag.Skeleton';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';
import { render, cleanup } from '@carbon/test-utils/react';

const { prefix } = settings;

describe('Tag', () => {
  afterEach(cleanup);

  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const { container } = render(<Tag>This is not a tag</Tag>);
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no DAP violations', async () => {
      const { container } = render(<Tag>This is not a tag</Tag>);
      await expect(container).toHaveNoDAPViolations('Tag');
    });
  });

  describe('with a screenreader', () => {
    it('filtered variant should have appropriate aria-label', () => {
      const { container } = render(<Tag filter>This is not a tag</Tag>);

      const button = container.querySelector('[aria-label]');
      expect(button).toBeInstanceOf(HTMLElement);

      const ariaLabel = button.getAttribute('aria-label');
      expect(ariaLabel).toBeDefined();

      expect(ariaLabel).toEqual('Clear filter This is not a tag');
    });
  });

  describe('Renders as expected', () => {
    it('should render with the appropriate type', () => {
      const tag = shallow(<Tag type="beta" />);
      expect(tag.hasClass(`${prefix}--tag`)).toEqual(true);
      expect(tag.hasClass(`${prefix}--tag--beta`)).toEqual(true);
    });
  });

  it('should allow for a custom label', () => {
    const tag = shallow(<Tag type="beta">New Version!</Tag>);
    expect(tag.text()).toEqual('New Version!');
  });

  it('should support extra class names', () => {
    const tag = shallow(<Tag type="beta" className="extra-class" />);
    expect(tag.hasClass('extra-class')).toEqual(true);
  });
});

describe('TagSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<TagSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--tag`)).toEqual(true);
    });
  });
});
