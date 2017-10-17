import React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from '../../components/Dropdown';
import DropdownItem from '../../components/DropdownItem';

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
        defaultText="Choose something.."
      >
        <DropdownItem itemText="All" value="all" />
        <DropdownItem itemText="Cloud Foundry API" value="cloudFoundry" />
        <DropdownItem itemText="Staging" value="staging" />
        <DropdownItem itemText="Droplet Execution Agent" value="dea" />
        <DropdownItem itemText="Router" value="router" />
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
        defaultText="Choose something.."
        value="all"
      >
        <DropdownItem itemText="All" value="all" />
        <DropdownItem itemText="Cloud Foundry API" value="cloudFoundry" />
        <DropdownItem itemText="Staging" value="staging" />
        <DropdownItem itemText="Droplet Execution Agent" value="dea" />
        <DropdownItem itemText="Router" value="router" />
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
        defaultText="Choose something.."
        disabled
      >
        <DropdownItem itemText="All" value="all" />
        <DropdownItem itemText="Cloud Foundry API" value="cloudFoundry" />
        <DropdownItem itemText="Staging" value="staging" />
        <DropdownItem itemText="Droplet Execution Agent" value="dea" />
        <DropdownItem itemText="Router" value="router" />
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
          defaultText="Choose something.."
          value="all"
          selectedText="Cloud Foundry API"
        >
          <DropdownItem itemText="All" value="all" />
          <DropdownItem itemText="Cloud Foundry API" value="cloudFoundry" />
          <DropdownItem itemText="Staging" value="staging" />
          <DropdownItem itemText="Droplet Execution Agent" value="dea" />
          <DropdownItem itemText="Router" value="router" />
        </Dropdown>
    ));
