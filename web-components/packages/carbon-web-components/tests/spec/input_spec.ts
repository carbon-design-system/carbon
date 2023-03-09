/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import EventManager from '../utils/event-manager';

import BXInput, {
  INPUT_COLOR_SCHEME,
  INPUT_TYPE,
} from '../../src/components/input/input';
import { Default } from '../../src/components/input/input-story';

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
    'cds-input': props,
  });

describe('cds-input', function () {
  const events = new EventManager();

  describe('Rendering', function () {
    it('Should render with various attributes', async function () {
      render(
        template({
          autocomplete: 'on',
          autofocus: true,
          colorScheme: INPUT_COLOR_SCHEME.LIGHT,
          disabled: true,
          helperText: 'helper-text-foo',
          hidePasswordLabel: 'Hide password',
          labelText: 'label-text-foo',
          name: 'name-foo',
          pattern: 'pattern-foo',
          placeholder: 'placeholder-foo',
          readonly: true,
          required: true,
          showPasswordLabel: 'Show password',
          showPasswordVisibilityToggle: false,
          size: 'xl',
          type: INPUT_TYPE.TEXT,
          validityMessage: 'validity-message-foo',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('cds-input' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Event-based form participation', function () {
    it('Should respond to `formdata` event', async function () {
      render(
        html`
          <form>
            ${template({
              name: 'name-foo',
              value: 'value-foo',
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
      expect(getValues(formData)).toEqual({ 'name-foo': 'value-foo' });
    });

    it('Should not respond to `formdata` event if disabled', async function () {
      render(
        html`
          <form>
            ${template({
              disabled: true,
              name: 'name-foo',
              value: 'value-foo',
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

  describe('Form validation', function () {
    let elem: Element;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-input')!;
    });

    it('should support checking if required value exists', async function () {
      const input = elem as BXInput;
      input.required = true;
      const spyInvalid = jasmine.createSpy('invalid');
      events.on(input, 'invalid', spyInvalid);
      expect(input.checkValidity()).toBe(false);
      expect(spyInvalid).toHaveBeenCalled();
      expect(input.invalid).toBe(true);
      expect(input.validityMessage).toBe('Please fill out this field.');
      input.value = 'value-foo';
      expect(input.checkValidity()).toBe(true);
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should support canceling required check', async function () {
      const input = elem as BXInput;
      input.required = true;
      events.on(input, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(input.checkValidity()).toBe(false);
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async function () {
      const input = elem as BXInput;
      input.setCustomValidity('');
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat non-empty custom validity message as invalid', async function () {
      const input = elem as BXInput;
      input.setCustomValidity('validity-message-foo');
      expect(input.invalid).toBe(true);
      expect(input.validityMessage).toBe('validity-message-foo');
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined!, document.body);
  });
});
