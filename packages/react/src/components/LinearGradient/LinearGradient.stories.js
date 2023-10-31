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
      <Tile>Default tile</Tile>
      <Tile>Default tile</Tile>
      <Tile>Default tile</Tile>
      <Tile>Default tile</Tile>
    </div>
    <br />
    <br />
    <div className="gradient-container">
      <TextInput />
      <TextInput />
      <TextInput />
      <TextInput />
    </div>
  </>
);
