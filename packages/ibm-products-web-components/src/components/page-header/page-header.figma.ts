/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/breadcrumb/index.js';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/tag/index.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';

import Bee32 from '@carbon/icons/es/bee/32.js';
import Bee16 from '@carbon/icons/es/bee/16.js';
import Activity16 from '@carbon/icons/es/activity/16.js';

// Breadcrumb bar
figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=41243-6410',
  {
    props: {
      icon: figma.boolean('Icon', {
        true: html`${iconLoader(Bee16, { slot: 'icon' })}`,
        false: undefined,
      }),
      contentActions: figma.boolean('Buttons', {
        true: html`<div slot="content-actions">
          <cds-button size="md">Button</cds-button>
        </div>`,
        false: undefined,
      }),
      pageActions: figma.boolean('Actions', {
        true: html`<cds-icon-button
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
            ${iconLoader(Activity16, { slot: 'icon' })}
            <span slot="tooltip-content">action 2</span>
          </cds-icon-button>
          <cds-icon-button
            slot="page-actions"
            kind="ghost"
            size="md"
            align="bottom"
          >
            ${iconLoader(Activity16, { slot: 'icon' })}
            <span slot="tooltip-content">action 3</span>
          </cds-icon-button>`,
        false: undefined,
      }),
      border: figma.boolean('Bottom border'),
    },
    example: (props) => {
      return html` <c4p-page-header-breadcrumb border=${props.border}>
        ${props.icon}
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Breadcrumb</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
        ${props.contentActions} ${props.pageActions}
      </c4p-page-header-breadcrumb>`;
    },
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/page-header/index.js'",
    ],
  }
);

// Tab bar
figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=41241-4083',
  {
    props: {
      tabs: figma.boolean('Tabs', {
        true: html`<cds-tabs value="tab-1">
          <cds-tab id="tab-1" target="tab-panel-1" value="tab-1">
            Tab label
          </cds-tab>
          <cds-tab id="tab-2" target="tab-panel-2" value="tab-2">
            Tab label
          </cds-tab>
        </cds-tabs>`,
        false: undefined,
      }),
      tags: figma.boolean('Tags', {
        true: html`<div slot="tags">
          <cds-tag type="blue" size="md">Tag</cds-tag>
          <cds-tag type="blue" size="md">Tag</cds-tag>
        </div>`,
        false: undefined,
      }),
      scroller: figma.boolean('Collapsable button', {
        true: html` <c4p-page-header-scroller slot="scroller">
        </c4p-page-header-scroller>`,
        false: undefined,
      }),
    },
    example: (props) => {
      return html`<c4p-page-header-tabs>
        ${props.scroller} ${props.tabs} ${props.tags}
      </c4p-page-header-tabs>`;
    },
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/page-header/index.js'",
    ],
  }
);

const sharedProps = {
  title: figma.nestedProps('_Title', {
    text: figma.string('Title text'),
    icon: figma.boolean('Leading icon', {
      true: html`${iconLoader(Bee32, { slot: 'icon' })}`,
      false: undefined,
    }),
    tags: figma.boolean('Slot', {
      true: html`<div slot="contextual-actions">
        <cds-tag type="blue" size="lg">Tag</cds-tag>
      </div>`,
      false: undefined,
    }),
  }),
  summary: figma.nestedProps('_Summary', {
    text: figma.string('Summary text'),
  }),
};

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=31080%3A23323',
  {
    variant: { Style: 'Action' },
    props: {
      ...sharedProps,
      breadcrumbBar: figma.boolean('Breadcrumb bar', {
        true: figma.children('_Breadcrumb bar'),
        false: undefined,
      }),
      header: figma.nestedProps('_Content', {
        actions: figma.boolean('Actions', {
          true: html` <div slot="page-actions">
            <cds-button size="md">Button</cds-button>
          </div>`,
          false: undefined,
        }),
        subtitle: figma.boolean('Subtitle', {
          true: figma.textContent('Subtitle'),
          false: undefined,
        }),
      }),
      tabBar: figma.boolean('Tab bar', {
        true: figma.children('_Tab bar'),
        false: undefined,
      }),
    },
    example: (props) =>
      html`<c4p-page-header>
        ${props.breadcrumbBar}
        <c4p-page-header-content title=${props.title.text}>
          ${props.title.icon} ${props.title.tags} ${props.header.actions}
          <c4p-page-header-content-text subtitle=${props.header.subtitle}>
            ${props.summary.text}
          </c4p-page-header-content-text>
        </c4p-page-header-content>
        ${props.tabBar}
      </c4p-page-header>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/page-header/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=31080%3A23323',
  {
    variant: { Style: 'Image' },
    props: {
      ...sharedProps,
      content: figma.nestedProps('_Content expressive', {
        subtitle: figma.boolean('Subtitle', {
          true: figma.textContent('Subtitle'),
          false: undefined,
        }),
      }),
    },
    example: (props) => {
      return html`<c4p-page-header>
        <div class="cds--css-grid">
          <div
            class="cds--sm:col-span-4 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column"
          >
            <c4p-page-header-content within-grid title=${props.title.text}>
              ${props.title.icon} ${props.title.tags}
              <c4p-page-header-content-text subtitle=${props.content.subtitle}>
                ${props.summary.text}
              </c4p-page-header-content-text>
            </c4p-page-header-content>
          </div>
          <div
            class="cds--sm:col-span-0 cds--md:col-span-4 cds--lg:col-span-8 cds--css-grid-column"
          >
            <c4p-page-header-hero-image>
              <img
                src="image1"
                alt="a default image"
                style="max-width:100%;height:auto"
              />
            </c4p-page-header-hero-image>
          </div>
        </div>
      </c4p-page-header>`;
    },
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/page-header/index.js'",
    ],
  }
);
