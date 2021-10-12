/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tile,
  ClickableTile,
  // SelectableTile,
  // ExpandableTile,
  // TileAboveTheFoldContent,
  // TileBelowTheFoldContent,
} from './Tile';

import Link from '../../Link';
import { render, cleanup, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Tile', () => {
  afterEach(cleanup);

  it('adds extra classes that are passed via className', () => {
    render(
      <Tile className="🚀">
        Default tile
        <br />
        <br />
        <Link href="https://www.carbondesignsystem.com">Link</Link>
      </Tile>
    );

    expect(screen.getByText('Default tile').classList.contains('🚀')).toBe(
      true
    );
  });
});

describe('ClickableTile', () => {
  afterEach(cleanup);

  it('renders with a link', () => {
    render(
      <ClickableTile href="https://www.carbondesignsystem.com">
        Clickable Tile
      </ClickableTile>
    );
    // screen.debug();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('is disabled', () => {
    const onClick = jest.fn();
    render(
      <ClickableTile
        href="https://www.carbondesignsystem.com"
        onClick={() => {}}>
        Clickable Tile
      </ClickableTile>
    );
    // const link = screen.getByText('Clickable Tile');
    // console.log(link);
    // console.log(userEvent.click(link));
    // userEvent.click(notLink);
    expect(onClick).not.toHaveBeenCalled();
  });
});

// disabled: boolean('disabled (disabled)', false),
// href: text(
//   'Href for clickable UI (href)',
//   'https://www.carbondesignsystem.com/'
// ),
// light: boolean('Light variant (light)', false),

// expect(screen.getByText('Default tile')).toBeInTheDocument();

// expect(
//   screen.getByRole('presentation').classList.contains('custom-class')
// ).toBe(true);

// screen.debug();
