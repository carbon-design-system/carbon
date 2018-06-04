import React from 'react';
import { mount, shallow } from 'enzyme';
import Icon from '../Icon';
import NumberInput from '../NumberInput';
import NumberInputSkeleton from '../NumberInput/NumberInput.Skeleton';

describe('NumberInput', () => {
  describe('should render as expected', () => {
    let wrapper;
    let label;
    let numberInput;
    let container;
    let formItem;
    let icons;

    beforeEach(() => {
      wrapper = mount(
        <NumberInput
          min={0}
          max={100}
          id="test"
          label="Number Input"
          className="extra-class"
          invalidText="invalid text"
        />
      );

      label = wrapper.find('label');
      numberInput = wrapper.find('input');
      container = wrapper.find('.bx--number');
      formItem = wrapper.find('.bx--form-item');
      icons = wrapper.find(Icon);
    });

    describe('input', () => {
      it('renders a numberInput', () => {
        expect(numberInput.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(container.hasClass('bx--number')).toEqual(true);
      });

      it('has renders with form-item wrapper', () => {
        expect(formItem.hasClass('bx--form-item')).toEqual(true);
      });

      it('applies extra classes via className', () => {
        expect(container.hasClass('extra-class')).toEqual(true);
      });

      it('should set a min as expected', () => {
        expect(numberInput.prop('min')).toEqual(0);
        wrapper.setProps({ min: 10 });
        expect(wrapper.find('input').prop('min')).toEqual(10);
      });

      it('should set a max as expected', () => {
        expect(numberInput.prop('max')).toEqual(100);
        wrapper.setProps({ max: 10 });
        expect(wrapper.find('input').prop('max')).toEqual(10);
      });

      it('should set step as expected', () => {
        expect(numberInput.prop('step')).toEqual(1);
        wrapper.setProps({ step: 10 });
        expect(wrapper.find('input').prop('step')).toEqual(10);
      });

      it('should set disabled as expected', () => {
        expect(numberInput.prop('disabled')).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('input').prop('disabled')).toEqual(true);
      });

      it('should set invalid as expected', () => {
        expect(container.prop('data-invalid')).toEqual(undefined);
        wrapper.setProps({ invalid: true });
        expect(wrapper.find('.bx--number').prop('data-invalid')).toEqual(true);
      });

      it('should set invalidText as expected', () => {
        expect(wrapper.find('.bx--form-requirement').length).toEqual(0);
        wrapper.setProps({ invalid: true });
        const invalidText = wrapper.find('.bx--form-requirement');
        expect(invalidText.length).toEqual(1);
        expect(invalidText.text()).toEqual('invalid text');
      });

      it('should specify light number input as expected', () => {
        expect(wrapper.props().light).toEqual(false);
        wrapper.setProps({ light: true });
        expect(wrapper.props().light).toEqual(true);
      });

      describe('initial rendering', () => {
        const getWrapper = (min, max, value) =>
          mount(
            <NumberInput
              min={min}
              max={max}
              value={value}
              id="test"
              label="Number Input"
              className="extra-class"
            />
          );
        const getNumberInput = wrapper => wrapper.find('input');

        it('should set value as expected when value > min', () => {
          const wrapper = getWrapper(-1, 100, 0);
          const numberInput = getNumberInput(wrapper);
          expect(numberInput.prop('value')).toEqual(0);
        });

        it('should set value as expected when min === 0 and value > min', () => {
          const wrapper = getWrapper(0, 100, 1);
          const numberInput = getNumberInput(wrapper);
          expect(numberInput.prop('value')).toEqual(1);
        });

        it('should set value to equal min when value < min', () => {
          let wrapper = getWrapper(5, 100, 0);
          let numberInput = wrapper.find('input');
          expect(numberInput.prop('value')).toEqual(5);
        });

        it('should set value when min is undefined', () => {
          let wrapper = getWrapper(undefined, 100, 5);
          let numberInput = wrapper.find('input');
          expect(numberInput.prop('value')).toEqual(5);
        });

        it('should set invalidText when value is empty string', () => {
          wrapper.setProps({ value: '' });
          const invalidText = wrapper.find('.bx--form-requirement');
          expect(invalidText.length).toEqual(1);
          expect(invalidText.text()).toEqual('invalid text');
        });
      });
    });

    describe('Icon', () => {
      it('renders two Icon components', () => {
        expect(icons.length).toEqual(2);
      });

      it('has the expected default iconDescription', () => {
        expect(wrapper.prop('iconDescription')).toEqual('choose a number');
      });

      it('should use correct icons', () => {
        expect(icons.at(0).prop('name')).toEqual('caret--up');
        expect(icons.at(1).prop('name')).toEqual('caret--down');
      });

      it('adds new iconDescription when passed via props', () => {
        wrapper.setProps({ iconDescription: 'new description' });
        expect(wrapper.prop('iconDescription')).toEqual('new description');
      });

      it('should have iconDescription match Icon component description prop', () => {
        const iconUpText = wrapper.find('.up-icon title').text();
        const iconDownText = wrapper.find('.down-icon title').text();
        const iconDescription = wrapper.prop('iconDescription');

        const matches =
          iconDescription === iconUpText && iconDescription === iconDownText;
        expect(matches).toEqual(true);
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass('bx--label')).toEqual(true);
      });
    });
  });

  describe('events', () => {
    describe('disabled numberInput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <NumberInput id="test" onClick={onClick} onChange={onChange} disabled />
      );

      const input = wrapper.find('input');
      const upArrow = wrapper.find('button.up-icon');
      const downArrow = wrapper.find('button.down-icon');

      it('should be disabled when numberInput is disabled', () => {
        expect(upArrow.prop('disabled')).toEqual(true);
        expect(downArrow.prop('disabled')).toEqual(true);
      });

      it('should not invoke onClick when up arrow is clicked', () => {
        upArrow.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should not invoke onClick when down arrow is clicked', () => {
        downArrow.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should not invoke onChange when numberInput is changed', () => {
        input.simulate('change');
        expect(onChange).not.toBeCalled();
      });
    });

    describe('enabled numberInput', () => {
      let onClick;
      let onChange;
      let input;
      let upArrow;
      let downArrow;
      let wrapper;

      beforeEach(() => {
        onClick = jest.fn();
        onChange = jest.fn();

        wrapper = mount(
          <NumberInput
            id="test"
            onClick={onClick}
            onChange={onChange}
            min={0}
            max={100}
          />
        );

        input = wrapper.find('input');
        upArrow = wrapper.find('Icon.up-icon').closest('button');
        downArrow = wrapper.find('Icon.down-icon').closest('button');
      });

      it('should invoke onClick when numberInput is clicked', () => {
        input.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should invoke onClick when up arrow is clicked', () => {
        upArrow.simulate('click');
        expect(onClick).toBeCalled();
        expect(onClick).toHaveBeenCalledWith(expect.anything(), 'up');
      });

      it('should only increase the value on up arrow click if value is less than max', () => {
        wrapper.setProps({ value: 100 });
        upArrow.simulate('click');
        expect(wrapper.state().value).toEqual(100);
        expect(onClick).not.toBeCalled();
      });

      it('should only decrease the value on down arrow click if value is greater than min', () => {
        wrapper.setProps({ value: 0 });
        downArrow.simulate('click');
        expect(wrapper.state().value).toEqual(0);
        expect(onClick).not.toBeCalled();
      });

      it('should increase by the value of step', () => {
        wrapper.setProps({
          step: 10,
          value: 0,
        });
        expect(wrapper.state().value).toEqual(0);
        upArrow.simulate('click');
        expect(wrapper.state().value).toEqual(10);
      });

      it('should decrease by the value of step', () => {
        wrapper.setProps({
          step: 10,
          value: 100,
        });
        expect(wrapper.state().value).toEqual(100);
        downArrow.simulate('click');
        expect(wrapper.state().value).toEqual(90);
      });

      it('should not invoke onClick when down arrow is clicked and value is 0', () => {
        downArrow.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should invoke onClick when down arrow is clicked and value is above min', () => {
        wrapper.setProps({ value: 1 });
        downArrow.simulate('click');
        expect(onClick).toBeCalled();
        expect(onChange).toBeCalled();
        expect(onClick).toHaveBeenCalledWith(expect.anything(), 'down');
      });

      it('should invoke onChange when numberInput is changed', () => {
        input.simulate('change');
        expect(onChange).toBeCalled();
        expect(onChange).toHaveBeenCalledWith(expect.anything());
      });
    });
  });
});

describe('NumberInputSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<NumberInputSkeleton />);

    const container = wrapper.find('.bx--number');
    const label = wrapper.find('.bx--label');

    it('has the expected classes', () => {
      expect(container.hasClass('bx--skeleton')).toEqual(true);
      expect(label.hasClass('bx--skeleton')).toEqual(true);
    });
  });
});
