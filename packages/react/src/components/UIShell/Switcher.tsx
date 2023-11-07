/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, forwardRef, ReactNode } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { useMergedRefs } from '../../internal/useMergedRefs';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import getDisplayName from '../../prop-types/tools/getDisplayName';

interface BaseSwitcherProps {
  /**
   * expects to receive <SwitcherItem />
   */
  children: ReactNode;
  /**
   * Optionally provide a custom class to apply to the underlying `<ul>` node
   */
  className?: string;
  /**
   * Specify whether the panel is expanded
   */
  expanded?: boolean;
}

interface SwitcherWithAriaLabel extends BaseSwitcherProps {
  'aria-label': string;
  'aria-labelledby'?: never;
}

interface SwitcherWithAriaLabelledBy extends BaseSwitcherProps {
  'aria-label'?: never;
  'aria-labelledby': string;
}

type SwitcherProps = SwitcherWithAriaLabel | SwitcherWithAriaLabelledBy;

const Switcher = forwardRef<HTMLUListElement, SwitcherProps>(function Switcher(
  props,
  forwardRef
) {
  const switcherRef = useRef<HTMLUListElement>(null);
  const ref = useMergedRefs<HTMLUListElement | null>([switcherRef, forwardRef]);

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
    [customClassName || '']: !!customClassName,
  });

  const handleSwitcherItemFocus = ({
    currentIndex,
    direction,
  }: {
    currentIndex: number;
    direction: number;
  }) => {
    const enabledIndices = React.Children.toArray(children).reduce<number[]>(
      (acc, curr, i) => {
        if (Object.keys((curr as any).props).length !== 0) {
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

    const switcherItem = switcherRef.current?.children[nextValidIndex]
      ?.children[0] as HTMLElement;
    if (switcherItem) {
      switcherItem.focus();
    }
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    // only setup click handlers if onChange event is passed
    if (
      React.isValidElement(child) &&
      child.type &&
      getDisplayName(child.type) === 'Switcher'
    ) {
      return React.cloneElement(child as React.ReactElement<any>, {
        handleSwitcherItemFocus,
        index,
        key: index,
        expanded,
      });
    }

    return React.cloneElement(child as React.ReactElement<any>, {
      index,
      key: index,
      expanded,
    });
  });

  return (
    <ul
      ref={ref as React.RefObject<HTMLUListElement>}
      className={className}
      {...accessibilityLabel}>
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
