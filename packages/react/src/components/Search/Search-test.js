/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Search16 from '@carbon/icons-react/lib/search/16';
import Close20 from '@carbon/icons-react/lib/close/20';
import Search from '../Search';
import SearchSkeleton from '../Search/Search.Skeleton';
import { mount, shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Search', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
      />
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
        expect(textInput.hasClass(`${prefix}--search-input`)).toEqual(true);
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
        expect(label.hasClass(`${prefix}--label`)).toEqual(true);
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

        it('should be one button', () => {
          expect(btns.length).toBe(1);
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
      });

      describe('icons', () => {
        it('renders "search" icon', () => {
          const icons = wrapper.find(Search16);
          expect(icons.length).toBe(1);
        });

        it('renders two Icons', () => {
          wrapper.setProps({ small: false });
          const iconTypes = [Search16, Close20];
          const icons = wrapper.findWhere(n => iconTypes.includes(n.type()));
          expect(icons.length).toEqual(2);
        });
      });
    });

    describe('Small Search', () => {
      const small = mount(
        <Search
          id="test"
          small
          className="extra-class"
          label="Search Field"
          labelText="testlabel"
        />
      );

      const smallContainer = small.find('[role="search"]');

      it('renders correct search icon', () => {
        const icons = small.find(Search16);
        expect(icons.length).toBe(1);
      });

      it('should have the expected small class', () => {
        expect(smallContainer.hasClass(`${prefix}--search--sm`)).toEqual(true);
      });

      it('should only have 1 button (clear)', () => {
        const btn = small.find('button');
        expect(btn.length).toEqual(1);
      });

      it('renders two Icons', () => {
        const iconTypes = [Search16, Close20];
        const icons = wrapper.findWhere(n => iconTypes.includes(n.type()));
        expect(icons.length).toEqual(2);
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
          labelText="testlabel"
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

describe('SearchSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SearchSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--search--xl`)).toEqual(true);
    });
  });
});

describe('SearchSkeleton Small', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SearchSkeleton small />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--search--sm`)).toEqual(true);
    });
  });
});

describe('Detecting change in value from props', () => {
  it('changes the hasContent state upon change in props', () => {
    const wrapper = shallow(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        value="foo"
      />
    );
    expect(wrapper.state().hasContent).toBeTruthy();
    wrapper.setProps({ value: '' });
    expect(wrapper.state().hasContent).toBeFalsy();
  });

  it('avoids change the hasContent state upon setting props, unless the value actually changes', () => {
    const wrapper = shallow(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        value="foo"
      />
    );
    expect(wrapper.state().hasContent).toBeTruthy();
    wrapper.setState({ hasContent: false });
    wrapper.setProps({ value: 'foo' });
    expect(wrapper.state().hasContent).toBeFalsy();
  });
});
