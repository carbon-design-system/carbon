/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode } from 'react';

import { Button } from '@carbon/react';
import { Crossroads } from '@carbon/react/icons';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--guidebanner__element-button`;
const componentName = 'GuidebannerElementButton';

export interface GuidebannerElementButtonProps {
  /**
   * Provide the contents of the GuidebannerElementLink.
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
   * If type is "primary", then return a tertiary button with the "crossroads" icon,
   * else return a ghost button.
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
  typeof Button,
  GuidebannerElementButtonProps
>(
  (
    {
      children,
      className,
      iconDescription = defaults.iconDescription,
      type,
      ...rest
    }: GuidebannerElementButtonProps,
    ref
  ) => {
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
          {...getDevtoolsProps(componentName)}
        >
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
        {...getDevtoolsProps(componentName)}
      >
        {children}
      </Button>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
GuidebannerElementButton.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
GuidebannerElementButton.propTypes = {
  /**
   * Provide the contents of the GuidebannerElementButton.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * If type is "primary", then return a tertiary button with the "crossroads" icon,
   * else return a ghost button.
   */
  type: PropTypes.string,

  /* TODO: add types and DocGen for all props. */
};
