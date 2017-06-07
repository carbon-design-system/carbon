import React from 'react';
import { storiesOf } from '@storybook/react';
import Search from '../../components/Search';

const searchProps = {
  className: 'some-class',
};

storiesOf('Search', module)
  .addWithInfo(
    'normal',
    `
      Search enables users to specify a word or a phrase to find particular relevant pieces of content
      without the use of navigation. Search can be used as the primary means of discovering content,
      or as a filter to aid the user in finding content.
    `,
    () => (
      <Search
        {...searchProps}
        className="some-class"
        id="search-1"
        labelText="Search"
        placeHolderText="Search Bluemix Offerings"
      />
  ))
  .addWithInfo(
    'small',
    `
      Search enables users to specify a word or a phrase to find particular relevant pieces of content
      without the use of navigation. Search can be used as the primary means of discovering content,
      or as a filter to aid the user in finding content. With the small property, the search field will be
      more compact.
    `,
    () => (
      <Search
        {...searchProps}
        className="some-class"
        small
        id="search-2"
        labelText="Search"
        placeHolderText="Search Bluemix Offerings"
      />
  ));
