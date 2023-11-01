/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tile } from '../Tile';
import { TextInput } from '../TextInput';
import './linear-gradient-story.scss';

export default {
  title: 'Experimental/unstable__LinearGradient',
  component: Tile,
};

export const Demo = () => (
  <>
    <div className="gradient-container">
      <Tile className="top">Top</Tile>
      <Tile className="right">Right</Tile>
      <Tile className="bottom">Bottom</Tile>
      <Tile className="left">Left</Tile>
    </div>
    <br />
    <br />
    <div className="gradient-container">
      <TextInput labelText="Full width" className="full-width" />
      <TextInput labelText="Half width" className="half-width" />
      <TextInput labelText="Third width" className="third-width" />
      <TextInput labelText="Quarter width" className="quarter-width" />
    </div>
  </>
);
