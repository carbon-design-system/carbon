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
const initialValueLower = 10;
const initialValueUpper = 90;
const defaultSliderValue = 1;
const defaultSliderValueUpper = 3;
const defaultMin = 1;
const defaultMax = 3;
const defaultStep = 1;
const defaultAriaLabelInput = 'Lower bound';
const defaultAriaLabelInputUpper = 'Upper bound';
const onBlur = jest.fn();
const onChange = jest.fn();
const onClick = jest.fn();
const onRelease = jest.fn();
const onKeyDown = jest.fn();

const renderSlider = ({
  value = defaultSliderValue,
  min = defaultMin,
  max = defaultMax,
  step = defaultStep,
  ...rest
} = {}) =>
  render(
    <Slider
      labelText="Slider"
      value={value}
      min={min}
      max={max}
      step={step}
      invalidText="Invalid"
      warnText="Warning"
      {...rest}
    />
  );

const renderTwoHandleSlider = ({
  unstable_valueUpper = defaultSliderValueUpper,
  ariaLabelInput = defaultAriaLabelInput,
  unstable_ariaLabelInputUpper = defaultAriaLabelInputUpper,
  ...rest
} = {}) =>
  renderSlider({
    unstable_valueUpper,
    ariaLabelInput,
    unstable_ariaLabelInputUpper,
    ...rest,
  });

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

    it('should change the value upon interacting with the slider', async () => {
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
      expect(screen.getByRole('slider')).toHaveStyle({
        insetInlineStart: '50%',
      });
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

    it('should check for auto-correct on the input', async () => {
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
      expect(inputElement).not.toHaveClass(`${prefix}--text-input--invalid`);
      expect(parseInt(inputElement.getAttribute('value'))).toEqual(100);
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

      it('should call onKeyDown and properly handle the stepMultiplier prop', async () => {
        const { keyboard, click } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          max: 100,
          onChange,
          stepMultiplier: 10,
        });
        const theSlider = screen.getByRole('slider');
        await click(theSlider);
        await keyboard('{Shift>}{ArrowRight}{/Shift}');
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
      it('sets correct state from event with arrow keys', async () => {
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
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 2,
        });
        await type(theSlider, '{ArrowLeft}');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 1,
        });
        await type(theSlider, '{ArrowUp}');
        expect(onChange).toHaveBeenCalledTimes(3);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 2,
        });
        await type(theSlider, '{ArrowDown}');
        expect(onChange).toHaveBeenCalledTimes(4);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 1,
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

  describe('behaves as expected - Two Handle Slider Component API', () => {
    it('should render children as expected', () => {
      renderTwoHandleSlider();
      const lowerElems = screen.getAllByLabelText(defaultAriaLabelInput);
      expect(lowerElems).toHaveLength(2);
      const upperElems = screen.getAllByLabelText(defaultAriaLabelInputUpper);
      expect(upperElems).toHaveLength(2);
    });

    it('should apply the expected classes', () => {
      const { container } = renderTwoHandleSlider();

      expect(container.firstChild).toHaveClass(`${prefix}--form-item`);

      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      [lowerThumb, upperThumb].forEach((elem) => {
        expect(elem).toHaveClass(`${prefix}--slider__thumb`);
      });
      expect(lowerThumb).toHaveClass(`${prefix}--slider__thumb--lower`);
      expect(upperThumb).toHaveClass(`${prefix}--slider__thumb--upper`);

      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      [lowerInput, upperInput].forEach((elem) =>
        expect(elem).toHaveClass(
          `${prefix}--text-input`,
          `${prefix}--slider-text-input`
        )
      );
      expect(lowerInput).toHaveClass(`${prefix}--slider-text-input--lower`);
      expect(upperInput).toHaveClass(`${prefix}--slider-text-input--upper`);
    });

    it('should be able to apply a disabled state', () => {
      renderTwoHandleSlider({ disabled: true });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      [lowerInput, upperInput].forEach((elem) => expect(elem).toBeDisabled());
    });

    // @todo depends on what we want for warn in a two handle scenario.
    // @see https://github.com/carbon-design-system/carbon/pull/14297#issuecomment-1690593533
    it.todo('should be able to apply a warning state');

    // @todo depends on what we want for invalid in a two handle scenario.
    // @see https://github.com/carbon-design-system/carbon/pull/14297#issuecomment-1690593533
    it.todo('should be able to apply a invalid state');

    it('should be able to set value via props', () => {
      renderTwoHandleSlider({
        ariaLabelInput: 'Lower bound',
        unstable_ariaLabelInputUpper: 'Upper bound',
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
      });
      const lowerInput = screen.getByLabelText(/lower bound/i, {
        selector: 'input',
      });
      const lowerSlider = screen.getByLabelText(/lower bound/i, {
        selector: '[role=slider]',
      });
      const upperInput = screen.getByLabelText(/upper bound/i, {
        selector: 'input',
      });
      const upperSlider = screen.getByLabelText(/upper bound/i, {
        selector: '[role=slider]',
      });

      expect(parseInt(lowerInput.getAttribute('value'))).toEqual(
        initialValueLower
      );
      expect(parseInt(lowerSlider.getAttribute('aria-valuenow'))).toEqual(
        initialValueLower
      );
      expect(parseInt(upperInput.getAttribute('value'))).toEqual(
        initialValueUpper
      );
      expect(parseInt(upperSlider.getAttribute('aria-valuenow'))).toEqual(
        initialValueUpper
      );
    });

    it('should change the value upon interacting with the slider', async () => {
      const { keyboard, click } = userEvent;
      renderTwoHandleSlider({
        onClick,
        onChange,
        value: 10,
        unstable_valueUpper: 90,
        min: 0,
        max: 100,
      });

      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      // Keyboard interactions on the lower thumb.
      await click(lowerThumb);
      expect(lowerThumb).toHaveFocus();
      expect(onClick).toHaveBeenCalledTimes(1);
      await keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 11, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '11');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '11');
      expect(lowerInput).toHaveValue(11);
      await keyboard('{ArrowLeft}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '10');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '10');
      expect(lowerInput).toHaveValue(10);
      await keyboard('{Shift>}{ArrowRight}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 14, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '14');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '14');
      expect(lowerInput).toHaveValue(14);
      await keyboard('{Shift>}{ArrowLeft}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '10');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '10');
      expect(lowerInput).toHaveValue(10);

      // Keyboard interactions on the upper thumb, lets mix it up and do the up
      // and down arrow keys this time.
      await click(upperThumb);
      expect(upperThumb).toHaveFocus();
      await keyboard('{ArrowUp}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 91 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '91');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '91');
      expect(upperInput).toHaveValue(91);
      await keyboard('{ArrowDown}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 90 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '90');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '90');
      expect(upperInput).toHaveValue(90);
      await keyboard('{Shift>}{ArrowUp}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 94 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '94');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '94');
      expect(upperInput).toHaveValue(94);
      await keyboard('{Shift>}{ArrowDown}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 90 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '90');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '90');
      expect(upperInput).toHaveValue(90);
    });

    it('should accurately position handles on mount', () => {
      renderTwoHandleSlider({
        value: 50,
        unstable_valueUpper: 50,
        min: 0,
        max: 100,
      });
      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      expect(lowerThumb).toHaveStyle({ insetInlineStart: '50%' });
      expect(upperThumb).toHaveStyle({ insetInlineStart: '50%' });
    });

    it('marks input field as hidden if hidden via props', () => {
      const { container } = renderTwoHandleSlider({
        hideTextInput: true,
      });
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const [lowerInput, upperInput] = container.querySelectorAll(
        `.${prefix}--text-input.${prefix}--slider-text-input`
      );
      expect(lowerInput).toHaveAttribute('type', 'hidden');
      expect(upperInput).toHaveAttribute('type', 'hidden');
    });

    it('allows user to set invalid value when typing in input field', async () => {
      const { type } = userEvent;
      renderTwoHandleSlider({
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
        onChange,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const [lowerThumb] = screen.getAllByRole('slider');

      await userEvent.clear(lowerInput);
      await type(lowerInput, '999');
      expect(parseInt(lowerThumb.getAttribute('aria-valuenow'))).toEqual(999);
      expect(onChange).toHaveBeenLastCalledWith({
        value: 999,
        valueUpper: initialValueUpper,
      });
    });

    it('sets correct state when typing a valid value in input field', async () => {
      const { type, clear } = userEvent;
      renderTwoHandleSlider({
        value: initialValue,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
        onChange,
      });

      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });

      await clear(lowerInput);
      await type(lowerInput, '12');
      expect(onChange).toHaveBeenLastCalledWith({
        value: 12,
        valueUpper: initialValueUpper,
      });

      await clear(upperInput);
      await type(upperInput, '60');
      expect(onChange).toHaveBeenLastCalledWith({ value: 12, valueUpper: 60 });
    });

    it('should check for auto-correct on the input', async () => {
      const { type, tab, keyboard, clear } = userEvent;
      renderTwoHandleSlider({
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
        onChange,
      });

      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });

      // Test the lower input by tabbing away to trigger autocorrect.
      await clear(lowerInput);
      await type(lowerInput, '999');
      await tab();
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '90');
      expect(onChange).toHaveBeenLastCalledWith({
        value: 90,
        valueUpper: initialValueUpper,
      });
      expect(lowerInput).not.toHaveClass(`${prefix}--text-input--invalid`);
      expect(lowerInput).toHaveValue(90);

      // Test the upper input by hitting Enter to trigger autocorrect.
      await clear(upperInput);
      await type(upperInput, '999');
      await keyboard('{Enter}');
      expect(upperThumb).toHaveAttribute('aria-valuenow', '100');
      expect(onChange).toHaveBeenLastCalledWith({
        value: 90,
        valueUpper: 100,
      });
      expect(upperInput).not.toHaveClass(`${prefix}--text-input--invalid`);
      expect(upperInput).toHaveValue(100);
    });

    it('should not apply the given id to the elements with role of slider', () => {
      const testId = 'slider-test-custom-id';
      renderTwoHandleSlider({ id: testId });
      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      expect(lowerThumb).not.toHaveAttribute('id');
      expect(upperThumb).not.toHaveAttribute('id');
    });

    it('should apply a custom input type', () => {
      const customInputType = 'text';
      renderTwoHandleSlider({
        inputType: customInputType,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      expect(lowerInput).toHaveAttribute('type', customInputType);
      expect(upperInput).toHaveAttribute('type', customInputType);
    });

    it('should apply a custom input name', () => {
      const customInputNameLower = 'myLowerBound';
      const customInputNameUpper = 'myUpperBound';
      renderTwoHandleSlider({
        name: customInputNameLower,
        unstable_nameUpper: customInputNameUpper,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      expect(lowerInput).toHaveAttribute('name', customInputNameLower);
      expect(upperInput).toHaveAttribute('name', customInputNameUpper);
    });

    it('should mark an empty input as invalid when using the required prop', async () => {
      const { tab, clear } = userEvent;
      renderTwoHandleSlider({
        required: true,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });

      expect(lowerInput).toBeRequired();
      expect(upperInput).toBeRequired();
      await clear(lowerInput);
      await tab();
      expect(lowerInput).toHaveClass(`${prefix}--text-input--invalid`);
    });

    it('should respect readOnly prop', async () => {
      const { click, keyboard, type } = userEvent;
      renderTwoHandleSlider({
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        onClick,
        onChange,
        readOnly: true,
      });

      // Click events should fire
      const [lowerThumb] = screen.getAllByRole('slider');
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });

      await click(lowerThumb);
      await keyboard('{ArrowRight}');
      expect(lowerThumb).toHaveFocus();
      expect(lowerInput).toHaveValue(initialValueLower);
      expect(lowerThumb).toHaveAttribute(
        'aria-valuenow',
        `${initialValueLower}`
      );
      await type(lowerInput, '{selectall}20');
      expect(onChange).not.toHaveBeenCalled();
    });

    describe('Error handling, expected behavior from event handlers', () => {
      it('handles non-number typed into input field', async () => {
        const { type, tab } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
          selector: 'input',
        });
        await type(lowerInput, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
        await type(upperInput, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
      });

      it('gracefully tolerates empty event passed to _onDrag', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(lowerThumb);
        expect(onChange).not.toHaveBeenCalled();
        mouseDown(upperThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(upperThumb);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should call onBlur as expected', async () => {
        const { type, tab } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onBlur,
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        await type(lowerInput, '{Space}');
        await tab(); // Brings focus out of input
        expect(onBlur).toHaveBeenCalledTimes(1);
      });

      it('should call onKeyDown as expected', async () => {
        const { click, keyboard } = userEvent;
        renderTwoHandleSlider({
          onKeyDown,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        await click(lowerThumb);
        await keyboard('{ArrowRight}');
        await keyboard('{ArrowRight}');
        await click(upperThumb);
        await keyboard('{ArrowLeft}');
        await keyboard('{ArrowLeft}');
        expect(onKeyDown).toHaveBeenCalledTimes(4);
      });

      it('should gracefully handle non-numeric keys', async () => {
        const { type } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
          inputType: 'text',
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
          selector: 'input',
        });
        await type(lowerInput, '{selectall}a');
        expect(onChange).not.toHaveBeenCalled();
        await type(upperInput, '{selectall}a');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('Disabled state', () => {
      it('should do nothing when trying to type in the input', async () => {
        const { type } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange: onChange,
          disabled: true,
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
          selector: 'input',
        });
        await type(lowerInput, '1');
        expect(onChange).not.toHaveBeenCalled();
        await type(upperInput, '99');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should do nothing when trying to drag', () => {
        const { mouseDown, mouseMove, mouseUp } = fireEvent;
        const { container } = renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange: onChange,
          disabled: true,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(lowerThumb);
        mouseDown(upperThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(upperThumb);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should not change slider value when using arrow key', async () => {
        const { click, type } = userEvent;
        renderTwoHandleSlider({ disabled: true });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        await click(lowerThumb);
        await type(lowerThumb, '{ArrowRight}');
        expect(lowerThumb).toHaveAttribute(
          'aria-valuenow',
          `${defaultSliderValue}`
        );
        await click(upperThumb);
        await type(upperThumb, '{ArrowLeft}');
        expect(upperThumb).toHaveAttribute(
          'aria-valuenow',
          `${defaultSliderValueUpper}`
        );
      });
    });

    describe('Key/mouse event processing', () => {
      it('sets correct state from event with a clientX in a mousemove', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
        });
        const [lowerThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 100 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(lowerThumb);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 90,
          valueUpper: initialValueUpper,
        });
      });

      it('should call release', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          onRelease,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(lowerThumb);
        expect(onRelease).toHaveBeenCalledTimes(1);
        mouseDown(upperThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(upperThumb);
        expect(onRelease).toHaveBeenCalledTimes(2);
      });

      it('should not call onRelease', () => {
        const { mouseDown, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          onRelease,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        expect(onRelease).not.toHaveBeenCalled();

        mouseDown(upperThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        expect(onRelease).not.toHaveBeenCalled();
      });
    });
  });
});
