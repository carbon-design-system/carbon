/**
 * Copyright IBM Corp. 2022
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
import { cleanup, render, screen } from '@testing-library/react';
import Link from '../Link';

describe('Tile', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<Tile data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render children as expected', () => {
      const component = (
        <Tile>
          Default tile
          <br />
          <br />
          <Link href="https://www.carbondesignsystem.com">Link</Link>
        </Tile>
      );
      const { container } = render(component);
      expect(screen.getByText('Default tile')).toBeTruthy();
      expect(screen.getByText('Link')).toBeTruthy();
      expect(container.querySelectorAll('br').length).toEqual(2);
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<Tile className="custom-tile-class" />);

      expect(container.firstChild).toHaveClass('custom-tile-class');
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

  describe('ExpandableTile', () => {
    afterEach(cleanup);
    const onClick = jest.fn();
    const component = (
      <ExpandableTile className="extra-class" onClick={onClick}>
        <TileAboveTheFoldContent>
          <div style={{ height: '200px' }}>TestAbove</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: '500px' }}>TestBelow</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );

    it('renders initial children as expected', () => {
      render(component);
      expect(screen.getByText('TestAbove')).toBeTruthy();
      expect(screen.getByText('TestBelow')).toBeTruthy();
    });

    it('has the expected classes', () => {
      const { container } = render(component);
      expect(container.querySelector(`.cds--tile--expandable`)).toBeTruthy();
    });

    it('renders extra classes passed in via className', () => {
      const { container } = render(component);
      expect(container.firstChild).toHaveClass('extra-class');
    });

    it('toggles the expandable class on click', () => {
      const { container } = render(component);
      expect(container.querySelector(`.cds--tile--is-expanded`)).toBeNull();
      const tile = screen.getByText('TestAbove');
      userEvent.click(tile);
      expect(onClick).toHaveBeenCalled();
      expect(container.querySelector(`.cds--tile--is-expanded`)).toBeTruthy();
    });

    it('contains the default tooltip for the button', async () => {
      render(
        <ExpandableTile className="extra-class" data-testid={'expandable-tile'}>
          <TileAboveTheFoldContent className="child">
            <div style={{ height: '200px' }}>Test</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent className="child">
            <div style={{ height: '500px' }}>Test</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      const defaultExpandedIconText = 'Interact to collapse Tile';
      const defaultCollapsedIconText = 'Interact to expand Tile';
      const expandableTile = screen.getByTestId('expandable-tile');
      expect(expandableTile.getAttribute('title')).toEqual(
        defaultCollapsedIconText
      );
      userEvent.click(expandableTile);
      expect(expandableTile.getAttribute('title')).toEqual(
        defaultExpandedIconText
      );
    });

    it('displays the custom tooltips for the button depending on state', () => {
      render(
        <ExpandableTile
          className="extra-class"
          data-testid={'expandable-tile'}
          tileCollapsedIconText="Click To Expand"
          tileExpandedIconText="Click To Collapse">
          <TileAboveTheFoldContent className="child">
            <div style={{ height: '200px' }}>Test</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent className="child">
            <div style={{ height: '500px' }}>Test</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const expandableTile = screen.getByTestId('expandable-tile');
      expect(expandableTile.getAttribute('title')).toEqual('Click To Expand');
      userEvent.click(expandableTile);
      expect(expandableTile.getAttribute('title')).toEqual('Click To Collapse');
    });

    it('supports setting expanded prop to true', () => {
      const { container } = render(
        <ExpandableTile data-testid={'expandable-tile'} expanded>
          <TileAboveTheFoldContent className="child">
            <div style={{ height: '200px' }}>Test</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent className="child">
            <div style={{ height: '500px' }}>Test</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(container.querySelector('.cds--tile--is-expanded')).toBeTruthy();
    });

    it('supports setting expanded prop to false', () => {
      const { container } = render(
        <ExpandableTile data-testid={'expandable-tile'} expanded={false}>
          <TileAboveTheFoldContent className="child">
            <div style={{ height: '200px' }}>Test</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent className="child">
            <div style={{ height: '500px' }}>Test</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(container.querySelector('.cds--tile--is-expanded')).toBeNull();
    });
  });

  // Todo: Testing for a disabled ClickableTile
  // Todo: Testing for ExpandableTile
  // Todo: Testing for RadioTile
});
