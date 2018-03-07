import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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

storiesOf('Tile', module)
  .addWithInfo(
    'Default',
    `
      Default tile without any interactions
    `,
    () => <Tile>Default tile</Tile>
  )
  .addWithInfo(
    'Clickable',
    `
      Clickable tile
    `,
    () => <ClickableTile>Clickable Tile</ClickableTile>
  )
  .addWithInfo(
    'Multi-select',
    `
      Selectable tile

      Use this to select multiple tiles.
    `,
    () => (
      <div>
        <SelectableTile id="tile-1" name="tiles">
          Multi-select Tile
        </SelectableTile>
        <SelectableTile id="tile-1" name="tiles">
          Multi-select Tile
        </SelectableTile>
        <SelectableTile id="tile-1" name="tiles">
          Multi-select Tile
        </SelectableTile>
      </div>
    )
  )
  .addWithInfo(
    'Selectable',
    `
         The example below shows a Tile Group component with a default selected Tile.
         Although you can set the checked prop on the Tile, when using the RadioTile component
         as a child of the Tile Group, either set the defaultSelected or valueSelected which will
         automatically set the selected prop on the corresponding RadioTile component.

         Use defaultSelected when you want a tile to be selected initially, but don't need to set it
         at a later time. If you do need to set it dynamically at a later time, then use the valueSelected property instead.

         Use this to select one tile at a time.
      `,
    () => (
      <TileGroup
        onChange={action('onChange')}
        name="tile-group"
        defaultSelected="default-selected"
        legend="Selectable Tile Group">
        <RadioTile value="standard" id="tile-1" labelText="Selectable Tile">
          Selectable Tile
        </RadioTile>
        <RadioTile
          value="default-selected"
          labelText="Default selected tile"
          id="tile-2">
          Selectable Tile
        </RadioTile>
        <RadioTile value="selected" labelText="Selectable Tile" id="tile-3">
          Selectable Tile
        </RadioTile>
      </TileGroup>
    )
  )
  .addWithInfo(
    'Expandable',
    `
      Expandable tile
    `,
    () => (
      <ExpandableTile>
        <TileAboveTheFoldContent>
          <div style={{ height: '200px' }}>Above the fold content here</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: '400px' }}>Below the fold content here</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    )
  );
