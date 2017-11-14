import React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';

const dropdownEvents = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('Dropdown', module)
  .addDecorator((story) => (
    <div style={{ minWidth: '20em' }}>
      {story()}
    </div>
  ))
  .addWithInfo(
    'with default text',
    `
      The Dropdown component is used for navigating or filtering existing content.
      Create Dropdown Item components for each option in the dropdown menu.
    `,
    () => (
      <Dropdown
        {...dropdownEvents}
        onChange={(selectedItemInfo) => console.log(selectedItemInfo)} // eslint-disable-line no-console
        defaultText="Dropdown label"
      >
        <DropdownItem itemText="Option 1" value="option1" />
        <DropdownItem itemText="Option 2" value="option2" />
        <DropdownItem itemText="Option 3" value="option3" />
        <DropdownItem itemText="Option 4" value="option4" />
        <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
  ))
  .addWithInfo(
    'with item preselected',
    `
      The Dropdown component is used for navigating or filtering existing content.
      You can also have an option preselected in the dropdown.
    `,
    () => (
      <Dropdown
        {...dropdownEvents}
        onChange={(selectedItemInfo) => console.log(selectedItemInfo)} // eslint-disable-line no-console
        defaultText="Option 1"
        value="Option 1"
      >
        <DropdownItem itemText="Option 1" value="option1" />
        <DropdownItem itemText="Option 2" value="option2" />
        <DropdownItem itemText="Option 3" value="option3" />
        <DropdownItem itemText="Option 4" value="option4" />
        <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
  ))
  .addWithInfo(
    'disabled',
    `
      The Dropdown component is used for navigating or filtering existing content.
      You can also have an option preselected in the dropdown.
    `,
    () => (
      <Dropdown
        {...dropdownEvents}
        onChange={(selectedItemInfo) => console.log(selectedItemInfo)} // eslint-disable-line no-console
        defaultText="Dropdown label"
        disabled
      >
      <DropdownItem itemText="Option 1" value="option1" />
      <DropdownItem itemText="Option 2" value="option2" />
      <DropdownItem itemText="Option 3" value="option3" />
      <DropdownItem itemText="Option 4" value="option4" />
      <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
    ))
    .addWithInfo(
      'with pre-selected value',
      `
        The Dropdown component is used for navigating or filtering existing content.
        You can also have an option preselected in the dropdown.
      `,
      () => (
        <Dropdown
          {...dropdownEvents}
          onChange={(selectedItemInfo) => console.log(selectedItemInfo)} // eslint-disable-line no-console
          defaultText="Dropdown label"
          value="all"
          selectedText="Option 4"
        >
        <DropdownItem itemText="Option 1" value="option1" />
        <DropdownItem itemText="Option 2" value="option2" />
        <DropdownItem itemText="Option 3" value="option3" />
        <DropdownItem itemText="Option 4" value="option4" />
        <DropdownItem itemText="Option 5" value="option5" />
      </Dropdown>
    ));
