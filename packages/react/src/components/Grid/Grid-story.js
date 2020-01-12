/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withKnobs, boolean, select, color } from '@storybook/addon-knobs';
import Grid from './Grid';

import { blue, gray } from '@carbon/colors';
import './_Grid-story.scss';

const handleUndefStr = str => {
  if (str === 'undefined') return undefined;
  return str;
};

// convert empty str from `undefined` return val to undefined
/** @type {select} */
const selectWithUndef = (...params) => handleUndefStr(select(...params));

// add blank (empty space) option to object with an undefined val
const withBlank = arr =>
  arr.reduce(
    (prev, cur) => {
      prev[cur] = cur;
      return prev;
    },
    { [' ']: 'undefined' }
  );

export default {
  component: Grid,
  title: 'Grid',
  decorators: [withKnobs],
  parameters: {
    info: {
      // text: ``, // TODO: add detail, particularly a legend
      header: false, // rm silly look when no source
      source: false, // really messy with many `undefined`s and too many divs
    },
  },
};

const propsGrid = () => ({
  condensed: boolean('condensed', false, 'Grid'),
  fullWidth: boolean('fullWidth', false, 'Grid'),
});

const propsGridRow = () => ({
  condensed: boolean('condensed', false, 'Grid.Row'),
});

const propsGridCol = () => ({
  sm: selectWithUndef(
    'sm',
    withBlank(Grid.getValidColWidths().sm),
    'undefined',
    'Grid.Col'
  ),
  md: selectWithUndef(
    'md',
    withBlank(Grid.getValidColWidths().md),
    'undefined',
    'Grid.Col'
  ),
  lg: selectWithUndef(
    'lg',
    withBlank(Grid.getValidColWidths().lgPlus),
    'undefined',
    'Grid.Col'
  ),
  xlg: selectWithUndef(
    'xlg',
    withBlank(Grid.getValidColWidths().lgPlus),
    'undefined',
    'Grid.Col'
  ),
  max: selectWithUndef(
    'max',
    withBlank(Grid.getValidColWidths().lgPlus),
    'undefined',
    'Grid.Col'
  ),
  smOffset: select('smOffset', Grid.getValidColOffsets().sm, 0, 'Grid.Col'),
  mdOffset: select('mdOffset', Grid.getValidColOffsets().md, 0, 'Grid.Col'),
  lgOffset: select('lgOffset', Grid.getValidColOffsets().lgPlus, 0, 'Grid.Col'),
  xlgOffset: select(
    'xlgOffset',
    Grid.getValidColOffsets().lgPlus,
    0,
    'Grid.Col'
  ),
  maxOffset: select(
    'maxOffset',
    Grid.getValidColOffsets().lgPlus,
    0,
    'Grid.Col'
  ),
});

const colors = () => ({
  cell: color('cell (blue 10)', blue[10], 'colors'),
  margin: color('margin (blue 20)', blue[20], 'colors'),
  dividers: color('dividers (blue 40)', blue[40], 'colors'),
  padding: color('padding (blue 40)', blue[40], 'colors'),
  bleed: color('bleed (gray 100)', gray[100], 'colors'),
});

export const Default = () => (
  <div style={{ backgroundColor: colors().bleed }}>
    <Grid {...propsGrid()} style={{ backgroundColor: colors().padding }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Grid.Row key={i} {...propsGridRow()}>
          {Array.from({ length: 12 }).map((_, j) => (
            <Grid.Col
              key={j}
              {...propsGridCol()}
              style={{
                outline: '1px dashed ' + colors().dividers,
                backgroundColor: colors().margin,
              }}>
              <div className="outside">
                <div
                  className="inside"
                  style={{ backgroundColor: colors().cell }}>
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

const breakpoint = () =>
  select('breakpoint', ['sm', 'md', 'lg', 'xlg', 'max'], 'lg');

export const offsets = () => (
  <div style={{ backgroundColor: colors().bleed }}>
    <Grid style={{ backgroundColor: colors().padding }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const offset = 11 - i;
        const span = 12 - offset;
        return (
          <Grid.Row key={i}>
            <Grid.Col
              className={`bx--offset-${breakpoint()}-${offset} bx--col-${breakpoint()}-${span}`}
              style={{
                outline: '1px dashed ' + colors().dividers,
                backgroundColor: colors().margin,
              }}>
              <div className="outside">
                <div
                  className="inside"
                  style={{ backgroundColor: colors().cell }}>
                  {span}
                </div>
              </div>
            </Grid.Col>
          </Grid.Row>
        );
      })}
    </Grid>
  </div>
);
