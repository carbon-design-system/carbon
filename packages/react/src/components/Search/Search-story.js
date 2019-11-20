/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import Search from '../Search';
import SearchSkeleton from '../Search/Search.Skeleton';
import SearchFilterButton from '../SearchFilterButton';
import SearchLayoutButton from '../SearchLayoutButton';

const sizes = {
  'Regular size (xl)': 'xl',
  'Large size (lg)': 'lg',
  'Small size (sm)': 'sm',
};

const props = () => ({
  className: 'some-class',
  size: select('Size (size)', sizes, 'xl'),
  light: boolean('Light variant (light)', false),
  name: text('Form item name (name)', ''),
  defaultValue: text('Default value (defaultValue)', ''),
  labelText: text('Label text (labelText)', 'Search'),
  closeButtonLabelText: text(
    'The label text for the close button (closeButtonLabelText)',
    'Clear search input'
  ),
  placeHolderText: text('Placeholder text (placeHolderText)', 'Search'),
  onChange: action('onChange'),
});

storiesOf('Search', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Search {...props()} id="search-1" />, {
    info: {
      text: `
            Search enables users to specify a word or a phrase to find particular relevant pieces of content
            without the use of navigation. Search can be used as the primary means of discovering content,
            or as a filter to aid the user in finding content.
          `,
    },
  })
  .add(
    '[Deprecated] custom buttons',
    () => (
      <div style={{ display: 'flex' }}>
        <Search {...props()} id="search-1" />
        <SearchFilterButton onClick={action('onClick')} />
        <SearchLayoutButton onClick={action('onClick')} />
      </div>
    ),
    {
      info: {
        text: `
            You can control what set of buttons you want.
          `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div style={{ width: '200px' }}>
        <SearchSkeleton />
        &nbsp;
        <SearchSkeleton small />
      </div>
    ),
    {
      info: {
        text: `
            Placeholder skeleton state to use when content is loading.
          `,
      },
    }
  );
