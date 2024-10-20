/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Tag } from '../Tag';
import TagSkeleton from '../Tag/Tag.Skeleton';
import { Asleep, View, FolderOpen, Folders } from '@carbon/icons-react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import '../AILabel/ailabel-story.scss';
import mdx from './Tag.mdx';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const ReadOnly = (args) => {
  return (
    <>
      <Tag className="some-class" type="red" {...args}>
        {'Tag content with a long text description'}
      </Tag>
      <Tag className="some-class" type="magenta" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="purple" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="blue" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cyan" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="teal" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="green" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="gray" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cool-gray" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="warm-gray" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="high-contrast" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="outline" {...args}>
        {'Tag content'}
      </Tag>
    </>
  );
};

ReadOnly.args = {
  disabled: false,
  filter: false,
  size: 'md',
  title: 'Clear filter',
};

ReadOnly.argTypes = {
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
    options: ['sm', 'md', 'lg'],
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
    control: false,
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
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

const aiLabel = (
  <AILabel className="slug-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = () => (
  <div style={{ marginBottom: '4rem' }}>
    <Tag slug={aiLabel} className="some-class" type="red" title="Clear Filter">
      {'Tag'}
    </Tag>

    <Tag
      filter
      slug={aiLabel}
      className="some-class"
      type="purple"
      title="Clear Filter">
      {'Tag'}
    </Tag>

    <Tag
      renderIcon={Asleep}
      slug={aiLabel}
      className="some-class"
      type="blue"
      title="Clear Filter">
      {'Tag'}
    </Tag>

    <Tag
      filter
      renderIcon={Asleep}
      slug={aiLabel}
      className="some-class"
      type="green"
      title="Clear Filter">
      {'Tag'}
    </Tag>
  </div>
);
