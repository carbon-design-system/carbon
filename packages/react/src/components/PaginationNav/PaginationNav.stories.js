/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from '../PaginationNav';
import './styles.scss';
import mdx from './PaginationNav.mdx';

export default {
  title: 'Components/PaginationNav',
  component: PaginationNav,
  subcomponents: {},
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <div style={{ width: '800px' }}>
      <PaginationNav totalItems={25} {...args} />
    </div>
  );
};

export const TwoPaginations = (args) => {
  return (
    <div style={{ width: '800px', display: 'grid', gap: '2rem' }}>
      <section aria-labelledby="jobs-pagination-heading">
        <h3 id="jobs-pagination-heading" style={{ margin: 0 }}>
          Jobs table
        </h3>
        <PaginationNav
          aria-label="Jobs table pagination"
          totalItems={25}
          size="lg"
          itemsShown={10}
          page={0}
          loop={false}
          disableOverflow={false}
          {...args}
        />
      </section>

      <section aria-labelledby="gallery-pagination-heading">
        <h3 id="gallery-pagination-heading" style={{ margin: 0 }}>
          Image gallery
        </h3>
        <PaginationNav
          aria-label="Gallery pagination"
          totalItems={12}
          size="md"
          itemsShown={5}
          page={1}
          loop={false}
          disableOverflow={false}
          {...args}
        />
      </section>
    </div>
  );
};

TwoPaginations.args = {
  tooltipAlignment: 'center',
  tooltipPosition: 'bottom',
};

Default.args = {
  size: 'lg',
  loop: false,
  itemsShown: 10,
  page: 0,
  totalItems: 25,
  disableOverflow: false,
};

Default.argTypes = {
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  loop: {
    control: {
      type: 'boolean',
    },
  },
  itemsShown: {
    control: {
      type: 'number',
    },
  },
  page: {
    control: {
      type: 'number',
    },
  },
  totalItems: {
    control: {
      type: 'number',
    },
  },
  disableOverflow: {
    control: {
      type: 'boolean',
    },
  },
};
