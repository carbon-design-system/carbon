/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import '../../src/components/link/link';
import { PairedWithIcon } from '../../src/components/link/link.stories';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
const template = (props?: any) =>
  PairedWithIcon({
    'cds-link': props,
  });

describe('cds-link', () => {
  describe('Misc attributes', () => {
    it('should render with minimum attributes', async () => {
      render(template({ href: 'about:blank' }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(document.body.querySelector('cds-link' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(document.body.querySelector('cds-link' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render disabled state', async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(document.body.querySelector('cds-link' as any)).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
  });
});
