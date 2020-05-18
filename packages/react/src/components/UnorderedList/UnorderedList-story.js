/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import ListItem from '../ListItem';
import UnorderedList from '../UnorderedList';

storiesOf('UnorderedList', module)
  .add(
    'default',
    () => (
      <UnorderedList>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
      </UnorderedList>
    ),
    {
      info: {
        text:
          'Lists consist of related content grouped together and organized ' +
          'vertically. Unordered lists are used to present content of equal ' +
          'status or value.',
      },
    }
  )
  .add(
    'nested',
    () => (
      <UnorderedList>
        <ListItem>
          Unordered List level 1
          <UnorderedList nested>
            <ListItem>Unordered List level 2</ListItem>
            <ListItem>
              Unordered List level 2
              <UnorderedList nested>
                <ListItem>Unordered List level 2</ListItem>
                <ListItem>Unordered List level 2</ListItem>
              </UnorderedList>
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
      </UnorderedList>
    ),
    {
      info: {
        text:
          'Lists consist of related content grouped together and organized ' +
          'vertically. Unordered lists are used to present content of equal ' +
          'status or value.',
      },
    }
  );
