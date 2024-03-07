/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { ReactAttr } from '../../types/common';

export interface LoadingProps extends ReactAttr<HTMLDivElement> {
  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  active?: boolean;

  /**
   * Provide an optional className to be applied to the containing node
   */
  className?: string;

  /**
   * Specify a description that would be used to best describe the loading state
   */
  description?: string;

  /**
   * @deprecated The prop `id` is no longer needed
   */
  id?: string;

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  small?: boolean;

  /**
   * Specify whether you want the loader to be applied with an overlay
   */
  withOverlay: boolean;
}

function Loading({
  active = true,
  className: customClassName,
  withOverlay = true,
  small = false,
  description = 'loading',
  ...rest
}: LoadingProps) {
  const prefix = usePrefix();
  const loadingClassName = cx(customClassName, {
    [`${prefix}--loading`]: true,
    [`${prefix}--loading--small`]: small,
    [`${prefix}--loading--stop`]: !active,
  });
  const overlayClassName = cx({
    [`${prefix}--loading-overlay`]: true,
    [`${prefix}--loading-overlay--stop`]: !active,
  });

  const loading = (
    <div
      {...rest}
      aria-atomic="true"
      aria-live={active ? 'assertive' : 'off'}
      className={loadingClassName}>
      <svg className={`${prefix}--loading__svg`} viewBox="0 0 100 100">
        <title>{description}</title>
        {small ? (
          <circle
            className={`${prefix}--loading__background`}
            cx="50%"
            cy="50%"
            r="42"
          />
        ) : null}
        <circle
          className={`${prefix}--loading__stroke`}
          cx="50%"
          cy="50%"
          r={small ? '42' : '44'}
        />
      </svg>
    </div>
  );

  return withOverlay ? (
    <div className={overlayClassName}>{loading}</div>
  ) : (
    loading
  );
}

Loading.propTypes = {
  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  active: PropTypes.bool,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify a description that would be used to best describe the loading state
   */
  description: PropTypes.string,

  /**
   * Provide an `id` to uniquely identify the label
   */
  id: deprecate(PropTypes.string, `\nThe prop \`id\` is no longer needed.`),

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  small: PropTypes.bool,

  /**
   * Specify whether you want the loader to be applied with an overlay
   */
  withOverlay: PropTypes.bool,
};

export default Loading;
