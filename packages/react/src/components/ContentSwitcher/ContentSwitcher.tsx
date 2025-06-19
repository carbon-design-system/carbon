/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
} from 'react';
import classNames from 'classnames';
import deprecate from '../../prop-types/deprecate';
import { LayoutConstraint } from '../Layout';
import { composeEventHandlers } from '../../tools/events';
import { getNextIndex, matches, keys } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import { IconSwitch } from '../Switch';

export interface SwitchEventHandlersParams {
  index?: number;
  name?: string | number;
  text?: string;
  key?: string | number;
}

export interface ContentSwitcherProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Pass in Switch components to be rendered in the ContentSwitcher
   */
  children?: ReactElement<any>[];

  /**
   * Specify an optional className to be added to the container node
   */
  className?: string;

  /**
   * `true` to use the light version.
   *
   * @deprecated The `light` prop for `ContentSwitcher` has
   *     been deprecated in favor of the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * `true` to use the low contrast version.
   */
  lowContrast?: boolean;

  /**
   * Specify an `onChange` handler that is called whenever the ContentSwitcher
   * changes which item is selected
   */
  onChange: (params: SwitchEventHandlersParams) => void;

  /**
   * Specify a selected index for the initially selected content
   */
  selectedIndex: number;

  /**
   * Choose whether or not to automatically change selection on focus when left/right arrow pressed. Defaults to 'automatic'
   */
  selectionMode?: 'automatic' | 'manual';

  /**
   * Specify the size of the Content Switcher. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size: 'sm' | 'md' | 'lg';
}

export const ContentSwitcher = ({
  children,
  className,
  light,
  lowContrast,
  selectedIndex: selectedIndexProp = 0,
  selectionMode = 'automatic',
  size,
  onChange = noopFn,
  ...other
}: ContentSwitcherProps) => {
  const prefix = useContext(PrefixContext);

  const [selectedIndex, setSelectedIndex] = useState(selectedIndexProp);

  const prevSelectedIndexRef = useRef(selectedIndexProp);
  const switchRefs = useRef<HTMLButtonElement[]>([]);

  const childrenArray = Children.toArray(children);

  useEffect(() => {
    if (prevSelectedIndexRef.current !== selectedIndexProp) {
      setSelectedIndex(selectedIndexProp);
      prevSelectedIndexRef.current = selectedIndexProp;
    }
  }, [selectedIndexProp]);

  const handleItemRef = (index: number) => (ref: HTMLButtonElement | null) => {
    if (ref) {
      switchRefs.current[index] = ref;
    }
  };

  const focusSwitch = (index: number) => {
    const ref = switchRefs.current[index];

    if (ref) {
      ref.focus();
    }
  };

  const isKeyboardEvent = (
    event: any
  ): event is KeyboardEvent<HTMLButtonElement> | globalThis.KeyboardEvent =>
    event && typeof event === 'object' && 'key' in event;

  const handleChildChange = (
    event: SwitchEventHandlersParams &
      (KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>)
  ) => {
    if (typeof event.index === 'undefined') return;

    const { index } = event;

    if (
      isKeyboardEvent(event) &&
      matches(event, [keys.ArrowRight, keys.ArrowLeft])
    ) {
      const nextIndex = getNextIndex(event.key, index, childrenArray.length);

      if (typeof nextIndex !== 'number') return;

      focusSwitch(nextIndex);

      if (selectionMode !== 'manual') {
        const child = childrenArray[nextIndex];

        setSelectedIndex(nextIndex);

        if (isValidElement<SwitchEventHandlersParams>(child)) {
          onChange({
            ...event,
            index: nextIndex,
            name: child.props.name,
            text: child.props.text,
          });
        }
      }
    } else if (selectedIndex !== index) {
      setSelectedIndex(index);
      focusSwitch(index);
      onChange(event);
    }
  };

  const isIconOnly = Children.map(children, (child) => {
    return isValidElement(child) ? child.type === IconSwitch : null;
  })?.every((val) => val === true);

  const classes = classNames(`${prefix}--content-switcher`, className, {
    [`${prefix}--content-switcher--light`]: light,
    [`${prefix}--content-switcher--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--content-switcher--icon-only`]: isIconOnly,
    [`${prefix}--content-switcher--low-contrast`]: lowContrast,
  });

  return (
    <LayoutConstraint
      size={{ default: 'md', min: 'sm', max: 'lg' }}
      {...other}
      className={classes}
      role="tablist"
      onChange={undefined}>
      {children &&
        Children.map(children, (child, index) =>
          cloneElement(child, {
            index,
            onClick: composeEventHandlers([
              handleChildChange,
              child.props.onClick,
            ]),
            onKeyDown: composeEventHandlers([
              handleChildChange,
              child.props.onKeyDown,
            ]),
            selected: index === selectedIndex,
            ref: handleItemRef(index),
            size,
          })
        )}
    </LayoutConstraint>
  );
};

ContentSwitcher.displayName = 'ContentSwitcher';
ContentSwitcher.propTypes = {
  /**
   * Pass in Switch components to be rendered in the ContentSwitcher
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the container node
   */
  className: PropTypes.string,

  /**
   * `true` to use the light variant.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ContentSwitcher` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),

  /**
   * `true` to use the low contrast version.
   */
  lowContrast: PropTypes.bool,

  /**
   * Specify an `onChange` handler that is called whenever the ContentSwitcher
   * changes which item is selected
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Specify a selected index for the initially selected content
   */
  selectedIndex: PropTypes.number,

  /**
   * Choose whether or not to automatically change selection on focus when left/right arrow pressed. Defaults to 'automatic'
   */
  selectionMode: PropTypes.oneOf(['automatic', 'manual']),

  /**
   * Specify the size of the Content Switcher. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
