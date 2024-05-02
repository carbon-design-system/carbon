/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { ForwardRefReturn } from '../../types/common';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

export interface ButtonSetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * fluid: button set resize to the size of the container up to a maximum dependant on the
   * number of buttons. Overrides `stacked` property.
   */
  fluid?: boolean;
  /**
   * Specify the button arrangement of the set (vertically stacked or
   * horizontal)
   */
  stacked?: boolean;
}

const fluidMultiples = ['none', 'single', 'double', 'triple', 'quadruple'];
const fluidMultiple = (buttonArray) => {
  if (buttonArray.length >= fluidMultiples.length) {
    // too many buttons
    return 'many';
  } else {
    return fluidMultiples[buttonArray.length];
  }
};

const buttonOrder = (kind) =>
  ({
    ghost: 1,
    'danger--ghost': 2,
    tertiary: 3,
    danger: 5,
    primary: 6,
  }[kind] ?? 4);

const ButtonSet: ForwardRefReturn<HTMLDivElement, ButtonSetProps> =
  React.forwardRef(function ButtonSet(
    { children, className, fluid, stacked, ...rest }: ButtonSetProps,
    ref: React.Ref<HTMLDivElement>
  ) {
    const prefix = usePrefix();
    const fluidInnerRef = useRef<HTMLDivElement>(null);
    const [isStacked, setIsStacked] = useState(false);
    const [sortedChildren, setSortedChildren] = useState(
      React.Children.toArray(children)
    );

    /**
     * Used to determine if the buttons are currently stacked
     */
    useIsomorphicEffect(() => {
      const checkStacking = () => {
        let newIsStacked = stacked || false;

        if (fluidInnerRef && fluidInnerRef.current) {
          const computedStyle = window.getComputedStyle(fluidInnerRef.current);

          newIsStacked =
            computedStyle?.getPropertyValue?.('--flex-direction') === 'column';
        }
        return newIsStacked;
      };

      /* initial value not dependant on observer */
      setIsStacked(checkStacking());

      if (!fluidInnerRef.current) {
        return;
      }

      const resizeObserver = new ResizeObserver(() => {
        setIsStacked(checkStacking());
      });
      resizeObserver.observe(fluidInnerRef.current);

      return () => resizeObserver.disconnect();
    }, [isStacked, stacked]);

    useEffect(() => {
      const newSortedChildren = React.Children.toArray(children);
      newSortedChildren.sort(
        (a: any, b: any) =>
          (buttonOrder(a.props.kind || 'primary') -
            buttonOrder(b.props.kind || 'primary')) *
          (isStacked ? -1 : 1)
      );
      setSortedChildren(newSortedChildren);

      // adding sortedChildren to deps causes an infinite loop
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, isStacked]);

    const buttonSetClasses = classNames(className, `${prefix}--btn-set`, {
      [`${prefix}--btn-set--stacked`]: isStacked,
      [`${prefix}--btn-set--fluid`]: fluid,
    });

    return (
      <div {...rest} className={buttonSetClasses} ref={ref}>
        {fluid ? (
          <div
            ref={fluidInnerRef}
            className={classNames(`${prefix}--btn-set__fluid-inner`, {
              [`${prefix}--btn-set__fluid-inner--auto-stack`]: true,
              [`${prefix}--btn-set__fluid-inner--${fluidMultiple(
                sortedChildren
              )}`]: true,
            })}>
            {sortedChildren}
          </div>
        ) : (
          children
        )}
      </div>
    );
  });

ButtonSet.displayName = 'ButtonSet';
ButtonSet.propTypes = {
  /**
   * Specify the content of your ButtonSet
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your ButtonSet
   */
  className: PropTypes.string,

  /**
   * fluid: button set resize to the size of the container up to a maximum dependant on the
   * number of buttons.
   */
  fluid: PropTypes.bool,

  /**
   * Specify the button arrangement of the set (vertically stacked or
   * horizontal) - ignored when fluid is true
   */
  stacked: PropTypes.bool,
};

export default ButtonSet;
