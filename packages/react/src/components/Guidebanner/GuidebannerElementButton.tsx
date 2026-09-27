/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode } from 'react';

import { Crossroads } from '@carbon/icons-react';
import Button from '../Button';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'GuidebannerElementButton';

export interface GuidebannerElementButtonProps {
  /**
   * Provide the contents of the GuidebannerElementButton.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Provide a description for the icon.
   */
  iconDescription?: string;
  /**
   * If type is "primary", then return a tertiary button with the "crossroads"
   * icon, else return a ghost button.
   */
  type?: string;
}

const defaults = {
  iconDescription: 'Crossroads',
};

/**
 * One of two buttons styled specifically for the GuidebannerElement.
 */
export const GuidebannerElementButton = React.forwardRef<
  HTMLButtonElement,
  GuidebannerElementButtonProps
>(
  (
    {
      children,
      className,
      iconDescription = defaults.iconDescription,
      type,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--guidebanner__element-button`;

    if (type === 'primary') {
      return (
        <Button
          {...rest}
          className={cx(blockClass, className)}
          iconDescription={iconDescription}
          kind="tertiary"
          ref={ref}
          renderIcon={() => <Crossroads size={16} />}
          role="button"
          size="md"
          data-component-name={componentName}>
          {children}
        </Button>
      );
    }

    return (
      <Button
        {...rest}
        className={cx(blockClass, className)}
        kind="ghost"
        role="button"
        size="md"
        data-component-name={componentName}>
        {children}
      </Button>
    );
  }
);

GuidebannerElementButton.displayName = componentName;
