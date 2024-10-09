/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Information, Checkbox as CheckboxIcon } from '@carbon/icons-react';
import { ComboBox } from '../ComboBox';
import { ComboButton } from '../ComboButton';
import { Dropdown } from '../Dropdown';
import { Link } from '../Link';
import { Button } from '../Button';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import { Tooltip } from '../Tooltip';
import { MenuItem, MenuItemDivider } from '../Menu';
import { MenuButton } from '../MenuButton';
import { MultiSelect } from '../MultiSelect';
import { Popover, PopoverContent } from '../Popover';
import { OverflowMenu } from '../OverflowMenu';
import { action } from '@storybook/addon-actions';
import mdx from './DynamicStyles.featureflag.mdx';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

import './story.scss';
import '../Tooltip/story.scss';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Experimental/Feature Flags/Dynamic floating styles',
  component: Dropdown,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

const comboBoxItems = [
  {
    id: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
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

export const _ComboBox = (args) => (
  <ComboBox
    onChange={() => {}}
    id="carbon-combobox"
    items={comboBoxItems}
    itemToString={(item) => (item ? item.text : '')}
    titleText="ComboBox title"
    helperText="Combobox helper text"
    {...args}
  />
);

_ComboBox.args = {
  direction: 'bottom',
};

_ComboBox.argTypes = {
  direction: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};

export const _ComboButton = () => (
  <ComboButton label="Primary action">
    <MenuItem label="Second action with a long label description" />
    <MenuItem label="Third action" />
    <MenuItem label="Fourth action" disabled />
  </ComboButton>
);

const items = [
  {
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    text: 'Option 1',
  },
  {
    text: 'Option 2',
  },
  {
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    text: 'Option 4',
  },
  {
    text: 'Option 5',
  },
  {
    text: 'Option 6',
  },
  {
    text: 'Option 7',
  },
  {
    text: 'Option 8',
  },
];

export const _Dropdown = (args) => (
  <Dropdown
    id="default"
    titleText="Dropdown label"
    helperText="This is some helper text"
    initialSelectedItem={items[1]}
    label="Option 1"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    {...args}
  />
);

_Dropdown.args = {
  direction: 'bottom',
};

_Dropdown.argTypes = {
  direction: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};

export const _Popover = () => {
  const [open, setOpen] = useState(true);

  return (
    <Popover open={open} align="top">
      <div className="playground-trigger">
        <CheckboxIcon
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      <PopoverContent className="p-3">
        <div>
          <p className="popover-title">This popover uses autoAlign</p>
          <p className="popover-details">
            Scroll the container up, down, left or right to observe how the
            popover will automatically change its position in attempt to stay
            within the viewport. This works on initial render in addition to on
            scroll.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

_Popover.args = {
  align: 'bottom',
};

_Popover.argTypes = {
  align: {
    options: [
      'top',
      'top-start',
      'top-end',

      'bottom',
      'bottom-start',
      'bottom-end',

      'left',
      'left-end',
      'left-start',

      'right',
      'right-end',
      'right-start',
    ],
    control: {
      type: 'select',
    },
  },
};

export const _MenuButton = () => (
  <MenuButton label="Actions">
    <MenuItem label="First action" />
    <MenuItem label="Second action that is a longer item to test overflow and title." />
    <MenuItem label="Third action" disabled />
  </MenuButton>
);

export const _MultiSelect = () => (
  <MultiSelect
    label="Multiselect Label"
    id="carbon-multiselect-example"
    titleText="Multiselect title"
    helperText="This is helper text"
    items={comboBoxItems}
    itemToString={(item) => (item ? item.text : '')}
    selectionFeedback="top-after-reopen"
  />
);

export const _Toggletip = (args) => {
  return (
    <div>
      <ToggletipLabel>Toggletip label</ToggletipLabel>
      <Toggletip align={args.align} defaultOpen>
        <ToggletipButton label="Show information">
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>
            Scroll the container up, down, left or right to observe how the
            Toggletip will automatically change its position in attempt to stay
            within the viewport. This works on initial render in addition to on
            scroll.
          </p>
          <ToggletipActions>
            <Link href="#">Link action</Link>
            <Button size="sm">Button</Button>
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </div>
  );
};

_Toggletip.args = {
  align: 'bottom',
};

_Toggletip.argTypes = {
  align: {
    options: [
      'top',
      'top-start',
      'top-end',

      'bottom',
      'bottom-start',
      'bottom-end',

      'left',
      'left-end',
      'left-start',

      'right',
      'right-end',
      'right-start',
    ],
    control: {
      type: 'select',
    },
  },
};

export const _Tooltip = () => {
  const tooltipLabel =
    'Scroll the container up, down, left or right to observe how the tooltip will automatically change its position in attempt to stay within the viewport. This works on initial render in addition to on scroll.';
  return (
    <div>
      <Tooltip label={tooltipLabel} align="top">
        <button className="sb-tooltip-trigger" type="button">
          <Information />
        </button>
      </Tooltip>
    </div>
  );
};

export const _OverflowMenu = () => {
  return (
    <div>
      <OverflowMenu>
        <MenuItem label="Stop app" />
        <MenuItem label="Restart app" />
        <MenuItem label="Rename app" />
        <MenuItem label="Edit routes and access" />
        <MenuItemDivider />
        <MenuItem label="Delete app" kind="danger" />
      </OverflowMenu>
    </div>
  );
};
