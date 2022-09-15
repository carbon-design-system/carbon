/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXTile from 'carbon-web-components/es/components-react/tile/tile';
// @ts-ignore
import BXClickableTile from 'carbon-web-components/es/components-react/tile/clickable-tile';
// @ts-ignore
import BXRadioTile from 'carbon-web-components/es/components-react/tile/radio-tile';
// @ts-ignore
import BXSelectableTile from 'carbon-web-components/es/components-react/tile/selectable-tile';
// @ts-ignore
import BXExpandableTile from 'carbon-web-components/es/components-react/tile/expandable-tile';
import createReactCustomElementType from '../../globals/wrappers/createReactCustomElementType';
import baseStory, {
  Default as baseDefault,
  clickable as baseClickable,
  singleSelectable as baseSingleSelectable,
  multiSelectable as baseMultiSelectable,
  expandable as baseExpandable,
} from './tile-story';

const BXTileAboveTheFoldContent = createReactCustomElementType('bx-tile-above-the-fold-content', {});
const BXTileBelowTheFoldContent = createReactCustomElementType('bx-tile-below-the-fold-content', {});

export const Default = args => {
  const { colorScheme } = args?.['bx-tile'] ?? {};
  return <BXTile colorScheme={colorScheme}>Default tile</BXTile>;
};

Object.assign(Default, baseDefault);

export const clickable = args => {
  const { colorScheme, href } = args?.['bx-clickable-tile'];
  return (
    <BXClickableTile colorScheme={colorScheme} href={href}>
      Clickable tile
    </BXClickableTile>
  );
};

Object.assign(clickable, baseClickable);

export const singleSelectable = args => {
  const { checkmarkLabel, colorScheme, name, value, onInput } = args?.['bx-radio-tile'];
  return (
    <fieldset>
      <legend>Single-select tiles</legend>
      <BXRadioTile checkmarkLabel={checkmarkLabel} colorScheme={colorScheme} name={name} value={value} onInput={onInput}>
        Single-select Tile
      </BXRadioTile>
      <BXRadioTile checkmarkLabel={checkmarkLabel} colorScheme={colorScheme} name={name} value={value} onInput={onInput}>
        Single-select Tile
      </BXRadioTile>
      <BXRadioTile checkmarkLabel={checkmarkLabel} colorScheme={colorScheme} name={name} value={value} onInput={onInput}>
        Single-select Tile
      </BXRadioTile>
    </fieldset>
  );
};

Object.assign(singleSelectable, baseSingleSelectable);

export const multiSelectable = args => {
  const { checkmarkLabel, colorScheme, name, selected, value, onInput } = args?.['bx-selectable-tile'];
  return (
    <BXSelectableTile
      checkmarkLabel={checkmarkLabel}
      colorScheme={colorScheme}
      name={name}
      selected={selected}
      value={value}
      onInput={onInput}>
      Multi-select Tile
    </BXSelectableTile>
  );
};

Object.assign(multiSelectable, baseMultiSelectable);

export const expandable = args => {
  const { colorScheme, expanded, disableChange, onBeforeChange, onChange } = args?.['bx-expandable-tile'];
  const handleBeforeChanged = (event: CustomEvent) => {
    onBeforeChange(event);
    if (disableChange) {
      event.preventDefault();
    }
  };
  return (
    <BXExpandableTile colorScheme={colorScheme} expanded={expanded} onBeforeChange={handleBeforeChanged} onChange={onChange}>
      <BXTileAboveTheFoldContent slot="above-the-fold-content" style={{ height: '200px' }}>
        Above the fold content here
      </BXTileAboveTheFoldContent>
      <BXTileBelowTheFoldContent style={{ height: '300px' }}>Below the fold content here</BXTileBelowTheFoldContent>
    </BXExpandableTile>
  );
};

Object.assign(expandable, baseExpandable);

// Creating a shallow clone with spread operator seems to cause
// `Cannot read property 'name' of undefined` error in `@storybook/source-loader`
export default { ...baseStory, decorators: [story => <div>{story()}</div>] };
