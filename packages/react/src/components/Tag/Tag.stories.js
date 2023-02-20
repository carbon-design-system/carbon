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
};

export const Default = () => {
  return (
    <>
      <Tag className="some-class" type="red" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="magenta" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="purple" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="blue" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cyan" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="teal" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="green" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="gray" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="cool-gray"
        size="sm"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="warm-gray"
        size="sm"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="high-contrast"
        size="sm"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="outline" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
    </>
  );
};

export const Playground = (args) => {
  return <Tag {...args}>{'Tag content'}</Tag>;
};

Playground.argTypes = {
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  filter: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  id: {
    control: false,
  },
  renderIcon: {
    control: false,
  },
  size: {
    defaultValue: 'md',
    options: ['sm', 'md'],
    control: {
      type: 'select',
    },
  },
  title: {
    control: {
      type: 'text',
    },
    defaultValue: 'Clear filter',
  },
  type: {
    options: [
      'red',
      'magenta',
      'purple',
      'blue',
      'cyan',
      'teal',
      'green',
      'gray',
      'cool-gray',
      'warm-gray',
      'high-contrast',
      'outline',
    ],
    control: {
      type: 'select',
    },
  },
};
