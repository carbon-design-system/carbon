/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '@carbon/web-components/es/components/tag/index.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/breadcrumb/index.js';
import '@carbon/web-components/es/components/ui-shell/index.js';
import image1 from './_story-assets/2x1.jpg';
import image2 from './_story-assets/3x2.jpg';
import styles from './_story-assets/_storybook-styles.scss?lit';
import { breakpoints } from '@carbon/layout';
import Add16 from '@carbon/icons/es/add/16.js';
import Bee32 from '@carbon/icons/es/bee/32.js';
import Bee16 from '@carbon/icons/es/bee/16.js';
import Activity16 from '@carbon/icons/es/activity/16.js';
import AiGenerate16 from '@carbon/icons/es/ai-generate/16.js';
import CloudFoundry16 from '@carbon/icons/es/cloud-foundry--1/16.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import { generateTags } from './page-header-tags-set/utils';

const args = {
  border: true,
  pageActionsFlush: false,
  contentActionsFlush: false,
  title:
    'Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long',
  renderBreadcrumbIcon: true,
};

const argTypes = {
  border: {
    description:
      'Specify whether to render `c4p-page-header-breadcrumb` border',
    control: 'boolean',
  },
  pageActionsFlush: {
    description:
      'Specify whether the page actions within `c4p-page-header-breadcrumb` should be flush',
    control: 'boolean',
  },
  contentActionsFlush: {
    description:
      'Specify whether the content actions within `c4p-page-header-breadcrumb` should be flush with the page actions',
    control: 'boolean',
  },
  title: {
    description:
      'Provide the title text to be rendered within  `c4p-page-header-content`',
    control: 'text',
  },
  renderBreadcrumbIcon: {
    description:
      'Specify whether to render the `c4p-page-header-breadcrumb` icon (storybook control only)',
    control: 'boolean',
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      border,
      pageActionsFlush,
      contentActionsFlush,
      title,
      renderBreadcrumbIcon,
    } = args ?? {};
    const sampleBreadcrumbsDefault = [
      {
        text: 'Breadcrumb 1',
        href: '#',
      },
      {
        text: 'Breadcrumb 2',
        href: '#',
      },
      {
        text: 'Breadcrumb 3',
        href: '#',
      },
    ];
    return html`
      <style>
        ${styles}
      </style>
      <cds-header class="ui-shell--header" aria-label="IBM Platform Name">
        <cds-header-name href="javascript:void 0" prefix="IBM"
          >[Platform]</cds-header-name
        >
      </cds-header>
      <main aria-label="Header">
        <c4p-page-header>
          <c4p-page-header-breadcrumb
            border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}"
          >
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <c4p-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsDefault}"
              title="${title}"
            ></c4p-page-header-breadcrumbs-set>
            <div slot="content-actions">
              <div class="content-actions-wrapper">
                <cds-button size="md"
                  >Primary action
                  ${iconLoader(Add16, { slot: 'icon' })}</cds-button
                >
              </div>
            </div>
            <c4p-page-header-actions-set
              slot="page-actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}"
            >
              <cds-icon-button kind="ghost" size="md" align="bottom">
                ${iconLoader(Activity16, { slot: 'icon' })}
                <span slot="tooltip-content">action 1</span>
              </cds-icon-button>
              <cds-icon-button kind="ghost" size="md" align="bottom">
                ${iconLoader(AiGenerate16, { slot: 'icon' })}
                <span slot="tooltip-content">action 2</span>
              </cds-icon-button>
              <cds-icon-button kind="ghost" size="md" align="bottom">
                ${iconLoader(CloudFoundry16, { slot: 'icon' })}
                <span slot="tooltip-content">action 3</span>
              </cds-icon-button>
            </c4p-page-header-actions-set>
          </c4p-page-header-breadcrumb>
          <c4p-page-header-content title="${title}" title-level="h1">
            <c4p-page-header-content-text
              subtitle="Subtitle"
              subtitle-level="h2"
            >
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </c4p-page-header-content-text>
            <div slot="page-actions">
              <cds-button size="md" aria-label="Add Primary action"
                >Primary action
                ${iconLoader(Add16, { slot: 'icon' })}</cds-button
              >
            </div>
          </c4p-page-header-content>
          <c4p-page-header-tabs>
            <c4p-page-header-scroller slot="scroller">
            </c4p-page-header-scroller>
            <cds-tabs value="tab-1">
              <cds-tab id="tab-1" target="tab-panel-1" value="tab-1"
                >Tab 1</cds-tab
              >
              <cds-tab id="tab-2" target="tab-panel-2" value="tab-2"
                >Tab 2</cds-tab
              >
              <cds-tab id="tab-3" target="tab-panel-3" value="tab-3"
                >Tab 3</cds-tab
              >
              <cds-tab id="tab-4" target="tab-panel-4" value="tab-4"
                >Tab 4</cds-tab
              >
              <cds-tab id="tab-5" target="tab-panel-5" value="tab-5"
                >Tab 5</cds-tab
              >
              <cds-tab id="tab-6" target="tab-panel-6" value="tab-6"
                >Tab 6</cds-tab
              >
              <cds-tab id="tab-7" target="tab-panel-7" value="tab-7"
                >Tab 7</cds-tab
              >
            </cds-tabs>
          </c4p-page-header-tabs>
        </c4p-page-header>
        <div class="tabs-demo">
          <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1" hidden>
            Tab Panel 1
          </div>
          <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
            Tab Panel 2
          </div>
          <div id="tab-panel-3" role="tabpanel" aria-labelledby="tab-3" hidden>
            Tab Panel 3
          </div>
          <div id="tab-panel-4" role="tabpanel" aria-labelledby="tab-4" hidden>
            Tab Panel 4
          </div>
          <div id="tab-panel-5" role="tabpanel" aria-labelledby="tab-5" hidden>
            Tab Panel 5
          </div>
          <div id="tab-panel-6" role="tabpanel" aria-labelledby="tab-6" hidden>
            Tab Panel 6
          </div>
          <div id="tab-panel-7" role="tabpanel" aria-labelledby="tab-7" hidden>
            Tab Panel 7
          </div>
        </div>
      </main>
    `;
  },
};
export const WithDisabledStickyTabBar = {
  args,
  argTypes,
  render: (args) => {
    const {
      border,
      pageActionsFlush,
      contentActionsFlush,
      title,
      renderBreadcrumbIcon,
    } = args ?? {};
    const sampleBreadcrumbsDefault = [
      {
        text: 'Breadcrumb 1',
        href: '#',
      },
      {
        text: 'Breadcrumb 2',
        href: '#',
      },
      {
        text: 'Breadcrumb 3',
        href: '#',
      },
    ];
    return html`
      <style>
        ${styles}
      </style>
      <cds-header class="ui-shell--header" aria-label="IBM Platform Name">
        <cds-header-name href="javascript:void 0" prefix="IBM"
          >[Platform]</cds-header-name
        >
      </cds-header>
      <main>
        <c4p-page-header>
          <c4p-page-header-breadcrumb
            border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}"
          >
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <c4p-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsDefault}"
              title="${title}"
            ></c4p-page-header-breadcrumbs-set>
            <div slot="content-actions">
              <div class="content-actions-wrapper">
                <cds-button size="md"
                  >Primary action
                  ${iconLoader(Add16, { slot: 'icon' })}</cds-button
                >
              </div>
            </div>
            <c4p-page-header-actions-set
              slot="page-actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}"
            >
              <cds-icon-button kind="ghost" size="md" align="bottom">
                ${iconLoader(Activity16, { slot: 'icon' })}
                <span slot="tooltip-content">action 1</span>
              </cds-icon-button>
              <cds-icon-button kind="ghost" size="md" align="bottom">
                ${iconLoader(AiGenerate16, { slot: 'icon' })}
                <span slot="tooltip-content">action 2</span>
              </cds-icon-button>
              <cds-icon-button kind="ghost" size="md" align="bottom">
                ${iconLoader(CloudFoundry16, { slot: 'icon' })}
                <span slot="tooltip-content">action 3</span>
              </cds-icon-button>
            </c4p-page-header-actions-set>
          </c4p-page-header-breadcrumb>
          <c4p-page-header-content title="${title}">
            <c4p-page-header-content-text subtitle="Subtitle">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </c4p-page-header-content-text>
            <div slot="page-actions">
              <cds-button size="md"
                >Primary action
                ${iconLoader(Add16, { slot: 'icon' })}</cds-button
              >
            </div>
          </c4p-page-header-content>
          <c4p-page-header-tabs disable-sticky-tab-bar>
            <cds-tabs value="tab-1">
              <cds-tab id="tab-1" target="tab-panel-1" value="tab-1"
                >Tab 1</cds-tab
              >
              <cds-tab id="tab-2" target="tab-panel-2" value="tab-2"
                >Tab 2</cds-tab
              >
              <cds-tab id="tab-3" target="tab-panel-3" value="tab-3"
                >Tab 3</cds-tab
              >
              <cds-tab id="tab-4" target="tab-panel-4" value="tab-4"
                >Tab 4</cds-tab
              >
              <cds-tab id="tab-5" target="tab-panel-5" value="tab-5"
                >Tab 5</cds-tab
              >
              <cds-tab id="tab-6" target="tab-panel-6" value="tab-6"
                >Tab 6</cds-tab
              >
              <cds-tab id="tab-7" target="tab-panel-7" value="tab-7"
                >Tab 7</cds-tab
              >
            </cds-tabs>
          </c4p-page-header-tabs>
        </c4p-page-header>
        <div class="tabs-demo">
          <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1" hidden>
            Tab Panel 1
          </div>
          <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
            Tab Panel 2
          </div>
          <div id="tab-panel-3" role="tabpanel" aria-labelledby="tab-3" hidden>
            Tab Panel 3
          </div>
          <div id="tab-panel-4" role="tabpanel" aria-labelledby="tab-4" hidden>
            Tab Panel 4
          </div>
          <div id="tab-panel-5" role="tabpanel" aria-labelledby="tab-5" hidden>
            Tab Panel 5
          </div>
          <div id="tab-panel-6" role="tabpanel" aria-labelledby="tab-6" hidden>
            Tab Panel 6
          </div>
          <div id="tab-panel-7" role="tabpanel" aria-labelledby="tab-7" hidden>
            Tab Panel 7
          </div>
        </div>
      </main>
    `;
  },
};

export const ContentWithContextualActions = {
  render: () =>
    html` <style>
        ${styles}
      </style>
      <cds-header class="ui-shell--header" aria-label="IBM Platform Name">
        <cds-header-name href="javascript:void 0" prefix="IBM"
          >[Platform]</cds-header-name
        >
      </cds-header>
      <main aria-label="Header">
        <c4p-page-header>
          <c4p-page-header-breadcrumb>
            ${iconLoader(Bee16, { slot: 'icon' })}
            <cds-breadcrumb>
              <cds-breadcrumb-item>
                <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
              </cds-breadcrumb-item>
              <cds-breadcrumb-item>
                <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
              </cds-breadcrumb-item>
            </cds-breadcrumb>
            <cds-icon-button
              slot="page-actions"
              kind="ghost"
              size="md"
              align="bottom"
            >
              ${iconLoader(Activity16, { slot: 'icon' })}
              <span slot="tooltip-content">action 1</span>
            </cds-icon-button>
            <cds-icon-button
              slot="page-actions"
              kind="ghost"
              size="md"
              align="bottom"
            >
              ${iconLoader(AiGenerate16, { slot: 'icon' })}
              <span slot="tooltip-content">action 2</span>
            </cds-icon-button>
            <cds-icon-button
              slot="page-actions"
              kind="ghost"
              size="md"
              align="bottom"
            >
              ${iconLoader(CloudFoundry16, { slot: 'icon' })}
              <span slot="tooltip-content">action 3</span>
            </cds-icon-button>
          </c4p-page-header-breadcrumb>
          <c4p-page-header-content
            title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
            title-level="h1"
          >
            <div slot="contextual-actions">
              <cds-tag type="blue" size="lg">Tag</cds-tag>
            </div>
            <c4p-page-header-content-text
              subtitle="Subtitle"
              subtitle-level="h2"
            >
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </c4p-page-header-content-text>
          </c4p-page-header-content> </c4p-page-header
        >,
      </main>`,
};

export const ContentWithContextualActionsAndPageActions = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-header class="ui-shell--header" aria-label="IBM Platform Name">
      <cds-header-name href="javascript:void 0" prefix="IBM"
        >[Platform]</cds-header-name
      >
    </cds-header>
    <main aria-label="Header">
      <c4p-page-header>
        <c4p-page-header-breadcrumb>
          ${iconLoader(Bee16, { slot: 'icon' })}
          <cds-breadcrumb>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
            </cds-breadcrumb-item>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
            </cds-breadcrumb-item>
          </cds-breadcrumb>
          <cds-icon-button
            slot="page-actions"
            kind="ghost"
            size="md"
            align="bottom"
          >
            ${iconLoader(Activity16, { slot: 'icon' })}
            <span slot="tooltip-content">action 1</span>
          </cds-icon-button>
          <cds-icon-button
            slot="page-actions"
            kind="ghost"
            size="md"
            align="bottom"
          >
            ${iconLoader(AiGenerate16, { slot: 'icon' })}
            <span slot="tooltip-content">action 2</span>
          </cds-icon-button>
          <cds-icon-button
            slot="page-actions"
            kind="ghost"
            size="md"
            align="bottom"
          >
            ${iconLoader(CloudFoundry16, { slot: 'icon' })}
            <span slot="tooltip-content">action 3</span>
          </cds-icon-button>
        </c4p-page-header-breadcrumb>
        <c4p-page-header-content
          title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
          title-level="h1"
        >
          <div slot="contextual-actions">
            <cds-tag type="blue" size="lg">Tag</cds-tag>
          </div>
          <div slot="page-actions">
            <cds-button size="md" aria-label="Add Primary action"
              >Primary action ${iconLoader(Add16, { slot: 'icon' })}</cds-button
            >
          </div>
          <c4p-page-header-content-text subtitle="Subtitle" subtitle-level="h2">
            Built for modern teams, our technology platform simplifies
            complexity with powerful APIs, real-time collaboration tools, and
            seamless integration. From deployment to monitoring, we help you
            ship faster, scale efficiently, and stay in control every step of
            the way.
          </c4p-page-header-content-text>
        </c4p-page-header-content>
      </c4p-page-header>
    </main>
  `,
};

export const ContentWithHeroImage = {
  render: () =>
    html`
    <style>
        ${styles}
      </style>
      <cds-header class="ui-shell--header" aria-label="IBM Platform Name">
        <cds-header-name href="javascript:void 0" prefix="IBM"
          >[Platform]</cds-header-name
        >
      </cds-header>
      <main aria-label="Header">
<c4p-page-header>
      <div class="cds--css-grid">
        <div class="cds--sm:col-span-4 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column">
          <c4p-page-header-breadcrumb .border=${false} within-grid>
        ${iconLoader(Bee16, { slot: 'icon' })}
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </c4p-page-header-breadcrumb>
          <c4p-page-header-content
            within-grid
            title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
            title-level="h1"
            >
            <c4p-page-header-content-text subtitle="Subtitle" subtitle-level="h2">
             Built for modern teams, our technology platform simplifies complexity with powerful APIs, real-time collaboration tools, and seamless integration. From deployment to monitoring, we help you ship faster, scale efficiently, and stay in control every step of the way.
            </c4p-page-header-content-text>
          </c4p-page-header-content>
        </div>
        <div class="cds--sm:col-span-0 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column">
          <c4p-page-header-hero-image object-fit="cover">
            <picture>
              <source
                srcset="${image1}"
                media=${`(min-width: ${breakpoints.lg.width})`}
              ></source>
              <source
                srcset="${image2}"
                media=${`(max-width: ${breakpoints.lg.width})`}
              ></source>
              <img
                src="${image1}"
                alt="a default image"
              />
            </picture>
          </c4p-page-header-hero-image>
        </div>
      </div>
      </div>
    </c4p-page-header>
      </main>
    `,
};

export const ContentWithIcon = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-header class="ui-shell--header" aria-label="IBM Platform Name">
      <cds-header-name href="javascript:void 0" prefix="IBM"
        >[Platform]</cds-header-name
      >
    </cds-header>
    <main aria-label="Header">
      <c4p-page-header>
        <c4p-page-header-breadcrumb>
          ${iconLoader(Bee16, { slot: 'icon' })}
          <cds-breadcrumb>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
            </cds-breadcrumb-item>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
            </cds-breadcrumb-item>
          </cds-breadcrumb>
          <cds-icon-button
            slot="page-actions"
            kind="ghost"
            size="md"
            align="bottom"
          >
            ${iconLoader(Activity16, { slot: 'icon' })}
            <span slot="tooltip-content">action 1</span>
          </cds-icon-button>
          <cds-icon-button
            slot="page-actions"
            kind="ghost"
            size="md"
            align="bottom"
          >
            ${iconLoader(AiGenerate16, { slot: 'icon' })}
            <span slot="tooltip-content">action 2</span>
          </cds-icon-button>
          <cds-icon-button
            slot="page-actions"
            kind="ghost"
            size="md"
            align="bottom"
          >
            ${iconLoader(CloudFoundry16, { slot: 'icon' })}
            <span slot="tooltip-content">action 3</span>
          </cds-icon-button>
        </c4p-page-header-breadcrumb>
        <c4p-page-header-content
          title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
          title-level="h1"
        >
          ${iconLoader(Bee32, { slot: 'icon' })}
          <c4p-page-header-content-text subtitle="Subtitle" subtitle-level="h2">
            Built for modern teams, our technology platform simplifies
            complexity with powerful APIs, real-time collaboration tools, and
            seamless integration. From deployment to monitoring, we help you
            ship faster, scale efficiently, and stay in control every step of
            the way.
          </c4p-page-header-content-text>
        </c4p-page-header-content>
      </c4p-page-header>
    </main>
  `,
};
const sampleBreadcrumbs = [
  {
    text: 'Breadcrumb 1',
    href: 'https://www.carbondesignsystem.com',
  },
  {
    text: 'Breadcrumb 2',
    href: 'https://www.carbondesignsystem.com',
  },
  {
    text: 'Breadcrumb 3',
    href: 'https://www.carbondesignsystem.com',
  },
  {
    text: 'Breadcrumb 4',
    href: 'https://www.carbondesignsystem.com',
  },
  {
    text: 'Virtual-Machine-DAL-really-long-title-example',
    href: 'https://www.carbondesignsystem.com',
  },
];
const generatedTags = generateTags({ count: 10 });
export const TabBarWithTabsAndTags = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-header class="ui-shell--header" aria-label="IBM Platform Name">
      <cds-header-name href="javascript:void 0" prefix="IBM"
        >[Platform]</cds-header-name
      >
    </cds-header>
    <main class="page-header-story__wrapper" aria-label="Header">
      <c4p-page-header>
        <c4p-page-header-breadcrumb>
          ${iconLoader(Bee16, { slot: 'icon' })}
          <c4p-page-header-breadcrumbs-set
            .breadcrumbsData="${sampleBreadcrumbs}"
            title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
          ></c4p-page-header-breadcrumbs-set>
          <c4p-page-header-actions-set
            slot="page-actions"
            .actionsData="${[
              { label: 'action 1' },
              { label: 'action 2' },
              { label: 'action 3' },
            ]}"
          >
            <cds-icon-button kind="ghost" size="md" align="bottom">
              ${iconLoader(Activity16, { slot: 'icon' })}
              <span slot="tooltip-content">action 1</span>
            </cds-icon-button>
            <cds-icon-button kind="ghost" size="md" align="bottom">
              ${iconLoader(AiGenerate16, { slot: 'icon' })}
              <span slot="tooltip-content">action 2</span>
            </cds-icon-button>
            <cds-icon-button kind="ghost" size="md" align="bottom">
              ${iconLoader(CloudFoundry16, { slot: 'icon' })}
              <span slot="tooltip-content">action 3</span>
            </cds-icon-button>
          </c4p-page-header-actions-set>
        </c4p-page-header-breadcrumb>
        <c4p-page-header-content
          title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
          title-level="h1"
        >
          <c4p-page-header-content-text subtitle="Subtitle" subtitle-level="h2">
            Built for modern teams, our technology platform simplifies
            complexity with powerful APIs, real-time collaboration tools, and
            seamless integration. From deployment to monitoring, we help you
            ship faster, scale efficiently, and stay in control every step of
            the way.
          </c4p-page-header-content-text>
        </c4p-page-header-content>
        <c4p-page-header-tabs>
          <cds-tabs value="tab-1">
            <cds-tab id="tab-1" target="tab-panel-1" value="tab-1"
              >Tab 1</cds-tab
            >
            <cds-tab id="tab-2" target="tab-panel-2" value="tab-2"
              >Tab 2</cds-tab
            >
            <cds-tab id="tab-3" target="tab-panel-3" value="tab-3"
              >Tab 3</cds-tab
            >
            <cds-tab id="tab-4" target="tab-panel-4" value="tab-4"
              >Tab 4</cds-tab
            >
            <cds-tab id="tab-5" target="tab-panel-5" value="tab-5"
              >Tab 5</cds-tab
            >
            <cds-tab id="tab-6" target="tab-panel-6" value="tab-6"
              >Tab 6</cds-tab
            >
            <cds-tab id="tab-7" target="tab-panel-7" value="tab-7"
              >Tab 7</cds-tab
            >
          </cds-tabs>
          <div slot="tags">
            <c4p-page-header-tags-set
              .tagsData="${generatedTags ?? []}"
            ></c4p-page-header-tags-set>
          </div>
        </c4p-page-header-tabs>
      </c4p-page-header>
      <div class="tabs-demo">
        <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1" hidden>
          Tab Panel 1
        </div>
        <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
          Tab Panel 2
        </div>
        <div id="tab-panel-3" role="tabpanel" aria-labelledby="tab-3" hidden>
          Tab Panel 3
        </div>
        <div id="tab-panel-4" role="tabpanel" aria-labelledby="tab-4" hidden>
          Tab Panel 4
        </div>
        <div id="tab-panel-5" role="tabpanel" aria-labelledby="tab-5" hidden>
          Tab Panel 5
        </div>
        <div id="tab-panel-6" role="tabpanel" aria-labelledby="tab-6" hidden>
          Tab Panel 6
        </div>
        <div id="tab-panel-7" role="tabpanel" aria-labelledby="tab-7" hidden>
          Tab Panel 7
        </div>
      </div>
    </main>
  `,
};
const meta = {
  title: 'Components/PageHeader',
  decorators: [
    (story) =>
      html` <style>
          #main-content {
            padding: 0;
          }

          .tabs-demo {
            block-size: 200vh;
            padding: 1rem;
          }
        </style>
        ${story()}`,
  ],
};

export default meta;
