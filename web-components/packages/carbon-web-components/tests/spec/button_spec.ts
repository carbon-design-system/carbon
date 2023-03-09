/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import { BUTTON_KIND } from '../../src/components/button/button';
import { Default } from '../../src/components/button/button-story';

const template = (props?) =>
  Default({
    'cds-btn': props,
  });

describe('cds-btn', function () {
  describe('Changing button type', function () {
    let elem: HTMLElement | null;

    beforeEach(async function () {
      elem = document.body.appendChild(document.createElement('cds-btn'));
      await Promise.resolve();
    });

    it('should choose the right template for default type', function () {
      expect(elem!.shadowRoot!.querySelectorAll('button.cds--btn').length).toBe(
        1
      );
    });

    it('should choose the right template for link type', async function () {
      elem!.setAttribute('href', 'about:blank');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('a.cds--btn').length).toBe(1);
    });

    afterEach(function () {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing attributes', function () {
    let elem: HTMLElement | null;

    beforeAll(function () {
      elem = document.body.appendChild(document.createElement('cds-btn'));
    });

    it('should deactivate when disabled attribute is set', async function () {
      elem!.setAttribute('disabled', '');
      await Promise.resolve();
      expect(
        elem!.shadowRoot!.querySelectorAll('.cds--btn--disabled').length
      ).toBe(1);
    });

    it('should make it small when small attribute is set', async function () {
      elem!.setAttribute('size', 'sm');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.cds--btn--sm').length).toBe(
        1
      );
    });

    it('should allow user to select button type', async function () {
      elem!.setAttribute('kind', BUTTON_KIND.GHOST);
      await Promise.resolve();
      expect(
        elem!.shadowRoot!.querySelectorAll('.cds--btn--ghost').length
      ).toBe(1);
    });

    afterAll(function () {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Misc attributes', function () {
    it('should render with minimum attributes for <button>', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('cds-btn' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes for <button>', async function () {
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
      expect(document.body.querySelector('cds-btn' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with minimum attributes for <a>', async function () {
      render(template({ href: 'about:blank' }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('cds-btn' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes for <a>', async function () {
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
      expect(document.body.querySelector('cds-btn' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render disabled state for <a>', async function () {
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
      expect(document.body.querySelector('cds-btn' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
