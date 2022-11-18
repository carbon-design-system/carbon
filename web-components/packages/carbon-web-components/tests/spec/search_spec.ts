/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import EventManager from '../utils/event-manager';
import { INPUT_SIZE } from '../../src/components/input/input';
import BXSearch, {
  SEARCH_COLOR_SCHEME,
} from '../../src/components/search/search';
import { Default } from '../../src/components/search/search-story';

const template = (props?) =>
  Default({
    'bx-search': props,
  });

describe('bx-search', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-search')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          closeButtonAssistiveText: 'close-button-assistive-text-foo',
          colorScheme: SEARCH_COLOR_SCHEME.LIGHT,
          disabled: true,
          labelText: 'label-text-foo',
          name: 'name-foo',
          placeholder: 'placeholder-foo',
          size: INPUT_SIZE.EXTRA_LARGE,
          type: 'submit',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-search')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Typing in the search box', function () {
    it('should reflect the value', async function () {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('bx-search');
      const inputNode = search!.shadowRoot!.querySelector('input');
      inputNode!.value = 'value-bar';
      inputNode!.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      expect((search as BXSearch).value).toBe('value-bar');
    });

    it('Should fire bx-search-input event upon typing', async function () {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('bx-search');
      const spyBeforeClear = jasmine.createSpy('before clear');
      events.on(search!, 'bx-search-input', spyBeforeClear);
      const inputNode = search!.shadowRoot!.querySelector('input');
      inputNode!.value = 'value-bar';
      inputNode!.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      expect(spyBeforeClear).toHaveBeenCalled();
      expect(spyBeforeClear.calls.argsFor(0)[0].detail.value).toBe('value-bar');
    });
  });

  describe('Clearing the input', function () {
    it('should clear the value', async function () {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('bx-search');
      search!.shadowRoot!.querySelector('button')!.click();
      expect((search as BXSearch).value).toBe('');
    });

    it('Should fire bx-search-input event upon clearing', async function () {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('bx-search');
      const spyBeforeClear = jasmine.createSpy('before clear');
      events.on(search!, 'bx-search-input', spyBeforeClear);
      search!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyBeforeClear).toHaveBeenCalled();
      expect(spyBeforeClear.calls.argsFor(0)[0].detail.value).toBe('');
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
