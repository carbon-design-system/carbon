/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import BXRadioButtonGroup, { RADIO_BUTTON_ORIENTATION } from '../../src/components/radio-button/radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from '../../src/components/radio-button/radio-button';
import { Default } from '../../src/components/radio-button/radio-button-story';

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

const template = (props?) => Default(props);

describe('bx-radio-button', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-radio-button[value="staging"]')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function () {
      render(
        template({
          'bx-radio-button-group': {
            disabled: true,
            labelPosition: RADIO_BUTTON_LABEL_POSITION.LEFT,
            name: 'name-foo',
            orientation: RADIO_BUTTON_ORIENTATION.VERTICAL,
            value: 'staging',
          },
          'bx-radio-button': {
            hideLabel: true,
            labelText: 'label-text-foo',
          },
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-radio-button[value="staging"]')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Communication between <bx-radio-button-group> and <bx-radio-button>', function () {
    it('Should propagate disabled', async function () {
      render(template({ 'bx-radio-button-group': { disabled: true } }), document.body);
      await Promise.resolve();
      expect(Array.prototype.every.call(document.body.querySelectorAll('bx-radio-button'), radio => radio.disabled)).toBe(true);
    });

    it('Should propagate labelPosition', async function () {
      render(
        template({
          'bx-radio-button-group': { labelPosition: RADIO_BUTTON_LABEL_POSITION.LEFT },
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        Array.prototype.every.call(
          document.body.querySelectorAll('bx-radio-button'),
          radio => radio.labelPosition === RADIO_BUTTON_LABEL_POSITION.LEFT
        )
      ).toBe(true);
    });

    it('Should propagate orientation', async function () {
      render(
        template({
          'bx-radio-button-group': { orientation: RADIO_BUTTON_ORIENTATION.VERTICAL },
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        Array.prototype.every.call(
          document.body.querySelectorAll('bx-radio-button'),
          radio => radio.orientation === RADIO_BUTTON_ORIENTATION.VERTICAL
        )
      ).toBe(true);
    });

    it('Should propagate name', async function () {
      render(
        template({
          'bx-radio-button-group': { name: 'name-foo' },
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        Array.prototype.every.call(document.body.querySelectorAll('bx-radio-button'), radio => radio.name === 'name-foo')
      ).toBe(true);
    });

    it('Should select <bx-radio-button> that matches the given value', async function () {
      render(
        template({
          'bx-radio-button-group': { value: 'staging' },
        }),
        document.body
      );
      await Promise.resolve();
      expect(Array.prototype.map.call(document.body.querySelectorAll('bx-radio-button'), radio => radio.checked)).toEqual([
        false,
        false,
        true,
      ]);
    });

    it('Should update the value upon clicking <bx-radio-button>', async function () {
      render(
        template({
          'bx-radio-button-group': { name: 'name-foo' },
        }),
        document.body
      );
      await Promise.resolve();
      (document.body.querySelector('bx-radio-button[value="staging"]') as HTMLElement).click();
      expect((document.body.querySelector('bx-radio-button-group') as BXRadioButtonGroup).value).toBe('staging');
    });

    it('Should update the value upon space key on <bx-radio-button>', async function () {
      render(
        template({
          'bx-radio-button-group': { name: 'name-foo' },
        }),
        document.body
      );
      await Promise.resolve();
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      const radioBaz = document.body.querySelector('bx-radio-button[value="staging"]');
      (radioBaz as HTMLElement).dispatchEvent(Object.assign(event, { key: ' ' }));
      expect((document.body.querySelector('bx-radio-button-group') as BXRadioButtonGroup).value).toBe('staging');
    });

    it('Should update the value upon enter key on <bx-radio-button>', async function () {
      render(
        template({
          'bx-radio-button-group': { name: 'name-foo' },
        }),
        document.body
      );
      await Promise.resolve();
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      const radioBaz = document.body.querySelector('bx-radio-button[value="staging"]');
      (radioBaz as HTMLElement).dispatchEvent(Object.assign(event, { key: 'Enter' }));
      expect((document.body.querySelector('bx-radio-button-group') as BXRadioButtonGroup).value).toBe('staging');
    });
  });

  describe('Keyboard navigation', function () {
    it('Should use left/right key for navigation in horizontal mode', async function () {
      render(
        template({
          'bx-radio-button-group': { orientation: RADIO_BUTTON_ORIENTATION.HORIZONTAL, name: 'name-foo' },
        }),
        document.body
      );
      await Promise.resolve();
      const radioFoo = document.body.querySelector('bx-radio-button[value="all"]') as HTMLElement;
      radioFoo.focus();
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      radioFoo.dispatchEvent(Object.assign(event, { key: 'ArrowRight' }));
      expect((document.body.querySelector('bx-radio-button-group') as BXRadioButtonGroup).value).toBe('cloudFoundry');
      expect(
        Array.prototype.map.call(
          document.body.querySelectorAll('bx-radio-button'),
          radio => radio.shadowRoot.querySelector('input').tabIndex
        )
      ).toEqual([-1, 0, -1]);
      const radioBar = document.body.querySelector('bx-radio-button[value="cloudFoundry"]') as HTMLElement;
      radioBar.dispatchEvent(Object.assign(event, { key: 'ArrowLeft' }));
      expect((document.body.querySelector('bx-radio-button-group') as BXRadioButtonGroup).value).toBe('all');
      expect(
        Array.prototype.map.call(
          document.body.querySelectorAll('bx-radio-button'),
          radio => radio.shadowRoot.querySelector('input').tabIndex
        )
      ).toEqual([0, -1, -1]);
    });

    it('Should use up/down key for navigation in vertical mode', async function () {
      render(
        template({
          'bx-radio-button-group': { orientation: RADIO_BUTTON_ORIENTATION.VERTICAL, name: 'name-foo' },
        }),
        document.body
      );
      await Promise.resolve();
      const radioFoo = document.body.querySelector('bx-radio-button[value="all"]') as HTMLElement;
      radioFoo.focus();
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      radioFoo.dispatchEvent(Object.assign(event, { key: 'ArrowDown' }));
      expect((document.body.querySelector('bx-radio-button-group') as BXRadioButtonGroup).value).toBe('cloudFoundry');
      expect(
        Array.prototype.map.call(
          document.body.querySelectorAll('bx-radio-button'),
          radio => radio.shadowRoot.querySelector('input').tabIndex
        )
      ).toEqual([-1, 0, -1]);
      const radioBar = document.body.querySelector('bx-radio-button[value="cloudFoundry"]') as HTMLElement;
      radioBar.dispatchEvent(Object.assign(event, { key: 'ArrowUp' }));
      expect((document.body.querySelector('bx-radio-button-group') as BXRadioButtonGroup).value).toBe('all');
      expect(
        Array.prototype.map.call(
          document.body.querySelectorAll('bx-radio-button'),
          radio => radio.shadowRoot.querySelector('input').tabIndex
        )
      ).toEqual([0, -1, -1]);
    });
  });

  describe('Event-based form participation', function () {
    it('Should respond to `formdata` event', async function () {
      render(
        html`
          <form>
            ${template({
              'bx-radio-button-group': {
                name: 'name-foo',
                value: 'staging',
              },
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': 'staging' });
    });

    it('Should not respond to `formdata` event if form item name is not specified', async function () {
      render(
        html`
          <form>
            ${template({
              'bx-radio-button-group': {
                value: 'staging',
              },
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({});
    });

    it('Should not respond to `formdata` event if no item is selected', async function () {
      render(
        html`
          <form>
            ${template({
              'bx-radio-button-group': {
                name: 'name-foo',
              },
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
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
              'bx-radio-button-group': {
                disabled: true,
                name: 'name-foo',
              },
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({});
    });
  });

  afterEach(async function () {
    render(undefined!, document.body);
    await Promise.resolve();
  });
});
