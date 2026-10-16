/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';

/**
 * Base props shared across card components
 */
export interface CardBaseProps {
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Card content
   */
  children?: ReactNode;
}

/**
 * Props for the Card root component
 */
export interface CardProps extends CardBaseProps {
  /**
   * The underlying element or component to render the card as.
   * Defaults to `'div'`. Use `'a'` or a router Link component for
   * navigation cards when combined with `clickable`.
   * @example <Card as="a" clickable href="/dashboard">...</Card>
   * @example <Card as={RouterLink} clickable to="/dashboard">...</Card>
   */
  as?: React.ElementType;
  /**
   * Makes the entire card clickable. When true, the card gains interactive
   * styles (hover, focus, active) and renders a built-in footer affordance
   * with an arrow icon. Use `onClick` for action cards or `as="a"` with
   * `href` for navigation cards.
   */
  clickable?: boolean;
  /**
   * Click handler for clickable cards. Only has effect when `clickable`
   * is true.
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * Keyboard event handler. Only has effect when `clickable` is true.
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /**
   * Disables the card and all interactive elements
   */
  disabled?: boolean;
  /**
   * Density variant: productive uses heading-compact-02, expressive uses heading-03
   */
  density?: 'productive' | 'expressive';
  /**
   * Optional decorator component (typically AILabel from Carbon).
   * Renders in the top-right corner of the card header with a blue gradient border.
   */
  decorator?: ReactNode;
  /**
   * When true, the card renders in a horizontal layout: media on the left,
   * header/body/footer stacked vertically on the right.
   */
  horizontal?: boolean;
  /**
   * Icon rendered in the built-in footer affordance of a clickable card.
   * Only has effect when `clickable` is true. Defaults to ArrowRight.
   * Pass any icon component from `@carbon/icons-react`.
   * @example <Card clickable renderFooterIcon={Launch}>...</Card>
   */
  renderFooterIcon?: React.ElementType;
}

/**
 * Props for CardHeader component
 */
export type CardHeaderProps = CardBaseProps;

/**
 * Props for CardBody component
 */
export interface CardBodyProps extends CardBaseProps {
  /**
   * When true, removes all padding so content fills the body edge-to-edge.
   * Use when the body contains a component (e.g. a table, chart, or image)
   * that manages its own internal spacing.
   */
  isFlush?: boolean;
}

/**
 * Props for CardFooter component
 */
export type CardFooterProps = CardBaseProps;

/**
 * Context value for Card
 */
export interface CardContextValue {
  /**
   * Whether the card is clickable
   */
  clickable: boolean;
  /**
   * Whether the card is disabled
   */
  disabled: boolean;
  /**
   * Optional decorator component (typically AILabel) to be rendered by CardHeader
   */
  decorator?: ReactNode;
  /**
   * Whether the card is in horizontal layout mode
   */
  horizontal?: boolean;
  /**
   * Click handler forwarded from the Card root, available to child components
   * (e.g. the built-in clickable footer affordance).
   */
  onClick?: (event: React.MouseEvent) => void;
}
