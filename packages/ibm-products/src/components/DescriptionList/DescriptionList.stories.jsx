//cspell: disable

/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import {
  DescriptionList,
  DescriptionListBody,
  DescriptionListCell,
  DescriptionListRow,
} from '.';

import { DescriptionListSize } from './constants';

import mdx from './DescriptionList.mdx';

import styles from './_storybook-styles.scss?inline';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  argTypes: {
    children: {
      control: { type: null },
    },
    size: {
      options: Object.values(DescriptionListSize),
      control: { type: 'radio' },
    },
  },
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (story) => (
      <Annotation
        type="deprecation-notice"
        text={
          <div>
            This component is deprecated and will be removed in the next major
            version.
          </div>
        }
      >
        {story()}
      </Annotation>
    ),
  ],
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = (args) => {
  return (
    <>
      <DescriptionList
        // TODO: handle events with action or local handler.
        // onTodo={action('onTodo log action')}
        {...args}
      >
        <DescriptionListBody>
          <DescriptionListRow>
            <DescriptionListCell>Term 1</DescriptionListCell>

            <DescriptionListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </DescriptionListCell>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListCell>Term 2</DescriptionListCell>

            <DescriptionListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              accumsan, dui ut pulvinar mattis, diam est imperdiet ex, a varius
              lacus ex at libero. Aenean euismod viverra odio, id volutpat
              turpis commodo.
            </DescriptionListCell>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListCell>Term 3</DescriptionListCell>

            <DescriptionListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              accumsan, dui ut pulvinar mattis, diam est imperdiet ex, a varius
              lacus ex at libero.
            </DescriptionListCell>
          </DescriptionListRow>
        </DescriptionListBody>
      </DescriptionList>
    </>
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const descriptionList = Template.bind({});
descriptionList.args = {
  border: false,
  size: DescriptionListSize.Medium,
};
