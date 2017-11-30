/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';

const dropdownEvents = {
  className: 'some-class',
};

storiesOf('Dropdown', module)
  .addDecorator(story => <div style={{ minWidth: '20em' }}>{story()}</div>)
  .addWithInfo(
    'with default text',
    `
      The Dropdown component is used for navigating or filtering existing content.
      Create Dropdown Item components for each option in the dropdown menu.
    `,
    () => (
      <Dropdown
        {...dropdownEvents}
        onChange={action('onChange')}
        defaultText="Dropdown label">
        <DropdownItem itemText="Option 1" value="option1" />
        <DropdownItem itemText="Option 2" value="option2" />
        <DropdownItem itemText="Option 3" value="option3" />
        <DropdownItem itemText="Option 4" value="option4" />
        <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
    )
  )
  .addWithInfo(
    'with item preselected',
    `
      The Dropdown component is used for navigating or filtering existing content.
      You can also have an option preselected in the dropdown.
    `,
    () => (
      <Dropdown
        {...dropdownEvents}
        onChange={selectedItemInfo => console.log(selectedItemInfo)}
        defaultText="Option 1"
        value="all">
        <DropdownItem itemText="Option 1" value="option1" />
        <DropdownItem itemText="Option 2" value="option2" />
        <DropdownItem itemText="Option 3" value="option3" />
        <DropdownItem itemText="Option 4" value="option4" />
        <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
    )
  )
  .addWithInfo(
    'disabled',
    `
      The Dropdown component is used for navigating or filtering existing content.
      You can also have an option preselected in the dropdown.
    `,
    () => (
      <Dropdown
        {...dropdownEvents}
        onChange={selectedItemInfo => console.log(selectedItemInfo)}
        defaultText="Dropdown label"
        disabled>
        <DropdownItem itemText="Option 1" value="option1" />
        <DropdownItem itemText="Option 2" value="option2" />
        <DropdownItem itemText="Option 3" value="option3" />
        <DropdownItem itemText="Option 4" value="option4" />
        <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
    )
  )
  .addWithInfo(
    'with pre-selected value',
    `
        The Dropdown component is used for navigating or filtering existing content.
        You can also have an option preselected in the dropdown.
      `,
    () => (
      <Dropdown
        {...dropdownEvents}
        onChange={selectedItemInfo => console.log(selectedItemInfo)}
        defaultText="Dropdown label"
        value="all"
        selectedText="Option 4">
        <DropdownItem itemText="Option 1" value="option1" />
        <DropdownItem itemText="Option 2" value="option2" />
        <DropdownItem itemText="Option 3" value="option3" />
        <DropdownItem itemText="Option 4" value="option4" />
        <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
    )
  );
