/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../Button';
import { default as TextInput } from '../TextInput';
import { default as RadioTile } from '../RadioTile';
import {
  ClickableTile,
  ExpandableTile,
  SelectableTile,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '.';
import TileGroup from '../TileGroup/TileGroup';
import { Layer } from '../Layer';
import './tile-story.scss';
import mdx from './ExperimentalTile.mdx';

export default {
  title: 'Experimental/Improved Contrast Tile',
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
};

const experimentalClassname = 'experimental-tile-contrast';

export const Clickable = () => {
  return (
    <div className={experimentalClassname}>
      <ClickableTile
        id="clickable-tile-1"
        href="https://www.carbondesignsystem.com/">
        Clickable Tile
      </ClickableTile>
    </div>
  );
};

export const ClickableWithLayer = () => {
  return (
    <div className={experimentalClassname}>
      <ClickableTile
        id="clickable-tile-1"
        href="https://www.carbondesignsystem.com/">
        First layer
      </ClickableTile>
      <Layer>
        <ClickableTile
          id="clickable-tile-2"
          href="https://www.carbondesignsystem.com/">
          Second layer
        </ClickableTile>
        <Layer>
          <ClickableTile
            id="clickable-tile-3"
            href="https://www.carbondesignsystem.com/">
            Third layer
          </ClickableTile>
        </Layer>
      </Layer>
    </div>
  );
};

export const Selectable = () => {
  return (
    <div className={experimentalClassname}>
      <SelectableTile id="selectable-tile-1" name="tiles" value="selectable">
        Selectable
      </SelectableTile>
    </div>
  );
};

export const MultiSelect = () => {
  return (
    <div
      role="group"
      aria-label="selectable tiles"
      className={experimentalClassname}>
      <SelectableTile id="selectable-tile-1" name="tiles">
        Option 1
      </SelectableTile>
      <SelectableTile id="selectable-tile-2" name="tiles">
        Option 2
      </SelectableTile>
      <SelectableTile id="selectable-tile-3" name="tiles">
        Option 3
      </SelectableTile>
    </div>
  );
};

export const Radio = () => {
  return (
    <div className={experimentalClassname}>
      <TileGroup
        defaultSelected="default-selected"
        legend="Radio Tile Group"
        name="radio tile group">
        <RadioTile
          id="radio-tile-1"
          value="standard"
          style={{ marginBottom: '.5rem' }}>
          Option 1
        </RadioTile>
        <RadioTile
          id="radio-tile-2"
          value="default-selected"
          style={{ marginBottom: '.5rem' }}>
          Option 2
        </RadioTile>
        <RadioTile id="radio-tile-3" value="selected">
          Option 3
        </RadioTile>
      </TileGroup>
    </div>
  );
};

export const RadioWithLayer = () => {
  return (
    <div className={experimentalClassname}>
      <TileGroup
        defaultSelected="default-selected"
        legend="First layer"
        name="radio tile group">
        <RadioTile
          id="radio-tile-1"
          value="standard"
          style={{ marginBottom: '.5rem' }}>
          Option 1
        </RadioTile>
        <RadioTile id="radio-tile-2" value="default-selected">
          Option 2
        </RadioTile>
      </TileGroup>
      <Layer>
        <TileGroup
          defaultSelected="default-selected"
          legend="Second Layer"
          name="radio tile group">
          <RadioTile
            id="radio-tile-3"
            value="standard"
            style={{ marginBottom: '.5rem' }}>
            Option 1
          </RadioTile>
          <RadioTile id="radio-tile-4" value="default-selected">
            Option 2
          </RadioTile>
        </TileGroup>
        <Layer>
          <TileGroup
            defaultSelected="default-selected"
            legend="Third Layer"
            name="radio tile group">
            <RadioTile
              id="radio-tile-5"
              value="standard"
              style={{ marginBottom: '.5rem' }}>
              Option 1
            </RadioTile>
            <RadioTile id="radio-tile-6" value="default-selected">
              Option 2
            </RadioTile>
          </TileGroup>
        </Layer>
      </Layer>
    </div>
  );
};

export const Expandable = () => (
  <div style={{ width: '400px' }} className={experimentalClassname}>
    <ExpandableTile
      id="expandable-tile-1"
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
  <div style={{ width: '400px' }} className={experimentalClassname}>
    <ExpandableTile
      id="expandable-tile-1"
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
    <div style={{ width: '400px' }} className={experimentalClassname}>
      <ExpandableTile
        id="expandable-tile-1"
        tileCollapsedIconText="Interact to Expand tile"
        tileExpandedIconText="Interact to Collapse tile">
        <TileAboveTheFoldContent>
          <div style={{ height: '100px', width: '200px' }}>First layer</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: '200px', width: '200px' }}>
            Below the fold content here
            <Layer>
              <TextInput id="test2" invalidText="A valid value is required" />
            </Layer>
          </div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
      <Layer>
        <ExpandableTile
          id="expandable-tile-2"
          tileCollapsedIconText="Interact to Expand tile"
          tileExpandedIconText="Interact to Collapse tile">
          <TileAboveTheFoldContent>
            <div style={{ height: '100px' }}>Second layer</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div style={{ height: '200px' }}>
              Below the fold content here
              <Layer>
                <TextInput id="test2" invalidText="A valid value is required" />
              </Layer>
            </div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
        <Layer>
          <ExpandableTile
            id="expandable-tile-3"
            tileCollapsedIconText="Interact to Expand tile"
            tileExpandedIconText="Interact to Collapse tile">
            <TileAboveTheFoldContent>
              <div style={{ height: '100px' }}>Third layer</div>
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
              <div style={{ height: '100px' }}>
                Below the fold content here
                <Layer>
                  <TextInput
                    id="test2"
                    invalidText="A valid value is required"
                  />
                </Layer>
              </div>
            </TileBelowTheFoldContent>
          </ExpandableTile>
        </Layer>
      </Layer>
    </div>
  );
};
