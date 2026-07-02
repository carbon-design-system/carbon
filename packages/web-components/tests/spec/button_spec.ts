/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import { BUTTON_KIND } from '../../src/components/button/button';
import { Default } from '../../src/components/button/button.stories';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
const template = (props?: any) =>
  Default({
    'cds-button': props,
  });

describe('cds-button', () => {
  describe('Changing button type', () => {
    let elem: HTMLElement | null;

    beforeEach(async () => {
      elem = document.body.appendChild(document.createElement('cds-button'));
      await Promise.resolve();
    });

    it('should choose the right template for default type', () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(elem!.shadowRoot!.querySelectorAll('button.cds--btn').length).toBe(
        1
      );
    });

    it('should choose the right template for link type', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('href', 'about:blank');
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(elem!.shadowRoot!.querySelectorAll('a.cds--btn').length).toBe(1);
    });

    afterEach(() => {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing attributes', () => {
    let elem: HTMLElement | null;

    beforeAll(() => {
      elem = document.body.appendChild(document.createElement('cds-button'));
    });

    it('should deactivate when disabled attribute is set', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('disabled', '');
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.querySelectorAll('.cds--btn--disabled').length
      ).toBe(1);
    });

    it('should make it small when small attribute is set', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('size', 'sm');
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(elem!.shadowRoot!.querySelectorAll('.cds--btn--sm').length).toBe(
        1
      );
    });

    it('should allow user to select button type', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('kind', BUTTON_KIND.GHOST);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.querySelectorAll('.cds--btn--ghost').length
      ).toBe(1);
    });

    afterAll(() => {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Misc attributes', () => {
    it('should render with minimum attributes for <button>', async () => {
      render(template(), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(document.body.querySelector('cds-button' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes for <button>', async () => {
      render(
        template({
          autofocus: true,
          disabled: true,
          kind: BUTTON_KIND.SECONDARY,
          size: 'sm',
          type: 'submit',
        }),
        document.body
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(document.body.querySelector('cds-button' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with minimum attributes for <a>', async () => {
      render(template({ href: 'about:blank' }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(document.body.querySelector('cds-button' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes for <a>', async () => {
      render(
        template({
          download: 'file-name-foo',
          href: 'about:blank',
          hreflang: 'en',
          kind: BUTTON_KIND.SECONDARY,
          linkRole: 'link',
          ping: 'about:blank',
          rel: 'noopener',
          size: 'sm',
          target: '_blank',
          type: 'text/plain',
        }),
        document.body
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(document.body.querySelector('cds-button' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render disabled state for <a>', async () => {
      render(
        template({
          disabled: true,
          download: 'file-name-foo',
          href: 'about:blank',
          hreflang: 'en',
          kind: BUTTON_KIND.SECONDARY,
          linkRole: 'link',
          ping: 'about:blank',
          rel: 'noopener',
          size: 'sm',
          target: '_blank',
          type: 'text/plain',
        }),
        document.body
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(document.body.querySelector('cds-button' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    await render(undefined!, document.body);
  });
});
