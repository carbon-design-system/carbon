/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20071
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

describe('ui-shell', () => {
  const events = new EventManager();

  describe('cds-header-menu-button', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(headerMenuButtonTemplate(), document.body);
        await Promise.resolve();

        expect(
          document.body.querySelector('cds-header-menu-button')
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes for inactive state', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-menu-button' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes for active state', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-menu-button' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Handling user interaction', () => {
      it('should fire cds-header-menu-button-toggled event upon clicking the button', async () => {
        render(headerMenuButtonTemplate(), document.body);
        await Promise.resolve();
        const spyAfterToggle = jasmine.createSpy('after toggle');
        const button = document.body.querySelector('cds-header-menu-button');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(button!, 'cds-header-menu-button-toggled', spyAfterToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        button!.shadowRoot!.querySelector('button')!.click();
        expect(spyAfterToggle).toHaveBeenCalled();
      });
    });
  });

  describe('cds-header-menu', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(headerMenuTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-menu' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-menu' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });

    describe('Handling user interaction', () => {
      it('should toggle the expanded state upon clicking the button', async () => {
        render(headerMenuTemplate(), document.body);
        await Promise.resolve();
        const menu = document.body.querySelector('cds-header-menu');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        menu!.shadowRoot!.querySelector('a')!.click();
        expect((menu as CDSHeaderMenu).expanded).toBe(true);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        menu!.shadowRoot!.querySelector('a')!.click();
        expect((menu as CDSHeaderMenu).expanded).toBe(false);
      });

      xit('should collapse upon hitting ESC key', async () => {
        render(headerMenuTemplate({ expanded: true }), document.body);
        await Promise.resolve();
        const menu = document.body.querySelector('cds-header-menu');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        const trigger = menu!.shadowRoot!.querySelector('a');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        spyOn(trigger!, 'focus');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        trigger!.dispatchEvent(
          Object.assign(new CustomEvent('keydown', { bubbles: true }), {
            key: 'Escape',
          })
        );
        expect((menu as CDSHeaderMenu).expanded).toBe(false);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        expect(trigger!.focus).toHaveBeenCalled();
      });

      it('should collapse upon losing focus', async () => {
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

  describe('cds-header-name', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(headerNameTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-name' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async () => {
        render(
          headerNameTemplate({
            href: 'about:blank',
            prefix: 'prefix-foo',
          }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body as any
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-name' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });
  });

  describe('cds-header-nav', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(headerNavTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-nav' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async () => {
        render(
          headerNavTemplate({
            menuBarLabel: 'menu-bar-label-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-nav' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });
  });

  describe('cds-header-nav-item', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(headerNavItemTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-nav-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
        render(
          headerNavItemTemplate({
            href: 'about:blank',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-header-nav-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });
  });

  describe('cds-side-nav-link', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(sideNavLinkTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-side-nav-link' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-side-nav-link' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });
  });

  describe('cds-side-nav', () => {
    describe('Handling events', () => {
      xit('should let child side nav menu collapse if this side nav is collapsed', async () => {
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        nav!.dispatchEvent(new CustomEvent('mouseover', { bubbles: true }));
        await Promise.resolve();
        expect((menu as CDSSideNavMenu).forceCollapsed).toBe(false);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        nav!.dispatchEvent(new CustomEvent('mouseout', { bubbles: true }));
        await Promise.resolve();
        expect((menu as CDSSideNavMenu).forceCollapsed).toBe(true);
      });

      it('should toggle expand state upon upon clicking on header menu button', async () => {
        render(sideNavTemplate(), document.body);
        await Promise.resolve();
        const nav = document.body.querySelector('cds-side-nav');
        const menuButton = document.body.querySelector(
          'cds-header-menu-button'
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        menuButton!.dispatchEvent(
          new CustomEvent('cds-header-menu-button-toggled', {
            bubbles: true,
            detail: { active: true },
          })
        );
        expect((nav as CDSSideNav).expanded).toBe(true);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        menuButton!.dispatchEvent(
          new CustomEvent('cds-header-menu-button-toggled', {
            bubbles: true,
            detail: { active: false },
          })
        );
        expect((nav as CDSSideNav).expanded).toBe(false);
      });
    });

    describe('Working with header menu button', () => {
      it('should propagate mode/states to header menu button', async () => {
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

  describe('cds-side-nav-menu', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(sideNavMenuTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-side-nav-menu' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-side-nav-menu' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should support collapsing side nav menu upon parent side nav is collapsed as rail', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-side-nav-menu' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Handling user interaction', () => {
      it('should fire cds-side-nav-menu-beingtoggled/cds-side-nav-menu-toggled events upon toggling', async () => {
        render(sideNavMenuTemplate(), document.body);
        await Promise.resolve();
        const spyBeforeToggle = jasmine.createSpy('before toggle');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        const button = document.body.querySelector('cds-side-nav-menu');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(button!, 'cds-side-nav-menu-beingtoggled', spyBeforeToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(button!, 'cds-side-nav-menu-toggled', spyAfterToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        button!.shadowRoot!.querySelector('button')!.click();
        expect(spyBeforeToggle).toHaveBeenCalled();
        expect(spyAfterToggle).toHaveBeenCalled();
      });

      it('should support preventing side nav menu from being toggled upon user gesture', async () => {
        render(sideNavMenuTemplate(), document.body);
        await Promise.resolve();
        const spyAfterToggle = jasmine.createSpy('after toggle');
        const button = document.body.querySelector('cds-side-nav-menu');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(button!, 'cds-side-nav-menu-beingtoggled', (event) => {
          event.preventDefault();
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(button!, 'cds-side-nav-menu-toggled', spyAfterToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        button!.shadowRoot!.querySelector('button')!.click();
        await Promise.resolve();
        expect(spyAfterToggle).not.toHaveBeenCalled();
      });
    });

    describe('Detecting icons', () => {
      it('should tell new child side nav item that the parent side nav menu has an icon', async () => {
        render(
          sideNavMenuTemplate({
            children: Fade16({ slot: 'title-icon' }),
          }),
          document.body
        );
        await Promise.resolve();
        const menu = document.body.querySelector('cds-side-nav-menu');
        const menuItem = document.createElement('cds-side-nav-menu-item');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        menu!.appendChild(menuItem);
        await Promise.resolve(); // `slotchange` event seems to happen at EOM
        expect(menuItem.hasAttribute('parent-has-icon')).toBe(true);
      });

      it('should tell existing child side nav item that the parent side nav menu has an icon', async () => {
        render(
          sideNavMenuTemplate({
            children: html` <cds-side-nav-menu-item></cds-side-nav-menu-item> `,
          }),
          document.body
        );
        await Promise.resolve();
        const menu = document.body.querySelector('cds-side-nav-menu');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        const menuItem = menu!.querySelector('cds-side-nav-menu-item');
        const svg = document.createElement('svg');
        svg.setAttribute('slot', 'title-icon');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        menu!.appendChild(svg);
        await Promise.resolve();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        expect(menuItem!.hasAttribute('parent-has-icon')).toBe(true);
      });
    });
  });

  describe('cds-side-nav-menu-item', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(sideNavMenuItemTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-side-nav-menu-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
        render(
          sideNavMenuItemTemplate({
            active: true,
            href: 'about:blank',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-side-nav-menu-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Activating', () => {
      it('should mark the parent side nav menu as it has active child side nav menu item', async () => {
        render(sideNavMenuItemTemplate({ active: true }), document.body);
        await Promise.resolve();
        expect(
          (document.body.querySelector('cds-side-nav-menu') as CDSSideNavMenu)
            .active
        ).toBe(true);
      });
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
    events.reset();
  });
});
