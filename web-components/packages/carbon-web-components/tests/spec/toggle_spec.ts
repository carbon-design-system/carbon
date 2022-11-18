/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import { Default } from '../../src/components/toggle/toggle-story';

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
    'bx-toggle': props,
  });

describe('bx-toggle', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(
        template({
          id: 'id-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-toggle' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes', async function () {
      render(
        template({
          id: 'id-foo',
          checked: true,
          checkedText: 'checked-text-foo',
          disabled: true,
          labelText: 'label-text-foo',
          name: 'name-foo',
          size: 'small',
          value: 'value-foo',
          uncheckedText: 'unchecked-text-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-toggle' as any)).toMatchSnapshot({
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
              checked: true,
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

    it('Should respond to `formdata` event with default value', async function () {
      render(
        html`
          <form>
            ${template({
              checked: true,
              name: 'name-foo',
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
      expect(getValues(formData)).toEqual({ 'name-foo': 'on' });
    });

    it('Should not respond to `formdata` event if unchecked', async function () {
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
      expect(getValues(formData)).toEqual({});
    });

    it('Should not respond to `formdata` event if disabled', async function () {
      render(
        html`
          <form>
            ${template({
              disabled: true,
              checked: true,
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

  afterEach(async function () {
    await render(template({ hasContent: false }), document.body);
  });
});
