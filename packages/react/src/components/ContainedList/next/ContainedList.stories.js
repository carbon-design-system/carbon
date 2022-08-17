/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ContainedList, { ContainedListItem } from '../';

export default {
  title: 'Experimental/unstable_ContainedList',
  component: ContainedList,
};

const PlaygroundStory = (args) => (
  <>
    {[...Array(4)].map((_, i) => (
      <ContainedList key={i} {...args}>
        {[...Array(8)].map((_, j) => (
          <ContainedListItem
            disabled={j === 3}
            key={`${i}-${j}`}
            onClick={() => {}}>
            List item
          </ContainedListItem>
        ))}
      </ContainedList>
    ))}
  </>
);

export const Playground = PlaygroundStory.bind({});

Playground.argTypes = {
  label: { defaultValue: 'Heading' },
};
