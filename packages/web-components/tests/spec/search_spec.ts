/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';
import { INPUT_SIZE } from '../../src/components/text-input/text-input';
import CDSSearch from '../../src/components/search/search';
import { Playground } from '../../src/components/search/search-story';

const template = (props?) =>
  Playground({
    'cds-search': props,
  });

describe('cds-search', () => {
  const events = new EventManager();

  describe('Misc attributes', () => {
    it('should render with minimum attributes', async () => {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-search' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async () => {
      render(
        template({
          closeButtonAssistiveText: 'close-button-assistive-text-foo',
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
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-search' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Typing in the search box', () => {
    it('should reflect the value', async () => {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('cds-search');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inputNode = search!.shadowRoot!.querySelector('input');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      inputNode!.value = 'value-bar';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      inputNode!.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      expect((search as CDSSearch).value).toBe('value-bar');
    });

    it('Should fire cds-search-input event upon typing', async () => {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('cds-search');
      const spyBeforeClear = jasmine.createSpy('before clear');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      events.on(search!, 'cds-search-input', spyBeforeClear);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inputNode = search!.shadowRoot!.querySelector('input');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      inputNode!.value = 'value-bar';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      inputNode!.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      expect(spyBeforeClear).toHaveBeenCalled();
      expect(spyBeforeClear.calls.argsFor(0)[0].detail.value).toBe('value-bar');
    });
  });

  describe('Clearing the input', () => {
    it('should clear the value', async () => {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('cds-search');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      search!.shadowRoot!.querySelector('button')!.click();
      expect((search as CDSSearch).value).toBe('');
    });

    it('Should fire cds-search-input event upon clearing', async () => {
      render(template({ value: 'value-foo' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('cds-search');
      const spyBeforeClear = jasmine.createSpy('before clear');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      events.on(search!, 'cds-search-input', spyBeforeClear);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      search!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyBeforeClear).toHaveBeenCalled();
      expect(spyBeforeClear.calls.argsFor(0)[0].detail.value).toBe('');
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
    events.reset();
  });
});
