/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Fade16 from '@carbon/icons/lib/fade/16.js';
import EventManager from '../utils/event-manager';
import { ifDefined } from 'lit/directives/if-defined.js';
import CDSHeaderMenu from '../../src/components/ui-shell/header-menu';
// Above import does not seem to register the custom element
import '../../src/components/ui-shell/header-menu';
import CDSSideNavMenuButton from '../../src/components/ui-shell/header-menu-button';
// Above import does not seem to register the custom element
import '../../src/components/ui-shell/header-menu-button';
import '../../src/components/ui-shell/header-name';
import '../../src/components/ui-shell/header-nav';
import '../../src/components/ui-shell/header-nav-item';
import CDSSideNav, {
  SIDE_NAV_COLLAPSE_MODE,
  SIDE_NAV_USAGE_MODE,
} from '../../src/components/ui-shell/side-nav';
import '../../src/components/ui-shell/side-nav-link';
import CDSSideNavMenu from '../../src/components/ui-shell/side-nav-menu';
// Above import does not seem to register the custom element
import '../../src/components/ui-shell/side-nav-menu';
import '../../src/components/ui-shell/side-nav-menu-item';

const headerMenuButtonTemplate = (props?) => {
  const {
    active,
    buttonLabelActive,
    buttonLabelInactive,
    collapseMode,
    disabled,
  } = props ?? {};
  return html`
    <cds-header-menu-button
      ?active="${ifDefined(active)}"
      button-label-active="${ifDefined(buttonLabelActive)}"
      button-label-inactive="${ifDefined(buttonLabelInactive)}"
      collapse-mode="${ifDefined(collapseMode)}"
      ?disabled="${disabled}">
    </cds-header-menu-button>
  `;
};

const headerMenuTemplate = (props?) => {
  const { expanded, menuLabel, triggerContent } = props ?? {};
  return html`
    <cds-header-menu
      ?expanded="${expanded}"
      menu-label="${ifDefined(menuLabel)}"
      trigger-content="${ifDefined(triggerContent)}">
    </cds-header-menu>
  `;
};

const headerNameTemplate = (props?) => {
  const { href, prefix } = props ?? {};
  return html`
    <cds-header-name
      href="${ifDefined(href)}"
      prefix="${ifDefined(prefix)}"></cds-header-name>
  `;
};

const headerNavTemplate = (props?) => {
  const { menuBarLabel } = props ?? {};
  return html`
    <cds-header-nav
      menu-bar-label="${ifDefined(menuBarLabel)}"></cds-header-nav>
  `;
};

const headerNavItemTemplate = (props?) => {
  const { href } = props ?? {};
  return html`
    <cds-header-nav-item href="${ifDefined(href)}"></cds-header-nav-item>
  `;
};

const sideNavTemplate = (props?) => {
  const { collapseMode, expanded, usageMode, children } = props ?? {};
  return html`
    <cds-header-menu-button></cds-header-menu-button>
    <cds-side-nav
      collapse-mode="${ifDefined(collapseMode)}"
      ?expanded="${expanded}"
      usage-mode="${ifDefined(usageMode)}">
      ${children}
    </cds-side-nav>
  `;
};

const sideNavLinkTemplate = (props?) => {
  const { active, href, children } = props ?? {};
  return html`
    <cds-side-nav-link ?active="${active}" href="${ifDefined(href)}"
      >${children}</cds-side-nav-link
    >
  `;
};

const sideNavMenuTemplate = (props?) => {
  const { active, expanded, forceCollapsed, title, children } = props ?? {};
  return html`
    <cds-side-nav-menu
      ?active="${active}"
      ?expanded="${expanded}"
      ?force-collapsed="${forceCollapsed}"
      title="${ifDefined(title)}">
      ${children}
    </cds-side-nav-menu>
  `;
};

const sideNavMenuItemTemplate = (props?) => {
  const { active, href } = props ?? {};
  return html`
    <cds-side-nav-menu>
      <cds-side-nav-menu-item
        ?active="${active}"
        href="${ifDefined(href)}"></cds-side-nav-menu-item>
    </cds-side-nav-menu>
  `;
};

describe('ui-shell', function () {
  const events = new EventManager();

  describe('cds-header-menu-button', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(headerMenuButtonTemplate(), document.body);
        await Promise.resolve();
        // @ts-ignore
        expect(
          document.body.querySelector('cds-header-menu-button')
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes for inactive state', async function () {
        render(
          headerMenuButtonTemplate({
            buttonLabelActive: 'button-label-active',
            buttonLabelInactive: 'button-label-inactive',
            collapseMode: SIDE_NAV_COLLAPSE_MODE.RESPONSIVE,
            disabled: true,
            usageMode: SIDE_NAV_USAGE_MODE.HEADER_NAV,
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-menu-button' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes for active state', async function () {
        render(
          headerMenuButtonTemplate({
            active: true,
            buttonLabelActive: 'button-label-active',
            buttonLabelInactive: 'button-label-inactive',
            collapseMode: SIDE_NAV_COLLAPSE_MODE.RESPONSIVE,
            disabled: true,
            usageMode: SIDE_NAV_USAGE_MODE.HEADER_NAV,
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-menu-button' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Handling user interaction', function () {
      it('should fire cds-header-menu-button-toggled event upon clicking the button', async function () {
        render(headerMenuButtonTemplate(), document.body);
        await Promise.resolve();
        const spyAfterToggle = jasmine.createSpy('after toggle');
        const button = document.body.querySelector('cds-header-menu-button');
        events.on(button!, 'cds-header-menu-button-toggled', spyAfterToggle);
        button!.shadowRoot!.querySelector('button')!.click();
        expect(spyAfterToggle).toHaveBeenCalled();
      });
    });
  });

  describe('cds-header-menu', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(headerMenuTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-menu' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async function () {
        render(
          headerMenuTemplate({
            expanded: true,
            menuLabel: 'menu-label-foo',
            triggerContent: 'trigger-content-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-menu' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });

    describe('Handling user interaction', function () {
      it('should toggle the expanded state upon clicking the button', async function () {
        render(headerMenuTemplate(), document.body);
        await Promise.resolve();
        const menu = document.body.querySelector('cds-header-menu');
        menu!.shadowRoot!.querySelector('a')!.click();
        expect((menu as CDSHeaderMenu).expanded).toBe(true);
        menu!.shadowRoot!.querySelector('a')!.click();
        expect((menu as CDSHeaderMenu).expanded).toBe(false);
      });

      xit('should collapse upon hitting ESC key', async function () {
        render(headerMenuTemplate({ expanded: true }), document.body);
        await Promise.resolve();
        const menu = document.body.querySelector('cds-header-menu');
        const trigger = menu!.shadowRoot!.querySelector('a');
        spyOn(trigger!, 'focus');
        trigger!.dispatchEvent(
          Object.assign(new CustomEvent('keydown', { bubbles: true }), {
            key: 'Escape',
          })
        );
        expect((menu as CDSHeaderMenu).expanded).toBe(false);
        expect(trigger!.focus).toHaveBeenCalled();
      });

      it('should collapse upon losing focus', async function () {
        render(headerMenuTemplate({ expanded: true }), document.body);
        await Promise.resolve();
        const menu = document.body.querySelector('cds-header-menu');
        (menu as HTMLElement).dispatchEvent(
          new CustomEvent('focusout', { bubbles: true })
        );
        expect((menu as CDSHeaderMenu).expanded).toBe(false);
      });
    });
  });

  describe('cds-header-name', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(headerNameTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-name' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async function () {
        render(
          headerNameTemplate({
            href: 'about:blank',
            prefix: 'prefix-foo',
          }),
          document.body as any
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-name' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });
  });

  describe('cds-header-nav', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(headerNavTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-nav' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async function () {
        render(
          headerNavTemplate({
            menuBarLabel: 'menu-bar-label-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-nav' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });
  });

  describe('cds-header-nav-item', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(headerNavItemTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-nav-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async function () {
        render(
          headerNavItemTemplate({
            href: 'about:blank',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-header-nav-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });
  });

  describe('cds-side-nav-link', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(sideNavLinkTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-side-nav-link' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async function () {
        render(
          sideNavLinkTemplate({
            active: true,
            href: 'about:blank',
            children: Fade16({ slot: 'title-icon' }),
          }),
          document.body
        );
        await Promise.resolve(); // First update cycle
        await Promise.resolve(); // Update cycle upon `slotchange` event
        expect(
          document.body.querySelector('cds-side-nav-link' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });
  });

  describe('cds-side-nav', function () {
    describe('Handling events', function () {
      xit('should let child side nav menu collapse if this side nav is collapsed', async function () {
        render(
          sideNavTemplate({
            children: html` <cds-side-nav-menu></cds-side-nav-menu> `,
          }),
          document.body
        );
        await Promise.resolve();
        const nav = document.body.querySelector('cds-side-nav');
        const menu = document.body.querySelector('cds-side-nav-menu');
        expect((menu as CDSSideNavMenu).forceCollapsed).toBe(true);
        nav!.dispatchEvent(new CustomEvent('mouseover', { bubbles: true }));
        await Promise.resolve();
        expect((menu as CDSSideNavMenu).forceCollapsed).toBe(false);
        nav!.dispatchEvent(new CustomEvent('mouseout', { bubbles: true }));
        await Promise.resolve();
        expect((menu as CDSSideNavMenu).forceCollapsed).toBe(true);
      });

      it('should toggle expand state upon upon clicking on header menu button', async function () {
        render(sideNavTemplate(), document.body);
        await Promise.resolve();
        const nav = document.body.querySelector('cds-side-nav');
        const menuButton = document.body.querySelector(
          'cds-header-menu-button'
        );
        menuButton!.dispatchEvent(
          new CustomEvent('cds-header-menu-button-toggled', {
            bubbles: true,
            detail: { active: true },
          })
        );
        expect((nav as CDSSideNav).expanded).toBe(true);
        menuButton!.dispatchEvent(
          new CustomEvent('cds-header-menu-button-toggled', {
            bubbles: true,
            detail: { active: false },
          })
        );
        expect((nav as CDSSideNav).expanded).toBe(false);
      });
    });

    describe('Working with header menu button', function () {
      it('should propagate mode/states to header menu button', async function () {
        render(
          sideNavTemplate({
            collapseMode: SIDE_NAV_COLLAPSE_MODE.RAIL,
            expanded: true,
          }),
          document.body
        );
        await Promise.resolve();
        const menuButton = document.body.querySelector(
          'cds-header-menu-button'
        );
        expect((menuButton as CDSSideNavMenuButton).collapseMode).toBe(
          SIDE_NAV_COLLAPSE_MODE.RAIL
        );
        expect((menuButton as CDSSideNavMenuButton).active).toBe(true);
      });
    });
  });

  describe('cds-side-nav-menu', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(sideNavMenuTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-side-nav-menu' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async function () {
        render(
          sideNavMenuTemplate({
            active: true,
            expanded: true,
            title: 'title-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-side-nav-menu' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should support collapsing side nav menu upon parent side nav is collapsed as rail', async function () {
        render(
          sideNavMenuTemplate({
            active: true,
            expanded: true,
            forceCollapsed: true,
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-side-nav-menu' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Handling user interaction', function () {
      it('should fire cds-side-nav-menu-beingtoggled/cds-side-nav-menu-toggled events upon toggling', async function () {
        render(sideNavMenuTemplate(), document.body);
        await Promise.resolve();
        const spyBeforeToggle = jasmine.createSpy('before toggle');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        const button = document.body.querySelector('cds-side-nav-menu');
        events.on(button!, 'cds-side-nav-menu-beingtoggled', spyBeforeToggle);
        events.on(button!, 'cds-side-nav-menu-toggled', spyAfterToggle);
        button!.shadowRoot!.querySelector('button')!.click();
        expect(spyBeforeToggle).toHaveBeenCalled();
        expect(spyAfterToggle).toHaveBeenCalled();
      });

      it('should support preventing side nav menu from being toggled upon user gesture', async function () {
        render(sideNavMenuTemplate(), document.body);
        await Promise.resolve();
        const spyAfterToggle = jasmine.createSpy('after toggle');
        const button = document.body.querySelector('cds-side-nav-menu');
        events.on(button!, 'cds-side-nav-menu-beingtoggled', (event) => {
          event.preventDefault();
        });
        events.on(button!, 'cds-side-nav-menu-toggled', spyAfterToggle);
        button!.shadowRoot!.querySelector('button')!.click();
        await Promise.resolve();
        expect(spyAfterToggle).not.toHaveBeenCalled();
      });
    });

    describe('Detecting icons', function () {
      it('should tell new child side nav item that the parent side nav menu has an icon', async function () {
        render(
          sideNavMenuTemplate({
            children: Fade16({ slot: 'title-icon' }),
          }),
          document.body
        );
        await Promise.resolve();
        const menu = document.body.querySelector('cds-side-nav-menu');
        const menuItem = document.createElement('cds-side-nav-menu-item');
        menu!.appendChild(menuItem);
        await Promise.resolve(); // `slotchange` event seems to happen at EOM
        expect(menuItem.hasAttribute('parent-has-icon')).toBe(true);
      });

      it('should tell existing child side nav item that the parent side nav menu has an icon', async function () {
        render(
          sideNavMenuTemplate({
            children: html` <cds-side-nav-menu-item></cds-side-nav-menu-item> `,
          }),
          document.body
        );
        await Promise.resolve();
        const menu = document.body.querySelector('cds-side-nav-menu');
        const menuItem = menu!.querySelector('cds-side-nav-menu-item');
        const svg = document.createElement('svg');
        svg.setAttribute('slot', 'title-icon');
        menu!.appendChild(svg);
        await Promise.resolve();
        expect(menuItem!.hasAttribute('parent-has-icon')).toBe(true);
      });
    });
  });

  describe('cds-side-nav-menu-item', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(sideNavMenuItemTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-side-nav-menu-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async function () {
        render(
          sideNavMenuItemTemplate({
            active: true,
            href: 'about:blank',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-side-nav-menu-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Activating', function () {
      it('should mark the parent side nav menu as it has active child side nav menu item', async function () {
        render(sideNavMenuItemTemplate({ active: true }), document.body);
        await Promise.resolve();
        expect(
          (document.body.querySelector('cds-side-nav-menu') as CDSSideNavMenu)
            .active
        ).toBe(true);
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
