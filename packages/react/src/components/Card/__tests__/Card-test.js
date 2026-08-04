/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardMedia,
  CardHeaderMedia,
  CardTitleMedia,
  CardActions,
  CardAction,
} from '..';

// ---------------------------------------------------------------------------
// Card (root)
// ---------------------------------------------------------------------------

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

  it('triggers onClick via Space key when clickable', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Card clickable onClick={handleClick}>
        <CardBody>Clickable content</CardBody>
      </Card>
    );

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard(' ');

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

  it('does not fire onClick via keyboard when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Card clickable disabled onClick={handleClick}>
        <CardBody>Disabled content</CardBody>
      </Card>
    );

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');

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

  it('applies expressive density class', () => {
    const { container } = render(
      <Card density="expressive">
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(container.firstChild).toHaveClass('cds--card--expressive');
  });

  it('calls custom onKeyDown handler alongside internal keyboard handling', async () => {
    const handleKeyDown = jest.fn();
    const user = userEvent.setup();

    render(
      <Card clickable onKeyDown={handleKeyDown}>
        <CardBody>Content</CardBody>
      </Card>
    );

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('sets tabIndex to -1 on a disabled clickable card', () => {
    render(
      <Card clickable disabled>
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });

  it('sets aria-disabled on a disabled clickable card', () => {
    render(
      <Card clickable disabled>
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders horizontal layout: media before content when CardMedia comes first', () => {
    const { container } = render(
      <Card horizontal>
        <CardMedia ratio="16x9">
          <img src="img.png" alt="" />
        </CardMedia>
        <CardBody>Content</CardBody>
      </Card>
    );
    // Content wrapper should be present
    expect(container.querySelector('.cds--card__content')).toBeInTheDocument();
  });

  it('renders horizontal layout: content before media when CardMedia comes last', () => {
    const { container } = render(
      <Card horizontal>
        <CardBody>Content</CardBody>
        <CardMedia ratio="16x9">
          <img src="img.png" alt="" />
        </CardMedia>
      </Card>
    );
    expect(container.querySelector('.cds--card__content')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CardHeader
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// CardBody
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// CardFooter
// ---------------------------------------------------------------------------

describe('CardFooter', () => {
  it('renders footer content', () => {
    render(
      <Card>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card>
        <CardFooter className="my-footer">Footer</CardFooter>
      </Card>
    );
    expect(container.querySelector('.my-footer')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CardTitle
// ---------------------------------------------------------------------------

describe('CardTitle', () => {
  it('renders title text (children)', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle label="Category">Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('does not render label element when label prop is absent', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__label')
    ).not.toBeInTheDocument();
  });

  it('applies single-line label truncation class', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle label="Long label" labelTruncate>
            Title
          </CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__label--truncate')
    ).toBeInTheDocument();
  });

  it('applies multi-line label truncation class when labelTruncate is a number', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle label="Long label" labelTruncate={2}>
            Title
          </CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__label--truncate-multi')
    ).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle description="A description">Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('does not render description element when description prop is absent', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__description')
    ).not.toBeInTheDocument();
  });

  it('applies single-line description truncation class', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle description="Long desc" descriptionTruncate>
            Title
          </CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__description--truncate')
    ).toBeInTheDocument();
  });

  it('applies multi-line description truncation class when descriptionTruncate is a number', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle description="Long desc" descriptionTruncate={3}>
            Title
          </CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__description--truncate-multi')
    ).toBeInTheDocument();
  });

  it('applies single-line title truncation class', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle titleTruncate>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__title-text-row--truncate')
    ).toBeInTheDocument();
  });

  it('applies multi-line title truncation class when titleTruncate is a number', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle titleTruncate={2}>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__title-text-row--truncate-multi')
    ).toBeInTheDocument();
  });

  it('renders titleStart icon slot', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle titleStart={<span data-testid="start-icon" />}>
            Title
          </CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders titleEnd icon slot', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle titleEnd={<span data-testid="end-icon" />}>
            Title
          </CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('does not render titleStart wrapper when prop is absent', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__title-start-icon')
    ).not.toBeInTheDocument();
  });

  it('does not render titleEnd wrapper when prop is absent', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__title-end-icon')
    ).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CardMedia
// ---------------------------------------------------------------------------

describe('CardMedia', () => {
  it('renders children in vertical (default) mode via AspectRatio', () => {
    render(
      <Card>
        <CardMedia ratio="16x9">
          <img src="img.png" alt="media" />
        </CardMedia>
      </Card>
    );
    expect(screen.getByAltText('media')).toBeInTheDocument();
  });

  it('renders children in horizontal mode as a plain div', () => {
    render(
      <Card horizontal>
        <CardMedia ratio="16x9">
          <img src="img.png" alt="horizontal-media" />
        </CardMedia>
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(screen.getByAltText('horizontal-media')).toBeInTheDocument();
  });

  it('applies custom className in vertical mode', () => {
    const { container } = render(
      <Card>
        <CardMedia className="my-media" ratio="16x9">
          <span />
        </CardMedia>
      </Card>
    );
    expect(container.querySelector('.my-media')).toBeInTheDocument();
  });

  it('applies horizontal media class in horizontal mode', () => {
    const { container } = render(
      <Card horizontal>
        <CardMedia ratio="16x9">
          <span />
        </CardMedia>
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(
      container.querySelector('.cds--card__media--horizontal')
    ).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CardHeaderMedia
// ---------------------------------------------------------------------------

describe('CardHeaderMedia', () => {
  it('renders children', () => {
    render(
      <Card>
        <CardHeader>
          <CardHeaderMedia>
            <img src="header.png" alt="header media" />
          </CardHeaderMedia>
        </CardHeader>
      </Card>
    );
    expect(screen.getByAltText('header media')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardHeaderMedia className="custom-header-media">
            <span />
          </CardHeaderMedia>
        </CardHeader>
      </Card>
    );
    expect(container.querySelector('.custom-header-media')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CardTitleMedia
// ---------------------------------------------------------------------------

describe('CardTitleMedia', () => {
  it('renders children', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitleMedia>
            <span data-testid="title-media-icon" />
          </CardTitleMedia>
        </CardHeader>
      </Card>
    );
    expect(screen.getByTestId('title-media-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitleMedia className="custom-title-media">
            <span />
          </CardTitleMedia>
        </CardHeader>
      </Card>
    );
    expect(container.querySelector('.custom-title-media')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CardAction
// ---------------------------------------------------------------------------

describe('CardAction', () => {
  it('renders children inside the action wrapper', () => {
    render(
      <Card>
        <CardHeader>
          <CardActions>
            <CardAction>
              <button type="button">Delete</button>
            </CardAction>
          </CardActions>
        </CardHeader>
      </Card>
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('applies custom className to the action wrapper', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardActions>
            <CardAction className="my-action">
              <button type="button">Save</button>
            </CardAction>
          </CardActions>
        </CardHeader>
      </Card>
    );
    expect(container.querySelector('.my-action')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CardActions
// ---------------------------------------------------------------------------

describe('CardActions', () => {
  it('renders action buttons', () => {
    render(
      <Card>
        <CardHeader>
          <CardActions>
            <CardAction>
              <button type="button">Action 1</button>
            </CardAction>
            <CardAction>
              <button type="button">Action 2</button>
            </CardAction>
          </CardActions>
        </CardHeader>
      </Card>
    );
    expect(
      screen.getByRole('button', { name: 'Action 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Action 2' })
    ).toBeInTheDocument();
  });

  it('applies custom className to the container', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardActions className="my-actions">
            <CardAction>
              <button type="button">Act</button>
            </CardAction>
          </CardActions>
        </CardHeader>
      </Card>
    );
    expect(container.querySelector('.my-actions')).toBeInTheDocument();
  });

  it('renders without children', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardActions />
        </CardHeader>
      </Card>
    );
    expect(container.querySelector('.cds--card__actions')).toBeInTheDocument();
  });

  it('renders the overflow menu button', () => {
    // OverflowMenu/next uses a tooltip for its accessible name ("Options").
    // Verify the overflow trigger is always present in the DOM.
    const { container } = render(
      <Card>
        <CardHeader>
          <CardActions overflowMenuLabel="Card options">
            <CardAction label="Edit">
              <button type="button">Edit</button>
            </CardAction>
          </CardActions>
        </CardHeader>
      </Card>
    );
    expect(container.querySelector('.cds--overflow-menu')).toBeInTheDocument();
  });

  it('resolves action label from CardAction label prop without throwing', () => {
    // Exercises the label resolution path in the actionItems useMemo.
    // The overflow menu trigger is always rendered regardless of overflow state.
    const { container } = render(
      <Card>
        <CardHeader>
          <CardActions>
            <CardAction label="Custom Label">
              <button type="button">Custom action</button>
            </CardAction>
          </CardActions>
        </CardHeader>
      </Card>
    );
    expect(container.querySelector('.cds--overflow-menu')).toBeInTheDocument();
  });
});
