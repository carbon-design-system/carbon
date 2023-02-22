/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from './Tile';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Link from '../Link';

const prefix = 'cds';

describe('Tile', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(<Tile carbon-name="test">Default tile</Tile>);
      expect(screen.getByText('Default tile')).toHaveAttribute('carbon-name');
    });

    it('should render children as expected', () => {
      render(
        <Tile data-testid="test-id">
          Default tile
          <br data-testid="br-test-id" />
          <br data-testid="br-test-id" />
          <Link href="https://www.carbondesignsystem.com">Link</Link>
        </Tile>
      );
      expect(screen.getByText('Default tile')).toBeTruthy();
      expect(screen.getByText('Link')).toBeTruthy();
      expect(screen.getAllByTestId('br-test-id').length).toEqual(2);
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(<Tile className="custom-tile-class">Default tile</Tile>);
      expect(screen.getByText('Default tile')).toHaveClass('custom-tile-class');
    });
  });

  describe('ClickableTile', () => {
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
    it('does not invoke the click handler if SelectableTile is disabled', () => {
      const onClick = jest.fn();
      render(
        <div role="group" aria-label="selectable tiles">
          <SelectableTile
            disabled
            id="tile-1"
            name="tiles"
            onClick={onClick}
            value="value">
            <span role="img" aria-label="vertical traffic light">
              🚦
            </span>
          </SelectableTile>
        </div>
      );
      userEvent.click(screen.getByText('🚦'));
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

  describe('ExpandableTile', () => {
    it('renders initial children as expected', () => {
      const onClick = jest.fn();
      render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(screen.getByText('TestAbove')).toBeTruthy();
      expect(screen.getByText('TestBelow')).toBeTruthy();
    });

    it('has the expected classes', () => {
      render(<ExpandableTile className="extra-class" />);
      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--tile--expandable`
      );
      expect(screen.getByRole('button')).toHaveClass(`extra-class`);
    });

    it('toggles the expandable class on click', () => {
      const onClick = jest.fn();
      render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(screen.getByRole('button')).not.toHaveClass(
        `${prefix}--tile--is-expanded`
      );
      const tile = screen.getByText('TestAbove');
      userEvent.click(tile);
      expect(onClick).toHaveBeenCalled();
      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--tile--is-expanded`
      );
    });

    it('contains the default tooltip for the button', async () => {
      render(
        <ExpandableTile>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      const expandableTile = screen.getByRole('button');
      expect(expandableTile.getAttribute('title')).toEqual(
        'Interact to expand Tile'
      );
      userEvent.click(expandableTile);
      expect(expandableTile.getAttribute('title')).toEqual(
        'Interact to collapse Tile'
      );
    });

    it('displays the custom tooltips for the button depending on state', () => {
      render(
        <ExpandableTile
          tileCollapsedIconText={'Click To Expand'}
          tileExpandedIconText={'Click To Collapse'}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const expandableTile = screen.getByRole('button');
      expect(expandableTile.getAttribute('title')).toEqual('Click To Expand');
      userEvent.click(expandableTile);
      expect(expandableTile.getAttribute('title')).toEqual('Click To Collapse');
    });

    it('supports setting expanded prop to true', () => {
      render(
        <ExpandableTile expanded>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--tile--is-expanded`
      );
    });

    it('supports setting expanded prop to false', () => {
      render(
        <ExpandableTile expanded={false}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(screen.getByRole('button')).not.toHaveClass(
        `${prefix}--tile--is-expanded`
      );
    });
  });

  // Todo: Testing for a disabled ClickableTile
  // Todo: Testing for ExpandableTile
  // Todo: Testing for RadioTile
});
