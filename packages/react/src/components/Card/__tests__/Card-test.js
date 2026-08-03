/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardBody, CardFooter } from '..';

describe('Card', () => {
  it('renders card with children', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <CardBody>Content</CardBody>
      </Card>
    );

    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('handles click events when clickable', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Card clickable onClick={handleClick}>
        <CardBody>Clickable content</CardBody>
      </Card>
    );

    const card = screen.getByRole('button');
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events when clickable', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Card clickable onClick={handleClick}>
        <CardBody>Clickable content</CardBody>
      </Card>
    );

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not handle clicks when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Card clickable disabled onClick={handleClick}>
        <CardBody>Disabled content</CardBody>
      </Card>
    );

    const card = container.firstChild;
    await user.click(card);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styles', () => {
    const { container } = render(
      <Card disabled>
        <CardBody>Disabled content</CardBody>
      </Card>
    );

    const card = container.firstChild;
    expect(card).toHaveClass('cds--card--disabled');
  });
});

describe('CardHeader', () => {
  it('renders header content', () => {
    render(
      <Card>
        <CardHeader>Header Content</CardHeader>
      </Card>
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });
});

describe('CardBody', () => {
  it('renders body content', () => {
    render(
      <Card>
        <CardBody>Body Content</CardBody>
      </Card>
    );

    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders footer content', () => {
    render(
      <Card>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});
