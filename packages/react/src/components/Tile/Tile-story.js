/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '../Tile';
import TileGroup from '../TileGroup';
import RadioTile from '../RadioTile';
import mdx from './Tile.mdx';

const radioValues = {
  None: '',
  standard: 'standard',
  'default-selected': 'default-selected',
  selected: 'selected',
};

const props = {
  regular: () => ({
    light: boolean('Light variant (light)', false),
  }),
  clickable: () => ({
    href: text('Href for clickable UI (href)', 'javascript:void(0)'),
    light: boolean('Light variant (light)', false),
  }),
  selectable: () => ({
    selected: boolean('Selected (selected)', false),
    handleClick: action('handleClick'),
    handleKeyDown: action('handleKeyDown'),
    light: boolean('Light variant (light)', false),
  }),
  group: () => ({
    name: text('Form item (name in <TileGroup>)', 'tile-group'),
    valueSelected: select(
      'Value of the selected item (valueSelected in <TileGroup>)',
      radioValues,
      ''
    ),
    onChange: action('onChange'),
  }),
  radio: () => ({
    name: text('Form item name (name in <RadioTile>)', 'tiles'),
    onChange: action('onChange'),
    light: boolean('Light variant (light)', false),
  }),
  expandable: () => ({
    tabIndex: number('Tab index (tabIndex)', 0),
    expanded: boolean('Expanded (expanded)', false),
    tileCollapsedIconText: text(
      'Collapsed icon text (tileCollapsedIconText)',
      'Interact to Expand tile'
    ),
    tileExpandedIconText: text(
      'Collapsed icon text (tileExpandedIconText)',
      'Interact to Collapse tile'
    ),
    tileCollapsedLabel: text('Collapsed icon text (tileCollapsedLabel)'),
    tileExpandedLabel: text('Collapsed icon text (tileExpandedLabel)'),
    handleClick: action('handleClick'),
    light: boolean('Light variant (light)', false),
  }),
};

export default {
  title: 'Components/Tile',
  decorators: [withKnobs],

  parameters: {
    component: Tile,
    docs: {
      page: mdx,
    },
    subcomponents: {
      ClickableTile,
      SelectableTile,
      ExpandableTile,
      RadioTile,
      TileGroup,
      TileAboveTheFoldContent,
      TileBelowTheFoldContent,
    },
  },
};

export const Default = () => {
  const regularProps = props.regular();
  return <Tile {...regularProps}>Default tile</Tile>;
};

Default.parameters = {
  info: {
    text: `
        Default tile without any interactions
      `,
  },
};

export const Clickable = () => {
  const clickableProps = props.clickable();
  return <ClickableTile {...clickableProps}>Clickable Tile</ClickableTile>;
};

Clickable.parameters = {
  info: {
    text: `
        Clickable tile
      `,
  },
};

export const MultiSelect = () => {
  const selectableProps = props.selectable();
  return (
    <div role="group" aria-label="selectable tiles">
      <SelectableTile id="tile-1" name="tiles" {...selectableProps}>
        Multi-select Tile
      </SelectableTile>
      <SelectableTile id="tile-2" name="tiles" {...selectableProps}>
        Multi-select Tile
      </SelectableTile>
      <SelectableTile id="tile-3" name="tiles" {...selectableProps}>
        Multi-select Tile
      </SelectableTile>
    </div>
  );
};

MultiSelect.storyName = 'Multi-select';

MultiSelect.parameters = {
  info: {
    text: `
        Selectable tile

        Use this to select multiple tiles.
      `,
  },
};

export const Radio = () => {
  const radioProps = props.radio();
  return (
    <TileGroup
      defaultSelected="default-selected"
      legend="Radio Tile Group"
      {...props.group()}>
      <RadioTile value="standard" {...radioProps}>
        Radio Tile
      </RadioTile>
      <RadioTile value="default-selected" id="tile-2" {...radioProps}>
        Radio Tile
      </RadioTile>
      <RadioTile value="selected" id="tile-3" {...radioProps}>
        Radio Tile
      </RadioTile>
    </TileGroup>
  );
};

Radio.parameters = {
  info: {
    text: `
         The example below shows a Tile Group component with a default selected Tile.
         Although you can set the checked prop on the Tile, when using the RadioTile component
         as a child of the Tile Group, either set the defaultSelected or valueSelected which will
         automatically set the selected prop on the corresponding RadioTile component.

         Use defaultSelected when you want a tile to be selected initially, but don't need to set it
         at a later time. If you do need to set it dynamically at a later time, then use the valueSelected property instead.

         Use this to select one tile at a time.
      `,
  },
};

export const Expandable = () => (
  <ExpandableTile {...props.expandable()}>
    <TileAboveTheFoldContent>
      <div style={{ height: '200px' }}>Above the fold content here</div>
    </TileAboveTheFoldContent>
    <TileBelowTheFoldContent>
      <div style={{ height: '400px' }}>Below the fold content here</div>
    </TileBelowTheFoldContent>
  </ExpandableTile>
);

Expandable.parameters = {
  info: {
    text: `
        Expandable tile
      `,
  },
};
