/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { WithDeprecationNotice } from '../../../.storybook/templates/WithDeprecationNotice';

import {
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
} from '../Menu';

import { OverflowMenuV2 } from './';

export default {
  title: 'Experimental/unstable__OverflowMenuV2',
  component: OverflowMenuV2,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
  },
};

export const _OverflowMenuV2 = () => {
  const onClick = action('onClick (MenuItem)');

  return (
    <WithDeprecationNotice
      text={
        <span>
          `OverflowMenuV2` is deprecated and will be removed in the next major
          version. Use `OverflowMenu` with the `enable-v12-overflowmenu`{' '}
          <a href="/?path=/story/experimental-feature-flags-overview--page">
            feature flag
          </a>{' '}
          instead.
        </span>
      }>
      <OverflowMenuV2>
        <MenuItem label="Stop app" onClick={onClick} />
        <MenuItem label="Restart app" onClick={onClick} />
        <MenuItem label="Rename app" onClick={onClick} />
        <MenuItem label="Edit routes and access" onClick={onClick} />
        <MenuItemDivider />
        <MenuItem label="Delete app" kind="danger" onClick={onClick} />
      </OverflowMenuV2>
    </WithDeprecationNotice>
  );
};
