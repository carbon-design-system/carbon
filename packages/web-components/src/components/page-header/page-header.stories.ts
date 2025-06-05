/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
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
import image1 from './_story-assets/2x1.jpg';
import image2 from './_story-assets/3x2.jpg';
import { breakpoints } from '@carbon/layout';

import Bee32 from '@carbon/icons/lib/bee/32.js';
import Analytics16 from '@carbon/icons/lib/analytics/16.js';

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

export const Default = {
  render: () => html`
    <cds-page-header>
      <cds-page-header-breadcrumb>BreadcrumbBar</cds-page-header-breadcrumb>
      <cds-page-header-content
        title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
        subtitle="Subtitle">
        Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
        Massa elementum class enim malesuada lacinia hendrerit enim erat
        pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
        Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
      </cds-page-header-content>
      <cds-page-header-tabs>
        <cds-tabs value="tab-1">
          <cds-tab id="tab-1" target="tab-panel-1" value="tab-1">Tab 1</cds-tab>
          <cds-tab id="tab-2" target="tab-panel-2" value="tab-2">Tab 2</cds-tab>
          <cds-tab id="tab-3" target="tab-panel-3" value="tab-3">Tab 3</cds-tab>
          <cds-tab id="tab-4" target="tab-panel-4" value="tab-4">Tab 4</cds-tab>
          <cds-tab id="tab-5" target="tab-panel-5" value="tab-5">Tab 5</cds-tab>
          <cds-tab id="tab-6" target="tab-panel-6" value="tab-6">Tab 6</cds-tab>
          <cds-tab id="tab-7" target="tab-panel-7" value="tab-7">Tab 7</cds-tab>
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
  `,
};

export const ContentWithContextualActions = {
  render: () =>
    html`<cds-page-header>
      <cds-page-header-breadcrumb>BreadcrumbBar</cds-page-header-breadcrumb>
      <cds-page-header-content
        title="Page header content title with an extra long title that turns into a definition tooltip that creates a title with an ellipsis."
        subtitle="Subtitle">
        <div slot="contextual-actions">
          <cds-tag>Tag</cds-tag>
        </div>
        <div slot="page-actions">
          <cds-tag>1</cds-tag>
          <cds-tag>2</cds-tag>
          <cds-tag>3</cds-tag>
          <cds-button size="md">Button</cds-button>
        </div>
        Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
        Massa elementum class enim malesuada lacinia hendrerit enim erat
        pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
        Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
      </cds-page-header-content>
    </cds-page-header>`,
};

export const ContentWithHeroImage = {
  render: () =>
    html`
    <cds-page-header>
      <div class="cds--css-grid">
        <div class="cds--sm:col-span-4 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column">
          <cds-page-header-breadcrumb within-grid border=false>BreadcrumbBar</cds-page-header-breadcrumb>
          <cds-page-header-content
            within-grid
            title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
            subtitle="Subtitle">
            Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
            Massa elementum class enim malesuada lacinia hendrerit enim erat
            pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
            Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
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
      <cds-page-header-breadcrumb>BreadcrumbBar</cds-page-header-breadcrumb>
      <cds-page-header-content
        title="Page header content title with an extra long title that turns into a definition tooltip that creates a title with an ellipsis."
        subtitle="Subtitle">
        ${Bee32({
          slot: 'icon',
          class: `${prefix}--page-header__content__icon`,
        })}
        Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
        Massa elementum class enim malesuada lacinia hendrerit enim erat
        pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
        Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
      </cds-page-header-content>
    </cds-page-header>`,
};

export const TabBarWithTabsAndTags = {
  render: () =>
    html`<cds-page-header>
        <cds-page-header-breadcrumb>BreadcrumbBar</cds-page-header-breadcrumb>
        <cds-page-header-content
          title="Page header content title with an extra long title that turns into a definition tooltip that creates a title with an ellipsis."
          subtitle="Subtitle">
          Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
          Massa elementum class enim malesuada lacinia hendrerit enim erat
          pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
          Nisi molestie primis lorem nascetur sem metus mattis etiam
          scelerisque.
        </cds-page-header-content>
        <cds-page-header-tabs>
          <cds-tabs slot="tabs" value="tab-1">
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
