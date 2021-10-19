/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from '../../Link';
import {
  Checkbox16,
  CheckboxCheckedFilled16,
  ChevronDown16,
} from '@carbon/icons-react';
import { keys, matches } from '../../../internal/keyboard';
import deprecate from '../../../prop-types/deprecate';
import { composeEventHandlers } from '../../../tools/events';
import { PrefixContext, usePrefix } from '../../../internal/usePrefix';

export const Tile = React.forwardRef(function Tile(
  { children, className, light = false, ...rest },
  ref
) {
  const prefix = usePrefix();

  const tileClasses = cx(
    `${prefix}--tile`,
    {
      [`${prefix}--tile--light`]: light,
    },
    className
  );
  return (
    <div className={tileClasses} ref={ref} {...rest}>
      {children}
    </div>
  );
});

Tile.displayName = 'Tile';
Tile.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Tile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),
};

export const ClickableTile = React.forwardRef(function ClickableTile(
  {
    children,
    className,
    clicked = false,
    handleClick,
    handleKeyDown,
    href,
    light = false,
    onClick = () => {},
    onKeyDown = () => {},
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const classes = cx(
    `${prefix}--tile`,
    `${prefix}--tile--clickable`,
    {
      [`${prefix}--tile--is-clicked`]: clicked,
      [`${prefix}--tile--light`]: light,
    },
    className
  );

  const [isSelected, setIsSelected] = useState(clicked);

  // TODO: replace with onClick when handleClick prop is deprecated
  const clickHandler = handleClick || onClick;

  // TODO: replace with onClick when handleClick prop is deprecated
  const keyDownHandler = handleKeyDown || onKeyDown;

  function handleOnClick(evt) {
    evt.persist();
    setIsSelected(!isSelected);
    clickHandler(evt);
  }

  function handleOnKeyDown(evt) {
    evt.persist();
    if (matches(evt, [keys.Enter, keys.Space])) {
      evt.preventDefault();
      setIsSelected(!isSelected);
      keyDownHandler(evt);
    }
    keyDownHandler(evt);
  }

  return (
    <Link
      className={classes}
      href={href}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      ref={ref}
      {...rest}>
      {children}
    </Link>
  );
});

ClickableTile.displayName = 'ClickableTile';
ClickableTile.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * Boolean for whether a tile has been clicked.
   */
  clicked: PropTypes.bool,

  /**
   * Deprecated in v11. Use 'onClick' instead.
   */
  handleClick: deprecate(
    PropTypes.func,
    'The handleClick prop for ClickableTile has been deprecated in favor of onClick. It will be removed in the next major release.'
  ),

  /**
   * Specify the function to run when the ClickableTile is interacted with via a keyboard
   */
  handleKeyDown: deprecate(
    PropTypes.func,
    'The handleKeyDown prop for ClickableTile has been deprecated in favor of onKeyDown. It will be removed in the next major release.'
  ),

  /**
   * The href for the link.
   */
  href: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Tile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * Specify the function to run when the ClickableTile is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the function to run when the ClickableTile is interacted with via a keyboard
   */
  onKeyDown: PropTypes.func,

  /**
   * The rel property for the link.
   */
  rel: PropTypes.string,
};

export const SelectableTile = React.forwardRef(function SelectableTile(
  {
    children,
    className,
    disabled,
    handleClick,
    handleKeyDown,
    // TODO: Remove iconDescription prop in the next major release
    // eslint-disable-next-line no-unused-vars
    iconDescription,
    id,
    light = false,
    name,
    onClick = () => {},
    onChange = () => {},
    onKeyDown = () => {},
    selected = false,
    tabIndex = 0,
    title = 'title',
    value = 'value',
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  // TODO: replace with onClick when handleClick prop is deprecated
  const clickHandler = handleClick || onClick;

  // TODO: replace with onKeyDown when handleKeyDown prop is deprecated
  const keyDownHandler = handleKeyDown || onKeyDown;

  const [isSelected, setIsSelected] = useState(selected);
  const [prevSelected, setPrevSelected] = useState(selected);

  const classes = cx(
    `${prefix}--tile`,
    `${prefix}--tile--selectable`,
    {
      [`${prefix}--tile--is-selected`]: isSelected,
      [`${prefix}--tile--light`]: light,
      [`${prefix}--tile--disabled`]: disabled,
    },
    className
  );
  const inputClasses = cx(`${prefix}--tile-input`, {
    [`${prefix}--tile-input--checked`]: isSelected,
  });

  // TODO: rename to handleClick when handleClick prop is deprecated
  function handleOnClick(evt) {
    evt.preventDefault();
    evt.persist();
    setIsSelected(!isSelected);
    clickHandler(evt);
    onChange(evt);
  }

  // TODO: rename to handleKeyDown when handleKeyDown prop is deprecated
  function handleOnKeyDown(evt) {
    evt.persist();
    if (matches(evt, [keys.Enter, keys.Space])) {
      evt.preventDefault();
      setIsSelected(!isSelected);
      onChange(evt);
    }
    keyDownHandler(evt);
  }

  function handleChange(event) {
    setIsSelected(event.target.checked);
    onChange(event);
  }

  if (selected !== prevSelected) {
    setIsSelected(selected);
    setPrevSelected(selected);
  }

  return (
    <>
      <input
        checked={isSelected}
        className={inputClasses}
        disabled={disabled}
        id={id}
        name={name}
        onChange={!disabled ? handleChange : null}
        ref={ref}
        tabIndex={-1}
        title={title}
        type="checkbox"
        value={value}
      />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label
        className={classes}
        htmlFor={id}
        onClick={!disabled ? handleOnClick : null}
        onKeyDown={!disabled ? handleOnKeyDown : null}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={!disabled ? tabIndex : null}
        {...rest}>
        <span
          className={`${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent`}>
          {isSelected ? <CheckboxCheckedFilled16 /> : <Checkbox16 />}
        </span>
        <span className={`${prefix}--tile-content`}>{children}</span>
      </label>
    </>
  );
});

SelectableTile.displayName = 'SelectableTile';
SelectableTile.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the SelectableTile should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the function to run when the SelectableTile is clicked
   */
  handleClick: deprecate(
    PropTypes.func,
    'The `handleClick` prop for `SelectableTile` has been deprecated in favor of `onClick`. It will be removed in the next major release.'
  ),

  /**
   * Specify the function to run when the SelectableTile is interacted with via a keyboard
   */
  handleKeyDown: deprecate(
    PropTypes.func,
    'The `handleKeyDown` prop for `SelectableTile` has been deprecated in favor of `onKeyDown`. It will be removed in the next major release.'
  ),

  /**
   * The description of the checkmark icon.
   */
  iconDescription: deprecate(
    PropTypes.string,
    'The `iconDescription` prop for `SelectableTile` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),

  /**
   * The ID of the `<input>`.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Tile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * The `name` of the `<input>`.
   */
  name: PropTypes.string,

  /**
   * The empty handler of the `<input>`.
   */
  onChange: PropTypes.func,

  /**
   * Specify the function to run when the SelectableTile is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the function to run when the SelectableTile is interacted with via a keyboard
   */
  onKeyDown: PropTypes.func,

  /**
   * `true` to select this tile.
   */
  selected: PropTypes.bool,

  /**
   * Specify the tab index of the wrapper element
   */
  tabIndex: PropTypes.number,

  /**
   * The `title` of the `<input>`.
   */
  title: PropTypes.string,

  /**
   * The value of the `<input>`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export class ExpandableTile extends Component {
  state = {};

  static propTypes = {
    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * `true` if the tile is expanded.
     */
    expanded: PropTypes.bool,

    /**
     * Deprecated in v11. Use 'onClick' instead.
     */
    handleClick: deprecate(
      PropTypes.func,
      'The handleClick prop for ClickableTile has been deprecated in favor of onClick. It will be removed in the next major release.'
    ),

    /**
     * An ID that can be provided to aria-labelledby
     */
    id: PropTypes.string,

    /**
     * `true` to use the light version. For use on $ui-01 backgrounds only.
     * Don't use this to make tile background color same as container background color.
     */
    light: deprecate(
      PropTypes.bool,
      'The `light` prop for `Tile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
    ),

    /**
     * optional handler to decide whether to ignore a click. returns false if click should be ignored
     */
    onBeforeClick: PropTypes.func,

    /**
      * Specify the function to run when the ExpandableTile is clicked
 
      */
    onClick: PropTypes.func,

    /**
     * optional handler to trigger a function when a key is pressed
     */
    onKeyUp: PropTypes.func,

    /**
     * The `tabindex` attribute.
     */
    tabIndex: PropTypes.number,

    /**
     * The description of the "collapsed" icon that can be read by screen readers.
     */
    tileCollapsedIconText: PropTypes.string,

    /**
     * When "collapsed", a label to appear next to the chevron (e.g., "View more").
     */
    tileCollapsedLabel: PropTypes.string,

    /**
     * The description of the "expanded" icon that can be read by screen readers.
     */
    tileExpandedIconText: PropTypes.string,

    /**
     * When "expanded", a label to appear next to the chevron (e.g., "View less").
     */
    tileExpandedLabel: PropTypes.string,
  };

  static defaultProps = {
    tabIndex: 0,
    expanded: false,
    tileMaxHeight: 0,
    tilePadding: 0,
    onBeforeClick: () => true,
    onClick: () => {},
    tileCollapsedIconText: 'Interact to expand Tile',
    tileExpandedIconText: 'Interact to collapse Tile',
    light: false,
  };

  static contextType = PrefixContext;

  static getDerivedStateFromProps(
    // eslint-disable-next-line react/prop-types
    { expanded, tileMaxHeight, tilePadding },
    state
  ) {
    const {
      prevExpanded,
      prevTileMaxHeight,
      prevTilePadding,
      expanded: currentExpanded,
      tileMaxHeight: currentTileMaxHeight,
      tilePadding: currentTilePadding,
    } = state;
    const expandedChanged = prevExpanded !== expanded;
    const tileMaxHeightChanged = prevTileMaxHeight !== tileMaxHeight;
    const tilePaddingChanged = prevTilePadding !== tilePadding;
    return !expandedChanged && !tileMaxHeightChanged && !tilePaddingChanged
      ? null
      : {
          expanded: !expandedChanged ? currentExpanded : expanded,
          tileMaxHeight: !tileMaxHeightChanged
            ? currentTileMaxHeight
            : tileMaxHeight,
          tilePadding: !tilePaddingChanged ? currentTilePadding : tilePadding,
          prevExpanded: expanded,
          prevTileMaxHeight: tileMaxHeight,
          prevTilePadding: tilePadding,
        };
  }

  componentDidMount = () => {
    if (this.tile) {
      const getStyle = window.getComputedStyle(this.tile, null);

      if (this.aboveTheFold) {
        this.setState({
          tileMaxHeight: this.aboveTheFold.getBoundingClientRect().height,
          tilePadding:
            parseInt(getStyle.getPropertyValue('padding-top'), 10) +
            parseInt(getStyle.getPropertyValue('padding-bottom'), 10),
        });
      }
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.expanded !== this.props.expanded) {
      this.setMaxHeight();
    }
  };

  setMaxHeight = () => {
    if (this.state.expanded ? this.tileContent : this.aboveTheFold) {
      this.setState({
        tileMaxHeight: this.state.expanded
          ? this.tileContent.getBoundingClientRect().height
          : this.aboveTheFold.getBoundingClientRect().height,
      });
    }
  };

  handleClick = (evt) => {
    if (!this.props.onBeforeClick(evt) || evt.target.tagName === 'INPUT') {
      return;
    }
    evt.persist();
    this.setState(
      {
        expanded: !this.state.expanded,
      },
      () => {
        this.setMaxHeight();
        // TODO: Remove handleClick prop when handleClick is deprecated
        this.props.handleClick?.(evt) || this.props.onClick?.(evt);
      }
    );
  };

  handleKeyUp = (evt) => {
    if (evt.target !== this.tile) {
      if (matches(evt, [keys.Enter, keys.Space])) {
        evt.preventDefault();
      }
    }
  };

  getChildren = () => {
    return React.Children.toArray(this.props.children);
  };

  render() {
    const {
      tabIndex,
      className,
      expanded, // eslint-disable-line
      tileMaxHeight, // eslint-disable-line
      tilePadding, // eslint-disable-line
      handleClick, // eslint-disable-line
      onClick,
      onKeyUp,
      tileCollapsedIconText,
      tileExpandedIconText,
      tileCollapsedLabel,
      tileExpandedLabel,
      onBeforeClick, // eslint-disable-line
      light,
      ...rest
    } = this.props;

    const prefix = this.context;

    const { expanded: isExpanded } = this.state;

    const classes = cx(
      `${prefix}--tile`,
      `${prefix}--tile--expandable`,
      {
        [`${prefix}--tile--is-expanded`]: isExpanded,
        [`${prefix}--tile--light`]: light,
      },
      className
    );

    const tileStyle = {
      maxHeight: isExpanded
        ? null
        : this.state.tileMaxHeight + this.state.tilePadding,
    };

    const childrenAsArray = this.getChildren();

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <button
        type="button"
        ref={(tile) => {
          this.tile = tile;
        }}
        style={tileStyle}
        className={classes}
        aria-expanded={isExpanded}
        title={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
        {...rest}
        onKeyUp={composeEventHandlers([onKeyUp, this.handleKeyUp])}
        onClick={composeEventHandlers([onClick, this.handleClick])}
        tabIndex={tabIndex}>
        <div
          ref={(tileContent) => {
            this.tileContent = tileContent;
          }}>
          <div
            ref={(aboveTheFold) => {
              this.aboveTheFold = aboveTheFold;
            }}
            className={`${prefix}--tile-content`}>
            {childrenAsArray[0]}
          </div>
          <div className={`${prefix}--tile__chevron`}>
            <span>{isExpanded ? tileExpandedLabel : tileCollapsedLabel}</span>
            <ChevronDown16 />
          </div>
          <div className={`${prefix}--tile-content`}>{childrenAsArray[1]}</div>
        </div>
      </button>
    );
  }
}

export const TileAboveTheFoldContent = React.forwardRef(
  function TileAboveTheFoldContent({ children }, ref) {
    const prefix = usePrefix();

    return (
      <span ref={ref} className={`${prefix}--tile__above-the-fold`}>
        {children}
      </span>
    );
  }
);

TileAboveTheFoldContent.displayName = 'TileAboveTheFoldContent';
TileAboveTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export const TileBelowTheFoldContent = React.forwardRef(
  function TileBelowTheFoldContent({ children }, ref) {
    const prefix = usePrefix();

    return (
      <span ref={ref} className={`${prefix}--tile-content__below-the-fold`}>
        {children}
      </span>
    );
  }
);

TileBelowTheFoldContent.displayName = 'TileBelowTheFoldContent';
TileBelowTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};
