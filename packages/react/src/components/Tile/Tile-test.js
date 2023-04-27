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
      expect(screen.getByText('Default tile')).toBeInTheDocument();
      expect(screen.getByText('Link')).toBeInTheDocument();
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
    it('does not invoke the click handler if ClickableTile is disabled', () => {
      const onClick = jest.fn();
      render(
        <ClickableTile
          onClick={onClick}
          disabled
          href="https://www.carbondesignsystem.com">
          🚦
        </ClickableTile>
      );
      userEvent.click(screen.getByText('🚦'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Multi Select', () => {
    it('does not invoke the click handler if SelectableTile is disabled', async () => {
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
      await userEvent.click(screen.getByText('🚦'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should cycle elements in document tab order', async () => {
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

      await userEvent.tab();

      expect(id1).toHaveFocus();

      await userEvent.tab();

      expect(id2).toHaveFocus();

      await userEvent.tab();

      expect(id3).toHaveFocus();

      await userEvent.tab();

      // cycle goes back to the body element
      expect(document.body).toHaveFocus();

      await userEvent.tab();

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
      expect(screen.getByText('TestAbove')).toBeInTheDocument();
      expect(screen.getByText('TestBelow')).toBeInTheDocument();
    });

    it('has the expected classes', () => {
      render(<ExpandableTile className="extra-class" />);
      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--tile--expandable`
      );
      expect(screen.getByRole('button')).toHaveClass(`extra-class`);
    });

    it('toggles the expandable class on click', async () => {
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
      await userEvent.click(tile);
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
      expect(expandableTile).toHaveAttribute(
        'title',
        'Interact to expand Tile'
      );
      await userEvent.click(expandableTile);
      expect(expandableTile).toHaveAttribute(
        'title',
        'Interact to collapse Tile'
      );
    });

    it('displays the custom tooltips for the button depending on state', async () => {
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
      expect(expandableTile).toHaveAttribute('title', 'Click To Expand');
      await userEvent.click(expandableTile);
      expect(expandableTile).toHaveAttribute('title', 'Click To Collapse');
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
});
