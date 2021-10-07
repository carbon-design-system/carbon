/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tile,
  // ClickableTile,
  // SelectableTile,
  // ExpandableTile,
  // TileAboveTheFoldContent,
  // TileBelowTheFoldContent,
} from './Tile';

import Link from '../../Link';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Tile', () => {
  afterEach(cleanup);

  it('should render', () => {
    render(
      <Tile>
        Default tile
        <br />
        <br />
        <Link href="https://www.carbondesignsystem.com">Link</Link>
      </Tile>
    );

    screen.debug();
    expect(screen.getByText('Default tile')).toBeInTheDocument();
  });
});
