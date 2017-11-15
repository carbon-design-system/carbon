/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Search from '../Search';

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
        placeHolderText="Search"
        onChange={() => {
          console.log('onChange');
          action('onChange');
        }}
      />
    )
  )
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
        placeHolderText="Search"
        onChange={() => {
          console.log('onChange');
          action('onChange');
        }}
      />
    )
  )
  .addWithInfo(
    'Controlled',
    `
      You can control the Search input like you would with a normal input as well. See the Storybook source to see the source code behind this at https://github.com/carbon-design-system/carbon-components-react/blob/master/.storybook/components/SearchStory.js
    `,
    () => {
      class ControlledSearch extends React.Component {
        state = {
          searchValue: '',
        };

        handleChange = evt => {
          console.log('handleChange');
          this.setState({ searchValue: evt.target.value });
        };

        render() {
          return (
            <Search
              {...searchProps}
              className="some-class"
              id="search-1"
              labelText="Search"
              value={this.state.searchValue}
              onChange={this.handleChange}
              placeHolderText="Search"
            />
          );
        }
      }

      return <ControlledSearch />;
    }
  );
