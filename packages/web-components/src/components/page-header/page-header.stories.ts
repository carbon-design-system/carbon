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
import '../dropdown/index';
import '../tag/index';
import '../icon-button/index';
import '../button/index';
import '../tabs/index';

import Bee32 from '@carbon/icons/lib/bee/32.js';
import Analytics16 from '@carbon/icons/lib/analytics/16.js';

export const Default = {
  render: () =>
    html`<cds-page-header>
      <cds-page-header-breadcrumb>BreadcrumbBar</cds-page-header-breadcrumb>
      <cds-page-header-content
        title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
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
    </cds-page-header>`,
};

export const ContentWithContextualActions = {
  render: () =>
    html`<cds-page-header>
      <cds-page-header-content
        title="Page header content title with an extra long title that turns into a definition tooltip that creates a title with an ellipsis."
        subtitle="Subtitle">
        ${Bee32({
          slot: 'icon',
          class: `${prefix}--page-header__content__icon`,
        })}
        <div slot="contextual-actions">
          <cds-dropdown value="bar">
            <cds-dropdown-item value="foo">Foo</cds-dropdown-item>
            <cds-dropdown-item value="bar">Bar</cds-dropdown-item>
            <cds-dropdown-item value="baz">Baz</cds-dropdown-item>
          </cds-dropdown>
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

const meta = {
  title: 'Patterns/unstable__PageHeader',
  decorators: [
    (story) =>
      html` <style>
          .sb-show-main.sb-main-padded {
            padding: 0;
          }
        </style>
        ${story()}`,
  ],
};

export default meta;
