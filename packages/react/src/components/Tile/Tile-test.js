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
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from './Tile';

import Link from '../Link';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';

const prefix = 'cds';

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

describe('ExpandableTile', () => {
  const wrapper = mount(
    <ExpandableTile className="extra-class">
      <TileAboveTheFoldContent className="child">
        <div style={{ height: '200px' }}>Test</div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent className="child">
        <div style={{ height: '500px' }}>Test</div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );

  it('renders children as expected', () => {
    expect(wrapper.props().children.length).toBe(2);
  });

  it('has the expected classes', () => {
    expect(wrapper.children().hasClass(`${prefix}--tile--expandable`)).toEqual(
      true
    );
  });

  it('renders extra classes passed in via className', () => {
    expect(wrapper.hasClass('extra-class')).toEqual(true);
  });

  it('toggles the expandable class on click', () => {
    expect(wrapper.children().hasClass(`${prefix}--tile--is-expanded`)).toEqual(
      false
    );
    wrapper.simulate('click');
    expect(wrapper.children().hasClass(`${prefix}--tile--is-expanded`)).toEqual(
      true
    );
  });

  it('displays the default tooltip for the button', () => {
    const wrapper = mount(
      <ExpandableTile className="extra-class">
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

    // Force the expanded tile to be collapsed.
    wrapper.setProps({ expanded: false });
    const collapsedDescription = wrapper.find('button').prop('title');
    expect(collapsedDescription).toEqual(defaultCollapsedIconText);

    // click on the item to expand it.
    wrapper.simulate('click');

    // Validate the description change
    const expandedDescription = wrapper.find('button').prop('title');
    expect(expandedDescription).toEqual(defaultExpandedIconText);
  });

  it('displays the custom tooltips for the button depending on state', () => {
    const wrapper = mount(
      <ExpandableTile className="extra-class">
        <TileAboveTheFoldContent className="child">
          <div style={{ height: '200px' }}>Test</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent className="child">
          <div style={{ height: '500px' }}>Test</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );

    const tileExpandedIconText = 'Click To Collapse';
    const tileCollapsedIconText = 'Click To Expand';

    // Force the custom icon text and the expanded tile to be collapsed.
    wrapper.setProps({
      tileExpandedIconText,
      tileCollapsedIconText,
      expanded: false,
    });

    const collapsedDescription = wrapper.find('button').prop('title');

    expect(collapsedDescription).toEqual(tileCollapsedIconText);

    // click on the item to expand it.
    wrapper.simulate('click');

    // Validate the description change
    const expandedDescription = wrapper.find('button').prop('title');
    expect(expandedDescription).toEqual(tileExpandedIconText);
  });

  it('supports setting initial expanded state from props', () => {
    const wrapper = mount(
      <ExpandableTile expanded>
        <TileAboveTheFoldContent className="child">
          <div style={{ height: '200px' }}>Test</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent className="child">
          <div style={{ height: '500px' }}>Test</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );
    expect(wrapper.children().hasClass(`${prefix}--tile--is-expanded`)).toEqual(
      true
    );
  });

  it('supports setting expanded state from props', () => {
    wrapper.setProps({ expanded: true });
    expect(wrapper.children().hasClass(`${prefix}--tile--is-expanded`)).toEqual(
      true
    );

    wrapper.setProps({ expanded: false });
    expect(wrapper.children().hasClass(`${prefix}--tile--is-expanded`)).toEqual(
      false
    );
  });
});

// Todo: Testing for a disabled ClickableTile
// Todo: Testing for ExpandableTile
// Todo: Testing for RadioTile
