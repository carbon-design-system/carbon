/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import './index';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  PAGINATION_NAV_SIZE,
  PAGINATION_TOOLTIP_ALIGNMENT,
  PAGINATION_TOOLTIP_POSITION,
} from './defs';

const args = {
  size: PAGINATION_NAV_SIZE.LARGE,
  loop: false,
  itemsShown: 10,
  page: 0,
  totalItems: 25,
  disableOverflow: false,
  tooltipAlignment: PAGINATION_TOOLTIP_ALIGNMENT.CENTER,
  tooltipPosition: PAGINATION_TOOLTIP_POSITION.BOTTOM,
};

const argTypes = {
  size: {
    control: 'select',
    description: 'Specify the size of the PaginationNav. `sm` `md` `lg`',
    options: [
      PAGINATION_NAV_SIZE.SMALL,
      PAGINATION_NAV_SIZE.MEDIUM,
      PAGINATION_NAV_SIZE.LARGE,
    ],
  },
  loop: {
    control: 'boolean',
    description:
      'Whether user should be able to loop through the items when reaching first / last.',
  },
  itemsShown: {
    control: 'number',
    description:
      'The number of items to be shown (minimum of 4 unless items < 4).',
  },
  page: {
    control: 'number',
    description: 'The index of current page.',
  },
  totalItems: {
    control: 'number',
    description: 'The total number of items.',
  },
  disableOverflow: {
    control: 'boolean',
    description:
      'If true, the `...` pagination overflow will not render page links between the first and last rendered buttons. Set this to true if you are having performance problems with large data sets.',
  },
  tooltipAlignment: {
    control: 'radio',
    description:
      'Specify the alignment of the tooltip for the icon-only next/prev buttons. Can be one of: start, center, or end.',
    options: [
      PAGINATION_TOOLTIP_ALIGNMENT.START,
      PAGINATION_TOOLTIP_ALIGNMENT.CENTER,
      PAGINATION_TOOLTIP_ALIGNMENT.END,
    ],
  },
  tooltipPosition: {
    control: 'radio',
    description:
      'Specify the position of the tooltip for the icon-only next/prev buttons. Can be one of: top, right, bottom, or left.',

    options: [
      PAGINATION_TOOLTIP_POSITION.TOP,
      PAGINATION_TOOLTIP_POSITION.RIGHT,
      PAGINATION_TOOLTIP_POSITION.BOTTOM,
      PAGINATION_TOOLTIP_POSITION.LEFT,
    ],
  },
};

export const Default = {
  args,
  argTypes,
  render: ({
    disableOverflow,
    loop,
    itemsShown,
    page,
    size,
    tooltipAlignment,
    tooltipPosition,
    totalItems,
  }) => html`
    <cds-pagination-nav
      ?disable-overflow="${disableOverflow}"
      ?loop="${loop}"
      items-shown="${itemsShown}"
      page="${ifDefined(page)}"
      size="${ifDefined(size)}"
      tooltip-alignment="${ifDefined(tooltipAlignment)}"
      tooltip-position="${ifDefined(tooltipPosition)}"
      total-items="${ifDefined(totalItems)}">
    </cds-pagination-nav>
  `,
};

const meta = {
  title: 'Components/Pagination Nav',
};

export default meta;
