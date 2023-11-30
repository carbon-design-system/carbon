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
import './breadcrumb-skeleton';
import { prefix } from '../../globals/settings';
import { boolean, text } from '@storybook/addon-knobs';
import storyDocs from './breadcrumb-story.mdx';

export const Default = () => {
  return html`
    <cds-breadcrumb>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="/#">Breadcrumb 1</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="#">Breadcrumb 3</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link>Breadcrumb 4</cds-breadcrumb-link>
      </cds-breadcrumb-item>
    </cds-breadcrumb>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Breadcrumb',
  parameters: {
    ...storyDocs.parameters,
  },
};

export const BreadcrumbWithOverflowMenu = () => html`
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
          <cds-overflow-menu-item>Breadcrumb 3</cds-overflow-menu-item>
          <cds-overflow-menu-item>Breadcrumb 4</cds-overflow-menu-item>
        </cds-overflow-menu-body>
      </cds-breadcrumb-overflow-menu>
    </cds-breadcrumb-item>
    <cds-breadcrumb-item>
      <cds-breadcrumb-link href="/#">Breadcrumb 5</cds-breadcrumb-link>
    </cds-breadcrumb-item>
    <cds-breadcrumb-item>
      <cds-breadcrumb-link>Breadcrumb 6</cds-breadcrumb-link>
    </cds-breadcrumb-item>
  </cds-breadcrumb>
`;

BreadcrumbWithOverflowMenu.storyName = 'Breadcrumb With Overflow Menu';

export const skeleton = () => {
  return html` <cds-breadcrumb-skeleton> </cds-breadcrumb-skeleton> `;
};

export const Playground = (args) => {
  const { ariaLabel, classes, noTrailingSlash } =
    args?.[`${prefix}-breadcrumb-playground`] ?? {};
  return html`
    <cds-breadcrumb
      ?no-trailing-slash="${noTrailingSlash}"
      class="${classes}"
      aria-label="${ariaLabel}">
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="/#">Breadcrumb 1</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link href="#">Breadcrumb 3</cds-breadcrumb-link>
      </cds-breadcrumb-item>
      <cds-breadcrumb-item>
        <cds-breadcrumb-link>Breadcrumb 4</cds-breadcrumb-link>
      </cds-breadcrumb-item>
    </cds-breadcrumb>
  `;
};

Playground.parameters = {
  ...storyDocs.parameters,
  knobs: {
    [`${prefix}-breadcrumb-playground`]: () => ({
      ariaLabel: text('aria-label (aria-label)', ''),
      classes: text('class (class)', ''),
      noTrailingSlash: boolean(
        'Optional prop to omit the trailing slash for the breadcrumbs (noTrailingSlash)',
        false
      ),
    }),
  },
};
