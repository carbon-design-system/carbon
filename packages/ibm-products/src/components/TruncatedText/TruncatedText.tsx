/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useState } from 'react';
import cx from 'classnames';
import { Tooltip, PopoverAlignment } from '@carbon/react';
import { pkg } from '../../settings';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import useTruncatedText from './useTruncatedText';

export interface TruncatedTextProps {
  /**
   * Specify how the tooltip should align with the content in tooltip variant. Refer to Carbon tooltip docs for additional information.
   */
  align?: PopoverAlignment;
  /**
   * Specify whether a auto align functionality should be applied in tooltip variant. Refer to Carbon tooltip docs for additional information.
   */
  autoAlign?: boolean;
  /**
   * Optional class.
   */
  className?: string;
  /**
   * The label on the collapse button.
   */
  collapseLabel?: string;
  /**
   * The label on expand button.
   */
  expandLabel?: string;
  /**
   * Unique identifier for the element.
   */
  id: string;
  /**
   * The maximum number of lines to display before truncation.
   */
  lines?: number;
  /**
   * The method to display the full text when truncated. Options are "tooltip" or "expand". if not passed, the text would just be truncated with ellipsis.
   */
  type?: 'tooltip' | 'expand'; // refactor in web-components. with is reserved
  /**
   * The string value to be truncated.
   */
  value?: string;
}

const blockClass = `${pkg.prefix}--truncated-text`;
const componentName = 'TruncatedText';

export const TruncatedText = forwardRef<HTMLDivElement, TruncatedTextProps>(
  (props, ref) => {
    const {
      align = 'top',
      autoAlign = false,
      className,
      collapseLabel,
      expandLabel,
      id = `${blockClass}-default-id`,
      lines = 2,
      value,
      type = 'tooltip',
      ...rest
    } = props;
    const [expanded, setExpanded] = useState(false);
    const { ref: contentRef, truncated } = useTruncatedText({
      lines,
      value,
      expanded,
    });

    const textContentStyles = {
      WebkitLineClamp:
        (type === 'expand' && !expanded) || type === 'tooltip' ? lines : 'none',
    };

    const textContentClasses = cx(`${blockClass}__text-content`, {
      [`${blockClass}__text-content--expanded`]: expanded,
    });

    const handleExpand = () => {
      setExpanded(!expanded);
    };

    const handleExpandKey = (evt: React.KeyboardEvent) => {
      const { key } = evt;
      if (key === 'Enter' || key === ' ') {
        handleExpand();
      }
    };

    const valueBody = (
      <span
        ref={contentRef}
        className={textContentClasses}
        id={id}
        style={textContentStyles}
      >
        {value}
      </span>
    );

    const tooltipVariant = truncated ? (
      <Tooltip align={align} autoAlign={autoAlign} label={value}>
        <button
          type="button"
          className={`${blockClass}__tooltip-trigger`}
          aria-label={value}
        >
          {valueBody}
        </button>
      </Tooltip>
    ) : (
      valueBody
    );

    const expandVariant = (
      <>
        {valueBody}
        <span
          aria-controls={id}
          aria-expanded={expanded}
          className={`${blockClass}__expand-toggle`}
          onClick={handleExpand}
          onKeyDown={handleExpandKey}
          role="button"
          tabIndex={0}
        >
          {expanded ? collapseLabel : expandLabel}
        </span>
      </>
    );

    const truncatedBody = type === 'expand' ? expandVariant : tooltipVariant;

    return (
      <div
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {truncated ? truncatedBody : valueBody}
      </div>
    );
  }
);

TruncatedText.displayName = componentName;
