/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Slider from './Slider';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';

const prefix = 'cds';
const inputAriaValue = 'slider-input-aria-label-value';
const initialValue = 50;
const defaultSliderValue = 1;
const onBlur = jest.fn();
const onChange = jest.fn();
const onClick = jest.fn();
const onRelease = jest.fn();
const onKeyDown = jest.fn();

const renderSlider = ({
  value = defaultSliderValue,
  min = 1,
  max = 3,
  step = 1,
  ...rest
} = {}) =>
  render(<Slider value={value} min={min} max={max} step={step} {...rest} />);

describe('Slider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('behaves as expected - Component API', () => {
    it('should render children as expected', () => {
      renderSlider({ ariaLabelInput: inputAriaValue });
      expect(screen.getByLabelText(inputAriaValue)).toBeInTheDocument();
    });

    it('should apply the expected classes', () => {
      const labelTextValue = 'slider label text';
      const { container } = renderSlider({ labelText: labelTextValue });
      expect(screen.getByRole('slider')).toHaveClass(
        `${prefix}--slider__thumb`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--form-item`);
      expect(
        screen.getByLabelText(labelTextValue, { selector: 'input' })
      ).toBeInTheDocument();
    });

    it('should render extra classes passed in via className', () => {
      const customSliderClass = 'slider-custom-class';
      const { container } = renderSlider({ className: customSliderClass });
      expect(container.firstChild).toHaveClass(customSliderClass);
    });

    it('should be able to apply a disabled state', () => {
      renderSlider({ disabled: true, ariaLabelInput: inputAriaValue });
      expect(screen.getByLabelText(inputAriaValue)).toBeDisabled();
      expect(screen.getByRole('presentation')).toHaveClass(
        `${prefix}--slider--disabled`
      );
    });

    it('should be able to apply a warning state', () => {
      renderSlider({
        warn: true,
        ariaLabelInput: inputAriaValue,
        warnText: 'Warning message',
      });
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('should be able to apply a invalid state', () => {
      renderSlider({
        invalid: true,
        ariaLabelInput: inputAriaValue,
        invalidText: 'Error message',
      });
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should be able to set value via props', () => {
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      const wrapperElement = screen.getByRole('presentation');
      expect(parseInt(inputElement.getAttribute('value'))).toEqual(
        initialValue
      );
      expect(parseInt(wrapperElement.getAttribute('value'))).toEqual(
        initialValue
      );
    });

    // ArrowRight is not triggering change in slider, possibly due to userEvent bug
    it.skip('should change the value upon interacting with the slider', async () => {
      const { keyboard, click } = userEvent;
      renderSlider({
        onClick,
        onChange,
      });
      // Click events should fire
      const theSlider = screen.getByRole('slider');
      await click(theSlider);
      expect(onClick).toHaveBeenCalledTimes(1);
      await keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith({ value: 2 });
    });

    it('should accurately position slider on mount', () => {
      renderSlider({ value: 50, max: 100, min: 0 });
      expect(screen.getByRole('slider')).toHaveStyle({ left: '50%' });
    });

    it('marks input field as hidden if hidden via props', () => {
      const { container } = renderSlider({
        ariaLabelInput: inputAriaValue,
        hideTextInput: true,
      });
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const inputElement = container.querySelector(
        `.${prefix}--text-input.${prefix}--slider-text-input`
      );
      expect(inputElement).toHaveAttribute('type', 'hidden');
    });

    it('allows user to set invalid value when typing in input field', async () => {
      const { type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
        onChange,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      const slider = screen.getByRole('slider');

      await userEvent.clear(inputElement);
      await type(inputElement, '999');
      expect(parseInt(slider.getAttribute('aria-valuenow'))).toEqual(999);
      expect(onChange).toHaveBeenLastCalledWith({ value: 999 });
    });

    it('sets correct state when typing a valid value in input field', async () => {
      const { type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
        onChange,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);

      await userEvent.clear(inputElement);
      await type(inputElement, '12');
      expect(onChange).toHaveBeenLastCalledWith({ value: 12 });
    });

    it('should check for the invalid class on the input', async () => {
      const { type, tab } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      await tab(); // Brings focus to slider
      await tab(); // Brings focus to input
      await type(inputElement, '{selectall}101');
      await tab(); // Need to tab away from input for invalid class to be applied
      expect(inputElement).toHaveClass(`${prefix}--text-input--invalid`);
    });

    it('should apply the given id to the element with role of slider', () => {
      const testId = 'slider-test-custom-id';
      renderSlider({ id: testId });
      expect(screen.getByRole('slider').id).toEqual(testId);
    });

    it('should apply a custom input type', () => {
      const customInputType = 'text';
      renderSlider({
        ariaLabelInput: inputAriaValue,
        inputType: customInputType,
      });
      expect(screen.getByLabelText(inputAriaValue).type).toEqual(
        customInputType
      );
    });

    it('should apply a custom input name', () => {
      const customInputName = 'Custom input name value';
      renderSlider({ ariaLabelInput: inputAriaValue, name: customInputName });
      expect(screen.getByLabelText(inputAriaValue).name).toEqual(
        customInputName
      );
    });

    it('should mark an empty input as invalid when using the required prop', async () => {
      const customInputName = 'Custom input name value';
      const { tab, type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        name: customInputName,
        required: true,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      await tab(); // Brings focus to slider
      await tab(); // Brings focus to input
      await type(inputElement, '{selectall}{backspace}');
      await tab();
      expect(inputElement).toHaveClass(`${prefix}--text-input--invalid`);
    });

    it('should respect readOnly prop', async () => {
      const { click, type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        onClick,
        onChange,
        readOnly: true,
      });

      // Click events should fire
      const theSlider = screen.getByRole('slider');
      await click(theSlider);
      expect(onClick).toHaveBeenCalledTimes(1);
      await type(theSlider, '{ArrowRight}');
      const theInput = screen.getByRole('spinbutton');
      await type(theInput, '{selectall}3');
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    describe('Error handling, expected behavior from event handlers', () => {
      it('handles non-number typed into input field', async () => {
        const { type, tab } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          value: initialValue,
          max: 100,
          onChange,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
      });

      it('gracefully tolerates empty event passed to _onDrag', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderSlider({
          ariaLabelInput: inputAriaValue,
          value: 1,
          max: 100,
          onChange,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(theSlider);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('gracefully tolerates empty event passed to onChange', async () => {
        const { type, tab } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          value: initialValue,
          max: 100,
          onChange,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should call onBlur as expected', async () => {
        const { type, tab } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          value: 10,
          max: 100,
          onBlur,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{Space}');
        await tab(); // Brings focus out of input
        expect(onBlur).toHaveBeenCalledTimes(2);
      });

      it('should call onKeyDown as expected', async () => {
        const { type, click } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          onKeyDown,
        });
        const theSlider = screen.getByRole('slider');
        await click(theSlider);
        await type(theSlider, '{ArrowRight}');
        await type(theSlider, '{ArrowRight}');
        expect(onKeyDown).toHaveBeenCalledTimes(2);
      });

      // skipping until userEvent fixes bug https://github.com/testing-library/user-event/issues/966
      it.skip('should call onKeyDown and properly handle the stepMultiplier prop', async () => {
        const { keyboard, click } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          max: 100,
          onChange,
          stepMultiplier: 10,
        });
        const theSlider = screen.getByRole('slider');
        await click(theSlider);
        await keyboard('{Shift>}{ArrowRight}{/ArrowRight}{/Shift}');
        expect(onChange).toHaveBeenLastCalledWith({
          value: 11,
        });
      });

      it('should gracefully handle non-numeric keys', async () => {
        const { tab, type } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          max: 100,
          onChange,
          stepMultiplier: 10,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{selectall}a');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('Disabled state', () => {
      it('should do nothing when trying to type in the input', async () => {
        const { tab, type } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          max: 100,
          onChange: onChange,
          disabled: true,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '1');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should do nothing when trying to drag', () => {
        const { mouseDown, mouseMove, mouseUp } = fireEvent;
        const { container } = renderSlider({
          onChange,
          ariaLabelInput: inputAriaValue,
          max: 100,
          disabled: true,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 0 });
        expect(onChange).not.toHaveBeenCalled();
        mouseMove(container.firstChild, { clientX: 0 });
        expect(onChange).not.toHaveBeenCalled();
        mouseUp(theSlider);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should not change slider value when using arrow key', async () => {
        const { click, type } = userEvent;
        renderSlider({ disabled: true });
        const slider = screen.getByRole('slider');
        await click(slider);
        await type(slider, '{ArrowRight}');
        expect(parseInt(slider.getAttribute('aria-valuenow'))).toEqual(
          defaultSliderValue
        );
      });
    });

    describe('Supporting label', () => {
      it('concatenates the value and the label by default', () => {
        const { container } = renderSlider({
          min: 0,
          minLabel: 'min',
          max: 100,
          maxLabel: 'max',
          value: 50,
        });
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const rangeLabels = container.querySelectorAll(
          `.${prefix}--slider__range-label`
        );
        expect(rangeLabels[0]).toHaveTextContent('0min');
        expect(rangeLabels[1]).toHaveTextContent('100max');
      });

      it('supports custom formatting of the label', () => {
        const { container } = renderSlider({
          min: 0,
          minLabel: 'min',
          max: 100,
          maxLabel: 'max',
          value: 50,
          formatLabel: (value, label) => `${value}-${label}`,
        });
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const rangeLabels = container.querySelectorAll(
          `.${prefix}--slider__range-label`
        );
        expect(rangeLabels[0]).toHaveTextContent('0-min');
        expect(rangeLabels[1]).toHaveTextContent('100-max');
      });
    });

    describe('Key/mouse event processing', () => {
      // ArrowRight is not triggering change in slider, possibly due to userEvent bug
      it.skip('sets correct state from event with arrow keys', async () => {
        const { type, click } = userEvent;
        renderSlider({
          onClick,
          onChange,
          min: 0,
          max: 100,
        });
        // Click events should fire
        const theSlider = screen.getByRole('slider');
        await click(theSlider);
        expect(onClick).toHaveBeenCalledTimes(1);
        await type(theSlider, '{ArrowRight}');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 1,
        });
        await type(theSlider, '{ArrowLeft}');
        expect(onChange).toHaveBeenCalledTimes(3);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 0,
        });
        await type(theSlider, '{ArrowUp}');
        expect(onChange).toHaveBeenCalledTimes(4);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 1,
        });
        await type(theSlider, '{ArrowDown}');
        expect(onChange).toHaveBeenCalledTimes(5);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 0,
        });
      });

      it('sets correct state from event with a clientX in a mousemove', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderSlider({
          onChange,
          min: 0,
          max: 100,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(theSlider);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 100,
        });
      });

      it('should call release', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderSlider({
          onRelease,
          min: 0,
          max: 100,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(theSlider);
        expect(onRelease).toHaveBeenCalled();
      });

      it('should not call onRelease', () => {
        const { mouseDown, mouseMove } = fireEvent;
        const { container } = renderSlider({
          onRelease,
          min: 0,
          max: 100,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        expect(onRelease).not.toHaveBeenCalled();
      });
    });
  });
});
