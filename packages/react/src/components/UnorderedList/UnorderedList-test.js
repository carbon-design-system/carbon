/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('UnorderedList', () => {
  it('should render children as expected', () => {
    render(
      <UnorderedList>
        <ListItem>Item</ListItem>
      </UnorderedList>
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('should render nested lists', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <UnorderedList>
        <ListItem>Item</ListItem>
        <UnorderedList nested data-testid="nested-list">
          <ListItem>Nested</ListItem>
        </UnorderedList>
      </UnorderedList>
    );

    expect(screen.getByTestId('nested-list')).toHaveClass(
      `${prefix}--list--nested`
    );
    spy.mockRestore();
  });

  it('should add custom className given via className prop', () => {
    render(
      <UnorderedList className="some-class" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass('some-class');
  });

  it('should render expressive lists', () => {
    const { container } = render(
      <UnorderedList isExpressive>
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(container.firstChild).toHaveClass(`${prefix}--list--unordered`);
    expect(container.firstChild).toHaveClass(`${prefix}--list--expressive`);
  });

  it('should render with disc marker type', () => {
    const { container } = render(
      <UnorderedList type="disc" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass(
      `${prefix}--list--marker-disc`
    );
  });

  it('should render with circle marker type', () => {
    const { container } = render(
      <UnorderedList type="circle" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass(
      `${prefix}--list--marker-circle`
    );
  });

  it('should render with square marker type', () => {
    const { container } = render(
      <UnorderedList type="square" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass(
      `${prefix}--list--marker-square`
    );
  });

  it('should render with hyphen marker type', () => {
    const { container } = render(
      <UnorderedList type="hyphen" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass(
      `${prefix}--list--marker-hyphen`
    );
  });

  it('should render with custom marker type', () => {
    const { container } = render(
      <UnorderedList type="custom" customMarker="→" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass(
      `${prefix}--list--marker-custom`
    );
    expect(screen.getByTestId('list')).toHaveStyle({
      '--cds--list--marker-content': "'→'",
    });
  });

  it('should default to hyphen marker for top-level lists', () => {
    const { container } = render(
      <UnorderedList data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass(
      `${prefix}--list--marker-hyphen`
    );
  });

  it('should default to square marker for nested lists', () => {
    // Mock console.warn to suppress expected deprecation warning
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <UnorderedList nested data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass(
      `${prefix}--list--marker-square`
    );
    spy.mockRestore();
  });
});
