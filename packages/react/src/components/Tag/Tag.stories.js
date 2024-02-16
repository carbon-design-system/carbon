/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Tag } from '../Tag';
import TagSkeleton from '../Tag/Tag.Skeleton';

export default {
  title: 'Components/Tag',
  component: Tag,
};

export const Default = () => {
  return (
    <>
      <Tag className="some-class" type="red" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="magenta" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="purple" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="blue" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cyan" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="teal" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="green" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="gray" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cool-gray" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="warm-gray" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="high-contrast" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="outline" title="Clear Filter">
        {'Tag content'}
      </Tag>
    </>
  );
};

export const Playground = (args) => {
  return <Tag {...args}>{'Tag content'}</Tag>;
};

Playground.args = {
  disabled: false,
  filter: false,
  size: 'md',
  title: 'Clear filter',
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
  },
  filter: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
  },
  renderIcon: {
    control: false,
  },
  size: {
    options: ['sm', 'md'],
    control: {
      type: 'select',
    },
  },
  title: {
    control: {
      type: 'text',
    },
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

export const Skeleton = (args) => (
  <div>
    <TagSkeleton {...args} />
  </div>
);

Skeleton.args = {
  size: 'md',
};

Skeleton.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  as: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  disabled: {
    table: {
      disable: true,
    },
  },

  filter: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  renderIcon: {
    table: {
      disable: true,
    },
  },
  title: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md'],
    control: {
      type: 'select',
    },
  },
};
