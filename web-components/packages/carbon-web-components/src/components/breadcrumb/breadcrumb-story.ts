/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './breadcrumb';
import './breadcrumb-item';
import './breadcrumb-link';
import './breadcrumb-overflow-menu';
import '../overflow-menu/overflow-menu-body';
import storyDocs from './breadcrumb-story.mdx';

export const Default = () =>
  html`
    <cds-breadcrumb>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="/#">Breadcrumb 1</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="/#">Breadcrumb 2</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="/#" aria-current="page"
          >Breadcrumb 3</cds-breadcrumb-link
        >
      </cds-breadcrumb-item>
    </cds-breadcrumb>
  `;

Default.storyName = 'Default';

export default {
  title: 'Components/Breadcrumb',
  parameters: {
    ...storyDocs.parameters,
  },
};

export const withOverflowMenu = () => html`
  <cds-breadcrumb>
    <cds-breadcrumb-item>
      <cds-breadcrumb-link href="/#">Breadcrumb 1</cds-breadcrumb-link>
    </cds-breadcrumb-item>
    <cds-breadcrumb-item>
      <cds-breadcrumb-link href="/#">Breadcrumb 2</cds-breadcrumb-link>
    </cds-breadcrumb-item>
    <cds-breadcrumb-item>
      <cds-breadcrumb-overflow-menu>
        <cds-overflow-menu-body>
          <cds-overflow-menu-item>Option 1</cds-overflow-menu-item>
          <cds-overflow-menu-item>Option 2</cds-overflow-menu-item>
        </cds-overflow-menu-body>
      </cds-breadcrumb-overflow-menu>
    </cds-breadcrumb-item>
    <cds-breadcrumb-item>
      <cds-breadcrumb-link href="/#" aria-current="page"
        >Breadcrumb 3</cds-breadcrumb-link
      >
    </cds-breadcrumb-item>
  </cds-breadcrumb>
`;

withOverflowMenu.storyName = 'with Overflow Menu';
