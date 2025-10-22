/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import EventManager from '../utils/event-manager';

import CDSTextInput, {
  INPUT_TYPE,
} from '../../src/components/text-input/text-input';
import { Playground } from '../../src/components/text-input/text-input.stories';

/**
 * @param formData A `FormData` instance.
 * @returns The given `formData` converted to a classic key-value pair.
 */
const getValues = (formData: FormData) => {
  const values = {};

  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }
  return values;
};

const template = (props?) =>
  Playground({
    'cds-text-input': props,
  });

xdescribe('cds-text-input', () => {
  const events = new EventManager();

  describe('Rendering', () => {
    it('Should render with various attributes', async () => {
      render(
        template({
          autocomplete: 'on',
          autofocus: true,
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
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        document.body.querySelector('cds-text-input' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Event-based form participation', () => {
    it('Should respond to `formdata` event', async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': 'value-foo' });
    });

    it('Should not respond to `formdata` event if disabled', async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({});
    });
  });

  describe('Form validation', () => {
    let elem: Element;

    beforeEach(async () => {
      render(template(), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem = document.body.querySelector('cds-text-input')!;
    });

    it('should support checking if required value exists', async () => {
      const input = elem as CDSTextInput;
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

    it('should support canceling required check', async () => {
      const input = elem as CDSTextInput;
      input.required = true;
      events.on(input, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(input.checkValidity()).toBe(false);
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async () => {
      const input = elem as CDSTextInput;
      input.setCustomValidity('');
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat non-empty custom validity message as invalid', async () => {
      const input = elem as CDSTextInput;
      input.setCustomValidity('validity-message-foo');
      expect(input.invalid).toBe(true);
      expect(input.validityMessage).toBe('validity-message-foo');
    });
  });

  afterEach(async () => {
    events.reset();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    await render(undefined!, document.body);
  });
});
