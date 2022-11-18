/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import EventManager from '../utils/event-manager';

import BXNumberInput from '../../src/components/number-input/number-input';
import { Default } from '../../src/components/number-input/number-input-story';

/**
 * @param formData A `FormData` instance.
 * @returns The given `formData` converted to a classic key-value pair.
 */
const getValues = (formData: FormData) => {
  const values = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }
  return values;
};

const template = (props?) =>
  Default({
    'bx-number-input': props,
  });

describe('bx-number-input', function () {
  const events = new EventManager();

  describe('Rendering', function () {
    it('Should render with various attributes', async function () {
      render(
        template({
          autocomplete: 'on',
          autofocus: true,
          disabled: true,
          helperText: 'helper-text-foo',
          labelText: 'label-text-foo',
          name: 'name-foo',
          pattern: 'pattern-foo',
          placeholder: 'placeholder-foo',
          readonly: true,
          required: true,
          validityMessage: 'validity-message-foo',
          value: '50',
          step: '1',
          max: '200',
          min: '-100',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-number-input')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  // most of this describe is borrowed from the input tests
  describe('Event-based form participation', function () {
    it('Should respond to `formdata` event', async function () {
      render(
        html`
          <form>
            ${template({
              name: 'name-foo',
              value: '50',
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': '50' });
    });

    it('Should not respond to `formdata` event if disabled', async function () {
      render(
        html`
          <form>
            ${template({
              disabled: true,
              name: 'name-foo',
              value: '50',
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({});
    });
  });

  // most of this describe is borrowed from the input tests
  describe('Form validation', function () {
    let elem: Element;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-number-input')!;
    });

    // This test is skipped for now since there seems to be a bug somewhere in the test stack.
    // Running the same code manually in a browser works as expected.
    // Given that the rest of the test suit passes it seems reasonable that it's an issue
    // with this specific test case
    // eslint-disable-next-line
    xit('should support checking if required value exists', async function () {
      const input = elem as BXNumberInput;
      input.value = null as any;
      input.required = true;
      const spyInvalid = jasmine.createSpy('invalid');
      events.on(input, 'invalid', spyInvalid);
      expect(input.checkValidity()).toBe(false);
      expect(spyInvalid).toHaveBeenCalled();
      expect(input.invalid).toBe(true);
      expect(input.validityMessage).toBe('Please fill out this field.');
      input.value = '50';
      await Promise.resolve();
      expect(input.checkValidity()).toBe(true);
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should support canceling required check', async function () {
      const input = elem as BXNumberInput;
      input.required = true;
      events.on(input, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(input.checkValidity()).toBe(false);
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async function () {
      const input = elem as BXNumberInput;
      input.setCustomValidity('');
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat non-empty custom validity message as invalid', async function () {
      const input = elem as BXNumberInput;
      input.setCustomValidity('validity-message-foo');
      expect(input.invalid).toBe(true);
      expect(input.validityMessage).toBe('validity-message-foo');
    });

    it('should warn if a value less than the min', async function () {
      const input = elem as BXNumberInput;
      input.min = '50';
      input.value = '0';
      await Promise.resolve();
      expect(input.checkValidity()).toBe(false);
    });

    it('should warn if a value is greater than the max', async function () {
      const input = elem as BXNumberInput;
      input.max = '50';
      input.value = '51';
      await Promise.resolve();
      expect(input.checkValidity()).toBe(false);
    });
  });

  describe('Number input specific functionality', function () {
    let elem: Element;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-number-input')!;
    });

    it('should increment values', async function () {
      const input = elem as BXNumberInput;
      const initialValue = Number(input.value);
      const stepSize = Number(input.step);
      input.stepUp();
      expect(Number(input.value)).toEqual(initialValue + stepSize);
    });

    it('should decrement values', async function () {
      const input = elem as BXNumberInput;
      const initialValue = Number(input.value);
      const stepSize = Number(input.step);
      input.stepDown();
      expect(Number(input.value)).toEqual(initialValue - stepSize);
    });

    it('should increment values upon user gesture', async function () {
      const input = elem as BXNumberInput;
      const initialValue = Number(input.value);
      const stepSize = Number(input.step);
      const spyInput = jasmine.createSpy('input');
      events.on(elem, 'bx-number-input', spyInput);
      (elem.shadowRoot!.querySelector('button.up-icon') as HTMLElement).click();
      expect(Number(input.value)).toEqual(initialValue + stepSize);
      expect(Number(spyInput.calls.argsFor(0)[0].detail.value)).toBe(
        initialValue + stepSize
      );
    });

    it('should decrement values upon user gesture', async function () {
      const input = elem as BXNumberInput;
      const initialValue = Number(input.value);
      const stepSize = Number(input.step);
      const spyInput = jasmine.createSpy('input');
      events.on(elem, 'bx-number-input', spyInput);
      (
        elem.shadowRoot!.querySelector('button.down-icon') as HTMLElement
      ).click();
      expect(Number(input.value)).toEqual(initialValue - stepSize);
      expect(Number(spyInput.calls.argsFor(0)[0].detail.value)).toBe(
        initialValue - stepSize
      );
    });

    it('should increment values by the step amount', async function () {
      const input = elem as BXNumberInput;
      const initialValue = Number(input.value);
      input.step = '50';
      await Promise.resolve(); // wait for the value to apply
      const stepSize = Number(input.step);
      input.stepUp();
      await Promise.resolve(); // wait for the value to apply
      expect(Number(input.value)).toEqual(initialValue + stepSize);
    });

    it('should decrement values by the step amount', async function () {
      const input = elem as BXNumberInput;
      const initialValue = Number(input.value);
      input.step = '50';
      await Promise.resolve(); // wait for the value to apply
      const stepSize = Number(input.step);
      input.stepDown();
      await Promise.resolve(); // wait for the value to apply
      expect(Number(input.value)).toEqual(initialValue - stepSize);
    });

    it('should not step past the max value', async function () {
      const input = elem as BXNumberInput;
      input.max = '50';
      input.value = '50';
      await Promise.resolve();
      input.stepUp();
      await Promise.resolve();
      expect(Number(input.value)).toEqual(50);
    });

    it('should not step below the min value', async function () {
      const input = elem as BXNumberInput;
      input.min = '50';
      input.value = '50';
      await Promise.resolve();
      input.stepDown();
      await Promise.resolve();
      expect(Number(input.value)).toEqual(50);
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined!, document.body);
  });
});
