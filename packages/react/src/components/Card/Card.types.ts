/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode } from 'react';

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
   * Makes the entire card clickable
   */
  clickable?: boolean;
  /**
   * Click handler for clickable cards
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Keyboard event handler for clickable cards
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
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
}

/**
 * Props for CardHeader component
 */
export type CardHeaderProps = CardBaseProps;

/**
 * Props for CardBody component
 */
export type CardBodyProps = CardBaseProps;

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
}
