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
import '../tag/index';
import '../icon-button/index';
import '../button/index';
import '../tabs/index';
import '../breadcrumb/index';
import '../ui-shell/index';
import image1 from './_story-assets/2x1.jpg';
import image2 from './_story-assets/3x2.jpg';
import styles from './story-styles.scss?lit';
import { breakpoints } from '@carbon/layout';
import Add16 from '@carbon/icons/es/add/16.js';
import Bee32 from '@carbon/icons/es/bee/32.js';
import Bee16 from '@carbon/icons/es/bee/16.js';
import Activity16 from '@carbon/icons/es/activity/16.js';
import AiGenerate16 from '@carbon/icons/es/ai-generate/16.js';
import CloudFoundry16 from '@carbon/icons/es/cloud-foundry--1/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { generateTags } from './_story-assets/tags-data';

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
      'Specify whether to render `cds-page-header-breadcrumb` border',
    control: 'boolean',
  },
  pageActionsFlush: {
    description:
      'Specify whether the page actions within `cds-page-header-breadcrumb` should be flush',
    control: 'boolean',
  },
  contentActionsFlush: {
    description:
      'Specify whether the content actions within `cds-page-header-breadcrumb` should be flush with the page actions',
    control: 'boolean',
  },
  title: {
    description:
      'Provide the title text to be rendered within  `cds-page-header-content`',
    control: 'text',
  },
  renderBreadcrumbIcon: {
    description:
      'Specify whether to render the `cds-page-header-breadcrumb` icon (storybook control only)',
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

      <main aria-label="Header" class="page-header-story__wrapper">
        <cds-page-header>
          <cds-page-header-breadcrumb
            .border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}">
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <cds-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsDefault}"
              title="${title}"></cds-page-header-breadcrumbs-set>
            <cds-page-header-actions-set
              slot="content-actions"
              overflow-aria-label="More breadcrumb content actions"
              .actionsData="${[{ label: 'Add Primary action' }]}">
              <cds-button size="md" aria-label="Add Primary action"
                >Primary action
                ${iconLoader(Add16, { slot: 'icon' })}</cds-button
              >
            </cds-page-header-actions-set>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More breadcrumb page actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}">
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
            </cds-page-header-actions-set>
          </cds-page-header-breadcrumb>
          <cds-page-header-content title="${title}" title-level="h1">
            <cds-page-header-content-text
              subtitle="Subtitle"
              subtitle-level="h2">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </cds-page-header-content-text>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More content page actions"
              .actionsData="${[{ label: 'Add Primary action' }]}">
              <cds-button size="md" aria-label="Add Primary action"
                >Primary action
                ${iconLoader(Add16, { slot: 'icon' })}</cds-button
              >
            </cds-page-header-actions-set>
          </cds-page-header-content>
          <cds-page-header-tabs>
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
          </cds-page-header-tabs>
        </cds-page-header>
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
export const ContentWithIcon = {
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
      { text: 'Breadcrumb 1', href: '#' },
      { text: 'Breadcrumb 2', href: '#' },
      { text: 'Breadcrumb 3', href: '#' },
    ];
    return html`
      <style>
        ${styles}
      </style>
      <main aria-label="Header" class="page-header-story__wrapper">
        <cds-page-header>
          <cds-page-header-breadcrumb
            .border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}">
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <cds-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsDefault}"
              title="${title}"></cds-page-header-breadcrumbs-set>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More breadcrumb page actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}">
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
            </cds-page-header-actions-set>
          </cds-page-header-breadcrumb>
          <cds-page-header-content title="${title}" title-level="h1">
            ${iconLoader(Bee32, { slot: 'icon' })}
            <cds-page-header-content-text
              subtitle="Subtitle"
              subtitle-level="h2">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </cds-page-header-content-text>
          </cds-page-header-content>
        </cds-page-header>
      </main>
    `;
  },
};

export const ContentWithContextualActions = {
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
      { text: 'Breadcrumb 1', href: '#' },
      { text: 'Breadcrumb 2', href: '#' },
      { text: 'Breadcrumb 3', href: '#' },
    ];
    return html`
      <style>
        ${styles}
      </style>
      <main aria-label="Header" class="page-header-story__wrapper">
        <cds-page-header>
          <cds-page-header-breadcrumb
            .border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}">
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <cds-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsDefault}"
              title="${title}"></cds-page-header-breadcrumbs-set>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More breadcrumb page actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}">
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
            </cds-page-header-actions-set>
          </cds-page-header-breadcrumb>
          <cds-page-header-content title="${title}" title-level="h1">
            <div slot="contextual-actions">
              <cds-tag type="blue" size="lg">Tag</cds-tag>
            </div>
            <cds-page-header-content-text
              subtitle="Subtitle"
              subtitle-level="h2">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </cds-page-header-content-text>
          </cds-page-header-content>
        </cds-page-header>
      </main>
    `;
  },
};

export const ContentWithHeroImage = {
  args: { ...args, border: false },
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
      { text: 'Breadcrumb 1', href: '#' },
      { text: 'Breadcrumb 2', href: '#' },
      { text: 'Breadcrumb 3', href: '#' },
    ];
    return html`
      <style>
        ${styles}
      </style>
      <main aria-label="Header" class="page-header-story__wrapper">
        <cds-page-header>
          <div class="cds--css-grid">
            <div
              class="cds--sm:col-span-4 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column"
            >
              <cds-page-header-breadcrumb
                .border=${border}
                ?page-actions-flush="${pageActionsFlush}"
                ?content-actions-flush="${contentActionsFlush}"
                within-grid
              >
                ${
                  renderBreadcrumbIcon
                    ? iconLoader(Bee16, { slot: 'icon' })
                    : undefined
                }
                <cds-page-header-breadcrumbs-set
                  .breadcrumbsData="${sampleBreadcrumbsDefault}"
                  title="${title}"
                ></cds-page-header-breadcrumbs-set>
              </cds-page-header-breadcrumb>
              <cds-page-header-content
                within-grid
                title="${title}"
                title-level="h1"
              >
                <cds-page-header-content-text
                  subtitle="Subtitle"
                  subtitle-level="h2"
                >
                  Built for modern teams, our technology platform simplifies
                  complexity with powerful APIs, real-time collaboration tools,
                  and seamless integration. From deployment to monitoring, we
                  help you ship faster, scale efficiently, and stay in control
                  every step of the way.
                </cds-page-header-content-text>
              </cds-page-header-content>
            </div>
            <div
              class="cds--sm:col-span-0 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column"
            >
              <cds-page-header-hero-image object-fit="cover">
                <picture>
                  <source
                    srcset="${image1}"
                    media=${`(min-width: ${breakpoints.lg.width})`}
                  ></source>
                  <source
                    srcset="${image2}"
                    media=${`(max-width: ${breakpoints.lg.width})`}
                  ></source>
                  <img src="${image1}" alt="a default image" />
                </picture>
              </cds-page-header-hero-image>
            </div>
          </div>
        </cds-page-header>
      </main>
    `;
  },
};

export const ContentWithContextualActionsAndPageActions = {
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
      { text: 'Breadcrumb 1', href: '#' },
      { text: 'Breadcrumb 2', href: '#' },
      { text: 'Breadcrumb 3', href: '#' },
    ];
    return html`
      <style>
        ${styles}
      </style>
      <main aria-label="Header" class="page-header-story__wrapper">
        <cds-page-header>
          <cds-page-header-breadcrumb
            .border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}">
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <cds-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsDefault}"
              title="${title}"></cds-page-header-breadcrumbs-set>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More breadcrumb page actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}">
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
            </cds-page-header-actions-set>
          </cds-page-header-breadcrumb>
          <cds-page-header-content title="${title}" title-level="h1">
            <div slot="contextual-actions">
              <cds-tag type="blue" size="lg">Tag</cds-tag>
            </div>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More content page actions"
              .actionsData="${[{ label: 'Add Primary action' }]}">
              <cds-button size="md" aria-label="Add Primary action"
                >Primary action
                ${iconLoader(Add16, { slot: 'icon' })}</cds-button
              >
            </cds-page-header-actions-set>
            <cds-page-header-content-text
              subtitle="Subtitle"
              subtitle-level="h2">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </cds-page-header-content-text>
          </cds-page-header-content>
        </cds-page-header>
      </main>
    `;
  },
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
    <main class="page-header-story__wrapper-with-ui-shell" aria-label="Header">
      <cds-page-header>
        <cds-page-header-breadcrumb>
          ${iconLoader(Bee16, { slot: 'icon' })}
          <cds-page-header-breadcrumbs-set
            .breadcrumbsData="${sampleBreadcrumbs}"
            title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"></cds-page-header-breadcrumbs-set>
          <cds-page-header-actions-set
            slot="page-actions"
            overflow-aria-label="More breadcrumb page actions"
            .actionsData="${[
              { label: 'action 1' },
              { label: 'action 2' },
              { label: 'action 3' },
            ]}">
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
          </cds-page-header-actions-set>
        </cds-page-header-breadcrumb>
        <cds-page-header-content
          title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
          title-level="h1">
          <cds-page-header-content-text subtitle="Subtitle" subtitle-level="h2">
            Built for modern teams, our technology platform simplifies
            complexity with powerful APIs, real-time collaboration tools, and
            seamless integration. From deployment to monitoring, we help you
            ship faster, scale efficiently, and stay in control every step of
            the way.
          </cds-page-header-content-text>
        </cds-page-header-content>
        <cds-page-header-tabs>
          <cds-page-header-scroller slot="scroller"></cds-page-header-scroller>
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
            <cds-page-header-tags-set
              .tagsData="${generatedTags ?? []}"></cds-page-header-tags-set>
          </div>
        </cds-page-header-tabs>
      </cds-page-header>
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

export const Compact = {
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
    const sampleBreadcrumbsCompact = [
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
    return html`
      <style>
        ${styles}
      </style>
      <main class="page-header-story__wrapper" aria-label="Header">
        <cds-page-header>
          <cds-page-header-breadcrumb
            .border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}">
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <cds-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsCompact}"
              title="${title}"></cds-page-header-breadcrumbs-set>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More breadcrumb page actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}">
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
            </cds-page-header-actions-set>
          </cds-page-header-breadcrumb>
          <cds-page-header-tabs>
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
              <cds-page-header-tags-set
                .tagsData="${generatedTags ?? []}"></cds-page-header-tags-set>
            </div>
          </cds-page-header-tabs>
        </cds-page-header>
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

export const CustomRenderWithCallbacks = {
  args: {
    border: true,
    contentActionsFlush: false,
    title:
      'Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long',
    renderBreadcrumbIcon: true,
  },
  argTypes: {
    border: {
      description:
        'Specify whether to render `cds-page-header-breadcrumb` border',
      control: 'boolean',
    },
    contentActionsFlush: {
      description:
        'Specify whether the content actions within `cds-page-header-breadcrumb` should be flush with the page actions',
      control: 'boolean',
    },
    title: {
      description:
        'Provide the title text to be rendered within `cds-page-header-content`',
      control: 'text',
    },
    renderBreadcrumbIcon: {
      description:
        'Specify whether to render the `cds-page-header-breadcrumb` icon (storybook control only)',
      control: 'boolean',
    },
  },
  render: (args) => {
    const { border, contentActionsFlush, title, renderBreadcrumbIcon } =
      args ?? {};

    const sampleBreadcrumbsCallbacks = [
      { text: 'Breadcrumb 1', href: '#' },
      { text: 'Breadcrumb 2', href: '#' },
    ];

    return html`
      <style>
        ${styles}
      </style>
      <main aria-label="Header" class="page-header-story__wrapper">
        <cds-page-header
          @cds-page-header-fully-collapsed=${(e: CustomEvent) => {
            // eslint-disable-next-line no-console
            console.log('onContentFullyCollapsed:', e.detail.fullyCollapsed);
          }}
          @cds-page-header-title-clipped=${(e: CustomEvent) => {
            // eslint-disable-next-line no-console
            console.log('onTitleClipped:', e.detail.titleClipped);
          }}
          @cds-page-header-content-actions-clipped=${(e: CustomEvent) => {
            // eslint-disable-next-line no-console
            console.log(
              'onContentActionsClipped:',
              e.detail.contentActionsClipped
            );
          }}>
          <cds-page-header-breadcrumb
            .border=${border}
            ?content-actions-flush="${contentActionsFlush}">
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <cds-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsCallbacks}"
              title="${title}"></cds-page-header-breadcrumbs-set>
            <div slot="content-actions">
              <div class="content-actions-wrapper">
                <cds-button size="md"
                  >Actions ${iconLoader(Add16, { slot: 'icon' })}</cds-button
                >
              </div>
            </div>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More breadcrumb page actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}">
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
            </cds-page-header-actions-set>
          </cds-page-header-breadcrumb>
          <cds-page-header-content title="${title}" title-level="h1">
            <cds-page-header-content-text
              subtitle="Subtitle"
              subtitle-level="h2">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </cds-page-header-content-text>
            <div slot="page-actions">
              <cds-button size="md" aria-label="Add Primary action"
                >Primary action
                ${iconLoader(Add16, { slot: 'icon' })}</cds-button
              >
            </div>
          </cds-page-header-content>
          <cds-page-header-tabs>
            <cds-page-header-scroller slot="scroller">
            </cds-page-header-scroller>
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
          </cds-page-header-tabs>
        </cds-page-header>
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
      <main aria-label="Header" class="page-header-story__wrapper">
        <cds-page-header>
          <cds-page-header-breadcrumb
            .border=${border}
            ?page-actions-flush="${pageActionsFlush}"
            ?content-actions-flush="${contentActionsFlush}">
            ${renderBreadcrumbIcon
              ? iconLoader(Bee16, { slot: 'icon' })
              : undefined}
            <cds-page-header-breadcrumbs-set
              .breadcrumbsData="${sampleBreadcrumbsDefault}"
              title="${title}"></cds-page-header-breadcrumbs-set>
            <div slot="content-actions">
              <div class="content-actions-wrapper">
                <cds-button size="md"
                  >Primary action
                  ${iconLoader(Add16, { slot: 'icon' })}</cds-button
                >
              </div>
            </div>
            <cds-page-header-actions-set
              slot="page-actions"
              overflow-aria-label="More breadcrumb page actions"
              .actionsData="${[
                { label: 'action 1' },
                { label: 'action 2' },
                { label: 'action 3' },
              ]}">
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
            </cds-page-header-actions-set>
          </cds-page-header-breadcrumb>
          <cds-page-header-content title="${title}">
            <cds-page-header-content-text subtitle="Subtitle">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </cds-page-header-content-text>
            <div slot="page-actions">
              <cds-button size="md"
                >Primary action
                ${iconLoader(Add16, { slot: 'icon' })}</cds-button
              >
            </div>
          </cds-page-header-content>
          <cds-page-header-tabs disable-sticky-tab-bar>
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
          </cds-page-header-tabs>
        </cds-page-header>
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

const meta = {
  title: 'Components/PageHeader',
  tags: ['ibm-products-migrated'],
  parameters: { layout: 'fullscreen' },
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
