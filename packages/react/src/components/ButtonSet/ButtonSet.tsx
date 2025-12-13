/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { ButtonKind } from '../Button/Button';

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

const buttonOrder = (kind) =>
  ({
    ghost: 1,
    'danger--ghost': 2,
    tertiary: 3,
    danger: 5,
    primary: 6,
  })[kind] ?? 4;

const getButtonKind = (element: unknown): ButtonKind | 'primary' => {
  if (
    React.isValidElement(element) &&
    element.props &&
    typeof element.props === 'object'
  ) {
    const props = element.props as { kind?: ButtonKind };
    return props.kind ?? 'primary';
  }
  return 'primary';
};

const ButtonSet = forwardRef<HTMLDivElement, ButtonSetProps>((props, ref) => {
  const { children, className, fluid, stacked, ...rest } = props;
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

    newSortedChildren.sort((a: unknown, b: unknown) => {
      return (
        (buttonOrder(getButtonKind(a)) - buttonOrder(getButtonKind(b))) *
        (isStacked ? -1 : 1)
      );
    });
    setSortedChildren(newSortedChildren);

    // adding sortedChildren to deps causes an infinite loop
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
