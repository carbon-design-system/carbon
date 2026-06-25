/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// Carbon and package components we use.
import { Button } from '@carbon/react';
import { Restart } from '@carbon/react/icons';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--status-indicator`;
const componentName = 'StatusIndicator';

const defaults = {
  retryLabel: 'Retry',
  showRetry: false,
};

/**
 * A list of icon/description pairs used to show multiple states of progress.
 * @deprecated This component is deprecated
 */
export let StatusIndicator = React.forwardRef(
  (
    {
      children,
      className,
      onRetry,
      retryLabel = defaults.retryLabel,
      showRetry = defaults.showRetry,
      title,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {title && <h1 className={`${blockClass}__title`}>{title}</h1>}
        <ul className={`${blockClass}__list`}>{children}</ul>
        {showRetry && onRetry && retryLabel && (
          <Button
            className={`${blockClass}__button`}
            kind="ghost"
            onClick={onRetry}
            onKeyUp={onRetry}
            renderIcon={() => <Restart size={16} />}
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }
);

StatusIndicator.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};

// Return a placeholder if not released and not enabled by feature flag
StatusIndicator = pkg.checkComponentEnabled(StatusIndicator, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
StatusIndicator.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
StatusIndicator.propTypes = {
  /**
   * Provide the contents of the StatusIndicator.
   */
  children: PropTypes.node.isRequired,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Optional callback function for the retry button.
   */
  onRetry: PropTypes.func,
  /**
   * The text for the retry button.
   */
  retryLabel: PropTypes.string,
  /**
   * Set to `true` to show the retry button.
   *
   * `retryLabel` and `onRetry` must also be defined.
   */
  showRetry: PropTypes.bool,
  /**
   * The title that appears at the top of the list.
   */
  title: PropTypes.node,
};
