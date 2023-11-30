/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './tile-story.scss';
import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import Link from '../Link';
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
} from './';
import TileGroup from '../TileGroup/TileGroup';
import { IconButton } from '../IconButton';
import { Slug, SlugContent, SlugActions } from '../Slug';
import {
  Download,
  View,
  FolderOpen,
  Folders,
  ArrowRight,
} from '@carbon/icons-react';

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
};

export const Default = () => {
  return (
    <Tile id="tile-1">
      Default tile
      <br />
      <br />
      <Link href="https://www.carbondesignsystem.com">Link</Link>
    </Tile>
  );
};

export const SlugTest = (args) => {
  const slug = (
    <Slug className="slug-container">
      <SlugContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h1>84%</h1>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Foundation model</p>
        </div>
        <SlugActions>
          <IconButton kind="ghost" label="View">
            <View />
          </IconButton>
          <IconButton kind="ghost" label="Open Folder">
            <FolderOpen />
          </IconButton>
          <IconButton kind="ghost" label="Folders">
            <Folders />
          </IconButton>
          <Button>View literature</Button>
        </SlugActions>
      </SlugContent>
    </Slug>
  );

  return (
    <div className="slug-tile-container">
      <Tile slug={slug} id="tile-1" {...args}>
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris gravida penatibus.
        </p>
        <div className="ai-data">
          <div className="data-container">
            <p>Data Quality</p>
            <h3>85%</h3>
          </div>
          <div className="data-container">
            <p>Label text</p>
            <h3>16%</h3>
          </div>
        </div>
      </Tile>
      <ClickableTile
        href="https://www.carbondesignsystem.com/"
        slug
        id="tile-click"
        renderIcon={ArrowRight}
        {...args}>
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris gravida penatibus.
        </p>
        <div className="ai-data">
          <div className="data-container">
            <p>Data Quality</p>
            <h3>85%</h3>
          </div>
          <div className="data-container">
            <p>Label text</p>
            <h3>16%</h3>
          </div>
        </div>
      </ClickableTile>
      <SelectableTile
        id="selectable-tile-1"
        name="tiles"
        value="selectable"
        slug={slug}
        {...args}>
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris gravida penatibus.
        </p>
        <div className="ai-data">
          <div className="data-container">
            <p>Data Quality</p>
            <h3>85%</h3>
          </div>
          <div className="data-container">
            <p>Label text</p>
            <h3>16%</h3>
          </div>
        </div>
      </SelectableTile>
      <ExpandableTile
        id="expandable-tile-1"
        tileCollapsedIconText="Interact to Expand tile"
        tileExpandedIconText="Interact to Collapse tile"
        slug={slug}
        {...args}>
        <TileAboveTheFoldContent>
          <h4>Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
            at consectetur turpis mauris gravida penatibus.
          </p>
          <div className="ai-data">
            <div className="data-container">
              <p>Data Quality</p>
              <h3>85%</h3>
            </div>
            <div className="data-container">
              <p>Label text</p>
              <h3>16%</h3>
            </div>
          </div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <h6>Expanded Section</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
            at consectetur turpis mauris.
          </p>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  );
};

SlugTest.argTypes = {
  hasRoundedCorners: {
    control: {
      type: 'boolean',
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  slug: {
    table: {
      disable: true,
    },
  },
};

export const DefaultWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <Tile id={`tile-${layer}`}>
        Default tile
        <br />
        <br />
        <Link href="https://www.carbondesignsystem.com">Link</Link>
      </Tile>
    )}
  </WithLayer>
);

export const Clickable = (args) => {
  return (
    <ClickableTile
      id="clickable-tile-1"
      href="https://www.carbondesignsystem.com/"
      {...args}>
      Clickable Tile
    </ClickableTile>
  );
};

Clickable.args = {
  disabled: false,
};

Clickable.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const ClickableWithCustomIcon = (args) => {
  return (
    <ClickableTile
      id="clickable-tile-1"
      href="https://www.carbondesignsystem.com/"
      renderIcon={Download}
      {...args}>
      Clickable Tile
    </ClickableTile>
  );
};

ClickableWithCustomIcon.args = {
  disabled: false,
};

ClickableWithCustomIcon.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const ClickableWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <ClickableTile
        id={`clickable-tile-${layer}`}
        href="https://www.carbondesignsystem.com/">
        Clickable tile
      </ClickableTile>
    )}
  </WithLayer>
);

export const Selectable = (args) => {
  return (
    <SelectableTile
      id="selectable-tile-1"
      name="tiles"
      value="selectable"
      {...args}>
      Selectable
    </SelectableTile>
  );
};

Selectable.args = {
  disabled: false,
};

Selectable.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const MultiSelect = (args) => {
  return (
    <div role="group" aria-label="selectable tiles">
      <SelectableTile id="selectable-tile-1" name="tiles" {...args}>
        Option 1
      </SelectableTile>
      <SelectableTile id="selectable-tile-2" name="tiles" {...args}>
        Option 2
      </SelectableTile>
      <SelectableTile id="selectable-tile-3" name="tiles" {...args}>
        Option 3
      </SelectableTile>
    </div>
  );
};

MultiSelect.args = {
  disabled: false,
};

MultiSelect.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const Radio = (args) => {
  return (
    <TileGroup
      defaultSelected="default-selected"
      legend="Radio Tile Group"
      name="radio tile group"
      {...args}>
      <RadioTile
        id="radio-tile-1"
        value="standard"
        style={{ marginBottom: '.5rem' }}
        {...args}>
        Option 1
      </RadioTile>
      <RadioTile
        id="radio-tile-2"
        value="default-selected"
        style={{ marginBottom: '.5rem' }}
        {...args}>
        Option 2
      </RadioTile>
      <RadioTile id="radio-tile-3" value="selected" {...args}>
        Option 3
      </RadioTile>
    </TileGroup>
  );
};

Radio.args = {
  disabled: false,
};

Radio.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const RadioWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <TileGroup
        defaultSelected="default-selected"
        legend="Radio Tile Group"
        name={`radio tile group ${layer}`}>
        <RadioTile
          id={`radio-tile-${layer}-1`}
          value="standard"
          style={{ marginBottom: '.5rem' }}>
          Option 1
        </RadioTile>
        <RadioTile id={`radio-tile-${layer}-2`} value="default-selected">
          Option 2
        </RadioTile>
      </TileGroup>
    )}
  </WithLayer>
);

export const Expandable = () => (
  <div style={{ width: '400px' }}>
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
  <div style={{ width: '400px' }}>
    <ExpandableTile
      onClick={() => console.log('click')}
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

export const ExpandableWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: '400px' }}>
        <ExpandableTile
          id={`expandable-tile-${layer}`}
          tileCollapsedIconText="Interact to Expand tile"
          tileExpandedIconText="Interact to Collapse tile">
          <TileAboveTheFoldContent>
            <div style={{ height: '100px' }}>Above the fold content here</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div style={{ height: '200px' }}>Below the fold content here</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      </div>
    )}
  </WithLayer>
);
