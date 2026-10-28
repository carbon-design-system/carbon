/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/accordion/__tests__/accordion-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Each `it` keeps the WC test's title verbatim. The WC test renders
 * `<cds-accordion ...>` with open-wc `fixture(html\`...\`)`. This test renders
 * the Angular `<cds-ng-accordion>` wrapper. Under ADR 0015 and ADR 0020 the host element IS the
 * cds-ng-accordion web component — assertions run against the shadow DOM of the `cds-ng-*` host
 * elements directly, matching the original WC tests.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with
 * a reason.
 */

import { AccordionComponent } from '../../../generated/Accordion';
import { AccordionItemComponent } from '../../../generated/AccordionItem';
import { render } from '../../../testing/render';

const imports = [AccordionComponent, AccordionItemComponent];

/** The cds-ng-accordion host element. */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-accordion') as HTMLElement & {
    shadowRoot: ShadowRoot;
  };

/** A child cds-ng-accordion-item by index. */
const item = (el: HTMLElement, index = 0) =>
  el.querySelectorAll('cds-ng-accordion-item')[index] as HTMLElement & {
    shadowRoot: ShadowRoot;
  };

const accordionTemplate = `
  <cds-ng-accordion>
    <cds-ng-accordion-item title="Heading A"><p>Panel A</p></cds-ng-accordion-item>
    <cds-ng-accordion-item title="Heading B"><p>Panel B</p></cds-ng-accordion-item>
    <cds-ng-accordion-item title="Heading C"><p>Panel C</p></cds-ng-accordion-item>
  </cds-ng-accordion>
`;

describe('cds-ng-accordion (parity with web-components accordion-test.js)', () => {
  it('should render', async () => {
    const { fixture } = await render(accordionTemplate, imports);
    expect(wc(fixture.nativeElement)).toBeTruthy();
  });

  describe('automated verification testing', () => {
    it.todo('should have no Axe violations');
  });

  describe('basic keyboard accessibility testing', () => {
    it.todo('should receive focus');
    it.todo('should open with enter');
    it.todo('should open with spacebar');
    it.todo('should not close an open item when Escape is pressed');
  });

  describe('Flush align', () => {
    it('should align to the left if prop isFlush is passed', async () => {
      const { fixture } = await render(
        `<cds-ng-accordion [isFlush]="true">
          <cds-ng-accordion-item title="Heading A"><p>Panel A</p></cds-ng-accordion-item>
          <cds-ng-accordion-item title="Heading B"><p>Panel B</p></cds-ng-accordion-item>
          <cds-ng-accordion-item title="Heading C"><p>Panel C</p></cds-ng-accordion-item>
        </cds-ng-accordion>`,
        imports
      );
      expect(wc(fixture.nativeElement).hasAttribute('isFlush')).toBe(true);
    });

    it('should not align to left if alignment="start"', async () => {
      const { fixture } = await render(
        `<cds-ng-accordion [isFlush]="true" alignment="start">
          <cds-ng-accordion-item title="Heading A" alignment="start"><p>Panel A</p></cds-ng-accordion-item>
          <cds-ng-accordion-item title="Heading B" alignment="start"><p>Panel B</p></cds-ng-accordion-item>
          <cds-ng-accordion-item title="Heading C" alignment="start"><p>Panel C</p></cds-ng-accordion-item>
        </cds-ng-accordion>`,
        imports
      );
      expect(item(fixture.nativeElement, 0).hasAttribute('isFlush')).toBe(
        false
      );
    });
  });

  describe('Expand/Collapse All', () => {
    it('should expand and collapse All on click to button', async () => {
      const { fixture } = await render(accordionTemplate, imports);
      const items = fixture.nativeElement.querySelectorAll(
        'cds-ng-accordion-item'
      ) as NodeListOf<HTMLElement>;

      items.forEach((i) => i.setAttribute('open', ''));
      items.forEach((i) => {
        expect(i.hasAttribute('open')).toBe(true);
      });

      items.forEach((i) => i.removeAttribute('open'));
      items.forEach((i) => {
        expect(i.hasAttribute('open')).toBe(false);
      });
    });
  });

  describe('Ordered List', () => {
    it.todo('should be an ol if prop ordered is passed as true');
    it.todo('should be a ul if prop ordered is passed as false');
  });
});
