/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import './index';
import '../tag/index';
import '../icon-button/index';
import '../button/index';
import '../tabs/index';
import '../breadcrumb/index';
import image1 from './_story-assets/2x1.jpg';
import image2 from './_story-assets/3x2.jpg';
import { breakpoints } from '@carbon/layout';

import Add16 from '@carbon/icons/lib/add/16.js';
import Bee32 from '@carbon/icons/lib/bee/32.js';
import Bee16 from '@carbon/icons/lib/bee/16.js';
import Activity16 from '@carbon/icons/lib/activity/16.js';
import AiGenerate16 from '@carbon/icons/lib/ai-generate/16.js';
import CloudFoundry16 from '@carbon/icons/lib/cloud-foundry--1/16.js';

const tags = [
  {
    type: 'blue',
    text: 'Tag 1',
    size: 'md',
  },
  {
    type: 'purple',
    text: 'Tag 2',
    size: 'md',
  },
  {
    type: 'red',
    text: 'Tag 3',
    size: 'md',
  },
  {
    type: 'blue',
    text: 'Tag 4',
    size: 'md',
  },
  {
    type: 'purple',
    text: 'Tag 5',
    size: 'md',
  },
  {
    type: 'red',
    text: 'Tag 6',
    size: 'md',
  },
];

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
    return html`
      <cds-page-header>
        <cds-page-header-breadcrumb
          border="${border}"
          ?page-actions-flush="${pageActionsFlush}"
          ?content-actions-flush="${contentActionsFlush}">
          ${renderBreadcrumbIcon ? Bee16({ slot: 'icon' }) : undefined}
          <cds-breadcrumb>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
            </cds-breadcrumb-item>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
            </cds-breadcrumb-item>
          </cds-breadcrumb>
          <div slot="content-actions">
            <cds-button size="md">Button</cds-button>
          </div>
          <cds-icon-button slot="page-actions" kind="ghost" size="md"
            >${Activity16()}</cds-icon-button
          >
          <cds-icon-button slot="page-actions" kind="ghost" size="md"
            >${AiGenerate16()}</cds-icon-button
          >
          <cds-icon-button slot="page-actions" kind="ghost" size="md"
            >${CloudFoundry16()}</cds-icon-button
          >
        </cds-page-header-breadcrumb>
        <cds-page-header-content title="${title}">
          <cds-page-header-content-text subtitle="Subtitle">
            Neque massa fames auctor maecenas leo. Mollis vehicula per, est
            justo. Massa elementum class enim malesuada lacinia hendrerit enim
            erat pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula
            congue. Nisi molestie primis lorem nascetur sem metus mattis etiam
            scelerisque.
          </cds-page-header-content-text>
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
      <div class="${prefix}-ce-demo-devenv--tab-panels">
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
    `;
  },
};

export const ContentWithContextualActions = {
  render: () =>
    html`<cds-page-header>
      <cds-page-header-breadcrumb>
        ${Bee16({ slot: 'icon' })}
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${Activity16()}</cds-icon-button
        >
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${AiGenerate16()}</cds-icon-button
        >
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${CloudFoundry16()}</cds-icon-button
        >
      </cds-page-header-breadcrumb>
      <cds-page-header-content
        title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long">
        <div slot="contextual-actions">
          <cds-tag type="blue" size="lg">Tag</cds-tag>
        </div>
        <cds-page-header-content-text subtitle="Subtitle">
          Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
          Massa elementum class enim malesuada lacinia hendrerit enim erat
          pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
          Nisi molestie primis lorem nascetur sem metus mattis etiam
          scelerisque.
        </cds-page-header-content-text>
      </cds-page-header-content>
    </cds-page-header>`,
};

export const ContentWithContextualActionsAndPageActions = {
  render: () =>
    html`<cds-page-header>
      <cds-page-header-breadcrumb>
        ${Bee16({ slot: 'icon' })}
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${Activity16()}</cds-icon-button
        >
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${AiGenerate16()}</cds-icon-button
        >
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${CloudFoundry16()}</cds-icon-button
        >
      </cds-page-header-breadcrumb>
      <cds-page-header-content
        title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long">
        <div slot="contextual-actions">
          <cds-tag type="blue" size="lg">Tag</cds-tag>
        </div>
        <div slot="page-actions">
          <cds-button size="md"
            >Primary action ${Add16({ slot: 'icon' })}</cds-button
          >
        </div>
        <cds-page-header-content-text subtitle="Subtitle">
          Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
          Massa elementum class enim malesuada lacinia hendrerit enim erat
          pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
          Nisi molestie primis lorem nascetur sem metus mattis etiam
          scelerisque.
        </cds-page-header-content-text>
      </cds-page-header-content>
    </cds-page-header>`,
};

export const ContentWithHeroImage = {
  render: () =>
    html`
    <cds-page-header>
      <div class="cds--css-grid">
        <div class="cds--sm:col-span-4 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column">
          <cds-page-header-breadcrumb border=false within-grid>
        ${Bee16({ slot: 'icon' })}
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </cds-page-header-breadcrumb>
          <cds-page-header-content
            within-grid
            title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
            >
            <cds-page-header-content-text subtitle="Subtitle">
              Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
              Massa elementum class enim malesuada lacinia hendrerit enim erat
              pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
              Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
            </cds-page-header-content-text>
          </cds-page-header-content>
        </div>
        <div class="cds--sm:col-span-0 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column">
          <cds-page-header-hero-image>
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
                style="max-width:100%;height:auto"
              />
            </picture>
          </cds-page-header-hero-image>
        </div>
      </div>
      </div>
    </cds-page-header>`,
};

export const ContentWithIcon = {
  render: () =>
    html`<cds-page-header>
      <cds-page-header-breadcrumb>
        ${Bee16({ slot: 'icon' })}
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${Activity16()}</cds-icon-button
        >
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${AiGenerate16()}</cds-icon-button
        >
        <cds-icon-button slot="page-actions" kind="ghost" size="md"
          >${CloudFoundry16()}</cds-icon-button
        >
      </cds-page-header-breadcrumb>
      <cds-page-header-content
        title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long">
        ${Bee32({ slot: 'icon' })}
        <cds-page-header-content-text subtitle="Subtitle">
          Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
          Massa elementum class enim malesuada lacinia hendrerit enim erat
          pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
          Nisi molestie primis lorem nascetur sem metus mattis etiam
          scelerisque.
        </cds-page-header-content-text>
      </cds-page-header-content>
    </cds-page-header>`,
};

export const TabBarWithTabsAndTags = {
  render: () =>
    html`<cds-page-header>
        <cds-page-header-breadcrumb>
          ${Bee16({ slot: 'icon' })}
          <cds-breadcrumb>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
            </cds-breadcrumb-item>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
            </cds-breadcrumb-item>
          </cds-breadcrumb>
          <cds-icon-button slot="page-actions" kind="ghost" size="md"
            >${Activity16()}</cds-icon-button
          >
          <cds-icon-button slot="page-actions" kind="ghost" size="md"
            >${AiGenerate16()}</cds-icon-button
          >
          <cds-icon-button slot="page-actions" kind="ghost" size="md"
            >${CloudFoundry16()}</cds-icon-button
          >
        </cds-page-header-breadcrumb>
        <cds-page-header-content
          title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long">
          <cds-page-header-content-text subtitle="Subtitle">
            Neque massa fames auctor maecenas leo. Mollis vehicula per, est
            justo. Massa elementum class enim malesuada lacinia hendrerit enim
            erat pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula
            congue. Nisi molestie primis lorem nascetur sem metus mattis etiam
            scelerisque.
          </cds-page-header-content-text>
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
          <div slot="tags">
            ${tags.map(
              (e) =>
                html` <cds-tag type="${e.type}" size="${e.size}"
                  >${e.text}</cds-tag
                >`
            )}
          </div>
        </cds-page-header-tabs>
      </cds-page-header>
      <div class="${prefix}-ce-demo-devenv--tab-panels">
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
      </div>`,
};

const meta = {
  title: 'Patterns/unstable__PageHeader',
  // comment below line to see the pageheader story
  includeStories: [],
  decorators: [
    (story) =>
      html` <style>
          .sb-show-main.sb-main-padded {
            padding: 0;
          }
          .${prefix}-ce-demo-devenv--tab-panels div {
            padding: 1rem;
          }
        </style>
        ${story()}`,
  ],
};

export default meta;
