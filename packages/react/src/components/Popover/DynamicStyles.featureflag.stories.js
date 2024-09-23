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

export const _ComboBox = () => (
  <ComboBox
    onChange={() => {}}
    id="carbon-combobox"
    items={comboBoxItems}
    itemToString={(item) => (item ? item.text : '')}
    titleText="ComboBox title"
    helperText="Combobox helper text"
  />
);

_ComboBox.argTypes = {
  hasFocus: {
    table: {
      disable: true,
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

_ComboButton.argTypes = {
  hasFocus: {
    table: {
      disable: true,
    },
  },
};

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

export const _Dropdown = () => (
  <Dropdown
    id="default"
    titleText="Dropdown label"
    helperText="This is some helper text"
    initialSelectedItem={items[1]}
    label="Option 1"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    direction="bottom"
  />
);

_Dropdown.argTypes = {
  hasFocus: {
    table: {
      disable: true,
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

_Popover.argTypes = {
  hasFocus: {
    table: {
      disable: true,
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

_MenuButton.argTypes = {
  hasFocus: {
    table: {
      disable: true,
    },
  },
};

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

_MultiSelect.argTypes = {
  hasFocus: {
    table: {
      disable: true,
    },
  },
};

export const _Toggletip = () => {
  return (
    <div>
      <div>
        <ToggletipLabel>Toggletip label</ToggletipLabel>
        <Toggletip align="bottom" defaultOpen>
          <ToggletipButton label="Show information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p>
              Scroll the container up, down, left or right to observe how the
              Toggletip will automatically change its position in attempt to
              stay within the viewport. This works on initial render in addition
              to on scroll.
            </p>
            <ToggletipActions>
              <Link href="#">Link action</Link>
              <Button size="sm">Button</Button>
            </ToggletipActions>
          </ToggletipContent>
        </Toggletip>
      </div>
    </div>
  );
};

_Toggletip.argTypes = {
  hasFocus: {
    table: {
      disable: true,
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

_Tooltip.argTypes = {
  hasFocus: {
    table: {
      disable: true,
    },
  },
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

_OverflowMenu.argTypes = {
  hasFocus: {
    table: {
      disable: true,
    },
  },
};
