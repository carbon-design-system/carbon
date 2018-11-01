import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import ListItem from '../ListItem';
import UnorderedList from '../UnorderedList';

storiesOf('UnorderedList', module)
  .add(
    'default',
    withInfo({
      text:
        'Lists consist of related content grouped together and organized ' +
        'vertically. Unordered lists are used to present content of equal ' +
        'status or value.',
    })(() => (
      <UnorderedList>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
      </UnorderedList>
    ))
  )
  .add(
    'nested',
    withInfo({
      text:
        'Lists consist of related content grouped together and organized ' +
        'vertically. Unordered lists are used to present content of equal ' +
        'status or value.',
    })(() => (
      <UnorderedList>
        <ListItem>Unordered List level 1</ListItem>
        <UnorderedList nested>
          <ListItem>Unordered List level 2</ListItem>
          <ListItem>Unordered List level 2</ListItem>
        </UnorderedList>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
      </UnorderedList>
    ))
  );
