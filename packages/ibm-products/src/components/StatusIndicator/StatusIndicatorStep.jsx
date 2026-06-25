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

import { InlineLoading } from '@carbon/react';
import {
  CheckmarkOutline,
  CircleStroke,
  ErrorOutline,
} from '@carbon/react/icons';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--status-indicator-step`;
const componentName = 'StatusIndicatorStep';

const defaults = {
  status: 'inactive',
};

/**
 * An icon/description pair that describes one step of the `StatusIndicator`.
 * @deprecated This component is deprecated
 */
export let StatusIndicatorStep = React.forwardRef(
  (
    { className, description, errorMessage, status = defaults.status, ...rest },
    ref
  ) => {
    return (
      <li
        {...rest}
        className={cx(blockClass, className, `${blockClass}--${status}`)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <div className={`${blockClass}__details`}>
          <div className={`${blockClass}__icon`}>
            {status === 'inactive' && (
              <CircleStroke size={16} viewBox="1 1 14 14" />
            )}
            {status === 'active' && <InlineLoading />}
            {status === 'error' && <ErrorOutline size={16} />}
            {status === 'finished' && <CheckmarkOutline size={16} />}
          </div>
          <div className={`${blockClass}__text`}>{description}</div>
        </div>

        {status === 'error' && errorMessage && (
          <div className={`${blockClass}__error-message`}>{errorMessage}</div>
        )}
      </li>
    );
  }
);

StatusIndicatorStep.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};

// Return a placeholder if not released and not enabled by feature flag
StatusIndicatorStep = pkg.checkComponentEnabled(
  StatusIndicatorStep,
  componentName
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
StatusIndicatorStep.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
StatusIndicatorStep.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * The text associated with the icon.
   */
  description: PropTypes.string.isRequired,
  /**
   * This message will appear below the description if the `status` is "error".
   */
  errorMessage: PropTypes.string,
  /**
   * Each `status` represents a different icon..
   */
  status: PropTypes.oneOf(['inactive', 'active', 'error', 'finished'])
    .isRequired,
};
