import React from 'react';
import Search from '../Search';
import { mount, shallow } from 'enzyme';

describe('Search', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <Search id="test" className="extra-class" label="Search Field" />
    );

    const label = wrapper.find('label');
    const textInput = wrapper.find('input');
    const container = wrapper.find('[role="search"]');

    describe('container', () => {
      it('should add extra classes that are passed via className', () => {
        expect(container.hasClass('extra-class')).toEqual(true);
      });
      it('should have the role of search', () => {
        expect(container.props().role).toEqual('search');
      });
    });

    describe('Icon', () => {
      it('renders two Icon components', () => {
        const icons = wrapper.find('Icon');
        expect(icons.length).toEqual(2);
      });

      it('should have a search icon', () => {
        const icons = wrapper.find('Icon');
        const search = icons.at(0);
        expect(search.props().name).toEqual('search');
        expect(search.props().className).toEqual('bx--search__icon--magnifier');
      });
    });

    describe('buttons', () => {
      const btns = wrapper.find('button');

      it('should be two buttons', () => {
        expect(btns.length).toBe(2);
      });

      describe('sort button', () => {
        const btn = btns.first();
        it('first button should be a sort button', () => {
          expect(btn.props().className).toEqual('bx--search__sort');
          expect(btn.props().type).toEqual('button');
        });

        it('sort button should have an arrows icon', () => {
          const sort = btn.find('Icon');
          expect(sort.length).toBe(1);
          expect(sort.props().name).toEqual('arrows');
          expect(sort.props().className).toEqual('bx--search__icon');
        });
      });

      describe('toggle-layout button', () => {
        const btn = btns.last();
        it('last button should be a toggle-layout button', () => {
          expect(btn.props().className).toEqual('bx--search__toggle-layout');
          expect(btn.props().type).toEqual('button');
        });
      });
    });

    describe('input', () => {
      it('renders as expected', () => {
        expect(textInput.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(textInput.hasClass('bx--search__input')).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(textInput.props().type).toEqual('search');
        wrapper.setProps({ type: 'email' });
        expect(textInput.props().type).toEqual('email');
      });

      it('should set value as expected', () => {
        expect(textInput.props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: 'test' });
        expect(textInput.props().defaultValue).toEqual('test');
      });

      it('should set placeholder as expected', () => {
        expect(textInput.props().placeholder).toEqual('');
        wrapper.setProps({ placeHolderText: 'Enter text' });
        expect(textInput.props().placeholder).toEqual('Enter text');
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass('bx--search__label')).toEqual(true);
      });

      it('should set label as expected', () => {
        expect(wrapper.props().label).toEqual('Search Field');
        wrapper.setProps({ label: 'Email Input' });
        expect(wrapper.props().label).toEqual('Email Input');
      });
    });

    describe('small variant', () => {
      const small = mount(
        <Search id="test" small className="extra-class" label="Search Field" />
      );
      const smallContainer = small.find('[role="search"]');
      it('should have the appropriate small class', () => {
        expect(smallContainer.hasClass('bx--search--sm')).toEqual(true);
      });
      it('should not have  buttons', () => {
        const btn = small.find('button');
        expect(btn.length).toEqual(0);
      });
    });
  });

  describe('events', () => {
    describe('enabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <Search
          id="test"
          onClick={onClick}
          onChange={onChange}
        />
      );

      const input = wrapper.find('input');
      const eventObject = {
        target: {
          defaultValue: 'test',
        },
      };

      it('should invoke onClick when input is clicked', () => {
        input.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should invoke onChange when input value is changed', () => {
        input.simulate('change', eventObject);
        expect(onChange).toBeCalledWith(eventObject);
      });
    });
  });
});
