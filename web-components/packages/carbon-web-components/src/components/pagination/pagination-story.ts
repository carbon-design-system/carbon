/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import './pagination';
import './page-sizes-select';
import './pages-select';
import storyDocs from './pagination-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = (args) => {
  const {
    atLastPage,
    pageSize,
    start,
    total,
    onChangedCurrent,
    onChangedPageSizesSelect,
  } = args?.[`${prefix}-pagination`] ?? {};
  return html`
    <cds-pagination
      ?at-last-page="${atLastPage || undefined}"
      page-size="${ifDefined(pageSize)}"
      start="${ifDefined(start)}"
      total="${ifDefined(total)}"
      @cds-pagination-changed-current="${onChangedCurrent}"
      @cds-page-sizes-select-changed="${onChangedPageSizesSelect}">
      <cds-page-sizes-select slot="page-sizes-select">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </cds-page-sizes-select>
      ${total == null
        ? undefined
        : html` <cds-pages-select></cds-pages-select> `}
    </cds-pagination>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Pagination',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-pagination`]: () => ({
        atLastPage: boolean(
          'Explicitly state that the user is at the last page (at-last-apge)',
          false
        ),
        pageSize: number('Number of rows per page (page-size)', 10),
        start: number('Start row index of the current page (start)', 0),
        total: number('Total rows count (total)', 100),
        onChangedCurrent: action(`${prefix}-pagination-changed-current`),
        onChangedPageSizesSelect: action(`${prefix}-page-sizes-select-changed`),
      }),
    },
  },
};
