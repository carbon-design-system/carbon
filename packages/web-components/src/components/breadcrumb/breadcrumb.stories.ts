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
import '../overflow-menu/overflow-menu-item';
import './breadcrumb-skeleton';

import { prefix } from '../../globals/settings';

import OverflowMenuHorizontal16 from '@carbon/icons/lib/overflow-menu--horizontal/16.js';

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

export const BreadcrumbWithOverflowMenu = {
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
          <cds-breadcrumb-link href="/#">Breadcrumb 2</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-overflow-menu breadcrumb>
            ${OverflowMenuHorizontal16({
              class: `${prefix}--overflow-menu__icon`,
              slot: 'icon',
            })}
            <span slot="tooltip-content"> Options </span>
            <cds-overflow-menu-body>
              <cds-overflow-menu-item>Breadcrumb 3</cds-overflow-menu-item>
              <cds-overflow-menu-item>Breadcrumb 4</cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="/#">Breadcrumb 5</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-breadcrumb-link is-currentpage>Breadcrumb 6</cds-breadcrumb-link>
        </cds-breadcrumb-item>
      </cds-breadcrumb>
    `;
  },
};
const skeletonArgs = { classes: '' };
const skeletonArgTypes = {
  classes: {
    control: 'text',
    description:
      'Specify an optional className to be applied to the container node.',
  },
};

export const Skeleton = {
  args: skeletonArgs,
  argTypes: skeletonArgTypes,
  render: (args) => {
    const { classes } = args ?? {};
    return html`
      <cds-breadcrumb-skeleton class="${classes}"> </cds-breadcrumb-skeleton>
    `;
  },
};

const meta = {
  title: 'Components/Breadcrumb',
};

export default meta;
