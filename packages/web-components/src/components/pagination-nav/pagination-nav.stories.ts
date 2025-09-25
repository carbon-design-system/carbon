/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import { PAGINATION_NAV_SIZE } from './defs';

export default {
  title: 'Components/PaginationNav',
  component: 'cds-pagination-nav',
  parameters: {
    actions: {
      handles: ['cds-pagination-nav-changed'],
    },
  },
  argTypes: {
    disableOverflow: {
      control: { type: 'boolean' },
    },
    itemsShown: {
      control: { type: 'number' },
    },
    loop: {
      control: { type: 'boolean' },
    },
    page: {
      control: { type: 'number' },
    },
    size: {
      options: Object.values(PAGINATION_NAV_SIZE),
      control: { type: 'select' },
    },
    tooltipAlignment: {
      options: ['start', 'center', 'end'],
      control: { type: 'select' },
    },
    tooltipPosition: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
    totalItems: {
      control: { type: 'number' },
    },
  },
};

const Template = (args) => {
  const {
    disableOverflow,
    itemsShown,
    loop,
    page,
    size,
    tooltipAlignment,
    tooltipPosition,
    totalItems,
  } = args;

  return html`
    <cds-pagination-nav
      ?disable-overflow="${disableOverflow}"
      items-shown="${ifDefined(itemsShown)}"
      ?loop="${loop}"
      page="${ifDefined(page)}"
      size="${ifDefined(size)}"
      tooltip-alignment="${ifDefined(tooltipAlignment)}"
      tooltip-position="${ifDefined(tooltipPosition)}"
      total-items="${ifDefined(totalItems)}">
    </cds-pagination-nav>
  `;
};

export const Default = Template.bind({});
Default.args = {
  size: PAGINATION_NAV_SIZE.LARGE,
  loop: false,
  itemsShown: 10,
  page: 0,
  totalItems: 25,
  disableOverflow: false,
};
