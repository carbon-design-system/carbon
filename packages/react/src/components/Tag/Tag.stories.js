/**
 * Copyright IBM Corp. 2016, 2023
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
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22TagFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22tag%22%2C%22kind%22%3A%22gray%22%2C%22size%22%3A%22md%22%2C%22filter%22%3Afalse%2C%22disabled%22%3Afalse%2C%22title%22%3A%22Tag%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22tag-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
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
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22TagFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22tag%22%2C%22kind%22%3A%22gray%22%2C%22size%22%3A%22md%22%2C%22filter%22%3Afalse%2C%22disabled%22%3Afalse%2C%22title%22%3A%22Tag%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22tag-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Tag {...args}>{'Tag content'}</Tag>
    </>
  );
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
