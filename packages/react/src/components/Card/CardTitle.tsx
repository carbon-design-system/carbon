/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ReactNode } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardTitle';

export interface CardTitleProps {
  /**
   * Provide the contents of the CardTitle.
   */
  children?: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Enable text truncation with ellipsis on the title text row.
   * - `true`: Single line truncation
   * - `number`: Multi-line truncation (line clamp)
   * @default false
   */
  titleTruncate?: boolean | number;

  /**
   * Maximum width applied to the title text row when truncation is active.
   * @default '100%'
   */
  maxWidth?: string;

  /**
   * Optional leading icon or content to display before the title text.
   * - Productive density: 16px icon recommended
   * - Expressive density: 24px icon recommended
   */
  titleStart?: ReactNode;

  /**
   * Optional trailing icon or content to display after the title text.
   * - Productive density: 16px icon recommended
   * - Expressive density: 24px icon recommended
   */
  titleEnd?: ReactNode;

  /**
   * Optional label rendered above the title text.
   * Uses $label-01 typography and $text-secondary color.
   */
  label?: ReactNode;

  /**
   * Enable truncation on the label text.
   * - `true`: Single line truncation
   * - `number`: Multi-line truncation (line clamp)
   * @default false
   */
  labelTruncate?: boolean | number;

  /**
   * Optional description rendered below the title text.
   * Uses $label-01 typography and $text-secondary color.
   */
  description?: ReactNode;

  /**
   * Enable truncation on the description text.
   * - `true`: Single line truncation
   * - `number`: Multi-line truncation (line clamp)
   * @default false
   */
  descriptionTruncate?: boolean | number;
}

/**
 * CardTitle displays the main title text in the card header.
 * Typography is driven by density on the parent Card:
 * - Productive: $heading-compact-02 (16px/22px)
 * - Expressive: $heading-03 (20px/28px)
 */
export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  (
    {
      children,
      className,
      titleTruncate = false,
      maxWidth = '100%',
      titleStart,
      titleEnd,
      label,
      labelTruncate = false,
      description,
      descriptionTruncate = false,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--card`;

    const isTitleMulti = typeof titleTruncate === 'number';
    const isLabelMulti = typeof labelTruncate === 'number';
    const isDescMulti = typeof descriptionTruncate === 'number';

    const containerClasses = cx(`${blockClass}__title`, className);

    // Truncation and icon classes live on the inner text-row so they never
    // override the outer container's display:flex flex-direction:column,
    // which keeps the label and description visible.
    const textRowClasses = cx(`${blockClass}__title-text-row`, {
      [`${blockClass}__title-text-row--truncate`]: titleTruncate === true,
      [`${blockClass}__title-text-row--truncate-multi`]: isTitleMulti,
      [`${blockClass}__title-text-row--with-start-icon`]: titleStart,
      [`${blockClass}__title-text-row--with-end-icon`]: titleEnd,
    });

    // Dynamic values passed as CSS custom properties so SCSS rules can read
    // them via var(). Avoids encoding presentation logic in inline styles.
    const titleVars =
      titleTruncate !== false
        ? {
            [`--${prefix}--card--title-max-width`]: maxWidth,
            ...(isTitleMulti && {
              [`--${prefix}--card--title-line-clamp`]: titleTruncate,
            }),
          }
        : undefined;

    const labelVars = isLabelMulti
      ? { [`--${prefix}--card--label-line-clamp`]: labelTruncate }
      : undefined;

    const descVars = isDescMulti
      ? { [`--${prefix}--card--description-line-clamp`]: descriptionTruncate }
      : undefined;

    return (
      <div {...rest} ref={ref} className={containerClasses}>
        {label && (
          <div
            className={cx(`${blockClass}__label`, {
              [`${blockClass}__label--truncate`]: labelTruncate === true,
              [`${blockClass}__label--truncate-multi`]: isLabelMulti,
            })}
            style={labelVars as React.CSSProperties}>
            {label}
          </div>
        )}
        <span
          className={textRowClasses}
          style={titleVars as React.CSSProperties}>
          {titleStart && (
            <span className={`${blockClass}__title-start-icon`}>
              {titleStart}
            </span>
          )}
          {children}
          {titleEnd && (
            <span className={`${blockClass}__title-end-icon`}>{titleEnd}</span>
          )}
        </span>
        {description && (
          <div
            className={cx(`${blockClass}__description`, {
              [`${blockClass}__description--truncate`]:
                descriptionTruncate === true,
              [`${blockClass}__description--truncate-multi`]: isDescMulti,
            })}
            style={descVars as React.CSSProperties}>
            {description}
          </div>
        )}
      </div>
    );
  }
);

CardTitle.displayName = componentName;
