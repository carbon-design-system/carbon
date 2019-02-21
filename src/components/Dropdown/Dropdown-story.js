/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { breakingChangesX } from '../../internal/FeatureFlags';

import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';

const values = {
  'None ()': 'none',
  'Option 1 (option1)': 'option1',
  'Option 2 (option2)': 'option2',
  'Option 3 (option3)': 'option3',
  'Option 4 (option4)': 'option4',
  'Option 5 (option5)': 'option5',
};

const texts = {
  'None ()': 'none',
  'Option 1': 'Option 1',
  'Option 2': 'Option 2',
  'Option 3': 'Option 3',
  'Option 4': 'Option 4',
  'Option 5': 'Option 5',
};

const props = {
  dropdown: () => {
    const value = select('Selected value (value in <Dropdown>)', values, '');
    const selectedText = select(
      'Selected text (selectedText in <Dropdown>)',
      texts,
      ''
    );
    return {
      className: 'some-class',
      defaultText: text(
        'The initial trigger text (defaultText in <Dropdown>)',
        'Dropdown label'
      ),
      value: value === 'none' ? '' : value,
      selectedText: selectedText === 'none' ? '' : selectedText,
      light: boolean('Light variant (light in <Dropdown>)', false),
      disabled: boolean('Disabled (disabled in <Dropdown>)', false),
      open: boolean('Open dropdown (open in <Dropdown>)', false),
      tabIndex: number('Tab index (tabIndex in <Dropdown>)', -1),
      ariaLabel: text(
        'Dropdown menu label (ariaLabel in <Dropdown>)',
        'dropdown menu label'
      ),
      iconDescription: text(
        'Trigger icon description (iconDescription in <Dropdown>)',
        ''
      ),
      onChange: action('onChange'),
      onOpen: action('onOpen'),
      onClose: action('onClose'),
    };
  },
  dropdownItem: () => ({
    href: text('Link (href in <DropdownItem>)', ''),
  }),
};

if (!breakingChangesX) {
  storiesOf('Dropdown', module)
    .addDecorator(withKnobs)
    .addDecorator(story => <div style={{ minWidth: '20em' }}>{story()}</div>)
    .add(
      'Default',
      () => {
        const dropdownItemProps = props.dropdownItem();
        return (
          <Dropdown {...props.dropdown()}>
            <DropdownItem
              itemText="Option 1"
              value="option1"
              {...dropdownItemProps}
            />
            <DropdownItem
              itemText="Option 2"
              value="option2"
              {...dropdownItemProps}
            />
            <DropdownItem
              itemText="Option 3"
              value="option3"
              {...dropdownItemProps}
            />
            <DropdownItem
              itemText="Option 4"
              value="option4"
              {...dropdownItemProps}
            />
            <DropdownItem
              itemText="Option 5"
              value="option5"
              {...dropdownItemProps}
            />
          </Dropdown>
        );
      },
      {
        info: {
          text: `
              The Dropdown component is used for navigating or filtering existing content.
              Create Dropdown Item components for each option in the dropdown menu.
            `,
        },
      }
    );
}
