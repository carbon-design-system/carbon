/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Fade16 from 'carbon-web-components/es/icons/fade/16';
import contentStyles from 'carbon-components/scss/components/ui-shell/_content.scss';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { SIDE_NAV_COLLAPSE_MODE, SIDE_NAV_USAGE_MODE } from './side-nav';
import './side-nav-items';
import './side-nav-link';
import './side-nav-divider';
import './side-nav-menu';
import './side-nav-menu-item';
import './header';
import './header-nav';
import './header-nav-item';
import './header-menu';
import './header-menu-item';
import './header-menu-button';
import './header-name';
import styles from './ui-shell-story.scss';
import storyDocs from './ui-shell-story.mdx';

const collapseModes = {
  Responsive: null,
  [`Fixed (${SIDE_NAV_COLLAPSE_MODE.FIXED})`]: SIDE_NAV_COLLAPSE_MODE.FIXED,
  [`Rail (${SIDE_NAV_COLLAPSE_MODE.RAIL})`]: SIDE_NAV_COLLAPSE_MODE.RAIL,
};

const usageModes = {
  Regular: null,
  [`For header nav (${SIDE_NAV_USAGE_MODE.HEADER_NAV})`]: SIDE_NAV_USAGE_MODE.HEADER_NAV,
};

const updateRailExpanded = ({ collapseMode, expanded, usageMode = SIDE_NAV_USAGE_MODE.REGULAR }) => {
  document.body.classList.toggle('bx-ce-demo-devenv--with-rail', collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL);
  document.body.classList.toggle('bx-ce-demo-devenv--rail-expanded', collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL && expanded);
  document.body.classList.toggle('bx-ce-demo-devenv--with-side-nav-for-header', usageMode === SIDE_NAV_USAGE_MODE.HEADER_NAV);
};

const StoryContent = () => html`
  <style type="text/css">
    ${contentStyles.cssText}
  </style>
  <main class="bx--content bx-ce-demo-devenv--ui-shell-content">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--offset-lg-3 bx--col-lg-13">
          <h2>Purpose and function</h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with Carbon. It contains the shared navigation framework
            for the entire design system and ties the products in IBM’s portfolio together in a cohesive and elegant way. The
            shell is the home of the topmost navigation, where users can quickly and dependably gain their bearings and move
            between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve the needs of a broad range of products and users.
            Adopting the shell ensures compliance with IBM design standards, simplifies development efforts, and provides great
            user experiences. All IBM products built with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell, consider the “shell” of MacOS, which contains the Apple
            menu, top-level navigation, and universal, OS-level controls at the top of the screen, as well as a universal dock
            along the bottom or side of the screen. The Carbon UI shell is roughly analogous in function to these parts of the Mac
            UI. For example, the app switcher portion of the shell can be compared to the dock in MacOS.
          </p>
          <h2>Header responsive behavior</h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with persistent side nav menus should have the side nav
            collapse into “hamburger” menu. See the example to better understand responsive behavior of the header.
          </p>
          <h2>Secondary navigation</h2>
          <p>
            The side-nav contains secondary navigation and fits below the header. It can be configured to be either fixed-width or
            flexible, with only one level of nested items allowed. Both links and category lists can be used in the side-nav and
            may be mixed together. There are several configurations of the side-nav, but only one configuration should be used per
            product section. If tabs are needed on a page when using a side-nav, then the tabs are secondary in hierarchy to the
            side-nav.
          </p>
        </div>
      </div>
    </div>
  </main>
`;

export const sideNav = (args) => {
  const { collapseMode, expanded } = args?.['bx-side-nav'] ?? {};
  const { href } = args?.['bx-side-nav-menu-item'] ?? {};
  updateRailExpanded({ collapseMode, expanded });
  const result = html`
    <style>
      ${styles}
    </style>
    <bx-side-nav aria-label="Side navigation" collapse-mode="${ifNonNull(collapseMode)}" ?expanded=${expanded}>
      <bx-side-nav-items>
        <bx-side-nav-menu title="L0 menu">
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item active aria-current="page" href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-divider></bx-side-nav-divider>
        <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
        <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
      </bx-side-nav-items>
    </bx-side-nav>
    ${StoryContent()}
  `;
  (result as any).hasMainTag = true;
  return result;
};

sideNav.storyName = 'Side nav';

sideNav.parameters = {
  knobs: {
    'bx-side-nav': () => ({
      expanded: boolean('Expanded (expanded)', true),
      collapseMode: select('Collapse mode (collapse-mode)', collapseModes, null),
    }),
    'bx-side-nav-menu-item': () => ({
      href: textNullable('Link href (href)', 'javascript:void 0'), // eslint-disable-line no-script-url
    }),
  },
};

export const sideNavWithIcons = (args) => {
  const { collapseMode, expanded } = args?.['bx-side-nav'] ?? {};
  const { href } = args?.['bx-side-nav-menu-item'] ?? {};
  updateRailExpanded({ collapseMode, expanded });
  const result = html`
    <style>
      ${styles}
    </style>
    <bx-side-nav aria-label="Side navigation" collapse-mode="${ifNonNull(collapseMode)}" ?expanded=${expanded}>
      <bx-side-nav-items>
        <bx-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item active aria-current="page" href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-divider></bx-side-nav-divider>
        <bx-side-nav-link href="javascript:void(0)">${Fade16({ slot: 'title-icon' })}L0 link</bx-side-nav-link>
        <bx-side-nav-link href="javascript:void(0)">${Fade16({ slot: 'title-icon' })}L0 link</bx-side-nav-link>
      </bx-side-nav-items>
    </bx-side-nav>
    ${StoryContent()}
  `;
  (result as any).hasMainTag = true;
  return result;
};

sideNavWithIcons.storyName = 'Side nav with icons';

sideNavWithIcons.parameters = {
  knobs: sideNav.parameters.knobs,
};

export const header = (args) => {
  const { collapseMode, expanded, usageMode } = args?.['bx-side-nav'] ?? {};
  const { href } = args?.['bx-side-nav-menu-item'] ?? {};
  updateRailExpanded({ collapseMode, expanded, usageMode });
  const handleButtonToggle = (event) => {
    updateRailExpanded({ collapseMode, expanded: event.detail.active, usageMode });
  };
  const result = html`
    <style>
      ${styles}
    </style>
    <bx-header aria-label="IBM Platform Name">
      <bx-header-menu-button
        button-label-active="Close menu"
        button-label-inactive="Open menu"
        @bx-header-menu-button-toggled="${handleButtonToggle}"
      ></bx-header-menu-button>
      <bx-header-name href="javascript:void 0" prefix="IBM">[Platform]</bx-header-name>
      <bx-header-nav menu-bar-label="IBM [Platform]">
        <bx-header-nav-item href="javascript:void 0">Link 1</bx-header-nav-item>
        <bx-header-nav-item href="javascript:void 0">Link 2</bx-header-nav-item>
        <bx-header-nav-item href="javascript:void 0">Link 3</bx-header-nav-item>
        <bx-header-menu menu-label="Link 4" trigger-content="Link 4">
          <bx-header-menu-item href="javascript:void 0">Sub-link 1</bx-header-menu-item>
          <bx-header-menu-item href="javascript:void 0">Sub-link 2</bx-header-menu-item>
          <bx-header-menu-item href="javascript:void 0">Sub-link 3</bx-header-menu-item>
        </bx-header-menu>
      </bx-header-nav>
    </bx-header>
    <bx-side-nav
      aria-label="Side navigation"
      collapse-mode="${ifNonNull(collapseMode)}"
      ?expanded=${expanded}
      usage-mode="${ifNonNull(usageMode)}"
    >
      <bx-side-nav-items>
        <bx-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item active aria-current="page" href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
          <bx-side-nav-menu-item href="${ifNonNull(href)}"> L0 menu item </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-divider></bx-side-nav-divider>
        <bx-side-nav-link href="javascript:void(0)">${Fade16({ slot: 'title-icon' })}L0 link</bx-side-nav-link>
        <bx-side-nav-link href="javascript:void(0)">${Fade16({ slot: 'title-icon' })}L0 link</bx-side-nav-link>
      </bx-side-nav-items>
    </bx-side-nav>
    ${StoryContent()}
  `;
  (result as any).hasMainTag = true;
  return result;
};

header.parameters = {
  knobs: {
    'bx-side-nav': () => ({
      ...sideNav.parameters.knobs['bx-side-nav'](),
      usageMode: select('Usage mode (usage-mode)', usageModes, null),
    }),
    'bx-side-nav-menu-item': sideNav.parameters.knobs['bx-side-nav-menu-item'],
  },
};

export default {
  title: 'Components/UI Shell',
  parameters: {
    ...storyDocs.parameters,
  },
};
