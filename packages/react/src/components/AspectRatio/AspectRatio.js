/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import useMatchMedia from '../../internal/useMatchMedia';

const { prefix } = settings;
const ratios = ['16x9', '2x1', '4x3', '1x1', '1x2'];

// TODO: Sync with @carbon/layout
const breakpoints = [
  '(min-width: 20rem)',
  '(min-width: 42rem)',
  '(min-width: 66rem)',
  '(min-width: 82rem)',
  '(min-width: 99rem)',
];

// <AspectRatio ratio={['1x1', null, null, '16x9']} />
function AspectRatio({
  className: customClassName,
  children,
  ratio = '1x1',
  ...rest
}) {
  const [defaultRatio, ...responsiveRatios] = Array.isArray(ratio)
    ? ratio
    : [ratio];
  const queries = breakpoints.filter((_, i) => responsiveRatios[i]);
  const matches = useMatchMedia(queries);
  let currentMatch = matches.reduce((acc, match, index) => {
    if (match) {
      return responsiveRatios[breakpoints.indexOf(queries[index])];
    }
    return acc;
  }, false);

  if (!currentMatch) {
    currentMatch = defaultRatio;
  }

  const className = cx({
    [`${prefix}--aspect-ratio`]: true,
    [`${prefix}--aspect-ratio--${currentMatch}`]: true,
    [customClassName]: !!customClassName,
  });

  return (
    <div className={className} {...rest}>
      <div className="bx--aspect-ratio--object">{children}</div>
    </div>
  );
}

AspectRatio.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Pass in the children that will be rendered within the aspect ratio object
   */
  children: PropTypes.node,

  /**
   * Specify the aspect ratio for the container
   */
  ratio: PropTypes.oneOfType([
    PropTypes.oneOf(ratios),
    PropTypes.arrayOf(PropTypes.oneOf(ratios)),
  ]),
};

export default AspectRatio;
