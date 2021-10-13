/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tile, ClickableTile, SelectableTile } from './Tile';

import Link from '../../Link';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Default', () => {
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
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});

describe('Multi Select', () => {
  afterEach(cleanup);

  it('does not invoke the click handler if SelectableTile is disabled', () => {
    const onClick = jest.fn();
    render(
      <div role="group" aria-label="selectable tiles">
        <SelectableTile
          id="tile-1"
          name="tiles"
          value="value"
          onClick={onClick}
          disabled>
          <span role="img" aria-label="vertical traffic light">
            🚦
          </span>
        </SelectableTile>
      </div>
    );
    const tile = screen.getByText('🚦');
    userEvent.click(tile);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should cycle elements in document tab order', () => {
    render(
      <div role="group" aria-label="selectable tiles">
        <SelectableTile
          data-testid="element"
          id="tile-1"
          name="tiles"
          value="value">
          tile 1
        </SelectableTile>
        <SelectableTile
          data-testid="element"
          id="tile-2"
          name="tiles"
          value="value">
          tile 2
        </SelectableTile>
        <SelectableTile
          data-testid="element"
          id="tile-3"
          name="tiles"
          value="value">
          tile 3
        </SelectableTile>
      </div>
    );
    const [id1, id2, id3] = screen.getAllByTestId('element');
    expect(document.body).toHaveFocus();

    userEvent.tab();

    expect(id1).toHaveFocus();

    userEvent.tab();

    expect(id2).toHaveFocus();

    userEvent.tab();

    expect(id3).toHaveFocus();

    userEvent.tab();

    // cycle goes back to the body element
    expect(document.body).toHaveFocus();

    userEvent.tab();

    expect(id1).toHaveFocus();
  });
});

// Todo: Testing for a disabled ClickableTile
// Todo: Testing for ExpandableTile
// Todo: Testing for RadioTile
