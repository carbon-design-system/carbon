/**
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
import '../overflow-menu/index';
import './breadcrumb-skeleton';
import { BREADCRUMB_SIZE } from './defs';

import { prefix } from '../../globals/settings';

import OverflowMenuHorizontal16 from '@carbon/icons/lib/overflow-menu--horizontal/16.js';

const sizes = {
  [`Small size (${BREADCRUMB_SIZE.SMALL})`]: BREADCRUMB_SIZE.SMALL,
  [`Medium size (${BREADCRUMB_SIZE.MEDIUM})`]: BREADCRUMB_SIZE.MEDIUM,
};
const args = {
  ariaLabel: '',
  className: '',
  noTrailingSlash: false,
  size: BREADCRUMB_SIZE.MEDIUM,
};

const argTypes = {
  ariaLabel: {
    control: 'text',
    description: 'Specify the aria-label for the breadcrumb container.',
    name: 'aria-label',
  },
  className: {
    control: 'text',
    description:
      'Specify an optional className to be applied to the container node.',
  },
  noTrailingSlash: {
    control: 'boolean',
    description:
      'Optional prop to omit the trailing slash for the breadcrumbs.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Accordion.',
    options: sizes,
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const { className, ariaLabel, noTrailingSlash, size } = args ?? {};
    return html`
      <cds-breadcrumb
        ?no-trailing-slash="${noTrailingSlash}"
        .class="${className}"
        .size="${size}"
        aria-label="${ariaLabel}">
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="#">Breadcrumb 3</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="#">Breadcrumb 4</cds-breadcrumb-link>
        </cds-breadcrumb-item>
      </cds-breadcrumb>
    `;
  },
};

export const BreadcrumbWithOverflowMenu = {
  args,
  argTypes,
  render: (args) => {
    const { ariaLabel, className, noTrailingSlash, size } = args ?? {};
    return html`
      <cds-breadcrumb
        ?no-trailing-slash="${noTrailingSlash}"
        .class="${className}"
        .size="${size}"
        aria-label="${ariaLabel}">
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-overflow-menu breadcrumb align="bottom">
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
          <cds-breadcrumb-link href="#">Breadcrumb 5</cds-breadcrumb-link>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item>
          <cds-breadcrumb-link is-currentpage>Breadcrumb 6</cds-breadcrumb-link>
        </cds-breadcrumb-item>
      </cds-breadcrumb>
    `;
  },
};
const skeletonArgs = { className: '' };
const skeletonArgTypes = {
  className: {
    control: 'text',
    description:
      'Specify an optional className to be applied to the container node.',
  },
};

export const Skeleton = {
  args: skeletonArgs,
  argTypes: skeletonArgTypes,
  render: (args) => {
    const { className } = args ?? {};
    return html`
      <cds-breadcrumb-skeleton .class="${className}"> </cds-breadcrumb-skeleton>
    `;
  },
};

const meta = {
  title: 'Components/Breadcrumb',
};

export default meta;
