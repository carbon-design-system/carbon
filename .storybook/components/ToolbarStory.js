import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Toolbar, {
  ToolbarItem,
  ToolbarTitle,
  ToolbarOption,
  ToolbarDivider,
} from '../../components/Toolbar';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';
import Checkbox from '../../components/Checkbox';
import RadioButton from '../../components/RadioButton';

const toolbarProps = {
  className: 'some-class',
};

const checkboxEvents = {
  className: 'some-class',
  onChange: action('onChange'),
};

storiesOf('Toolbar', module).addWithInfo(
  'Default',
  `
    Toolbar stuff
  `,
  () =>
    <Toolbar {...toolbarProps} className="some-class">
      <ToolbarItem type="search" placeHolderText="Search" />
      <ToolbarItem>
        <OverflowMenu iconName="filter" floatingMenu>
          <ToolbarTitle title="FILTER BY" />
          <ToolbarOption>
            <Checkbox
              {...checkboxEvents}
              id="opt-1"
              labelText="Filter option 1"
            />
          </ToolbarOption>
          <ToolbarOption>
            <Checkbox
              {...checkboxEvents}
              id="opt-2"
              labelText="Filter option 2"
            />
          </ToolbarOption>
          <ToolbarOption>
            <Checkbox
              {...checkboxEvents}
              id="opt-3"
              labelText="Filter option 3"
            />
          </ToolbarOption>
        </OverflowMenu>
      </ToolbarItem>
      <ToolbarItem>
        <OverflowMenu floatingMenu>
          <OverflowMenuItem itemText="Refresh table" />
          <ToolbarDivider />
          <ToolbarTitle title="ROW HEIGHT" />
          <ToolbarOption>
            <RadioButton
              value="short"
              id="radio-1"
              name="toolbar-radio"
              labelText="Short"
            />
          </ToolbarOption>
          <ToolbarOption>
            <RadioButton
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
