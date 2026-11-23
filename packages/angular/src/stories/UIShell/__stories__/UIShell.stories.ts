/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  type ArgTypes,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { action } from 'storybook/actions';
import {
  HeaderComponent,
  HeaderGlobalActionComponent,
  HeaderMenuComponent,
  HeaderMenuButtonComponent,
  HeaderMenuItemComponent,
  HeaderNameComponent,
  HeaderNavComponent,
  HeaderNavItemComponent,
  HeaderPanelComponent,
  HeaderSideNavItemsComponent,
  SideNavComponent,
  SideNavDividerComponent,
  SideNavItemsComponent,
  SideNavLinkComponent,
  SideNavMenuComponent,
  SideNavMenuItemComponent,
  SwitcherComponent,
  SwitcherDividerComponent,
  SwitcherItemComponent,
} from '@carbon/angular/ui-shell';
import { SkipToContentComponent } from '@carbon/angular/skip-to-content';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalCloseButtonComponent,
  ModalLabelComponent,
  ModalHeadingComponent,
  ModalBodyComponent,
  ModalBodyContentComponent,
  ModalFooterComponent,
  ModalFooterButtonComponent,
} from '@carbon/angular/modal';
import { ButtonComponent } from '@carbon/angular/button';
import { BadgeIndicatorComponent } from '@carbon/angular/badge-indicator';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';
import Fade16 from '@carbon/icons/es/fade/16.js';
import Search20 from '@carbon/icons/es/search/20.js';
import Notification20 from '@carbon/icons/es/notification/20.js';
import SwitcherIcon20 from '@carbon/icons/es/switcher/20.js';

const linksHref = 'https://www.carbondesignsystem.com/';

const headerArgs = {
  headerAriaLabel: 'IBM Cloud',
  platformName: 'Cloud console',
  platformPrefix: 'IBM',
};

const headerArgTypes: ArgTypes = {
  headerAriaLabel: {
    control: 'text',
    description: 'Provide an accessible label for the header.',
    table: { category: 'Header' },
  },
  platformName: {
    control: 'text',
    description: 'Specify the product name displayed in the header.',
    table: { category: 'HeaderName' },
  },
  platformPrefix: {
    control: 'text',
    description: 'Specify the prefix displayed before the product name.',
    table: { category: 'HeaderName' },
  },
};

const navigationArgs = {
  navigationAriaLabel: 'IBM Cloud',
  navigationMenuLabel: 'Manage',
};

const navigationArgTypes: ArgTypes = {
  navigationAriaLabel: {
    control: 'text',
    description: 'Provide an accessible label for the header navigation.',
    table: { category: 'HeaderNav' },
  },
  navigationMenuLabel: {
    control: 'text',
    description: 'Specify the label for the header navigation menu.',
    table: { category: 'HeaderMenu' },
  },
};

const sideNavAriaLabelArgs = {
  sideNavAriaLabel: 'Side navigation',
};

const sideNavAriaLabelArgTypes: ArgTypes = {
  sideNavAriaLabel: {
    control: 'text',
    description: 'Provide an accessible label for the side navigation.',
    table: { category: 'SideNav' },
  },
};

const sideNavArgs = {
  ...sideNavAriaLabelArgs,
  expanded: true,
};

const sideNavArgTypes: ArgTypes = {
  ...sideNavAriaLabelArgTypes,
  expanded: {
    control: 'boolean',
    description: 'Specify whether the side navigation is expanded.',
    table: { category: 'SideNav' },
  },
};

const badgeArgTypes: ArgTypes = {
  badgeCount: {
    control: 'number',
    description:
      'Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0.',
  },
};

const getStoryContentTemplate = (useResponsiveOffset = true) => `
  <main class="cds--content cds-ce-demo-devenv--ui-shell-content">
    <div class="cds--grid">
      <div class="cds--row">
        <div
          class="cds--col-lg-13 ${useResponsiveOffset ? 'cds--offset-lg-3' : ''}"
          style="${!useResponsiveOffset ? 'margin-left: 16rem;' : ''}">
          <h2 style="margin: 0 0 30px">Purpose and function</h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with
            <a href="https://www.carbondesignsystem.com/">Carbon</a>. It
            contains the shared navigation framework for the entire design
            system and ties the products in IBM's portfolio together in a
            cohesive and elegant way. The shell is the home of the topmost
            navigation, where users can quickly and dependably gain their
            bearings and move between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the
            shell ensures compliance with IBM design standards, simplifies
            development efforts, and provides great user experiences. All IBM
            products built with Carbon are required to use the shell's header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the "shell" of macOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top
            of the screen, as well as a universal dock along the bottom or
            side of the screen. The Carbon UI shell is roughly analogous in
            function to these parts of the Mac UI. For example, the app
            switcher portion of the shell can be compared to the dock in
            macOS.
          </p>
          <h2 style="margin: 30px 0px">Header responsive behavior</h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            "hamburger" menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2 style="margin: 30px 0px">Secondary navigation</h2>
          <p>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and
            category lists can be used in the side-nav and may be mixed
            together. There are several configurations of the side-nav, but
            only one configuration should be used per product section. If tabs
            are needed on a page when using a side-nav, then the tabs are
            secondary in hierarchy to the side-nav.
          </p>
          <cds-ng-modal [open]="isModalOpen" (modalClosed)="isModalOpen = false">
            <cds-ng-modal-header>
              <cds-ng-modal-close-button></cds-ng-modal-close-button>
              <cds-ng-modal-label>Account resources</cds-ng-modal-label>
              <cds-ng-modal-heading>Add a custom domain</cds-ng-modal-heading>
            </cds-ng-modal-header>
            <cds-ng-modal-body>
              <cds-ng-modal-body-content description>
                Custom domains direct requests for your apps in this Cloud
                Foundry organization to a URL that you own. A custom domain
                can be a shared domain, a shared subdomain, or a shared domain
                and host.
              </cds-ng-modal-body-content>
            </cds-ng-modal-body>
            <cds-ng-modal-footer>
              <cds-ng-modal-footer-button kind="secondary" (click)="isModalOpen = false"
                >Cancel</cds-ng-modal-footer-button
              >
              <cds-ng-modal-footer-button>Add</cds-ng-modal-footer-button>
            </cds-ng-modal-footer>
          </cds-ng-modal>
          <cds-ng-button (click)="isModalOpen = !isModalOpen">Launch modal</cds-ng-button>
        </div>
      </div>
    </div>
  </main>
`;

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/UI Shell',
  decorators: [
    moduleMetadata({
      imports: [
        HeaderComponent,
        HeaderGlobalActionComponent,
        HeaderMenuComponent,
        HeaderMenuButtonComponent,
        HeaderMenuItemComponent,
        HeaderNameComponent,
        HeaderNavComponent,
        HeaderNavItemComponent,
        HeaderPanelComponent,
        HeaderSideNavItemsComponent,
        SideNavComponent,
        SideNavDividerComponent,
        SideNavItemsComponent,
        SideNavLinkComponent,
        SideNavMenuComponent,
        SideNavMenuItemComponent,
        SwitcherComponent,
        SwitcherDividerComponent,
        SwitcherItemComponent,
        SkipToContentComponent,
        ModalComponent,
        ModalHeaderComponent,
        ModalCloseButtonComponent,
        ModalLabelComponent,
        ModalHeadingComponent,
        ModalBodyComponent,
        ModalBodyContentComponent,
        ModalFooterComponent,
        ModalFooterButtonComponent,
        ButtonComponent,
        BadgeIndicatorComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// ─── WC-parity stories (one-for-one with @carbon/web-components UI Shell) ────

export const FixedSideNav: Story = {
  name: 'Fixed Side Nav',
  args: { ...sideNavArgs },
  argTypes: { ...sideNavArgTypes },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-side-nav
        [isNotChildOfHeader]="true"
        usageMode="regular"
        [attr.aria-label]="sideNavAriaLabel"
        collapseMode="fixed"
        [expanded]="expanded">
        <cds-ng-side-nav-items>
          <cds-ng-side-nav-menu title="L0 menu">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="L0 menu">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item
              [active]="true"
              aria-current="page"
              target="_blank"
              [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="L0 menu">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-link href="javascript:void(0)"
            >L0 link</cds-ng-side-nav-link
          >
          <cds-ng-side-nav-link href="javascript:void(0)"
            >L0 link</cds-ng-side-nav-link
          >
        </cds-ng-side-nav-items>
      </cds-ng-side-nav>
      ${getStoryContentTemplate(false)}
    `,
  }),
};

export const FixedSideNavDivider: Story = {
  name: 'Fixed Side Nav with Divider',
  args: { ...sideNavArgs },
  argTypes: { ...sideNavArgTypes },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-side-nav
        [isNotChildOfHeader]="true"
        [attr.aria-label]="sideNavAriaLabel"
        collapseMode="fixed"
        [expanded]="expanded">
        <cds-ng-side-nav-items>
          <cds-ng-side-nav-menu title="L0 menu">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="L0 menu">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item
              [active]="true"
              aria-current="page"
              [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="L0 menu">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              L0 menu item
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-divider></cds-ng-side-nav-divider>
          <cds-ng-side-nav-link href="javascript:void(0)"
            >L0 link</cds-ng-side-nav-link
          >
          <cds-ng-side-nav-link href="javascript:void(0)"
            >L0 link</cds-ng-side-nav-link
          >
        </cds-ng-side-nav-items>
      </cds-ng-side-nav>
      ${getStoryContentTemplate(false)}
    `,
  }),
};

export const FixedSideNavWMixedLinksAndButtons: Story = {
  name: 'Fixed Side Nav with Mixed Buttons and Links',
  args: { ...sideNavArgs },
  argTypes: { ...sideNavArgTypes },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
      onReleaseNotes: action('Open release notes'),
      onVersionDetails: action('Open version details'),
      onFeedback: action('Open feedback modal'),
    },
    template: `
      <cds-ng-side-nav
        [isNotChildOfHeader]="true"
        [attr.aria-label]="sideNavAriaLabel"
        collapseMode="fixed"
        [expanded]="expanded">
        <cds-ng-side-nav-items>
          <cds-ng-side-nav-link [href]="linksHref"> Overview </cds-ng-side-nav-link>
          <cds-ng-side-nav-link as="button" (click)="onReleaseNotes($event)">
            Release notes
          </cds-ng-side-nav-link>
          <cds-ng-side-nav-menu title="Resources">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Documentation
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item
              as="button"
              (click)="onVersionDetails($event)">
              Version details
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Support
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-divider></cds-ng-side-nav-divider>
          <cds-ng-side-nav-link [active]="true" [href]="linksHref">
            Settings
          </cds-ng-side-nav-link>
          <cds-ng-side-nav-link
            as="button"
            (click)="onFeedback($event)">
            Send feedback
          </cds-ng-side-nav-link>
        </cds-ng-side-nav-items>
      </cds-ng-side-nav>
      ${getStoryContentTemplate(false)}
    `,
  }),
};

export const FixedSideNavIcons: Story = {
  name: 'Fixed Side Nav with Icons',
  args: { ...sideNavArgs },
  argTypes: { ...sideNavArgTypes },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-side-nav
        [isNotChildOfHeader]="true"
        [attr.aria-label]="sideNavAriaLabel"
        collapseMode="fixed"
        [expanded]="expanded">
        <cds-ng-side-nav-items>
          <cds-ng-side-nav-menu title="Category title">
            ${iconToSvg(Fade16, { slot: 'title-icon' })}
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="Category title">
            ${iconToSvg(Fade16, { slot: 'title-icon' })}
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item
              [active]="true"
              aria-current="page"
              [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="Category title">
            ${iconToSvg(Fade16, { slot: 'title-icon' })}
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-link href="javascript:void(0)"
            >${iconToSvg(Fade16, { slot: 'title-icon' })}
            Link</cds-ng-side-nav-link
          >
          <cds-ng-side-nav-link href="javascript:void(0)"
            >${iconToSvg(Fade16, { slot: 'title-icon' })}
            Link</cds-ng-side-nav-link
          >
        </cds-ng-side-nav-items>
      </cds-ng-side-nav>
      ${getStoryContentTemplate(false)}
    `,
  }),
};

export const HeaderBase: Story = {
  args: { ...headerArgs },
  argTypes: { ...headerArgTypes },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
      </cds-ng-header>
    `,
  }),
};

export const HeaderBaseWActions: Story = {
  name: 'Header Base with Actions',
  args: { ...headerArgs },
  argTypes: { ...headerArgTypes },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <div class="cds--header__global">
          <cds-ng-header-global-action aria-label="Search" tooltipText="Search">
            ${iconToSvg(Search20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="Notification"
            tooltipText="Notification">
            ${iconToSvg(Notification20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="App Switcher"
            tooltipText="App Switcher"
            tooltipAlignment="right">
            ${iconToSvg(SwitcherIcon20, { slot: 'icon' })}
          </cds-ng-header-global-action>
        </div>
      </cds-ng-header>
    `,
  }),
};

export const HeaderBaseWActionsRightPanel: Story = {
  name: 'Header Base with Actions and Right Panel',
  argTypes: {
    ...headerArgTypes,
    ...badgeArgTypes,
  },
  args: {
    ...headerArgs,
    badgeCount: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <div class="cds--header__global">
          <cds-ng-header-global-action aria-label="Search" tooltipText="Search">
            ${iconToSvg(Search20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            panelId="notification-panel"
            aria-label="Notification"
            tooltipText="Notification">
            ${iconToSvg(Notification20, { slot: 'icon' })}
            <cds-ng-badge-indicator
              *ngIf="badgeCount > 0"
              [count]="badgeCount"></cds-ng-badge-indicator>
            <cds-ng-badge-indicator *ngIf="badgeCount <= 0"></cds-ng-badge-indicator>
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="App Switcher"
            tooltipText="App Switcher"
            tooltipAlignment="right">
            ${iconToSvg(SwitcherIcon20, { slot: 'icon' })}
          </cds-ng-header-global-action>
        </div>
        <cds-ng-header-panel
          id="notification-panel"
          aria-label="Header Panel"></cds-ng-header-panel>
      </cds-ng-header>
    `,
  }),
};

export const HeaderBaseWActionsSwitcher: Story = {
  name: 'Header Base with Actions and Switcher',
  args: { ...headerArgs },
  argTypes: { ...headerArgTypes },
  render: (args) => ({
    props: {
      ...args,
      isModalOpen: false,
    },
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <div class="cds--header__global">
          <cds-ng-header-global-action aria-label="Search" tooltipText="Search">
            ${iconToSvg(Search20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="Notification"
            tooltipText="Notification">
            ${iconToSvg(Notification20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            buttonLabelActive="Close switcher"
            buttonLabelInactive="Open switcher"
            tooltipText="Open switcher"
            panelId="switcher-panel"
            tooltipAlignment="right">
            ${iconToSvg(SwitcherIcon20, { slot: 'icon' })}
          </cds-ng-header-global-action>
        </div>
        <cds-ng-header-panel id="switcher-panel" aria-label="Header Panel">
          <cds-ng-switcher aria-label="Switcher Container">
            <cds-ng-switcher-item aria-label="Link 1" href="#"
              >Link 1</cds-ng-switcher-item
            >
            <cds-ng-switcher-divider></cds-ng-switcher-divider>
            <cds-ng-switcher-item aria-label="Link 2" href="#"
              >Link 2</cds-ng-switcher-item
            >
            <cds-ng-switcher-item aria-label="Link 3" href="#"
              >Link 3</cds-ng-switcher-item
            >
            <cds-ng-switcher-item aria-label="Link 4" href="#"
              >Link 4</cds-ng-switcher-item
            >
            <cds-ng-switcher-item aria-label="Link 5" href="#"
              >Link 5</cds-ng-switcher-item
            >
            <cds-ng-switcher-divider></cds-ng-switcher-divider>
            <cds-ng-switcher-item aria-label="Link 6" href="#"
              >Link 6</cds-ng-switcher-item
            >
          </cds-ng-switcher>
        </cds-ng-header-panel>
      </cds-ng-header>
      ${getStoryContentTemplate(true)}
    `,
  }),
};

export const HeaderBaseWNavigationActionsAndSideNav: Story = {
  name: 'Header Base with Navigation, Actions and Side Nav',
  args: {
    ...headerArgs,
    ...navigationArgs,
    ...sideNavAriaLabelArgs,
  },
  argTypes: {
    ...headerArgTypes,
    ...navigationArgTypes,
    ...sideNavAriaLabelArgTypes,
  },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-menu-button
          buttonLabelActive="Close menu"
          buttonLabelInactive="Open menu"></cds-ng-header-menu-button>
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <cds-ng-header-nav [menuBarLabel]="navigationAriaLabel">
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 1</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 2</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 3</cds-ng-header-nav-item
          >
          <cds-ng-header-menu
            [menuLabel]="navigationMenuLabel"
            [triggerContent]="navigationMenuLabel">
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 1</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 2</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 3</cds-ng-header-menu-item
            >
          </cds-ng-header-menu>
        </cds-ng-header-nav>
        <div class="cds--header__global">
          <cds-ng-header-global-action aria-label="Search" tooltipText="Search">
            ${iconToSvg(Search20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="Notification"
            tooltipText="Notification">
            ${iconToSvg(Notification20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="App Switcher"
            tooltipText="App Switcher"
            tooltipAlignment="right">
            ${iconToSvg(SwitcherIcon20, { slot: 'icon' })}
          </cds-ng-header-global-action>
        </div>
        <cds-ng-side-nav
          [attr.aria-label]="sideNavAriaLabel"
          collapseMode="responsive">
          <cds-ng-side-nav-items>
            <cds-ng-header-side-nav-items [hasDivider]="true">
              <cds-ng-side-nav-link href="javascript:void(0)">
                Link 1
              </cds-ng-side-nav-link>
              <cds-ng-side-nav-link href="javascript:void(0)">
                Link 2
              </cds-ng-side-nav-link>
              <cds-ng-side-nav-link href="javascript:void(0)">
                Link 3
              </cds-ng-side-nav-link>
              <cds-ng-side-nav-menu title="Link 4">
                <cds-ng-side-nav-menu-item [href]="linksHref">
                  Sub-link 1
                </cds-ng-side-nav-menu-item>
                <cds-ng-side-nav-menu-item [href]="linksHref">
                  Sub-link 2
                </cds-ng-side-nav-menu-item>
                <cds-ng-side-nav-menu-item [href]="linksHref">
                  Sub-link 3
                </cds-ng-side-nav-menu-item>
              </cds-ng-side-nav-menu>
            </cds-ng-header-side-nav-items>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item aria-current="page" [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [active]="true" [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-link href="javascript:void(0)"
              >${iconToSvg(Fade16, { slot: 'title-icon' })}
              Link</cds-ng-side-nav-link
            >
            <cds-ng-side-nav-link href="javascript:void(0)"
              >${iconToSvg(Fade16, { slot: 'title-icon' })}
              Link</cds-ng-side-nav-link
            >
          </cds-ng-side-nav-items>
        </cds-ng-side-nav>
      </cds-ng-header>
      ${getStoryContentTemplate(true)}
    `,
  }),
};

export const HeaderBaseWNavigationActions: Story = {
  name: 'Header Base with Navigation and Actions',
  args: {
    ...headerArgs,
    ...navigationArgs,
    ...sideNavAriaLabelArgs,
  },
  argTypes: {
    ...headerArgTypes,
    ...navigationArgTypes,
    ...sideNavAriaLabelArgTypes,
  },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
    },
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-menu-button
          buttonLabelActive="Close menu"
          buttonLabelInactive="Open menu"></cds-ng-header-menu-button>
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <cds-ng-header-nav [menuBarLabel]="navigationAriaLabel">
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 1</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 2</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 3</cds-ng-header-nav-item
          >
          <cds-ng-header-menu
            [isActive]="true"
            [menuLabel]="navigationMenuLabel"
            [triggerContent]="navigationMenuLabel">
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 1</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 2</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 3</cds-ng-header-menu-item
            >
          </cds-ng-header-menu>
        </cds-ng-header-nav>
        <div class="cds--header__global">
          <cds-ng-header-global-action aria-label="Search" tooltipText="Search">
            ${iconToSvg(Search20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="Notification"
            tooltipText="Notification">
            ${iconToSvg(Notification20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="App Switcher"
            tooltipText="App Switcher"
            tooltipAlignment="right">
            ${iconToSvg(SwitcherIcon20, { slot: 'icon' })}
          </cds-ng-header-global-action>
        </div>
        <cds-ng-side-nav
          [isNotPersistent]="true"
          [attr.aria-label]="sideNavAriaLabel"
          collapseMode="responsive">
          <cds-ng-side-nav-items>
            <cds-ng-side-nav-link href="javascript:void(0)">
              Link 1
            </cds-ng-side-nav-link>
            <cds-ng-side-nav-link href="javascript:void(0)">
              Link 2
            </cds-ng-side-nav-link>
            <cds-ng-side-nav-link href="javascript:void(0)">
              Link 3
            </cds-ng-side-nav-link>
            <cds-ng-side-nav-menu title="Link 4">
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Sub-link 1
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Sub-link 2
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Sub-link 3
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
          </cds-ng-side-nav-items>
        </cds-ng-side-nav>
      </cds-ng-header>
    `,
  }),
};

export const HeaderBaseWNavigation: Story = {
  name: 'Header Base with Navigation',
  args: {
    ...headerArgs,
    ...navigationArgs,
    ...sideNavAriaLabelArgs,
  },
  argTypes: {
    ...headerArgTypes,
    ...navigationArgTypes,
    ...sideNavAriaLabelArgTypes,
  },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
    },
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-menu-button
          buttonLabelActive="Close menu"
          buttonLabelInactive="Open menu"></cds-ng-header-menu-button>
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <cds-ng-header-nav [menuBarLabel]="navigationAriaLabel">
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 1</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 2</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 3</cds-ng-header-nav-item
          >
          <cds-ng-header-menu
            [menuLabel]="navigationMenuLabel"
            [triggerContent]="navigationMenuLabel">
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 1</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item [isActive]="true" href="javascript:void 0"
              >Sub-link 2</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 3</cds-ng-header-menu-item
            >
          </cds-ng-header-menu>
        </cds-ng-header-nav>
        <cds-ng-side-nav
          [isNotPersistent]="true"
          [attr.aria-label]="sideNavAriaLabel"
          collapseMode="responsive">
          <cds-ng-side-nav-items>
            <cds-ng-side-nav-link href="javascript:void(0)">
              Link 1
            </cds-ng-side-nav-link>
            <cds-ng-side-nav-link href="javascript:void(0)">
              Link 2
            </cds-ng-side-nav-link>
            <cds-ng-side-nav-link href="javascript:void(0)">
              Link 3
            </cds-ng-side-nav-link>
            <cds-ng-side-nav-menu title="Link 4">
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Sub-link 1
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Sub-link 2
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Sub-link 3
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
          </cds-ng-side-nav-items>
        </cds-ng-side-nav>
      </cds-ng-header>
    `,
  }),
};

export const HeaderBaseWSideNav: Story = {
  name: 'Header Base with Side Nav',
  args: {
    ...headerArgs,
    ...sideNavAriaLabelArgs,
  },
  argTypes: {
    ...headerArgTypes,
    ...sideNavAriaLabelArgTypes,
  },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-menu-button
          buttonLabelActive="Close menu"
          buttonLabelInactive="Open menu"></cds-ng-header-menu-button>
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <cds-ng-side-nav
          [attr.aria-label]="sideNavAriaLabel"
          collapseMode="responsive">
          <cds-ng-side-nav-items>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item
                [active]="true"
                aria-current="page"
                [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-link href="javascript:void(0)"
              >${iconToSvg(Fade16, {
                slot: 'title-icon',
              })}Link</cds-ng-side-nav-link
            >
            <cds-ng-side-nav-link href="javascript:void(0)"
              >${iconToSvg(Fade16, {
                slot: 'title-icon',
              })}Link</cds-ng-side-nav-link
            >
          </cds-ng-side-nav-items>
        </cds-ng-side-nav>
      </cds-ng-header>
      ${getStoryContentTemplate(true)}
    `,
  }),
};

export const HeaderBaseWSkipToContent: Story = {
  name: 'Header Base with SkipToContent',
  args: { ...headerArgs },
  argTypes: { ...headerArgTypes },
  render: (args) => ({
    props: {
      ...args,
      isModalOpen: false,
    },
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-skip-to-content></cds-ng-skip-to-content>
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <div class="cds--header__global">
          <cds-ng-header-global-action aria-label="Search" tooltipText="Search">
            ${iconToSvg(Search20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="Notification"
            tooltipText="Notification">
            ${iconToSvg(Notification20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="App Switcher"
            tooltipText="App Switcher"
            tooltipAlignment="right">
            ${iconToSvg(SwitcherIcon20, { slot: 'icon' })}
          </cds-ng-header-global-action>
        </div>
      </cds-ng-header>
      ${getStoryContentTemplate(true)}
    `,
  }),
};

export const SideNavRail: Story = {
  name: 'Side Nav Rail',
  args: {
    ...sideNavAriaLabelArgs,
    expanded: false,
  },
  argTypes: { ...sideNavArgTypes },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-side-nav
        [attr.aria-label]="sideNavAriaLabel"
        collapseMode="rail"
        [expanded]="expanded">
        <cds-ng-side-nav-items>
          <cds-ng-side-nav-menu title="Category title">
            ${iconToSvg(Fade16, { slot: 'title-icon' })}
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item
              [active]="true"
              aria-current="page"
              [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="Category title">
            ${iconToSvg(Fade16, { slot: 'title-icon' })}
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-menu title="Category title">
            ${iconToSvg(Fade16, { slot: 'title-icon' })}
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Link
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-link href="javascript:void(0)"
            >${iconToSvg(Fade16, { slot: 'title-icon' })}
            Link</cds-ng-side-nav-link
          >
          <cds-ng-side-nav-link href="javascript:void(0)"
            >${iconToSvg(Fade16, { slot: 'title-icon' })}
            Link</cds-ng-side-nav-link
          >
        </cds-ng-side-nav-items>
      </cds-ng-side-nav>
      ${getStoryContentTemplate(true)}
    `,
  }),
};

export const SideNavRailWHeader: Story = {
  name: 'Side Nav Rail with Header',
  args: {
    ...headerArgs,
    ...navigationArgs,
    ...sideNavAriaLabelArgs,
    expanded: false,
  },
  argTypes: {
    ...headerArgTypes,
    ...navigationArgTypes,
    ...sideNavArgTypes,
  },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-header [attr.aria-label]="headerAriaLabel">
        <cds-ng-header-menu-button
          buttonLabelActive="Close menu"
          buttonLabelInactive="Open menu"></cds-ng-header-menu-button>
        <cds-ng-header-name href="javascript:void 0" [prefix]="platformPrefix"
          >{{ platformName }}</cds-ng-header-name
        >
        <cds-ng-header-nav [menuBarLabel]="navigationAriaLabel">
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 1</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 2</cds-ng-header-nav-item
          >
          <cds-ng-header-nav-item href="javascript:void 0"
            >Link 3</cds-ng-header-nav-item
          >
          <cds-ng-header-menu
            [menuLabel]="navigationMenuLabel"
            [triggerContent]="navigationMenuLabel">
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 1</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 2</cds-ng-header-menu-item
            >
            <cds-ng-header-menu-item href="javascript:void 0"
              >Sub-link 3</cds-ng-header-menu-item
            >
          </cds-ng-header-menu>
        </cds-ng-header-nav>
        <div class="cds--header__global">
          <cds-ng-header-global-action aria-label="Search" tooltipText="Search">
            ${iconToSvg(Search20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="Notification"
            tooltipText="Notification">
            ${iconToSvg(Notification20, { slot: 'icon' })}
          </cds-ng-header-global-action>
          <cds-ng-header-global-action
            aria-label="App Switcher"
            tooltipText="App Switcher"
            tooltipAlignment="right">
            ${iconToSvg(SwitcherIcon20, { slot: 'icon' })}
          </cds-ng-header-global-action>
        </div>
        <cds-ng-side-nav
          [attr.aria-label]="sideNavAriaLabel"
          collapseMode="rail"
          [expanded]="expanded">
          <cds-ng-side-nav-items>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item
                [active]="true"
                aria-current="page"
                [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-menu title="Category title">
              ${iconToSvg(Fade16, { slot: 'title-icon' })}
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
              <cds-ng-side-nav-menu-item [href]="linksHref">
                Link
              </cds-ng-side-nav-menu-item>
            </cds-ng-side-nav-menu>
            <cds-ng-side-nav-link href="javascript:void(0)"
              >${iconToSvg(Fade16, { slot: 'title-icon' })}
              Link</cds-ng-side-nav-link
            >
            <cds-ng-side-nav-link href="javascript:void(0)"
              >${iconToSvg(Fade16, { slot: 'title-icon' })}
              Link</cds-ng-side-nav-link
            >
          </cds-ng-side-nav-items>
        </cds-ng-side-nav>
      </cds-ng-header>
      ${getStoryContentTemplate(true)}
    `,
  }),
};

export const SideNavWLargeSideNavItems: Story = {
  name: 'Side Nav with Large Side Nav Items',
  args: { ...sideNavArgs },
  argTypes: { ...sideNavArgTypes },
  render: (args) => ({
    props: {
      ...args,
      linksHref,
      isModalOpen: false,
    },
    template: `
      <cds-ng-side-nav
        [isNotChildOfHeader]="true"
        [attr.aria-label]="sideNavAriaLabel"
        collapseMode="fixed"
        [expanded]="expanded">
        <cds-ng-side-nav-items>
          <cds-ng-side-nav-menu [large]="true" title="Large menu">
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Menu 1
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Menu 2
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Menu 3
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-link [large]="true" href="javascript:void(0)"
            >Large link</cds-ng-side-nav-link
          >
          <cds-ng-side-nav-menu [large]="true" title="Large menu with icon">
            ${iconToSvg(Fade16, { slot: 'title-icon' })}
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Menu 1
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Menu 2
            </cds-ng-side-nav-menu-item>
            <cds-ng-side-nav-menu-item [href]="linksHref">
              Menu 3
            </cds-ng-side-nav-menu-item>
          </cds-ng-side-nav-menu>
          <cds-ng-side-nav-link [large]="true" href="javascript:void(0)">
            ${iconToSvg(Fade16, { slot: 'title-icon' })} Large link with
            icon</cds-ng-side-nav-link
          >
        </cds-ng-side-nav-items>
      </cds-ng-side-nav>
      ${getStoryContentTemplate(false)}
    `,
  }),
};
