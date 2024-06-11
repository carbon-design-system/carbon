/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
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

const args = {
  ariaLabel: '',
  classes: '',
  noTrailingSlash: false,
};

const argTypes = {
  ariaLabel: {
    control: 'text',
    description: 'Specify the label for the breadcrumb container.',
    name: 'aria-label',
  },
  classes: {
    control: 'text',
    description:
      'Specify an optional className to be applied to the container node.',
  },
  noTrailingSlash: {
    control: 'boolean',
    description:
      'Optional prop to omit the trailing slash for the breadcrumbs.',
  },
};

export const Default = {
  render: () => {
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
  },
};

export const BreadcrumbWithOverflowMenu = {
  render: () => html`
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
  `,
};

export const Skeleton = {
  render: () => {
    return html` <cds-breadcrumb-skeleton> </cds-breadcrumb-skeleton> `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { ariaLabel, classes, noTrailingSlash } = args ?? {};
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
  },
};

const meta = {
  title: 'Components/Breadcrumb',
};

export default meta;
