/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import '../../src/components/link/link';
import { PairedWithIcon } from '../../src/components/link/link.stories';

const template = (props?) =>
  (PairedWithIcon = {
    'cds-link': props,
  });

describe('cds-link', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template({ href: 'about:blank' }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('cds-link' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          download: 'file-name-foo',
          href: 'about:blank',
          hreflang: 'en',
          linkRole: 'button',
          ping: 'about:blank',
          rel: 'noopener',
          target: '_blank',
          type: 'text/plain',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('cds-link' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render disabled state', async function () {
      render(
        template({
          disabled: true,
          download: 'file-name-foo',
          href: 'about:blank',
          hreflang: 'en',
          linkRole: 'button',
          ping: 'about:blank',
          rel: 'noopener',
          target: '_blank',
          type: 'text/plain',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('cds-link' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
