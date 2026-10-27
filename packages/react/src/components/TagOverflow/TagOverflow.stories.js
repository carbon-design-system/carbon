/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React, { useState, useRef } from 'react';

import { TagOverflow } from '.';
import { DisplayBox } from '../../internal/DisplayBox';
import { UserAvatar } from '../UserAvatar';
import mdx from './TagOverflow.mdx';
import {
  IconComponent,
  IconComponentArr,
  ManyUserAvatarArr,
  UserAvatarArr,
  fiveTags,
  longTags,
  overflowAndModalStrings,
  tags,
} from './utils';

const blockClass = 'cds--tag-set';
const blockClassModal = `${blockClass}-modal`;

export default {
  title: 'Components/TagOverflow',
  component: TagOverflow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>
          {`.${blockClassModal} { opacity: 0; visibility: hidden; /* prevents glitch storybook modal css load */ }`}
        </style>
        <DisplayBox>
          <Story />
        </DisplayBox>
      </>
    ),
  ],
  argTypes: {
    className: { table: { disable: true } },
    containerWidth: {
      control: { type: 'range', min: 20, max: 800, step: 10 },
    },
  },
};

const Template = ({ containerWidth, ...args }) => (
  <div style={{ width: containerWidth }}>
    <TagOverflow {...args} />
  </div>
);

export const TagsWithOverflowCount = {
  render: Template,
  args: {
    containerWidth: 250,
    items: fiveTags,
    onOverflowTagChange: (items) => console.log(items),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const TagsWithTruncation = {
  render: Template,
  args: {
    containerWidth: 300,
    items: longTags,
  },
};

export const TagsWithOverflowModal = {
  render: Template,
  args: {
    containerWidth: 500,
    items: tags,
    ...overflowAndModalStrings,
  },
};

export const MultilineTags = {
  render: Template,
  args: {
    containerWidth: 500,
    items: tags,
    multiline: true,
    ...overflowAndModalStrings,
  },
};

export const UserAvatarsWithOverflowCount = {
  render: Template,
  args: {
    containerWidth: 250,
    items: UserAvatarArr,
    tagComponent: UserAvatar,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const UserAvatarsWithOverflowModal = {
  render: Template,
  args: {
    containerWidth: 300,
    items: ManyUserAvatarArr,
    tagComponent: UserAvatar,
    ...overflowAndModalStrings,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const CustomComponentsWithOverflowModal = {
  render: Template,
  args: {
    containerWidth: 200,
    items: IconComponentArr,
    tagComponent: IconComponent,
    ...overflowAndModalStrings,
  },
};

const TemplateWithClose = ({ containerWidth, items, ...args }) => {
  const [liveTags, setLiveTags] = useState(
    items.map((item) => ({
      ...item,
      onClose: () => handleTagClose(item.label),
    }))
  );

  const handleTagClose = (key) => {
    setLiveTags((prev) => prev.filter((item) => item.label !== key));
  };

  const ref = useRef(undefined);
  return (
    <div style={{ width: containerWidth }} ref={ref}>
      <TagOverflow {...args} items={liveTags} />
    </div>
  );
};

export const InteractiveTags = {
  render: TemplateWithClose,
  args: {
    containerWidth: 500,
    items: tags,
    ...overflowAndModalStrings,
  },
};
