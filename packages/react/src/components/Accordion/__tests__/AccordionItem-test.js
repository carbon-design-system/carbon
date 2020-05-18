/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText } from '@carbon/test-utils/dom';
import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import AccordionItem from '../AccordionItem';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('AccordionItem', () => {
  afterEach(cleanup);

  it('should render', () => {
    const wrapper = mount(
      <AccordionItem title="A heading" className="extra-class">
        Lorem ipsum.
      </AccordionItem>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the item open state when the `open` prop changes', () => {
    const wrapper = mount(
      <AccordionItem title="A heading" open>
        Lorem ipsum.
      </AccordionItem>
    );

    expect(
      wrapper
        .find(`.${prefix}--accordion__item`)
        .hasClass(`${prefix}--accordion__item--active`)
    ).toBe(true);

    wrapper.setProps({ open: false });
    wrapper.update();

    expect(
      wrapper
        .find(`.${prefix}--accordion__item`)
        .hasClass(`${prefix}--accordion__item--active`)
    ).toBe(false);
  });

  it('should call `onClick` when the accordion list item is clicked', () => {
    const title = 'test title';
    const onClick = jest.fn();
    const { container } = render(
      <AccordionItem title={title} open onClick={onClick}>
        Lorem ipsum.
      </AccordionItem>
    );

    Simulate.click(getByText(container, title));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call `onHeadingClick` when the accordion header is clicked', () => {
    const onHeadingClick = jest.fn();
    const wrapper = mount(
      <AccordionItem title="A heading" open onHeadingClick={onHeadingClick}>
        Lorem ipsum.
      </AccordionItem>
    );
    wrapper.find('button').simulate('click');
    expect(onHeadingClick).toHaveBeenCalledTimes(1);
  });

  it('should close an open AccordionItem panel when the Esc key is pressed', () => {
    const wrapper = mount(
      <AccordionItem title="A heading" open>
        Lorem ipsum.
      </AccordionItem>
    );
    wrapper.find('button').simulate('keydown', {
      key: 'Escape',
      keyCode: 27,
      which: 27,
    });
    expect(
      wrapper
        .find(`.${prefix}--accordion__item`)
        .hasClass(`${prefix}--accordion__item--active`)
    ).toBe(false);
  });

  it('should not close an open AccordionItem panel if the Esc key is pressed in the panel', () => {
    const wrapper = mount(
      <AccordionItem title="A heading" open>
        <input data-test-id="input" />
      </AccordionItem>
    );
    wrapper.find('[data-test-id="input"]').simulate('keydown', {
      key: 'Escape',
      keyCode: 27,
      which: 27,
    });
    expect(
      wrapper
        .find(`.${prefix}--accordion__item`)
        .hasClass(`${prefix}--accordion__item--active`)
    ).toBe(true);
  });
});
