/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './tile-story.scss';
import '../AILabel/ailabel-story.scss';
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
import { TileGroup } from '../TileGroup';
import {
  Launch,
  ArrowRight,
  View,
  FolderOpen,
  Folders,
} from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { action } from 'storybook/actions';

import mdx from './Tile.mdx';

const tileArgs = {
  light: false,
  onClick: action('onClick'),
};

const tileArgTypes = {
  light: {
    control: 'boolean',
  },
  onClick: {
    action: 'onClick',
  },
};

const tileControls = Object.keys(tileArgTypes);

const clickableArgs = {
  clicked: false,
  disabled: false,
  href: 'https://www.carbondesignsystem.com/',
  light: false,
  rel: '',
  title: '',
  onClick: action('onClick'),
  onKeyDown: action('onKeyDown'),
};

const clickableArgTypes = {
  clicked: {
    control: 'boolean',
  },
  disabled: {
    control: 'boolean',
  },
  href: {
    control: 'text',
  },
  light: {
    control: 'boolean',
  },
  rel: {
    control: 'text',
  },
  title: {
    control: 'text',
  },
  onClick: {
    action: 'onClick',
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
};

const clickableControls = Object.keys(clickableArgTypes);

const selectableArgs = {
  disabled: false,
  light: false,
  selected: false,
  tabIndex: 0,
  title: 'Selectable tile',
  onChange: action('onChange'),
  onClick: action('onClick'),
  onKeyDown: action('onKeyDown'),
};

const selectableArgTypes = {
  disabled: {
    control: 'boolean',
  },
  light: {
    control: 'boolean',
  },
  selected: {
    control: 'boolean',
  },
  tabIndex: {
    control: 'number',
  },
  title: {
    control: 'text',
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
};

const selectableControls = Object.keys(selectableArgTypes);

const radioArgs = {
  disabled: false,
  legend: 'Radio Tile Group',
  name: 'radio tile group',
  required: false,
  valueSelected: 'default-selected',
  onChange: action('onChange'),
};

const radioArgTypes = {
  disabled: {
    control: 'boolean',
  },
  legend: {
    control: 'text',
  },
  name: {
    control: 'text',
  },
  required: {
    control: 'boolean',
  },
  valueSelected: {
    control: 'select',
    options: ['standard', 'default-selected', 'selected'],
  },
  onChange: {
    action: 'onChange',
  },
};

const radioControls = Object.keys(radioArgTypes);

const expandableArgs = {
  expanded: false,
  light: false,
  tileCollapsedIconText: 'Interact to expand tile',
  tileCollapsedLabel: '',
  tileExpandedIconText: 'Interact to collapse tile',
  tileExpandedLabel: '',
  tileMaxHeight: 0,
  tilePadding: 0,
  onClick: action('onClick'),
  onKeyUp: action('onKeyUp'),
};

const expandableArgTypes = {
  expanded: {
    control: 'boolean',
  },
  light: {
    control: 'boolean',
  },
  tileCollapsedIconText: {
    control: 'text',
  },
  tileCollapsedLabel: {
    control: 'text',
  },
  tileExpandedIconText: {
    control: 'text',
  },
  tileExpandedLabel: {
    control: 'text',
  },
  tileMaxHeight: {
    control: 'number',
  },
  tilePadding: {
    control: 'number',
  },
  onClick: {
    action: 'onClick',
  },
  onKeyUp: {
    action: 'onKeyUp',
  },
};

const expandableControls = Object.keys(expandableArgTypes);

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
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <Tile id="tile-1" {...args}>
      Default tile
      <br />
      <br />
      <Link href="https://www.carbondesignsystem.com">Link</Link>
    </Tile>
  );
};

Default.args = {
  ...tileArgs,
};

Default.argTypes = tileArgTypes;

Default.parameters = {
  controls: {
    include: tileControls,
  },
};

export const DefaultWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <Tile id={`tile-${layer}`} {...args}>
        Default tile
        <br />
        <br />
        <Link href="https://www.carbondesignsystem.com">Link</Link>
      </Tile>
    )}
  </WithLayer>
);

DefaultWithLayer.args = {
  ...tileArgs,
};

DefaultWithLayer.argTypes = tileArgTypes;

DefaultWithLayer.parameters = {
  controls: {
    include: tileControls,
  },
};

export const Clickable = (args) => {
  return (
    <ClickableTile id="clickable-tile-1" {...args}>
      Clickable Tile
    </ClickableTile>
  );
};

Clickable.args = {
  ...clickableArgs,
};

Clickable.argTypes = clickableArgTypes;

Clickable.parameters = {
  controls: {
    include: clickableControls,
  },
};

export const ClickableWithCustomIcon = (args) => {
  return (
    <ClickableTile id="clickable-tile-1" renderIcon={Launch} {...args}>
      Clickable Tile
    </ClickableTile>
  );
};

ClickableWithCustomIcon.args = {
  ...clickableArgs,
};

ClickableWithCustomIcon.argTypes = clickableArgTypes;

ClickableWithCustomIcon.parameters = {
  controls: {
    include: clickableControls,
  },
};

export const ClickableWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <ClickableTile id={`clickable-tile-${layer}`} {...args}>
        Clickable tile
      </ClickableTile>
    )}
  </WithLayer>
);

ClickableWithLayer.args = {
  ...clickableArgs,
};

ClickableWithLayer.argTypes = clickableArgTypes;

ClickableWithLayer.parameters = {
  controls: {
    include: clickableControls,
  },
};

export const Selectable = (args) => {
  return (
    <SelectableTile id="selectable-tile-1" {...args}>
      Selectable
    </SelectableTile>
  );
};

Selectable.args = {
  ...selectableArgs,
};

Selectable.argTypes = selectableArgTypes;

Selectable.parameters = {
  controls: {
    include: selectableControls,
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
  ...selectableArgs,
};

MultiSelect.argTypes = selectableArgTypes;

MultiSelect.parameters = {
  controls: {
    include: selectableControls,
  },
};

export const Radio = (args) => {
  return (
    <TileGroup {...args}>
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
  );
};

Radio.args = {
  ...radioArgs,
};

Radio.argTypes = radioArgTypes;

Radio.parameters = {
  controls: {
    include: radioControls,
  },
};

export const RadioWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <TileGroup {...args}>
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

RadioWithLayer.args = {
  ...radioArgs,
};

RadioWithLayer.argTypes = {
  ...radioArgTypes,
  valueSelected: {
    ...radioArgTypes.valueSelected,
    options: ['standard', 'default-selected'],
  },
};

RadioWithLayer.parameters = {
  controls: {
    include: radioControls,
  },
};

export const Expandable = (args) => {
  return (
    <div style={{ width: '400px' }}>
      <ExpandableTile id="expandable-tile-1" {...args}>
        <TileAboveTheFoldContent>
          <div style={{ height: '200px' }}>Above the fold content here</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: '400px' }}>Below the fold content here</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  );
};

Expandable.args = {
  ...expandableArgs,
};

Expandable.argTypes = expandableArgTypes;

Expandable.parameters = {
  controls: {
    include: expandableControls,
  },
};

export const ExpandableWithInteractive = (args) => {
  return (
    <div style={{ width: '400px' }}>
      <ExpandableTile id="expandable-tile-1" {...args}>
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
};

ExpandableWithInteractive.args = {
  ...expandableArgs,
};

ExpandableWithInteractive.argTypes = expandableArgTypes;

ExpandableWithInteractive.parameters = {
  controls: {
    include: expandableControls,
  },
};

export const ExpandableWithLayer = (args) => {
  return (
    <WithLayer>
      {(layer) => (
        <div style={{ width: '400px' }}>
          <ExpandableTile id={`expandable-tile-${layer}`} {...args}>
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
};

ExpandableWithLayer.args = {
  ...expandableArgs,
};

ExpandableWithLayer.argTypes = expandableArgTypes;

ExpandableWithLayer.parameters = {
  controls: {
    include: expandableControls,
  },
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = {
  args: {
    hasRoundedCorners: false,
  },
  argTypes: {
    hasRoundedCorners: {
      control: 'boolean',
    },
  },
  parameters: {
    controls: {
      include: ['hasRoundedCorners'],
    },
  },
  render: (args) => (
    <>
      <div className="ai-label-tile-container">
        <Tile decorator={aiLabel} id="tile-1" {...args}>
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
        </Tile>
        <ClickableTile
          href="https://www.carbondesignsystem.com/"
          decorator
          id="tile-click"
          renderIcon={ArrowRight}
          {...args}>
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
        </ClickableTile>

        <ExpandableTile
          id="expandable-tile-1"
          tileCollapsedIconText="Interact to Expand tile"
          tileExpandedIconText="Interact to Collapse tile"
          decorator={aiLabel}
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

      <div className="ai-label-selectable-tile-container">
        <TileGroup
          defaultSelected="default-selected"
          legend="Selectable Tile Group"
          name="selectable tile group"
          {...args}>
          <div>
            <SelectableTile
              className="ai-label-selectable-tile"
              id="selectable-tile-1"
              decorator={aiLabel}
              {...args}>
              Option 1
            </SelectableTile>
          </div>
          <div>
            <SelectableTile
              className="ai-label-selectable-tile"
              decorator={aiLabel}
              id="selectable-tile-2"
              {...args}>
              Option 2
            </SelectableTile>
          </div>
          <div>
            <SelectableTile
              className="ai-label-selectable-tile"
              decorator={aiLabel}
              id="selectable-tile-3"
              {...args}>
              Option 3
            </SelectableTile>
          </div>
        </TileGroup>
      </div>
      <br />
      <br />
      <div className="ai-label-selectable-tile-container">
        <TileGroup
          defaultSelected="default-selected"
          legend="Radio Tile Group"
          name="radio tile group"
          {...args}>
          <RadioTile
            className="ai-label-radio-tile"
            id="radio-tile-1"
            value="standard"
            decorator={aiLabel}
            {...args}>
            Option 1
          </RadioTile>
          <RadioTile
            className="ai-label-radio-tile"
            id="radio-tile-2"
            value="default-selected"
            decorator={aiLabel}
            {...args}>
            Option 2
          </RadioTile>
          <RadioTile
            className="ai-label-radio-tile"
            id="radio-tile-3"
            value="selected"
            decorator={aiLabel}
            {...args}>
            Option 3
          </RadioTile>
        </TileGroup>
        <br />
      </div>
    </>
  ),
};
