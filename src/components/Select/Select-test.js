import React from 'react';
import Icon from '../Icon';
import Select from '../Select';
import SelectItem from '../SelectItem';
import SelectSkeleton from '../Select/Select.Skeleton';
import { mount, shallow } from 'enzyme';

describe('Select', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Select id="testing" labelText="Select" className="extra-class">
        <SelectItem />
        <SelectItem />
      </Select>
    );

    const selectContainer = wrapper.find('.bx--form-item > div');
    const label = wrapper.find('label');
    const select = wrapper.find('select');

    describe('selectContainer', () => {
      it('renders a container', () => {
        expect(selectContainer.length).toEqual(1);
      });

      it('renders the down arrow icon', () => {
        expect(selectContainer.find(Icon).length).toEqual(1);
      });

      it('should use correct icon', () => {
        const icon = wrapper.find(Icon);
        expect(icon.props().name).toEqual('caret--down');
      });

      it('has the expected classes', () => {
        expect(selectContainer.hasClass('bx--select')).toEqual(true);
      });

      it('applies extra classes specified via className', () => {
        expect(selectContainer.hasClass('extra-class')).toEqual(true);
      });

      it('has the expected default iconDescription', () => {
        expect(wrapper.props().iconDescription).toEqual('open list of options');
      });

      it('adds new iconDescription when passed via props', () => {
        wrapper.setProps({ iconDescription: 'new description' });
        expect(wrapper.props().iconDescription).toEqual('new description');
      });

      it('should have iconDescription match Icon component description prop', () => {
        const matches =
          wrapper.props().iconDescription ===
          wrapper.find(Icon).props().description;
        expect(matches).toEqual(true);
      });

      it('should specify light select as expected', () => {
        expect(wrapper.props().light).toEqual(false);
        wrapper.setProps({ light: true });
        expect(wrapper.props().light).toEqual(true);
      });
    });

    describe('select', () => {
      it('renders a select', () => {
        expect(select.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(select.hasClass('bx--select-input')).toEqual(true);
      });

      it('has the expected id', () => {
        expect(select.props().id).toEqual('testing');
      });

      it('should set defaultValue as expected', () => {
        wrapper.setProps({ defaultValue: 'select-1' });
        expect(wrapper.find('select').props().defaultValue).toEqual('select-1');
      });

      it('should set disabled as expected', () => {
        expect(select.props().disabled).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('select').props().disabled).toEqual(true);
      });

      it('renders children as expected', () => {
        expect(select.props().children.length).toEqual(2);
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass('bx--label')).toEqual(true);
      });

      it('has the expected htmlFor value', () => {
        expect(label.props().htmlFor).toEqual('testing');
      });

      it('renders children as expected', () => {
        expect(label.props().children).toEqual('Select');
      });
    });
  });
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Select id="testing" labelText="Select" className="extra-class" inline>
        <SelectItem />
        <SelectItem />
      </Select>
    );

    const selectContainer = wrapper.find('.bx--form-item > div');

    it('has the expected classes', () => {
      expect(selectContainer.hasClass('bx--select--inline')).toEqual(true);
    });
  });
});

describe('SelectSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SelectSkeleton />);

    const select = wrapper.find('.bx--select');

    it('Has the expected classes', () => {
      expect(select.hasClass('bx--skeleton')).toEqual(true);
    });
  });
});
