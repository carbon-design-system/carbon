/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes } from '@carbon/icon-helpers';
import PropTypes from 'prop-types';
import React from 'react';

const defaultStyle = {
  willChange: 'transform',
};

const Icon = React.forwardRef(function Icon(
  { className, children, style = {}, tabIndex, ...rest },
  ref
) {
  const { tabindex, ...props } = getAttributes({
    ...rest,
    tabindex: tabIndex,
  });

  if (className) {
    props.className = className;
  }

  if (tabindex !== undefined && tabindex !== null) {
    props.tabIndex = tabindex;
  }

  if (ref) {
    props.ref = ref;
  }

  props.style = {
    ...defaultStyle,
    ...style,
  };

  // Set `aria-hidden='true'` for all children nodes if a top-level
  // accessibility label is defined
  //
  // Reference: https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html
  // Section:
  // If an SVG’s code is fully inlined, then unnecessary child elements and
  // content should be optimized away. paths and any other direct child elements
  // of the SVG should receive an aria-hidden="true" if they contain no
  // information that should be made accessible.
  if (
    props['aria-label'] !== undefined ||
    props['aria-labelledby'] !== undefined
  ) {
    return React.createElement(
      'svg',
      props,
      React.Children.map(children, child => {
        return React.cloneElement(child, { 'aria-hidden': true });
      })
    );
  }

  return React.createElement('svg', props, children);
});

Icon.displayName = 'Icon';
Icon.propTypes = {
  'aria-hidden': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.number,
  preserveAspectRatio: PropTypes.string,
  tabIndex: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
  xmlns: PropTypes.string,
};
Icon.defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet',
};

export default Icon;
