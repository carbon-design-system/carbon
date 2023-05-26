/**
 * Copyright IBM Corp. 2016, 2023
 *dropdow.stor
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { default as Dropdown, DropdownSkeleton } from './';
import mdx from './Dropdown.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownSkeleton,
  },
  argTypes: {
    items: {
      table: { disable: true },
    },
    initialSelectedItem: {
      table: { disable: true },
    },
    itemToElement: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    light: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const items = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22DropdownFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22dropdown%22%2C%22placeholder%22%3A%22placeholder%22%2C%22isMulti%22%3Afalse%2C%22isInline%22%3Afalse%2C%22selectionFeedback%22%3A%22top-after-reopen%22%2C%22direction%22%3A%22bottom%22%2C%22size%22%3A%22md%22%2C%22label%22%3A%22Label%22%2C%22helperText%22%3A%22Optional%20helper%20text%22%2C%22listItems%22%3A%5B%7B%22text%22%3A%22Text%22%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22dropdown-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Playground = (args) => (
  <div style={{ width: 400 }}>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      label="Dropdown menu options"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
  </div>
);

Playground.argTypes = {
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue: 'invalid selection',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  label: {
    control: {
      type: 'text',
    },
    defaultValue: 'This is an example label',
  },
  warn: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warnText: {
    control: {
      type: 'text',
    },
    defaultValue: 'please notice the warning',
  },
  titleText: {
    control: {
      type: 'text',
    },
    defaultValue: 'This is an example title',
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  type: {
    control: { type: 'select' },
    options: ['default', 'inline'],
    defaultValue: 'default',
  },
};

export const Default = () => (
  <div style={{ width: 400 }}>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      label="Dropdown menu options"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const Inline = () => (
  <div style={{ width: 600 }}>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Dropdown
      id="inline"
      titleText="Inline dropdown label"
      label="Dropdown menu options"
      type="inline"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const _WithLayer = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <WithLayer>
      {(layer) => (
        <div style={{ width: 400 }}>
          <Dropdown
            id={`default-${layer}`}
            titleText="Dropdown label"
            helperText="This is some helper text"
            label="Dropdown menu options"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
      )}
    </WithLayer>
  </div>
);

export const InlineWithLayer = () => (
<div>
  <CarbonBuilderLink></CarbonBuilderLink>
  <WithLayer>
    {(layer) => (
      <div style={{ width: 600 }}>
        <Dropdown
          id={`inline-${layer}`}
          titleText="Inline dropdown label"
          label="Dropdown menu options"
          type="inline"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </div>
    )}
  </WithLayer>
</div>
);

export const Skeleton = () => (
  <div style={{ width: 300 }}>
    <CarbonBuilderLink></CarbonBuilderLink>
    <DropdownSkeleton />
  </div>
);
