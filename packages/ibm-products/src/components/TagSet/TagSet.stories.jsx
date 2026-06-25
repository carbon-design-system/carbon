//
// Copyright IBM Corp. 2020, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useRef, useState, useEffect } from 'react';

import { TYPES as tagTypes } from '../TagSet/constants';
import { pkg } from '../../settings';
import { DisplayBox } from '../../global/js/utils/DisplayBox';
import { TagSet } from '.';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import styles from './_storybook-styles.scss?inline';

const blockClass = `${pkg.prefix}--tag-set`;
const blockClassModal = `${blockClass}-modal`;

const tags = [
  { type: 'blue', label: 'Tag 1' },
  { type: 'high-contrast', label: 'Tag 123' },
  { type: 'cyan', label: 'Tag 1234' },
  { type: 'red', label: 'Tag 12345' },
];

const manyTags = [
  {
    label: 'One',
    type: 'blue',
    ['data-search']: 'single',
  },
  {
    label: 'Two',
    type: 'red',
  },
  {
    label: 'Three',
    type: 'cyan',
  },
  {
    label: 'Four',
    type: 'high-contrast',
  },
  {
    label: 'Five',
    type: 'blue',
  },
  {
    label: 'Six',
    type: 'red',
  },
  {
    label: 'Seven',
    type: 'cyan',
  },
  {
    label: 'Eight',
    type: 'high-contrast',
  },
  {
    label: 'Nine',
    type: 'red',
  },
  {
    label: 'Ten',
    type: 'blue',
  },
  {
    label: 'Eleven',
    type: 'cyan',
  },
  {
    label: 'Twelve',
    type: 'high-contrast',
    ['data-search']: 'dozen',
  },
  {
    label: 'Thirteen',
    type: 'red',
  },
  {
    label: 'Fourteen',
    type: 'cyan',
  },
  {
    label: 'Fifteen',
    type: 'blue',
  },
  {
    label: 'Sixteen',
    type: 'high-contrast',
  },
  {
    label: 'Seventeen',
    type: 'red',
  },
  {
    label: 'Eighteen',
    type: 'cyan',
  },
  {
    label: 'Nineteen',
    type: 'red',
  },
  {
    label: 'Twenty',
    type: 'high-contrast',
  },
].map((item, index) => ({
  ...item,
  ['data-search']: '' + (index + 1) + ' ' + item?.['data-search'],
}));

const hundredsOfTags = [];
for (let i = 0; i < 200; i++) {
  const label = `Label_${i + 1}`;
  const values = Object.keys(tagTypes);
  const typeValue = values[Math.floor(Math.random() * values.length)];

  hundredsOfTags.push({ type: typeValue, label });
}

const overflowAndModalStrings = {
  allTagsModalTitle: 'All tags',
  allTagsModalSearchLabel: 'Search all tags',
  allTagsModalSearchPlaceholderText: 'Search all tags',
  showAllTagsLabel: 'View all tags',
};

export default {
  title: 'Components/TagSet',
  component: TagSet,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: () => (
        <StoryDocsPage
          altGuidelinesHref={[
            {
              href: 'https://pages.github.ibm.com/carbon/ibm-products/components/tag-set/usage/',
              label: 'Usage guidelines',
            },
            {
              href: 'https://carbondesignsystem.com/components/tag/usage/',
              label: 'Carbon tag usage guidelines',
            },
            {
              href: 'https://react.carbondesignsystem.com/?path=/docs/components-tag--overview',
              label: 'Carbon tag documentation',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 20, max: 800, step: 10 },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      type: 'string',
      description:
        'This prop is only for storybook representation, and does not belong to `tagset` component, the size can be passed to each tag{} in tags[], the overflow tag takes the size of last tag{} in tags[]',
    },
    onOverflowClick: {
      control: { type: 'function' },
      description:
        'An optional click handler that overrides the default functionality of displaying all tags in a modal',
    },
    allTagsModalTargetCustomDomNode: {
      control: { type: 'boolean' },
      description: 'Optional DOM node: Modal target defaults to document.body',
    },
  },
  decorators: [
    (story) => (
      <>
        <style>
          {`.${blockClassModal} { opacity: 0; visibility: hidden; /* prevents glitch storybook modal css load */ }`}
          ;
        </style>
        <DisplayBox>{story()}</DisplayBox>
      </>
    ),
  ],
};

const Template = (argsIn) => {
  const { containerWidth, allTagsModalTargetCustomDomNode, size, ...args } = {
    ...argsIn,
  };
  if (args.tags) {
    args.tags = args.tags.map((tag) => ({ ...tag, size }));
  }

  const ref = useRef(undefined);
  return (
    <main style={{ width: containerWidth }} ref={ref}>
      <TagSet
        {...args}
        allTagsModalTarget={
          allTagsModalTargetCustomDomNode ? ref.current : undefined
        }
      />
    </main>
  );
};

export const FiveTags = Template.bind({});
FiveTags.args = {
  tags: tags,
  containerWidth: 500,
};

export const ManyTags = Template.bind({});
ManyTags.args = {
  tags: manyTags,
  containerWidth: 500,
  ...overflowAndModalStrings,
};

export const MultilineTags = Template.bind({});
MultilineTags.args = {
  tags: manyTags,
  containerWidth: 500,
  multiline: true,
  ...overflowAndModalStrings,
};

export const HundredsOfTags = Template.bind({});
HundredsOfTags.args = {
  tags: hundredsOfTags,
  containerWidth: 500,
  ...overflowAndModalStrings,
};
HundredsOfTags.parameters = {
  chromatic: { disableSnapshot: true },
};

const TemplateWithClose = (argsIn) => {
  const {
    containerWidth,
    allTagsModalTargetCustomDomNode,
    size,
    tags,
    ...args
  } = {
    ...argsIn,
  };
  const [liveTags, setLiveTags] = useState(
    tags.map((tag) => ({
      ...tag,
      filter: true,
      size: size,
      onClose: () => handleTagClose(tag.label),
    }))
  );

  const handleTagClose = (key) => {
    setLiveTags((prev) => prev.filter((tag) => tag.label !== key));
  };

  const ref = useRef(undefined);
  useEffect(() => {
    setLiveTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        size: size,
      }))
    );
  }, [size]);
  return (
    <main style={{ width: containerWidth }} ref={ref}>
      <TagSet
        {...args}
        tags={liveTags}
        allTagsModalTarget={
          allTagsModalTargetCustomDomNode ? ref.current : undefined
        }
      />
    </main>
  );
};

export const WithClose = TemplateWithClose.bind({});
WithClose.args = {
  tags: manyTags,
  containerWidth: 500,
  ...overflowAndModalStrings,
};

export const WithCloseAndOverflowTags = TemplateWithClose.bind({});
WithCloseAndOverflowTags.args = {
  tags: manyTags,
  containerWidth: 500,
  overflowType: 'tag',
  ...overflowAndModalStrings,
};
