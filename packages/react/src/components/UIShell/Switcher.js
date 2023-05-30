/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

// eslint-disable-next-line no-unused-vars
const Switcher = React.forwardRef(function Switcher(props, ref) {
  const switcherRef = useRef(null);

  const prefix = usePrefix();
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    children,
  } = props;

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  const className = cx(`${prefix}--switcher`, {
    [customClassName]: !!customClassName,
  });

  const handleSwitcherItemFocus = ({ currentIndex, direction }) => {
    const enabledIndices = React.Children.toArray(children).reduce(
      (acc, curr, i) => {
        if (Object.keys(curr.props).length !== 0) {
          acc.push(i);
        }

        return acc;
      },
      []
    );
    const sortedArr = Array.from(
      { length: enabledIndices.length },
      (_, i) => i
    );
    console.log('newArray', sortedArr);
    console.log('enabledIndices', enabledIndices);
    const nextValidIndex = (() => {
      let nextIndex = currentIndex + direction;
      // We need to validate the next valid index due to the possibility of the existing SwitcherDivider component
      if (!enabledIndices.includes(nextIndex) || nextIndex === currentIndex) {
        nextIndex = nextIndex + direction;
      }

      if (currentIndex > enabledIndices.length && direction === 1) {
        return 0;
      }

      switch (nextIndex) {
        case -2:
          return enabledIndices[enabledIndices.length - 1];
        case currentIndex > enabledIndices.length:
          return 0;
        default:
          return nextIndex;
      }
    })();

    // console.log('switcherRef', switcherRef.current.children[currentIndex]);

    // console.log('nextValidIndex', nextValidIndex);
    const switcherItem =
      switcherRef.current.children[nextValidIndex].children[0];
    // console.log('next item', switcherItem);
    switcherItem?.focus();
  };

  const childrenWithProps = React.Children.toArray(children).map(
    (child, index) =>
      React.cloneElement(child, {
        handleSwitcherItemFocus,
        index,
      })
  );

  return (
    <ul ref={switcherRef} className={className} {...accessibilityLabel}>
      {childrenWithProps}
    </ul>
  );
});

Switcher.displayName = 'Switcher';
Switcher.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * expects to receive <SwitcherItem />
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<ul>` node
   */
  className: PropTypes.string,
};

export default Switcher;
