/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import Add16 from '@carbon/icons-react/lib/add/16';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';

const { prefix } = settings;
const directions = {
  'Bottom of the trigger button (bottom)': 'bottom',
  'Top of the trigger button (top)': 'top',
};

const props = {
  menu: () => ({
    direction: select('Menu direction (direction)', directions, 'bottom'),
    ariaLabel: text('ARIA label (ariaLabel)', ''),
    iconDescription: text('Icon description (iconDescription)', ''),
    flipped: boolean('Flipped (flipped)', false),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onKeyDown: action('onKeyDown'),
    onClose: action('onClose'),
    onOpen: action('onOpen'),
  }),
  menuItem: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled)', false),
    requireTitle: boolean(
      'Use hover over text for menu item (requireTitle)',
      false
    ),
    onClick: action('onClick'),
  }),
};

const OverflowMenuExample = ({ overflowMenuProps, overflowMenuItemProps }) => (
  <>
    <OverflowMenu {...overflowMenuProps}>
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 1"
        primaryFocus
      />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 2 is an example of a really long string and how we recommend handling this"
        requireTitle
      />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 3" />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 4" />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText={
          <div style={{ display: 'flex' }}>
            <>
              <div
                className={`${prefix}--overflow-menu-options__option-content`}>
                Add
              </div>
              <Add16 />
            </>
          </div>
        }
      />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Danger option"
        hasDivider
        isDelete
      />
    </OverflowMenu>
    <OverflowMenu {...overflowMenuProps}>
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 1"
        primaryFocus
      />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 2 is an example of a really long string and how we recommend handling this"
      />
    </OverflowMenu>
  </>
);

storiesOf('OverflowMenu', module)
  .addDecorator(withKnobs)
  .add(
    'basic',
    () => (
      <OverflowMenuExample
        overflowMenuProps={props.menu()}
        overflowMenuItemProps={props.menuItem()}
      />
    ),
    {
      info: {
        text: `
            Overflow Menu is used when additional options are available to the user and there is a space constraint.
            Create Overflow Menu Item components for each option on the menu.
          `,
      },
    }
  )
  .add(
    'with links',
    () => (
      <OverflowMenuExample
        overflowMenuProps={props.menu()}
        overflowMenuItemProps={{
          ...props.menuItem(),
          href: 'https://www.ibm.com',
        }}
      />
    ),
    {
      info: {
        text: `
            Overflow Menu is used when additional options are available to the user and there is a space constraint.
            Create Overflow Menu Item components for each option on the menu.

            When given \`href\` props, menu items render as <a> tags to facilitate usability.
          `,
      },
    }
  )
  .add(
    'custom trigger',
    () => (
      <OverflowMenuExample
        overflowMenuProps={{
          ...props.menu(),
          style: { width: 'auto' },
          renderIcon: () => (
            <div style={{ padding: '0 1rem' }}>Custom trigger</div>
          ),
        }}
        overflowMenuItemProps={props.menuItem()}
      />
    ),
    {
      info: {
        text: `
            Sometimes you just want to render something other than an icon
          `,
      },
    }
  );
