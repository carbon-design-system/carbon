/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../../Link';
import Button from '../../Button';
import { default as TextInput } from '../../TextInput';
import { default as RadioTile } from '../../RadioTile';
import {
  ClickableTile,
  ExpandableTile,
  SelectableTile,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '../';
import TileGroup from '../../TileGroup/TileGroup';
import { Layer } from '../../Layer';
import './tile-story.scss';
import mdx from '../Tile.mdx';

export default {
  title: 'Components/Tile',
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
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
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

export const DefaultWithLayer = () => {
  return (
    <>
      <Tile>
        First layer
        <br />
        <br />
        <Link href="https://www.carbondesignsystem.com">Link</Link>
      </Tile>
      <Layer>
        <Tile>
          Second layer
          <br />
          <br />
          <Link href="https://www.carbondesignsystem.com">Link</Link>
        </Tile>
        <Layer>
          <Tile>
            Third layer
            <br />
            <br />
            <Link href="https://www.carbondesignsystem.com">Link</Link>
          </Tile>
        </Layer>
      </Layer>
    </>
  );
};

export const Clickable = () => {
  return (
    <ClickableTile href="https://www.carbondesignsystem.com/">
      Clickable Tile
    </ClickableTile>
  );
};

export const ClickableWithLayer = () => {
  return (
    <>
      <ClickableTile href="https://www.carbondesignsystem.com/">
        First layer
      </ClickableTile>
      <Layer>
        <ClickableTile href="https://www.carbondesignsystem.com/">
          Second layer
        </ClickableTile>
        <Layer>
          <ClickableTile href="https://www.carbondesignsystem.com/">
            Third layer
          </ClickableTile>
        </Layer>
      </Layer>
    </>
  );
};

export const Selectable = () => {
  return (
    <SelectableTile id="tile-1" name="tiles">
      Selectable
    </SelectableTile>
  );
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
      <RadioTile
        value="default-selected"
        id="tile-2"
        style={{ marginBottom: '.5rem' }}>
        Option 2
      </RadioTile>
      <RadioTile value="selected" id="tile-3">
        Option 3
      </RadioTile>
    </TileGroup>
  );
};

export const RadioWithLayer = () => {
  return (
    <>
      <TileGroup
        defaultSelected="default-selected"
        legend="First layer"
        name="radio tile group">
        <RadioTile value="standard" style={{ marginBottom: '.5rem' }}>
          Option 1
        </RadioTile>
        <RadioTile value="default-selected" id="tile-2">
          Option 2
        </RadioTile>
      </TileGroup>
      <Layer>
        <TileGroup
          defaultSelected="default-selected"
          legend="Second Layer"
          name="radio tile group">
          <RadioTile value="standard" style={{ marginBottom: '.5rem' }}>
            Option 1
          </RadioTile>
          <RadioTile value="default-selected" id="tile-2">
            Option 2
          </RadioTile>
        </TileGroup>
        <Layer>
          <TileGroup
            defaultSelected="default-selected"
            legend="Third Layer"
            name="radio tile group">
            <RadioTile value="standard" style={{ marginBottom: '.5rem' }}>
              Option 1
            </RadioTile>
            <RadioTile value="default-selected" id="tile-2">
              Option 2
            </RadioTile>
          </TileGroup>
        </Layer>
      </Layer>
    </>
  );
};

export const Expandable = () => (
  <div style={{ width: '400px' }}>
    <ExpandableTile
      tileCollapsedIconText="Interact to Expand tile"
      tileExpandedIconText="Interact to Collapse tile">
      <TileAboveTheFoldContent>
        <div style={{ height: '200px' }}>Above the fold content here</div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <div style={{ height: '400px' }}>Below the fold content here</div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  </div>
);

export const ExpandableWithInteractive = () => (
  <div style={{ width: '400px' }}>
    <ExpandableTile
      tileCollapsedIconText="Interact to Expand tile"
      tileExpandedIconText="Interact to Collapse tile">
      <TileAboveTheFoldContent>
        <div style={{ height: '200px', width: '200px' }}>
          Above the fold content here
          <div style={{ paddingTop: '1rem' }}>
            <Button>Example</Button>
          </div>
        </div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <div style={{ height: '200px', width: '200px' }}>
          Below the fold content here
          <TextInput id="test2" invalidText="A valid value is required" />
        </div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  </div>
);

export const ExpandableWithLayer = () => {
  return (
    <div style={{ width: '400px' }}>
      <ExpandableTile
        tileCollapsedIconText="Interact to Expand tile"
        tileExpandedIconText="Interact to Collapse tile">
        <TileAboveTheFoldContent>
          <div style={{ height: '100px', width: '200px' }}>First layer</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: '200px', width: '200px' }}>
            Below the fold content here
            <TextInput id="test2" invalidText="A valid value is required" />
          </div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
      <Layer>
        <ExpandableTile
          tileCollapsedIconText="Interact to Expand tile"
          tileExpandedIconText="Interact to Collapse tile">
          <TileAboveTheFoldContent>
            <div style={{ height: '100px' }}>Second layer</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div style={{ height: '200px' }}>
              Below the fold content here
              <TextInput id="test2" invalidText="A valid value is required" />
            </div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
        <Layer>
          <ExpandableTile
            tileCollapsedIconText="Interact to Expand tile"
            tileExpandedIconText="Interact to Collapse tile">
            <TileAboveTheFoldContent>
              <div style={{ height: '100px' }}>Third layer</div>
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
              <div style={{ height: '100px' }}>
                Below the fold content here
                <TextInput id="test2" invalidText="A valid value is required" />
              </div>
            </TileBelowTheFoldContent>
          </ExpandableTile>
        </Layer>
      </Layer>
    </div>
  );
};
