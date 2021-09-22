/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Filter16 } from '@carbon/icons-react';
import Toolbar, {
  ToolbarItem,
  ToolbarTitle,
  ToolbarOption,
  ToolbarDivider,
} from '../Toolbar';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';

const toolbarProps = {
  className: 'some-class',
};

const inputProps = {
  className: 'some-class',
  onChange: action('onChange'),
};

export default {
  title: 'Deprecated/Toolbar',

  parameters: {
    component: Toolbar,

    subcomponents: {
      ToolbarItem,
      ToolbarTitle,
      ToolbarOption,
      ToolbarDivider,
    },
  },
};

export const Default = () => (
  <Toolbar {...toolbarProps} className="some-class">
    <ToolbarItem type="search" placeHolderText="Search" />
    <ToolbarItem>
      <OverflowMenu renderIcon={Filter16}>
        <ToolbarTitle title="FILTER BY" />
        <ToolbarOption>
          <Checkbox {...inputProps} id="opt-1" labelText="Filter option 1" />
        </ToolbarOption>
        <ToolbarOption>
          <Checkbox {...inputProps} id="opt-2" labelText="Filter option 2" />
        </ToolbarOption>
        <ToolbarOption>
          <Checkbox {...inputProps} id="opt-3" labelText="Filter option 3" />
        </ToolbarOption>
      </OverflowMenu>
    </ToolbarItem>
    <ToolbarItem>
      <OverflowMenu>
        <OverflowMenuItem itemText="Refresh table" />
        <ToolbarDivider />
        <ToolbarTitle title="ROW HEIGHT" />
        <ToolbarOption>
          <RadioButton
            {...inputProps}
            value="short"
            id="radio-1"
            name="toolbar-radio"
            labelText="Short"
          />
        </ToolbarOption>
        <ToolbarOption>
          <RadioButton
            {...inputProps}
            value="tall"
            id="radio-2"
            name="toolbar-radio"
            labelText="Tall"
          />
        </ToolbarOption>
      </OverflowMenu>
    </ToolbarItem>
  </Toolbar>
);

Default.parameters = {
  info: {
    text: `
      Toolbar stuff
    `,
  },
};
