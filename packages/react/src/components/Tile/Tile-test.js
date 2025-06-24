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
import { Add } from '@carbon/icons-react';
import { AILabel } from '../AILabel';

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

    it('should respect decorator prop', () => {
      render(<Tile decorator={<AILabel />}>Default tile</Tile>);
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
    });
    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Tile slug={<AILabel />}>Default tile</Tile>);
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
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
    it('does not invoke the click handler if ClickableTile is disabled', async () => {
      const onClick = jest.fn();
      render(
        <ClickableTile
          onClick={onClick}
          disabled
          href="https://www.carbondesignsystem.com">
          🚦
        </ClickableTile>
      );
      await userEvent.click(screen.getByText('🚦'));
      expect(onClick).not.toHaveBeenCalled();
    });
    it('should allow for a custom icon', () => {
      render(
        <ClickableTile
          href="https://www.carbondesignsystem.com"
          renderIcon={() => <Add data-testid="test" />}>
          Clickable Tile
        </ClickableTile>
      );

      expect(screen.getByTestId('test')).toBeInTheDocument();
    });

    it('should respect decorator prop', () => {
      render(
        <ClickableTile decorator={<AILabel />}>Default tile</ClickableTile>
      );
      expect(document.querySelector(`.${prefix}--cds--ai-label`));
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(<ClickableTile slug>Default tile</ClickableTile>);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('svg')).toHaveClass(
        `${prefix}--tile--ai-label-icon`
      );
      spy.mockRestore();
    });
    it('should call onKeyDown', async () => {
      const onKeyDown = jest.fn();
      render(<ClickableTile onKeyDown={onKeyDown}>keytest</ClickableTile>);
      await userEvent.type(screen.getByText('keytest'), 'one');
      expect(onKeyDown).toHaveBeenCalledTimes(3);
    });
  });

  describe('Multi Select', () => {
    it('does not invoke the click handler if SelectableTile is disabled', async () => {
      const onClick = jest.fn();
      render(
        <div role="group" aria-label="selectable tiles">
          <SelectableTile disabled id="tile-1" onClick={onClick}>
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
          <SelectableTile data-testid="element" id="tile-1">
            tile 1
          </SelectableTile>
          <SelectableTile data-testid="element" id="tile-2">
            tile 2
          </SelectableTile>
          <SelectableTile data-testid="element" id="tile-3">
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

    it('should respect decorator prop', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <SelectableTile decorator={<AILabel />} id="tile-1" onClick={onClick}>
          Default tile
        </SelectableTile>
      );
      const aiLabel = screen.getByRole('button', {
        name: 'AI Show information',
      });
      expect(aiLabel).toBeInTheDocument();
      const tile = container.firstChild;
      await userEvent.click(aiLabel);
      expect(tile).not.toHaveClass(`${prefix}--tile--is-selected`);
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <SelectableTile slug={<AILabel />} id="tile-1">
          Default tile
        </SelectableTile>
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
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
      const { container } = render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(container.firstChild.nodeName).toBe('BUTTON');
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
        <ExpandableTile expanded tileExpandedLabel="expanded-test">
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass(`${prefix}--tile--is-expanded`);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      const chevron = screen
        .getByRole('button')
        .querySelector('.cds--tile__chevron');
      expect(chevron).toBeInTheDocument();

      const span = chevron.querySelector('span');
      expect(span).toHaveTextContent('expanded-test');
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

    it('should respect decorator prop', () => {
      render(
        <ExpandableTile decorator={<AILabel />}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <ExpandableTile slug={<AILabel />}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
    });
  });

  describe('ExpandableTile with interactive elements', () => {
    it('does not render the tile as a button and expands/collapses', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <button type="button">TestAbove</button>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <button type="button">TestBelow</button>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const tile = container.firstChild;
      const expandButton = screen.getByRole('button', {
        name: 'Interact to expand Tile',
      });

      expect(tile.nodeName).not.toBe('BUTTON');
      expect(tile).toContainElement(expandButton);
      expect(tile).not.toHaveAttribute('aria-expanded');

      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
      expect(expandButton).toHaveAttribute(
        'aria-controls',
        expect.stringContaining('expandable-tile-interactive')
      );

      await userEvent.click(expandButton);

      expect(onClick).toHaveBeenCalled();
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('ExpandableTile with role elements', () => {
    it('does not render the tile as a button and expands/collapses', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <div role="table" className="testing">
              TestAbove
            </div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const tile = container.firstChild;
      const expandButton = screen.getByRole('button', {
        name: 'Interact to expand Tile',
      });

      expect(tile.nodeName).not.toBe('BUTTON');
      expect(tile).toContainElement(expandButton);
      expect(tile).not.toHaveAttribute('aria-expanded');

      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
      expect(expandButton).toHaveAttribute(
        'aria-controls',
        expect.stringContaining('expandable-tile-interactive')
      );

      await userEvent.click(expandButton);

      expect(onClick).toHaveBeenCalled();
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
    it('supports interactive elements in expanded state', async () => {
      const onButtonClick = jest.fn();
      render(
        <ExpandableTile tileMaxHeight={100} tilePadding={0} expanded>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <button onClick={onButtonClick}>Test Button</button>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      const expandButton = screen.getByRole('button', {
        name: 'Interact to collapse Tile',
      });
      const testButton = screen.getByRole('button', { name: 'Test Button' });
      await userEvent.click(testButton);

      expect(onButtonClick).toHaveBeenCalled();
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('respect selected prop', async () => {
    const { container } = render(
      <SelectableTile id="selectable-tile-1" selected>
        Option 1
      </SelectableTile>
    );
    const tile = container.firstChild;
    expect(tile).toHaveClass(`${prefix}--tile--is-selected`);
    await userEvent.click(tile);
    expect(tile).not.toHaveClass(`${prefix}--tile--is-selected`);
  });

  it('SelectableTile Should call onChange with correct values', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <SelectableTile id="selectable-tile-1" onChange={onChange}>
        Option 1
      </SelectableTile>
    );
    const tile = container.firstChild;
    await userEvent.click(tile);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'click',
      }),
      true,
      'selectable-tile-1'
    );
    // should de-select when user press enter key on selected tile.
    tile.focus();
    await userEvent.keyboard('[Enter]');
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'keydown',
      }),
      false,
      'selectable-tile-1'
    );
  });

  it('should call onKeyDown', async () => {
    const onKeyUp = jest.fn();
    render(<ExpandableTile onKeyUp={onKeyUp}>Test Content</ExpandableTile>);
    await userEvent.type(screen.getByText('Test Content'), '{enter}');
    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  it('should toggle the expanded state when the expanded prop changes dynamically', async () => {
    const { rerender } = render(
      <ExpandableTile expanded={false}>
        <TileAboveTheFoldContent>
          <div>TestAbove</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div>TestBelow</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );
    const button = screen.getByRole('button');
    // Helper function to check the button's expanded state
    const checkExpandedState = (isExpanded) => {
      const className = `${prefix}--tile--is-expanded`;
      expect(button).toHaveAttribute(
        'aria-expanded',
        isExpanded ? 'true' : 'false'
      );
      if (isExpanded) {
        expect(button).toHaveClass(className);
      } else {
        expect(button).not.toHaveClass(className);
      }
    };
    // Initial state: expanded = false
    checkExpandedState(false);
    // Update to expanded = true
    rerender(
      <ExpandableTile expanded={true}>
        <TileAboveTheFoldContent>
          <div>TestAbove</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div>TestBelow</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );
    checkExpandedState(true);
    // Update back to expanded = false
    rerender(
      <ExpandableTile expanded={false}>
        <TileAboveTheFoldContent>
          <div>TestAbove</div>
        </TileAboveTheFoldContent>
      </ExpandableTile>
    );
    checkExpandedState(false);
  });

  describe('SelectableTile React Strict Mode', () => {
    it('Should call onChange only once per interaction in React Strict Mode', async () => {
      const onChange = jest.fn();

      // Wrap component in React.StrictMode to enable strict mode
      const { container } = render(
        <React.StrictMode>
          <SelectableTile id="selectable-tile-1" onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      const tile = container.firstChild;

      // Clear any potential initial calls
      onChange.mockClear();

      // Test click interaction
      await userEvent.click(tile);

      // Should be called exactly once, not twice
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
        }),
        true,
        'selectable-tile-1'
      );

      // Clear mock for next test
      onChange.mockClear();

      // Test keyboard interaction
      tile.focus();
      await userEvent.keyboard('[Enter]');

      // Should be called exactly once for keyboard interaction too
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'keydown',
        }),
        false,
        'selectable-tile-1'
      );
    });

    it('Should maintain correct state synchronization in Strict Mode when selected prop changes', async () => {
      const onChange = jest.fn();

      const { rerender } = render(
        <React.StrictMode>
          <SelectableTile
            id="selectable-tile-1"
            selected={false}
            onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      // Clear any potential initial calls
      onChange.mockClear();

      // Change the selected prop
      rerender(
        <React.StrictMode>
          <SelectableTile
            id="selectable-tile-1"
            selected={true}
            onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      // onChange should NOT be called when prop changes
      // (only when user interacts with the component)
      expect(onChange).not.toHaveBeenCalled();
    });

    it('Should handle rapid successive interactions correctly in Strict Mode', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <React.StrictMode>
          <SelectableTile id="selectable-tile-1" onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      const tile = container.firstChild;
      onChange.mockClear();

      // Perform multiple rapid clicks
      await userEvent.click(tile);
      await userEvent.click(tile);
      await userEvent.click(tile);

      // Should be called exactly 3 times (once per click), not 6 times
      expect(onChange).toHaveBeenCalledTimes(3);

      // Verify the selection states are correct
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        expect.anything(),
        true,
        'selectable-tile-1'
      );
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        expect.anything(),
        false,
        'selectable-tile-1'
      );
      expect(onChange).toHaveBeenNthCalledWith(
        3,
        expect.anything(),
        true,
        'selectable-tile-1'
      );
    });

    // Comparison test - what would happen without the fix
    // (This test would fail with the old implementation)
    it('Should not have regression - onChange fires exactly once per user action', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <React.StrictMode>
          <SelectableTile id="selectable-tile-1" onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      const tile = container.firstChild;
      onChange.mockClear();

      // Single click should result in exactly one onChange call
      await userEvent.click(tile);

      expect(onChange).toHaveBeenCalledTimes(1);

      // Verify it's not called multiple times after a short delay
      // (to catch any delayed duplicate calls)
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
