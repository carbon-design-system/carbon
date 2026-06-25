/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import { Theme } from '@carbon/react';

import { pkg } from '../../settings';
import { UserAvatar } from '../UserAvatar';
import { DisplayBox } from '../../global/js/utils/DisplayBox';
import { TagOverflow } from '.';
import mdx from './TagOverflow.mdx';

import styles from './_storybook-styles.scss?inline';
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

const blockClass = `${pkg.prefix}--tag-set`;
const blockClassModal = `${blockClass}-modal`;

export default {
  title: 'Utilities/TagOverflow',
  component: TagOverflow,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 20, max: 800, step: 10 },
    },
  },
  decorators: [
    (story) => (
      <>
        <style>
          {`.${blockClassModal} { opacity: 0; visibility: hidden; /* prevents glitch storybook modal css load */ }`}
          ;
        </style>
        <Theme theme="g10">
          <DisplayBox>{story()}</DisplayBox>
        </Theme>
      </>
    ),
  ],
};

const Template = (argsIn) => {
  const { containerWidth, ...args } = {
    ...argsIn,
  };
  return (
    <div style={{ width: containerWidth }}>
      <TagOverflow {...args} />
    </div>
  );
};

// Declaration of stories
export const TagsWithOverflowCount = Template.bind({});
TagsWithOverflowCount.args = {
  containerWidth: 250,
  items: fiveTags,
  onOverflowTagChange: (items) => console.log(items),
};
TagsWithOverflowCount.parameters = {
  chromatic: { disableSnapshot: true },
};

export const TagsWithTruncation = Template.bind({});
TagsWithTruncation.args = {
  containerWidth: 300,
  items: longTags,
};

export const TagsWithOverflowModal = Template.bind({});
TagsWithOverflowModal.args = {
  containerWidth: 500,
  items: tags,
  ...overflowAndModalStrings,
};

export const MultilineTags = Template.bind({});
MultilineTags.args = {
  containerWidth: 500,
  items: tags,
  multiline: true,
  ...overflowAndModalStrings,
};

export const UserAvatarsWithOverflowCount = Template.bind({});
UserAvatarsWithOverflowCount.args = {
  containerWidth: 250,
  items: UserAvatarArr,
  tagComponent: UserAvatar,
};
UserAvatarsWithOverflowCount.parameters = {
  chromatic: { disableSnapshot: true },
};

export const UserAvatarsWithOverflowModal = Template.bind({});
UserAvatarsWithOverflowModal.args = {
  containerWidth: 300,
  items: ManyUserAvatarArr,
  tagComponent: UserAvatar,
  ...overflowAndModalStrings,
};
UserAvatarsWithOverflowModal.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CustomComponentsWithOverflowModal = Template.bind({});
CustomComponentsWithOverflowModal.args = {
  containerWidth: 200,
  items: IconComponentArr,
  tagComponent: IconComponent,
  ...overflowAndModalStrings,
};

const TemplateWithClose = (argsIn) => {
  const { containerWidth, allTagsModalTargetCustomDomNode, items, ...args } = {
    ...argsIn,
  };
  const [liveTags, setLiveTags] = useState(
    items.map((item) => ({
      ...item,
      filter: true,
      onClose: () => handleTagClose(item.label),
    }))
  );

  const handleTagClose = (key) => {
    setLiveTags((prev) => prev.filter((item) => item.label !== key));
  };

  const ref = useRef(undefined);
  return (
    <div style={{ width: containerWidth }} ref={ref}>
      <TagOverflow
        {...args}
        items={liveTags}
        allTagsModalTarget={
          allTagsModalTargetCustomDomNode ? ref.current : undefined
        }
      />
    </div>
  );
};

export const InteractiveTags = TemplateWithClose.bind({});
InteractiveTags.args = {
  items: tags,
  containerWidth: 500,
  ...overflowAndModalStrings,
};
