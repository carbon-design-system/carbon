/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { SubtractAlt } from '@carbon/icons-react';
import Button from '../../Button';
import ContainedList, { ContainedListItem } from '../';

export default {
  title: 'Experimental/unstable_ContainedList',
  component: ContainedList,
};

const PlaygroundStory = (args) => (
  <>
    {[...Array(4)].map((_, i) => (
      <ContainedList
        key={i}
        {...args}
        action={
          <Button kind="ghost" size={args.kind === 'variantone' ? 'lg' : 'sm'}>
            Dismiss all
          </Button>
        }>
        {[...Array(8)].map((_, j) => (
          <ContainedListItem
            disabled={j === 3 || j === 4}
            key={`${i}-${j}`}
            action={
              <Button
                disabled={j === 3 || j === 4}
                kind="ghost"
                hasIconOnly
                renderIcon={SubtractAlt}
                iconDescription="Dismiss"
              />
            }
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
