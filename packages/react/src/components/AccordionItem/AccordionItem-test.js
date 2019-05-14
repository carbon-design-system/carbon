/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import AccordionItem from '../AccordionItem';
import ChevronRight16 from '@carbon/icons-react/lib/chevron--right/16';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('AccordionItem', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <AccordionItem title="A heading" className="extra-class">
        Lorem ipsum.
      </AccordionItem>
    );

    it('renders children as expected', () => {
      expect(wrapper.find(`.${prefix}--accordion__content`).text()).toBe(
        'Lorem ipsum.'
      );
    });

    it('renders heading as expected', () => {
      const heading = wrapper.find(`.${prefix}--accordion__heading`);
      const icon = ChevronRight16;
      expect(heading.length).toBe(1);
      expect(heading.find(icon).length).toBe(1);
      expect(heading.find(`.${prefix}--accordion__title`).text()).toBe(
        'A heading'
      );
    });

    it('should use correct icon', () => {
      const heading = wrapper.find(`.${prefix}--accordion__heading`);
      expect(heading.find(ChevronRight16).length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--accordion__item`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--accordion__item--active`)).toEqual(
        false
      );
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('changes the open state upon change in props', () => {
      const openItem = shallow(
        <AccordionItem title="A heading" open>
          Lorem ipsum.
        </AccordionItem>
      );
      expect(openItem.hasClass(`${prefix}--accordion__item--active`)).toEqual(
        true
      );
      expect(openItem.state().open).toEqual(true);
      openItem.setState({ open: true });
      openItem.setProps({ open: false });
      expect(openItem.state().open).toEqual(false);
    });

    it('avoids change the open state upon setting props, unless the value actually changes', () => {
      const openItem = shallow(
        <AccordionItem title="A heading" open>
          Lorem ipsum.
        </AccordionItem>
      );
      openItem.setState({ open: false });
      openItem.setProps({ open: true });
      expect(openItem.state().open).toEqual(false);
    });

    it('should apply the active class when the state is open', () => {
      const toggler = mount(<AccordionItem />);
      const item = toggler.find('li');
      expect(item.hasClass(`${prefix}--accordion__item--active`)).toEqual(
        false
      );
      toggler.setState({ open: true });
      expect(
        toggler.find('li').hasClass(`${prefix}--accordion__item--active`)
      ).toEqual(true);
    });
  });

  describe('Renders a node title as expected', () => {
    const titleNode = shallow(
      <h2 className="TitleClass">
        <img src="some_image.png" alt="Something" />A heading
      </h2>
    );
    const wrapper = shallow(
      <AccordionItem title={titleNode} className="extra-class">
        Lorem ipsum.
      </AccordionItem>
    );

    it('renders heading as expected', () => {
      const heading = wrapper.find(`.${prefix}--accordion__heading`);
      expect(heading.length).toBe(1);
      expect(heading.find(ChevronRight16).length).toBe(1);
      const title = heading.find(`.${prefix}--accordion__title`);
      expect(title.text()).toBe('A heading');
      expect(title.find('h2').exists()).toEqual(true);
      expect(title.find('h2').hasClass('TitleClass')).toEqual(true);
      expect(title.find('img').exists()).toEqual(true);
      expect(title.find('img').props()).toEqual({
        alt: 'Something',
        src: 'some_image.png',
      });
    });
  });

  describe('Check that functions passed in as props are called', () => {
    const onClick = jest.fn();
    const onHeadingClick = jest.fn();
    const wrapper = mount(
      <AccordionItem onClick={onClick} onHeadingClick={onHeadingClick} />
    );
    const heading = wrapper.find(`button.${prefix}--accordion__heading`);

    it('should call onClick', () => {
      wrapper.simulate('click');
      expect(onClick).toBeCalled();
    });

    it('should call onHeadingClick', () => {
      heading.simulate('click');
      expect(onHeadingClick).toBeCalled();
    });
  });

  describe('Check that clicking the item toggles its open state', () => {
    const toggler = mount(
      <AccordionItem title="A heading">Lorem ipsum.</AccordionItem>
    );
    const heading = toggler.find(`button.${prefix}--accordion__heading`);

    it('should set state to open when clicked', () => {
      expect(toggler.state().open).toEqual(false);
      heading.simulate('click');
      expect(toggler.state().open).toEqual(true);
    });
  });

  describe('Check that the keyboard toggles its open state', () => {
    let toggler;
    let heading;

    beforeEach(() => {
      toggler = mount(
        <AccordionItem title="A heading">
          Lorem ipsum.
          <input className="testInput" />
        </AccordionItem>
      );
      heading = toggler.find(`button.${prefix}--accordion__heading`);
    });

    it('should close open AccordionItem when using Esc', () => {
      toggler.setState({ open: true });
      heading.simulate('keydown', { which: 27 });
      expect(toggler.state().open).toEqual(false);
    });

    it('should not close if Esc keypress is made in a child element', () => {
      toggler.setState({ open: true });
      const input = toggler.find('.testInput');
      input.simulate('keydown', { which: 27 });
      expect(toggler.state().open).toEqual(true);
    });

    afterEach(() => {
      toggler.setState({ open: false });
    });
  });
});
