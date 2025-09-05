/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render, TemplateResult } from 'lit';
import ResizeObserver from 'resize-observer-polyfill';
import CDSTooltip from '../../src/components/tooltip/tooltip';
import CDSTooltipContent from '../../src/components/tooltip/tooltip-content';
import { POPOVER_ALIGNMENT } from '../../src/components/popover/defs';
import { Playground } from '../../src/components/tooltip/tooltip.stories';

const bodyTemplate = () => html` <cds-tooltip-content></cds-tooltip-content> `;
const contentTemplate = ({
  hasBody = true,
}: { hasBody?: boolean } = {}) => html`
  <div data-floating-menu-container style="position:relative">
    <!-- <div> for resize testing, distinguishing the parent node of <cds-tooltip> vs. the floating menu container -->
    <div>
      <cds-tooltip> ${!hasBody ? undefined : bodyTemplate()} </cds-tooltip>
    </div>
  </div>
`;
const template = ({
  hasContent = true,
  hasBody = true,
}: { hasContent?: boolean; hasBody?: boolean } = {}) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
  !hasContent ? (undefined! as TemplateResult) : contentTemplate({ hasBody });

const iconTemplate = (props) =>
  Playground({
    'cds-tooltip-icon': props,
  });

xdescribe('cds-tooltip', () => {
  describe('Missing menu body', () => {
    let trigger: CDSTooltip | null;

    beforeEach(async () => {
      render(template({ hasBody: false }), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('cds-tooltip');
    });

    it('Should be tolerant of missing menu body', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(trigger!.open).toBe(true);
    });
  });

  describe('Toggling', () => {
    let trigger: CDSTooltip | null;
    let content: CDSTooltipContent | null;

    beforeEach(async () => {
      render(template(), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('cds-tooltip');
      content = document.body.querySelector('cds-tooltip-content');
    });

    it('Should open and close the menu', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(trigger!.open).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(content!.open).toBe(true);
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    });

    it('Should start observing element resizes when tooltip gets open', async () => {
      spyOn(ResizeObserver.prototype, 'observe');
      spyOn(ResizeObserver.prototype, 'unobserve');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip>`
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip-content>`
      const floatingMenuContainer = document.body.querySelector(
        'div[data-floating-menu-container]'
      );
      expect(ResizeObserver.prototype.observe).toHaveBeenCalledWith(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        floatingMenuContainer!
      );
      expect(ResizeObserver.prototype.observe).toHaveBeenCalledWith(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        trigger!.parentElement!
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip>`
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip-content>`
      expect(ResizeObserver.prototype.unobserve).toHaveBeenCalledWith(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        trigger!.parentElement!
      );
      expect(ResizeObserver.prototype.unobserve).toHaveBeenCalledWith(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        floatingMenuContainer!
      );
    });
  });

  describe('Placing', () => {
    let trigger: CDSTooltip | null;
    let content: CDSTooltipContent | null;

    beforeEach(async () => {
      render(template(), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('cds-tooltip');
      content = document.body.querySelector('cds-tooltip-content');
    });

    it('Should place and position', async () => {
      // TODO: Figure out why `spyOnProperty()` with a property name that actually exists causes a TS error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
      // @ts-ignore
      spyOnProperty(body, 'position').and.returnValue({
        start: 1,
        top: 2,
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip>`
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip-body>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(content!.parentElement).toBe(
        document.body.querySelector(
          'div[data-floating-menu-container]'
        ) as HTMLElement
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(content!.style.left).toBe('1px');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(content!.style.top).toBe('2px');
    });
  });

  afterEach(async () => {
    await render(template({ hasContent: false }), document.body);
  });
});

describe('cds-tooltip-icon', () => {
  describe('Rendering', () => {
    xit('Should render with minimum attributes', async () => {
      render(iconTemplate(), document.body);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        document.body.querySelector('cds-tooltip-icon' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    xit('Should render with various attributes', async () => {
      render(
        iconTemplate({
          alignment: POPOVER_ALIGNMENT.TOP,
          bodyText: 'body-text-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        document.body.querySelector('cds-tooltip-icon' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async () => {
    await render(iconTemplate({ hasContent: false }), document.body);
  });
});
