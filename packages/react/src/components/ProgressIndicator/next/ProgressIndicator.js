/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { usePrefix } from '../../../internal/usePrefix';

function ProgressIndicator({
  children,
  className: customClassName,
  currentIndex: controlledIndex = 0,
  onChange,
  spaceEqually,
  vertical,
  ...rest
}) {
  const prefix = usePrefix();
  const [currentIndex, setCurrentIndex] = useState(controlledIndex);
  const [prevControlledIndex, setPrevControlledIndex] =
    useState(controlledIndex);
  const className = cx({
    [`${prefix}--progress`]: true,
    [`${prefix}--progress--vertical`]: vertical,
    [`${prefix}--progress--space-equal`]: spaceEqually && !vertical,
    [customClassName]: customClassName,
  });

  if (controlledIndex !== prevControlledIndex) {
    setCurrentIndex(controlledIndex);
    setPrevControlledIndex(controlledIndex);
  }

  return (
    <ul className={className} {...rest}>
      {React.Children.map(children, (child, index) => {
        // only setup click handlers if onChange event is passed
        const onClick = onChange ? () => onChange(index) : undefined;
        if (index === currentIndex) {
          return React.cloneElement(child, {
            complete: child.props.complete,
            current: child.props.complete ? false : true,
            index,
            onClick,
          });
        }
        if (index < currentIndex) {
          return React.cloneElement(child, {
            complete: true,
            index,
            onClick,
          });
        }
        if (index > currentIndex) {
          return React.cloneElement(child, {
            complete: child.props.complete || false,
            index,
            onClick,
          });
        }
        return null;
      })}
    </ul>
  );
}

ProgressIndicator.propTypes = {
  /**
   * Provide `<ProgressStep>` components to be rendered in the
   * `<ProgressIndicator>`
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Optionally specify the current step array index
   */
  currentIndex: PropTypes.number,

  /**
   * Optional callback called if a ProgressStep is clicked on.  Returns the index of the step.
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the progress steps should be split equally in size in the div
   */
  spaceEqually: PropTypes.bool,
  /**
   * Determines whether or not the ProgressIndicator should be rendered vertically.
   */
  vertical: PropTypes.bool,
};

export { ProgressIndicator };
