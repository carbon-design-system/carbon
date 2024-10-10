/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import EventManager from '../utils/event-manager';
import { INPUT_SIZE } from '../../src/components/text-input/text-input';
import CDSSelect from '../../src/components/select/select';
import CDSSelectItem from '../../src/components/select/select-item';
import CDSSelectItemGroup from '../../src/components/select/select-item-group';
import { Playground } from '../../src/components/select/select-story';

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
    'cds-select': props,
  });

xdescribe('cds-select', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('cds-select' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          autofocus: true,
          disabled: true,
          helperText: 'helper-text-foo',
          labelText: 'label-text-foo',
          name: 'name-foo',
          placeholder: 'placeholder-foo',
          size: INPUT_SIZE.EXTRA_LARGE,
          value: 'staging',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('cds-select' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render invalid state', async function () {
      render(
        template({
          helperText: 'helper-text-foo', // `invalidText` should take precedence
          invalid: true,
          invalidText: 'validity-message-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('cds-select' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Changing child `<option>`s', function () {
    it('should support adding an option', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-select');
      const item = document.createElement('cds-select-item') as CDSSelectItem;
      item.disabled = true;
      item.label = 'label-foo';
      item.selected = true;
      item.value = 'value-foo';
      elem!.appendChild(item);
      await Promise.resolve(); // Let `MutationObserver` run
      await Promise.resolve(); // Update cycle of rendering new child `<option>`s
      const option = elem!.shadowRoot!.querySelector(
        'option[value="value-foo"]'
      ) as HTMLOptionElement;
      expect(option.disabled).toBe(true);
      expect(option.label).toBe('label-foo');
      expect(option.selected).toBe(true);
    });

    it('should support changing a property of an option', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const item = document.body.querySelector(
        'cds-select-item[value="staging"]'
      );
      (item as CDSSelectItem).disabled = true;
      await Promise.resolve(); // Let `MutationObserver` run
      await Promise.resolve(); // Update cycle of rendering new child `<option>`s
      const elem = document.body.querySelector('cds-select');
      const option = elem!.shadowRoot!.querySelector(
        'option[value="staging"]'
      ) as HTMLOptionElement;
      expect(option.disabled).toBe(true);
    });

    it('should support removing an option', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const item = document.body.querySelector(
        'cds-select-item[value="staging"]'
      );
      item!.parentNode!.removeChild(item!);
      await Promise.resolve(); // Let `MutationObserver` run
      await Promise.resolve(); // Update cycle of rendering new child `<option>`s
      const elem = document.body.querySelector('cds-select');
      expect(
        elem!.shadowRoot!.querySelector('option[value="staging"]')
      ).toBeNull();
    });

    it('should support adding an option group', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-select');
      const item = document.createElement(
        'cds-select-item-group'
      ) as CDSSelectItem;
      item.disabled = true;
      item.label = 'label-foo';
      elem!.appendChild(item);
      await Promise.resolve(); // Let `MutationObserver` run
      await Promise.resolve(); // Update cycle of rendering new child `<optgroup>`s
      const option = elem!.shadowRoot!.querySelector(
        'optgroup[label="label-foo"]'
      ) as HTMLOptGroupElement;
      expect(option.disabled).toBe(true);
      expect(option.label).toBe('label-foo');
    });

    it('should support changing a property of an option group', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const itemGroup = document.body.querySelector(
        'cds-select-item-group[label="Category 2"]'
      );
      (itemGroup as CDSSelectItemGroup).disabled = true;
      await Promise.resolve(); // Let `MutationObserver` run
      await Promise.resolve(); // Update cycle of rendering new child `<optgroup>`s
      const elem = document.body.querySelector('cds-select');
      const option = elem!.shadowRoot!.querySelector(
        'optgroup[label="Category 2"]'
      ) as HTMLOptGroupElement;
      expect(option.disabled).toBe(true);
    });

    it('should support removing an option group', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const itemGroup = document.body.querySelector(
        'cds-select-item-group[label="Category 2"]'
      );
      itemGroup!.parentNode!.removeChild(itemGroup!);
      await Promise.resolve(); // Let `MutationObserver` run
      await Promise.resolve(); // Update cycle of rendering new child `<optgroup>`s
      const elem = document.body.querySelector('cds-select');
      expect(
        elem!.shadowRoot!.querySelector('optgroup[label="Category 2"]')
      ).toBeNull();
    });
  });

  describe('Properties', function () {
    it('should support querying the `<option>`', async function () {
      render(
        template({
          children: html`
            <cds-select-item value="all">Option 1</cds-select-item>
            <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const { options } = document.body.querySelector(
        'cds-select'
      ) as CDSSelect;
      expect(
        Array.prototype.map.call(options, (option) => option.value)
      ).toEqual(['all', 'cloudFoundry']);
    });

    it('should support querying the length of `<option>`', async function () {
      render(
        template({
          children: html`
            <cds-select-item value="all">Option 1</cds-select-item>
            <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        (document.body.querySelector('cds-select') as CDSSelect).length
      ).toBe(2);
    });

    it('should support querying the type', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        (document.body.querySelector('cds-select') as CDSSelect).type
      ).toBe('select-one');
    });

    it('should unsupport multiple selection', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-select');
      const { _attributeToProperty: origAttributeToProperty } = elem as any;
      let caught;
      await new Promise<void>((resolve) => {
        spyOn(CDSSelect.prototype as any, '_attributeToProperty').and.callFake(
          function () {
            try {
              // TODO: See if we can get around TS2683
              // @ts-ignore
              // eslint-disable-next-line prefer-rest-params
              origAttributeToProperty.apply(this, arguments);
            } catch (error) {
              caught = error;
            }
            resolve();
          }
        );
        elem!.setAttribute('multiple', '');
      });
      expect(caught).toBeDefined();
      expect((elem as CDSSelect).multiple).toBe(false);
    });

    it('should support querying the selected index', async function () {
      render(template({ value: 'staging' }), document.body);
      await Promise.resolve();
      expect(
        (document.body.querySelector('cds-select') as CDSSelect).selectedIndex
      ).toBe(2);
    });

    it('should support setting the selected index', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const select = document.body.querySelector('cds-select') as CDSSelect;
      select.selectedIndex = 2;
      expect(select.value).toBe('staging');
    });
  });

  describe('Event-based form participation', function () {
    it('Should respond to `formdata` event', async function () {
      render(
        html`
          <form>
            ${template({
              name: 'name-foo',
              value: 'staging',
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
      expect(getValues(formData)).toEqual({ 'name-foo': 'staging' });
    });

    it('Should not respond to `formdata` event if disabled', async function () {
      render(
        html`
          <form>
            ${template({
              disabled: true,
              name: 'name-foo',
              value: 'staging',
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
      elem = document.body.querySelector('cds-select')!;
    });

    it('should support checking if required value exists', async function () {
      const select = elem as CDSSelect;
      select.required = true;
      const spyInvalid = jasmine.createSpy('invalid');
      events.on(select, 'invalid', spyInvalid);
      expect(spyInvalid).toHaveBeenCalled();
      expect(select.invalid).toBe(true);
      expect(select.invalidText).toBe('Please fill out this field.');
      select.value = 'staging';
      expect(select.invalid).toBe(false);
      expect(select.invalidText).toBe('');
    });

    it('should support canceling required check', async function () {
      const select = elem as CDSSelect;
      select.required = true;
      events.on(select, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(select.invalid).toBe(false);
      expect(select.invalidText).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async function () {
      const select = elem as CDSSelect;
      expect(select.invalid).toBe(false);
      expect(select.invalidText).toBe('');
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined!, document.body);
  });
});
