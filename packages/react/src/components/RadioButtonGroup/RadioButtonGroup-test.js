/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { shallow, mount } from 'enzyme';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';

describe('RadioButtonGroup', () => {
  it('should render `legendText` in a <label>', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const legend = screen.getByText('test', {
      selector: 'legend',
    });
    expect(legend).toBeDefined();
  });

  it('should render `legendText` in a <fieldset>', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const fieldset = screen
      .getByText('test', {
        selector: 'legend',
      })
      .closest('fieldset');
    expect(fieldset).toBeDefined();
  });

  it('should render <RadioButton> as children', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const fieldset = screen
      .getByText('test', {
        selector: 'legend',
      })
      .closest('fieldset');
    expect(fieldset).toContainElement(screen.getByLabelText('test-1'));
    expect(fieldset).toContainElement(screen.getByLabelText('test-2'));
  });

  describe('Component API', () => {
    it('should support a custom className on the <fieldset>', () => {
      render(
        <RadioButtonGroup
          className="custom-class"
          defaultSelected="test-1"
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      const fieldset = screen
        .getByText('test', {
          selector: 'legend',
        })
        .closest('fieldset');
      expect(fieldset).toHaveClass('custom-class');
    });

    it('should support passing in disabled to disable the <fieldset>', () => {
      render(
        <RadioButtonGroup
          defaultSelected="test-1"
          disabled
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );
      const fieldset = screen
        .getByText('test', {
          selector: 'legend',
        })
        .closest('fieldset');
      expect(fieldset).toBeDisabled();
    });

    it('should support `defaultSelected` as a way to select a radio button', () => {
      render(
        <RadioButtonGroup
          defaultSelected="test-1"
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support `valueSelected` as a way to select a radio button', () => {
      const { rerender } = render(
        <RadioButtonGroup valueSelected="test-1" name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );

      rerender(
        <RadioButtonGroup valueSelected="test-2" name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-2')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support a 0 value for `valueSelected` (#9041)', () => {
      render(
        <RadioButtonGroup valueSelected={0} name="test" legendText="test">
          <RadioButton labelText="test-1" value={1} />
          <RadioButton labelText="test-0" value={0} />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-0')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    describe('onChange event', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <RadioButtonGroup onChange={onChange} name="gender">
          <RadioButton labelText="Male" value="male" />
          <RadioButton labelText="Female" value="female" />
        </RadioButtonGroup>
      );

      const firstRadio = wrapper.find(RadioButton).first();
      const args = ['male', 'gender', { test: 'test event' }];

      it('first child should not have checked set initially', () => {
        expect(firstRadio.props().checked).toEqual(false);
      });

      it('invoking onChange sets checked on correct child', () => {
        firstRadio.props().onChange(...args);
        wrapper.update();
        expect(wrapper.find(RadioButton).first().props().checked).toEqual(true);
      });

      it('should invoke onChange with correct arguments', () => {
        expect(onChange).toHaveBeenCalledWith(...args);
      });

      it('calling onChange with same args should not call onChange prop', () => {
        onChange.mockClear();
        firstRadio.props().onChange(...args);
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('Getting derived state from props', () => {
      const wrapper = shallow(
        <RadioButtonGroup
          valueSelected="male"
          defaultSelected="female"
          name="gender">
          <RadioButton labelText="Male" value="male" />
          <RadioButton labelText="Female" value="female" />
        </RadioButtonGroup>
      );

      it('should initialize the current selection from props', () => {
        expect(wrapper.state().selected).toEqual('male');
      });

      it('should change the current selection upon change in props', () => {
        wrapper.setProps({ valueSelected: 'male' });
        wrapper.setState({ selected: 'male' });
        wrapper.setProps({ valueSelected: undefined });
        expect(wrapper.state().selected).toEqual('female');
      });

      it('should avoid change the current selection upon setting props, unless there the value actually changes', () => {
        wrapper.setProps({ valueSelected: 'female' });
        wrapper.setState({ selected: 'male' });
        wrapper.setProps({ valueSelected: 'female' });
        expect(wrapper.state().selected).toEqual('male');
      });
    });
  });
});
