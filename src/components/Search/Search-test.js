import React from 'react';
import Icon from '../Icon';
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

    describe('input', () => {
      it('renders as expected', () => {
        expect(textInput.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(textInput.hasClass('bx--search-input')).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(textInput.props().type).toEqual('text');
        wrapper.setProps({ type: 'email' });
        expect(wrapper.find('input').props().type).toEqual('email');
      });

      it('should set value as expected', () => {
        expect(textInput.props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: 'test' });
        expect(wrapper.find('input').props().defaultValue).toEqual('test');
        expect(wrapper.find('input').props().value).toEqual(undefined);
      });

      it('should set placeholder as expected', () => {
        expect(textInput.props().placeholder).toEqual('');
        wrapper.setProps({ placeHolderText: 'Enter text' });
        expect(wrapper.find('input').props().placeholder).toEqual('Enter text');
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass('bx--label')).toEqual(true);
      });

      it('should set label as expected', () => {
        expect(wrapper.props().label).toEqual('Search Field');
        wrapper.setProps({ label: 'Email Input' });
        expect(wrapper.props().label).toEqual('Email Input');
      });
    });

    describe('Large Search', () => {
      describe('buttons', () => {
        const btns = wrapper.find('button');
        const sortBtn = btns.first();

        it('should be two buttons', () => {
          expect(btns.length).toBe(2);
        });

        it('should have type="button"', () => {
          const type1 = btns
            .first()
            .instance()
            .getAttribute('type');
          const type2 = btns
            .last()
            .instance()
            .getAttribute('type');
          expect(type1).toEqual('button');
          expect(type2).toEqual('button');
        });

        it('has expected class for sort button', () => {
          expect(sortBtn.hasClass('bx--search-button')).toEqual(true);
        });
      });

      describe('icons', () => {
        it('renders "search--glyph" icon', () => {
          const icons = wrapper.find(Icon);
          expect(icons.at(0).props().name).toEqual('search--glyph');
        });

        it('renders four Icons', () => {
          wrapper.setProps({ small: false });
          const icons = wrapper.find(Icon);
          expect(icons.length).toEqual(4);
        });

        it('should use "filter--glyph" icon for sort button', () => {
          const icon = wrapper.find(Icon).at(2);
          expect(icon.props().name).toEqual('filter--glyph');
        });

        it('should use "list" icon for toggle button', () => {
          const icon = wrapper.find(Icon).at(3);
          expect(icon.props().name).toEqual('list');
        });

        it('should use "grid" icon when format state is not "list"', () => {
          wrapper.setState({ format: 'not-list' });
          const icon = wrapper.find(Icon).at(3);
          expect(icon.props().name).toEqual('grid');
        });
      });
    });

    describe('Small Search', () => {
      const small = mount(
        <Search id="test" small className="extra-class" label="Search Field" />
      );

      const smallContainer = small.find('[role="search"]');

      it('renders correct search icon', () => {
        const icons = small.find(Icon);
        expect(icons.at(0).props().name).toEqual('search--glyph');
      });

      it('should have the expected small class', () => {
        expect(smallContainer.hasClass('bx--search--sm')).toEqual(true);
      });

      it('should not have buttons', () => {
        const btn = small.find('button');
        expect(btn.length).toEqual(0);
      });

      it('renders one Icon', () => {
        const icons = small.find(Icon);
        expect(icons.length).toEqual(2);
      });
    });
  });

  describe('events', () => {
    describe('enabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <Search id="test" onClick={onClick} onChange={onChange} />
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

    describe('enabled toggling layout', () => {
      const wrapper = mount(<Search id="test" />);

      it('should default to "list" layout', () => {
        const icon = wrapper.find(Icon).at(3);
        expect(icon.props().name).toEqual('list');
      });

      it('should toggle layout to "grid" when clicked', () => {
        const button = wrapper.find('button').at(1);
        button.simulate('click');
        const icon = wrapper.find(Icon).at(3);
        expect(icon.props().name).toEqual('grid');
      });
      it('should toggle layout to "list" when clicked and currently set to "grid"', () => {
        const button = wrapper.find('button').at(1);
        wrapper.setState({
          format: 'grid',
        });
        button.simulate('click');
        const icon = wrapper.find(Icon).at(3);
        expect(icon.props().name).toEqual('list');
      });
    });
  });
});
