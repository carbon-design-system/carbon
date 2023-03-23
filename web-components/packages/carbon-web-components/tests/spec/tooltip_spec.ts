/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render, TemplateResult } from 'lit';
import ResizeObserver from 'resize-observer-polyfill';
import BXTooltip from '../../src/components/tooltip/tooltip';
import BXTooltipBody from '../../src/components/tooltip/tooltip-body';
import {
  TOOLTIP_ALIGNMENT,
  TOOLTIP_DIRECTION,
} from '../../src/components/toggle-tip/toggletip';
import { definition, icon } from '../../src/components/tooltip/tooltip-story';

const bodyTemplate = () => html` <cds-tooltip-body></cds-tooltip-body> `;
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
  !hasContent ? (undefined! as TemplateResult) : contentTemplate({ hasBody });

const definitionTemplate = (props?) =>
  definition({
    'cds-tooltip-definition': props,
  });

const iconTemplate = (props?) =>
  icon({
    'cds-tooltip-icon': props,
  });

describe('cds-tooltip', function () {
  describe('Missing menu body', function () {
    let trigger: BXTooltip | null;

    beforeEach(async function () {
      render(template({ hasBody: false }), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('cds-tooltip');
    });

    it('Should be tolerant of missing menu body', async function () {
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve();
      expect(trigger!.open).toBe(true);
    });
  });

  describe('Toggling', function () {
    let trigger: BXTooltip | null;
    let body: BXTooltipBody | null;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('cds-tooltip');
      body = document.body.querySelector('cds-tooltip-body');
    });

    it('Should open and close the menu', async function () {
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve();
      expect(trigger!.open).toBe(true);
      expect(body!.open).toBe(true);
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    });

    it('Should start observing element resizes when tooltip gets open', async function () {
      spyOn(ResizeObserver.prototype, 'observe');
      spyOn(ResizeObserver.prototype, 'unobserve');
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip>`
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip-body>`
      const floatingMenuContainer = document.body.querySelector(
        'div[data-floating-menu-container]'
      );
      expect(ResizeObserver.prototype.observe).toHaveBeenCalledWith(
        floatingMenuContainer!
      );
      expect(ResizeObserver.prototype.observe).toHaveBeenCalledWith(
        trigger!.parentElement!
      );
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip>`
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip-body>`
      expect(ResizeObserver.prototype.unobserve).toHaveBeenCalledWith(
        trigger!.parentElement!
      );
      expect(ResizeObserver.prototype.unobserve).toHaveBeenCalledWith(
        floatingMenuContainer!
      );
    });
  });

  describe('Placing', function () {
    let trigger: BXTooltip | null;
    let body: BXTooltipBody | null;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('cds-tooltip');
      body = document.body.querySelector('cds-tooltip-body');
    });

    it('Should place and position', async function () {
      // TODO: Figure out why `spyOnProperty()` with a property name that actually exists causes a TS error
      // @ts-ignore
      spyOnProperty(body, 'position').and.returnValue({
        start: 1,
        top: 2,
      });
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(
        new CustomEvent('click', { bubbles: true, composed: true })
      );
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip>`
      await Promise.resolve(); // Calls `update()` of `<cds-tooltip-body>`
      expect(body!.parentElement).toBe(
        document.body.querySelector(
          'div[data-floating-menu-container]'
        ) as HTMLElement
      );
      expect(body!.style.left).toBe('1px');
      expect(body!.style.top).toBe('2px');
    });
  });

  afterEach(async function () {
    await render(template({ hasContent: false }), document.body);
  });
});

describe('cds-tooltip-definition', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(definitionTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-tooltip-definition' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function () {
      render(
        definitionTemplate({
          alignment: TOOLTIP_ALIGNMENT.START,
          bodyText: 'body-text-foo',
          direction: TOOLTIP_DIRECTION.TOP,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-tooltip-definition' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(definitionTemplate({ hasContent: false }), document.body);
  });
});

describe('cds-tooltip-icon', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(iconTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-tooltip-icon' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes', async function () {
      render(
        iconTemplate({
          alignment: TOOLTIP_ALIGNMENT.START,
          bodyText: 'body-text-foo',
          direction: TOOLTIP_DIRECTION.TOP,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-tooltip-icon' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(iconTemplate({ hasContent: false }), document.body);
  });
});
