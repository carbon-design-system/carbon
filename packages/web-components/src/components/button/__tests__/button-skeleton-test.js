/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/button/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-button-skeleton', () => {
  const sizes = [
    ['sm', 'cds--btn--sm'],
    ['md', 'cds--btn--md'],
    ['lg', 'cds--btn--lg'],
    ['xl', 'cds--btn--xl'],
    ['2xl', 'cds--btn--2xl'],
  ];

  sizes.forEach(([size, className]) => {
    it(`should set the expected classes for the size: \`${size}\``, async () => {
      const el = await fixture(
        html`<cds-button-skeleton size="${size}"></cds-button-skeleton>`
      );
      expect(el).to.have.attribute('size', size);

      const button =
        el.shadowRoot?.querySelector('button') ||
        el.shadowRoot?.querySelector('a');
      expect(button).to.have.class(className);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('link variant', () => {
    it('should render an <a> when `href` is passed as a prop', async () => {
      const el = await fixture(
        html`<cds-button-skeleton href="/"></cds-button-skeleton>`
      );

      const link = el.shadowRoot?.querySelector('a');
      expect(link).to.exist;
      expect(link).to.have.attribute('href', '/');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should render with [role="button"]', async () => {
      const el = await fixture(
        html`<cds-button-skeleton href="/"></cds-button-skeleton>`
      );

      const link = el.shadowRoot?.querySelector('a');
      expect(link).to.exist;
      expect(link).to.have.attribute('role', 'button');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });
});
