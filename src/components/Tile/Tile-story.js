import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '../Tile';

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
    'Selectable',
    `
      Selectable tile
    `,
    () => (
      <SelectableTile id="tile-1" name="tiles">
        Selectable Tile
      </SelectableTile>
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
