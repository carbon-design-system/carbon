/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXOrderedList from 'carbon-web-components/es/components-react/list/ordered-list';
// @ts-ignore
import BXUnorderedList from 'carbon-web-components/es/components-react/list/unordered-list';
// @ts-ignore
import BXListItem from 'carbon-web-components/es/components-react/list/list-item';

export { default } from './list-story';

export const ordered = () => (
  <BXOrderedList>
    <BXListItem>
      Ordered List level 1
      <BXOrderedList>
        <BXListItem>Ordered List level 2</BXListItem>
        <BXListItem>
          Ordered List level 2
          <BXOrderedList>
            <BXListItem>Ordered List level 2</BXListItem>
            <BXListItem>Ordered List level 2</BXListItem>
          </BXOrderedList>
        </BXListItem>
      </BXOrderedList>
    </BXListItem>
    <BXListItem>Ordered List level 1</BXListItem>
    <BXListItem>Ordered List level 1</BXListItem>
  </BXOrderedList>
);

export const unordered = () => (
  <BXUnorderedList>
    <BXListItem>
      Unordered List level 1
      <BXUnorderedList>
        <BXListItem>Unordered List level 2</BXListItem>
        <BXListItem>
          Unordered List level 2
          <BXUnorderedList>
            <BXListItem>Unordered List level 2</BXListItem>
            <BXListItem>Unordered List level 2</BXListItem>
          </BXUnorderedList>
        </BXListItem>
      </BXUnorderedList>
    </BXListItem>
    <BXListItem>Unordered List level 1</BXListItem>
    <BXListItem>Unordered List level 1</BXListItem>
  </BXUnorderedList>
);
