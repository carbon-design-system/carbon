/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component skeleton tests.
 *
 * Source : packages/web-components/src/components/button/__tests__/button-skeleton-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * `cds-ng-button-skeleton` is registered as a side effect of
 * importing the `#carbon-ng/components/button/index.js` barrel.
 */

// Register cds-ng-button-skeleton (and cds-ng-button / cds-ng-button-set) as a side effect.
import '#carbon-ng/components/button/index.js';
import { render } from '../../../testing/render';

/** Returns the shadow root of the cds-ng-button-skeleton host element. */
function shadow(el: HTMLElement): HTMLElement | null {
  // render() wraps the template in a host fixture; query for the WC.
  const host = el.querySelector('cds-ng-button-skeleton') as HTMLElement & {
    shadowRoot: ShadowRoot;
  };
  return host?.shadowRoot as unknown as HTMLElement;
}

describe('cds-ng-button-skeleton', () => {
  const sizes: [string, string][] = [
    ['sm', 'cds-ng--btn--sm'],
    ['md', 'cds-ng--btn--md'],
    ['lg', 'cds-ng--btn--lg'],
    ['xl', 'cds-ng--btn--xl'],
    ['2xl', 'cds-ng--btn--2xl'],
  ];

  sizes.forEach(([size, className]) => {
    it(`should set the expected classes for the size: \`${size}\``, async () => {
      const { fixture } = await render(
        `<cds-ng-button-skeleton size="${size}"></cds-ng-button-skeleton>`,
        [] // no Angular wrappers — bare WC registration from the import above
      );
      const host = fixture.nativeElement.querySelector(
        'cds-ng-button-skeleton'
      ) as HTMLElement;

      expect(host.getAttribute('size')).toBe(size);

      const button = (host as any).shadowRoot?.querySelector('button');
      expect(button).toBeTruthy();
      expect(button.classList.contains(className)).toBe(true);
      // Snapshot dropped — covered by the WC suite.
    });
  });

  describe('link variant', () => {
    it('should render an <a> when `href` is passed as a prop', async () => {
      const { fixture } = await render(
        `<cds-ng-button-skeleton href="/"></cds-ng-button-skeleton>`,
        []
      );
      const host = fixture.nativeElement.querySelector(
        'cds-ng-button-skeleton'
      ) as HTMLElement;
      const link = (host as any).shadowRoot?.querySelector('a');
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe('/');
      // Snapshot dropped — covered by the WC suite.
    });

    it('should render with [role="button"]', async () => {
      const { fixture } = await render(
        `<cds-ng-button-skeleton href="/"></cds-ng-button-skeleton>`,
        []
      );
      const host = fixture.nativeElement.querySelector(
        'cds-ng-button-skeleton'
      ) as HTMLElement;
      const link = (host as any).shadowRoot?.querySelector('a');
      expect(link).toBeTruthy();
      expect(link.getAttribute('role')).toBe('button');
      // Snapshot dropped — covered by the WC suite.
    });
  });
});
