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
import { useMergedRefs } from '../../internal/useMergedRefs';

const Switcher = React.forwardRef(function Switcher(props, forwardRef) {
  const switcherRef = useRef(null);
  const ref = useMergedRefs([switcherRef, forwardRef]);

  const prefix = usePrefix();
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    children,
    expanded,
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

    const nextValidIndex = (() => {
      const nextIndex = enabledIndices.indexOf(currentIndex) + direction;

      switch (enabledIndices[nextIndex]) {
        case undefined:
          if (direction === -1) {
            return enabledIndices[enabledIndices.length - 1];
          }
          return 0;
        default:
          return enabledIndices[nextIndex];
      }
    })();

    const switcherItem =
      switcherRef.current.children[nextValidIndex].children[0];
    switcherItem?.focus();
  };

  const childrenWithProps = React.Children.toArray(children).map(
    (child, index) => {
      // handleSwitcherItemFocus should only be passed down if the child is a SwitcherItem
      // SwitcherDivider, for example, does not accept a handleSwitcherItemFocus prop
      if (child.type?.displayName === 'SwitcherItem') {
        return React.cloneElement(child, {
          handleSwitcherItemFocus,
          index,
          key: index,
          expanded,
        });
      }

      return React.cloneElement(child, {
        index,
        key: index,
        expanded,
      });
    }
  );

  return (
    <ul ref={ref} className={className} {...accessibilityLabel}>
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

  /**
   * Specify whether the panel is expanded
   */
  expanded: PropTypes.bool,
};

export default Switcher;
