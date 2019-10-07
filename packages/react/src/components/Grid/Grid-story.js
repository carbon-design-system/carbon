/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  radios as radiosWithoutBooleans,
} from '@storybook/addon-knobs';
import Grid from './Grid';
import { select as selectWithoutUndefined } from '@storybook/addon-knobs';

import './_Grid-story.scss';

const handleBoolStr = str => {
  if (str === 'true') return true;
  if (str === 'false') return false;
  return str;
};

// allow booleans in multi-choice knobs via 'false' or 'true' strings
/** @type {radiosWithoutBooleans} */
const radios = (...params) => handleBoolStr(radiosWithoutBooleans(...params));
// convert empty str from `undefined` return val to undefined
/** @type {selectWithoutUndefined} */
const select = (...params) => selectWithoutUndefined(...params) || undefined;

// add blank (empty space) option to object with an undefined val
const withBlank = arr =>
  arr.reduce(
    (prev, cur) => {
      prev[cur] = cur;
      return prev;
    },
    { [' ']: undefined }
  );

export default {
  component: Grid,
  title: 'Grid',
  decorators: [withKnobs],
};

const VALID_NO_GUTTER_VALS = {
  true: 'true',
  false: 'false',
  left: 'left',
  right: 'right',
};

const propsGrid = () => ({
  className: 'some-class',
  condensed: boolean('condensed', false, 'Grid'),
  fullWidth: boolean('fullWidth', false, 'Grid'),
  noGutter: radios('noGutter', VALID_NO_GUTTER_VALS, 'false', 'Grid'),
});

const propsGridRow = () => ({
  condensed: boolean('condensed', false, 'Grid.Row'),
  noGutter: radios('noGutter', VALID_NO_GUTTER_VALS, 'false', 'Grid.Row'),
});

const propsGridCol = () => ({
  noGutter: radios('noGutter', VALID_NO_GUTTER_VALS, 'false', 'Grid.Col'),
  sm: select(
    'sm',
    withBlank(Grid.getValidColWidths().sm),
    undefined,
    'Grid.Col'
  ),
  md: select(
    'md',
    withBlank(Grid.getValidColWidths().md),
    undefined,
    'Grid.Col'
  ),
  lg: select(
    'lg',
    withBlank(Grid.getValidColWidths().lgPlus),
    undefined,
    'Grid.Col'
  ),
  xlg: select(
    'xlg',
    withBlank(Grid.getValidColWidths().lgPlus),
    undefined,
    'Grid.Col'
  ),
  max: select(
    'max',
    withBlank(Grid.getValidColWidths().lgPlus),
    undefined,
    'Grid.Col'
  ),
  smOffset: select(
    'smOffset',
    withBlank(Grid.getValidColOffsets().sm),
    undefined,
    'Grid.Col'
  ),
  mdOffset: select(
    'mdOffset',
    withBlank(Grid.getValidColOffsets().md),
    undefined,
    'Grid.Col'
  ),
  lgOffset: select(
    'lgOffset',
    withBlank(Grid.getValidColOffsets().lgPlus),
    undefined,
    'Grid.Col'
  ),
  xlgOffset: select(
    'xlgOffset',
    withBlank(Grid.getValidColOffsets().lgPlus),
    undefined,
    'Grid.Col'
  ),
  maxOffset: select(
    'maxOffset',
    withBlank(Grid.getValidColOffsets().lgPlus),
    undefined,
    'Grid.Col'
  ),
});

export const Default = () => (
  <div className="bleed">
    <Grid {...propsGrid()} className="default">
      {/* TODO: implement "legend" to show meaning of colors */}
      {/* <div className='legend'>
      <div className='legend__body' />
      <div className='legend__gutter' />
    </div> */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Grid.Row key={i} {...propsGridRow()}>
          {Array.from({ length: 12 }).map((_, j) => (
            <Grid.Col key={j} {...propsGridCol()}>
              <div class="outside">
                <div class="inside">
                  <code>
                    Row {i + 1}
                    <br />
                    Col {j + 1}
                  </code>
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid.Row>
      ))}
    </Grid>
  </div>
);

export const offset = () => (
  <Grid>
    {Array.from({ length: 12 }).map((_, i) => {
      const offset = 11 - i;
      const span = 12 - offset;
      return (
        <Grid.Row key={i}>
          <Grid.Col className={`bx--offset-lg-${offset} bx--col-lg-${span}`}>
            <div className="outside">
              <div className="inside">{span}</div>
            </div>
          </Grid.Col>
        </Grid.Row>
      );
    })}
  </Grid>
);
