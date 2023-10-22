/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';
import deprecate from '../../prop-types/deprecate';
import { LayoutConstraint } from '../Layout';
import { composeEventHandlers } from '../../tools/events';
import { getNextIndex, matches, keys } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';

interface SwitchEventHandlersParams {
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
  children?: ReactElement[];

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
   * Specify an `onChange` handler that is called whenever the ContentSwitcher
   * changes which item is selected
   */
  onChange: (params: SwitchEventHandlersParams) => void;

  /**
   * Specify a selected index for the initially selected content
   */
  selectedIndex: number;

  /**
   * Choose whether or not to automatically change selection on focus
   */
  selectionMode: 'automatic' | 'manual';

  /**
   * Specify the size of the Content Switcher. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size: 'sm' | 'md' | 'lg';
}

interface ContentSwitcherState {
  selectedIndex?: number;
}

export default class ContentSwitcher extends React.Component<
  ContentSwitcherProps,
  ContentSwitcherState
> {
  /**
   * The DOM references of child `<Switch>`.
   * @type {Array<Element>}
   * @private
   */
  _switchRefs: HTMLButtonElement[] = [];

  state = {
    selectedIndex: undefined,
  };

  static propTypes = {
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
     * Specify an `onChange` handler that is called whenever the ContentSwitcher
     * changes which item is selected
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Specify a selected index for the initially selected content
     */
    selectedIndex: PropTypes.number,

    /**
     * Choose whether or not to automatically change selection on focus
     */
    selectionMode: PropTypes.oneOf(['automatic', 'manual']),

    /**
     * Specify the size of the Content Switcher. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
  };

  static contextType = PrefixContext;

  static getDerivedStateFromProps({ selectedIndex = 0 }, state) {
    const { prevSelectedIndex } = state;
    return prevSelectedIndex === selectedIndex
      ? null
      : {
          selectedIndex,
          prevSelectedIndex: selectedIndex,
        };
  }

  handleItemRef = (index) => (ref) => {
    this._switchRefs[index] = ref;
  };

  handleChildChange = (data) => {
    const { selectionMode = 'automatic' } = this.props;
    // the currently selected child index
    const { selectedIndex } = this.state;
    // the newly selected child index
    const { index } = data;
    const { key } = data;

    if (matches(data, [keys.ArrowRight, keys.ArrowLeft])) {
      const nextIndex = getNextIndex(
        key,
        index,
        this.props.children?.length as number
      );
      const children = React.Children.toArray(this.props.children);
      if (selectionMode === 'manual') {
        const switchRef = this._switchRefs[nextIndex as number];
        switchRef && switchRef.focus();
      } else {
        this.setState(
          {
            selectedIndex: nextIndex,
          },
          () => {
            if (typeof this.state.selectedIndex !== 'number') {
              return;
            }

            const child = children[this.state.selectedIndex] as ReactElement;
            const switchRef = this._switchRefs[this.state.selectedIndex];
            switchRef && switchRef.focus();
            this.props.onChange({
              ...data,
              index: this.state.selectedIndex,
              name: child.props.name,
              text: child.props.text,
            });
          }
        );
      }
    } else if (selectedIndex !== index) {
      this.setState({ selectedIndex: index }, () => {
        const switchRef = this._switchRefs[index];
        switchRef && switchRef.focus();
        this.props.onChange(data);
      });
    }
  };

  render() {
    const prefix = this.context;
    const {
      children,
      className,
      light,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      selectedIndex = 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      selectionMode = 'automatic',
      size,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange = noopFn,
      ...other
    } = this.props;

    const isIconOnly = React.Children?.map(children, (child) => {
      return (
        (child as { type: { displayName: string } }).type.displayName ===
        'IconSwitch'
      );
    })?.every((val) => val === true);

    const classes = classNames(`${prefix}--content-switcher`, className, {
      [`${prefix}--content-switcher--light`]: light,
      [`${prefix}--content-switcher--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
      [`${prefix}--content-switcher--icon-only`]: isIconOnly,
    });

    return (
      <LayoutConstraint
        size={{ default: 'md', min: 'sm', max: 'lg' }}
        {...other}
        className={classes}
        role="tablist"
        onChange={undefined}>
        {children &&
          React.Children.map(children, (child: ReactElement, index) =>
            React.cloneElement(child, {
              index,
              onClick: composeEventHandlers([
                this.handleChildChange,
                child.props.onClick,
              ]),
              onKeyDown: this.handleChildChange,
              selected: index === this.state.selectedIndex,
              ref: this.handleItemRef(index),
              size,
            })
          )}
      </LayoutConstraint>
    );
  }
}
