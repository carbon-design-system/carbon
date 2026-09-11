/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classnames from 'classnames';
import { Text } from '../Text';
import { blockClass } from './utils';

/**
 * ----------------
 * PageHeaderContentText
 * ----------------
 */
export interface PageHeaderContentTextProps {
  /**
   * Provide child elements to be rendered inside PageHeaderContentText.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderContentText
   */
  className?: string;
  /**
   * The PageHeaderContent's subtitle
   */
  subtitle?: string;
  /**
   * Specify the element or component used to render the subtitle.
   */
  subtitleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const PageHeaderContentText = ({
  className,
  children,
  subtitle,
  subtitleAs = 'h2',
  ...other
}: PageHeaderContentTextProps) => {
  const classNames = classnames(
    {
      [`${blockClass}__content__body`]: true,
    },
    className
  );

  return (
    <div className={classNames} {...other}>
      {subtitle && (
        <Text as={subtitleAs} className={`${blockClass}__content__subtitle`}>
          {subtitle}
        </Text>
      )}
      {children}
    </div>
  );
};

PageHeaderContentText.displayName = 'PageHeaderContentText';
