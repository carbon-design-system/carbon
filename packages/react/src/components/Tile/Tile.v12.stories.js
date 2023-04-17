/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ClickableTile, Tile } from '.';
import { Download } from '@carbon/icons-react';
import { FeatureFlags } from '../FeatureFlags';

import './tile-story.scss';
import mdx from './Tile.v12.mdx';

export default {
  title: 'Experimental/Feature Flags/enable-v12-tile-default-icons/Tile',
  component: Tile,
  subcomponents: {
    ClickableTile,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-v12-tile-default-icons': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
};

const experimentalClassname = 'experimental-tile';

export const Clickable = (args) => {
  return (
    <div className={experimentalClassname}>
      <ClickableTile
        id="clickable-tile-1"
        href="https://www.carbondesignsystem.com/"
        {...args}>
        Clickable Tile
      </ClickableTile>
    </div>
  );
};

Clickable.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
};

export const ClickableWithCustomIcon = (args) => {
  return (
    <div className={experimentalClassname}>
      <ClickableTile
        id="clickable-tile-1"
        href="https://www.carbondesignsystem.com/"
        renderIcon={Download}
        {...args}>
        Clickable Tile
      </ClickableTile>
    </div>
  );
};

ClickableWithCustomIcon.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
};
