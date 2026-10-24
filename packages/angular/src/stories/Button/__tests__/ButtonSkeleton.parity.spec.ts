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
 * `cds-button-skeleton` is not in the Custom Elements Manifest and therefore
 * has no generated Angular wrapper. It is registered as a side effect of
 * importing the `@carbon/web-components` button barrel. The tests run against
 * the web component directly via `render()`, which provides the same Angular
 * testing environment (TestBed + jsdom + real WC) as the other parity specs.
 *
 * In the host-is-WC design (ADR 0015) the rendered element IS the WC — there
 * is no inner element. Shadow DOM is queried directly on the `cds-button-skeleton`
 * element, exactly as the WC tests do.
 *
 * Snapshots (`await expect(el).shadowDom.to.equalSnapshot()`) are dropped per
 * the porting guide; they depend on the web component internals and are covered
 * by the WC suite itself.
 */

// Register cds-button-skeleton (and cds-button / cds-button-set) as a side effect.
import '@carbon/web-components/es/components/button/index.js';
import { render } from '../../../testing/render';

/** Returns the shadow root of the cds-button-skeleton host element. */
function shadow(el: HTMLElement): HTMLElement | null {
  // render() wraps the template in a host fixture; query for the WC.
  const host = el.querySelector('cds-button-skeleton') as HTMLElement & {
    shadowRoot: ShadowRoot;
  };
  return host?.shadowRoot as unknown as HTMLElement;
}

describe('cds-button-skeleton', () => {
  const sizes: [string, string][] = [
    ['sm', 'cds--btn--sm'],
    ['md', 'cds--btn--md'],
    ['lg', 'cds--btn--lg'],
    ['xl', 'cds--btn--xl'],
    ['2xl', 'cds--btn--2xl'],
  ];

  sizes.forEach(([size, className]) => {
    it(`should set the expected classes for the size: \`${size}\``, async () => {
      const { fixture } = await render(
        `<cds-button-skeleton size="${size}"></cds-button-skeleton>`,
        [] // no Angular wrappers — bare WC registration from the import above
      );
      const host = fixture.nativeElement.querySelector(
        'cds-button-skeleton'
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
        `<cds-button-skeleton href="/"></cds-button-skeleton>`,
        []
      );
      const host = fixture.nativeElement.querySelector(
        'cds-button-skeleton'
      ) as HTMLElement;
      const link = (host as any).shadowRoot?.querySelector('a');
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe('/');
      // Snapshot dropped — covered by the WC suite.
    });

    it('should render with [role="button"]', async () => {
      const { fixture } = await render(
        `<cds-button-skeleton href="/"></cds-button-skeleton>`,
        []
      );
      const host = fixture.nativeElement.querySelector(
        'cds-button-skeleton'
      ) as HTMLElement;
      const link = (host as any).shadowRoot?.querySelector('a');
      expect(link).toBeTruthy();
      expect(link.getAttribute('role')).toBe('button');
      // Snapshot dropped — covered by the WC suite.
    });
  });
});
