/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Tag } from '../Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
  },
};

export const Default = (args) => {
  return (
    <>
      <Tag
        className="some-class"
        type="red"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="magenta"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="purple"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="blue"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="cyan"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="teal"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="green"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="gray"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="cool-gray"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="warm-gray"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="high-contrast"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="outline"
        size="sm"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </Tag>
    </>
  );
};
