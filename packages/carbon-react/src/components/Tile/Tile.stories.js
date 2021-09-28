/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  ClickableTile,
  ExpandableTile,
  Link,
  RadioTile,
  SelectableTile,
  TextInput,
  Tile,
  TileGroup,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from 'carbon-components-react';
import './tile-story.scss';

export default {
  title: 'Components/Tile',
  parameters: {
    component: Tile,
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
  return (
    <Tile>
      Default tile
      <br />
      <br />
      <Link href="https://www.carbondesignsystem.com">Link</Link>
    </Tile>
  );
};

export const Clickable = () => {
  return <ClickableTile>Clickable Tile</ClickableTile>;
};

export const MultiSelect = () => {
  return (
    <div role="group" aria-label="selectable tiles">
      <SelectableTile id="tile-1" name="tiles">
        Option 1
      </SelectableTile>
      <SelectableTile id="tile-2" name="tiles">
        Option 2
      </SelectableTile>
      <SelectableTile id="tile-3" name="tiles">
        Option 3
      </SelectableTile>
    </div>
  );
};

export const Radio = () => {
  return (
    <TileGroup
      defaultSelected="default-selected"
      legend="Radio Tile Group"
      name="radio tile group">
      <RadioTile value="standard" style={{ marginBottom: '.5rem' }}>
        Option 1
      </RadioTile>
      <RadioTile value="default-selected" id="tile-2">
        Option 2
      </RadioTile>
      <RadioTile value="selected" id="tile-3">
        Option 3
      </RadioTile>
    </TileGroup>
  );
};

export const Expandable = () => (
  <ExpandableTile
    tileCollapsedIconText="Interact to Expand tile"
    tileExpandedIconText="Interact to Collapse tile">
    <TileAboveTheFoldContent>
      <div style={{ height: '200px' }}>Above the fold content here</div>
    </TileAboveTheFoldContent>
    <TileBelowTheFoldContent>
      <div style={{ height: '400px' }}>
        Below the fold content here
        <TextInput id="test2" invalidText="A valid value is required" />
      </div>
    </TileBelowTheFoldContent>
  </ExpandableTile>
);
