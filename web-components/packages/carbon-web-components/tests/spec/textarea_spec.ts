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

import CDSTextarea from '../../src/components/textarea/textarea';
import { Playground } from '../../src/components/textarea/textarea-story';

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
  Playground({
    'cds-textarea': props,
  });

describe('cds-textarea', function () {
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
          invalidText: 'validity-message-foo',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-textarea' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should reflect value in DOM', async function () {
      render(
        template({
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        (document.body.querySelector('cds-textarea') as CDSTextarea).value
      ).toBe('value-foo');
    });
  });

  describe('Reacting to user gesture', function () {
    it('Should update value upon user input', async function () {
      render(
        template({
          value: '',
        }),
        document.body
      );
      await Promise.resolve();
      const textareaNode = document.body
        .querySelector('cds-textarea')!
        .shadowRoot!.querySelector('textarea');
      expect(textareaNode!.value).toBe('');
      textareaNode!.value = 'value-foo';
      textareaNode!.dispatchEvent(
        new CustomEvent('input', { bubbles: true, composed: true })
      );
      expect(textareaNode!.value).toBe('value-foo');
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
      elem = document.body.querySelector('cds-textarea')!;
    });

    it('should support checking if required value exists', async function () {
      const textarea = elem as CDSTextarea;
      textarea.required = true;
      const spyInvalid = jasmine.createSpy('invalid');
      events.on(textarea, 'invalid', spyInvalid);
      expect(textarea.checkValidity()).toBe(false);
      expect(spyInvalid).toHaveBeenCalled();
      expect(textarea.invalid).toBe(true);
      expect(textarea.invalidText).toBe('Please fill out this field.');
      textarea.value = 'value-foo';
      expect(textarea.checkValidity()).toBe(true);
      expect(textarea.invalid).toBe(false);
      expect(textarea.invalidText).toBe('');
    });

    it('should support canceling required check', async function () {
      const textarea = elem as CDSTextarea;
      textarea.required = true;
      events.on(textarea, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(textarea.checkValidity()).toBe(false);
      expect(textarea.invalid).toBe(false);
      expect(textarea.invalidText).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async function () {
      const textarea = elem as CDSTextarea;
      textarea.setCustomValidity('');
      expect(textarea.invalid).toBe(false);
      expect(textarea.invalidText).toBe('');
    });

    it('should treat non-empty custom validity message as invalid', async function () {
      const textarea = elem as CDSTextarea;
      textarea.setCustomValidity('validity-message-foo');
      expect(textarea.invalid).toBe(true);
      expect(textarea.invalidText).toBe('validity-message-foo');
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined, document.body);
  });
});
