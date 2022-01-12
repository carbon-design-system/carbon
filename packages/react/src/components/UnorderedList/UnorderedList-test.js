/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';
import { settings } from 'carbon-components';
import { render, screen } from '@testing-library/react';

const { prefix } = settings;

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
    render(
      <UnorderedList>
        <ListItem>Item</ListItem>
        <UnorderedList nested data-testid="nested-list">
          <ListItem>Nested</ListItem>
        </UnorderedList>
      </UnorderedList>
    );

    expect(
      screen
        .getByTestId('nested-list')
    ).toHaveClass(`${prefix}--list--nested`);
  });

  it('should add custom className given via className prop', () => {
    render(
      <UnorderedList className="some-class" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list').classList.contains('some-class')).toBe(
      true
    );
  });
});
