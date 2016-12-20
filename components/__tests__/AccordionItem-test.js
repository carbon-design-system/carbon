import React from 'react';
import AccordionItem from '../AccordionItem';
import Icon from '../Icon';
import { shallow, mount } from 'enzyme';

describe('AccordionItem', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <AccordionItem title="A heading" className="extra-class">
        Lorem ipsum.
      </AccordionItem>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.bx--accordion__content').text()).toBe('Lorem ipsum.');
    });

    it('renders heading as expected', () => {
      const heading = wrapper.find('.bx--accordion__heading');
      expect(heading.length).toBe(1);
      expect(heading.find(Icon).length).toBe(1);
      expect(heading.find('.bx--accordion__title').text()).toBe('A heading');
    });

    it('should use correct icon', () => {
      const heading = wrapper.find('.bx--accordion__heading');
      expect(heading.find(Icon).props().name).toEqual('chevron--right');
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--accordion__item')).toEqual(true);
      expect(wrapper.hasClass('bx--accordion__item--active')).toEqual(false);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('can be open by default', () => {
      const openItem = shallow(
        <AccordionItem title="A heading" open>
          Lorem ipsum.
        </AccordionItem>
      );
      expect(openItem.hasClass('bx--accordion__item--active')).toEqual(true);
    });

    it('should apply the active class when the state is open', () => {
      const toggler = mount(<AccordionItem />);
      const item = toggler.find('li');
      expect(item.hasClass('bx--accordion__item--active')).toEqual(false);
      toggler.setState({ open: true });
      expect(item.hasClass('bx--accordion__item--active')).toEqual(true);
    });
  });

  describe('Check that functions passed in as props are called', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <AccordionItem onClick={onClick} />
    );

    it('should call onClick', () => {
      wrapper.simulate('click');
      expect(onClick).toBeCalled();
    });
  });

  describe('Check that clicking the item toggles its open state', () => {
    const toggler = mount(
      <AccordionItem title="A heading">
        Lorem ipsum.
      </AccordionItem>
    );

    it('should set state to open when clicked', () => {
      expect(toggler.state().open).toBeUndefined();
      toggler.simulate('click');
      expect(toggler.state().open).toEqual(true);
    });
  });
});
