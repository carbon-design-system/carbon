import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Checkbox,
  CheckboxCheckedFilled,
  ChevronDown,
} from '@carbon/icons-react';
import Link from '../Link';
import { keys, matches } from '../../internal/keyboard';
import deprecate from '../../prop-types/deprecate';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { getInteractiveContent } from '../../internal/useNoInteractiveChildren';
import { useMergedRefs } from '../../internal/useMergedRefs';

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
    disabled,
    href,
    light,
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

  function handleOnClick(evt) {
    evt.persist();
    setIsSelected(!isSelected);
    onClick(evt);
  }

  function handleOnKeyDown(evt) {
    evt.persist();
    if (matches(evt, [keys.Enter, keys.Space])) {
      evt.preventDefault();
      setIsSelected(!isSelected);
      onKeyDown(evt);
    }
    onKeyDown(evt);
  }

  return (
    <Link
      className={classes}
      href={href}
      onClick={!disabled ? handleOnClick : null}
      onKeyDown={handleOnKeyDown}
      ref={ref}
      disabled={disabled}
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
   * Specify whether the ClickableTile should be disabled
   */
  disabled: PropTypes.bool,

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
    'The `light` prop for `ClickableTile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
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
    id,
    light,
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

  const clickHandler = onClick;

  const keyDownHandler = onKeyDown;

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
    <div
      className={classes}
      onClick={!disabled ? handleOnClick : null}
      role="checkbox"
      aria-checked={isSelected}
      disabled={disabled}
      onKeyDown={!disabled ? handleOnKeyDown : null}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={!disabled ? tabIndex : null}
      value={value}
      name={name}
      ref={ref}
      id={id}
      onChange={!disabled ? handleChange : null}
      title={title}
      {...rest}>
      <span
        className={`${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent`}>
        {isSelected ? <CheckboxCheckedFilled /> : <Checkbox />}
      </span>
      <label htmlFor={id} className={`${prefix}--tile-content`}>
        {children}
      </label>
    </div>
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
   * The ID of the `<input>`.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `SelectableTile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
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

export const ExpandableTile = React.forwardRef(function ExpandableTile(
  {
    tabIndex,
    className,
    children,
    expanded,
    tileMaxHeight, // eslint-disable-line
    tilePadding, // eslint-disable-line
    onClick,
    onKeyUp,
    tileCollapsedIconText,
    tileExpandedIconText,
    tileCollapsedLabel,
    tileExpandedLabel,
    light,
    ...rest
  },
  forwardRef
) {
  const [isTileMaxHeight, setIsTileMaxHeight] = useState(tileMaxHeight);
  const [isTilePadding, setIsTilePadding] = useState(tilePadding);
  const [prevExpanded, setPrevExpanded] = useState(expanded);
  const [prevTileMaxHeight, setPrevTileMaxHeight] = useState(tileMaxHeight);
  const [prevTilePadding, setPrevTilePadding] = useState(tilePadding);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [interactive, setInteractive] = useState(true);
  const aboveTheFold = useRef(null);
  const belowTheFold = useRef(null);
  const tileContent = useRef(null);
  const tile = useRef(null);
  const prefix = usePrefix();
  const ref = useMergedRefs([forwardRef, tile]);

  if (expanded !== prevExpanded) {
    setIsExpanded(expanded);
    setPrevExpanded(expanded);
    setMaxHeight();
  }

  if (tileMaxHeight !== prevTileMaxHeight) {
    setIsTileMaxHeight(tileMaxHeight);
    setPrevTileMaxHeight(tileMaxHeight);
  }

  if (tilePadding !== prevTilePadding) {
    setIsTilePadding(tilePadding);
    setPrevTilePadding(tilePadding);
  }

  function setMaxHeight() {
    if (isExpanded) {
      setIsTileMaxHeight(tileContent.current.getBoundingClientRect().height);
    }

    setIsTileMaxHeight(aboveTheFold.current.getBoundingClientRect().height);
  }

  function handleClick(evt) {
    evt.persist();
    setIsExpanded(!isExpanded);
    setMaxHeight();
  }

  function handleKeyUp(evt) {
    if (evt.target !== tile.current) {
      if (matches(evt, [keys.Enter, keys.Space])) {
        evt.preventDefault();
      }
    }
  }

  function getChildren() {
    return React.Children.toArray(children);
  }

  const classNames = cx(
    `${prefix}--tile`,
    `${prefix}--tile--expandable`,
    {
      [`${prefix}--tile--is-expanded`]: isExpanded,
      [`${prefix}--tile--light`]: light,
    },
    className
  );

  const interactiveClassNames = cx(
    `${prefix}--tile`,
    `${prefix}--tile--expandable`,
    `${prefix}--tile--expandable--interactive`,
    {
      [`${prefix}--tile--is-expanded`]: isExpanded,
      [`${prefix}--tile--light`]: light,
    },
    className
  );

  const chevronInteractiveClassNames = cx(
    `${prefix}--tile__chevron`,
    `${prefix}--tile__chevron--interactive`
  );

  const childrenAsArray = getChildren();

  useIsomorphicEffect(() => {
    const getStyle = window.getComputedStyle(tile.current, null);
    const { current: node } = aboveTheFold;
    const { height } = node.getBoundingClientRect();
    const paddingTop = parseInt(getStyle.getPropertyValue('padding-top'), 10);
    const paddingBottom = parseInt(
      getStyle.getPropertyValue('padding-bottom'),
      10
    );

    setIsTileMaxHeight(height);
    setIsTilePadding(paddingTop + paddingBottom);
  }, [isTileMaxHeight]);

  useIsomorphicEffect(() => {
    if (!getInteractiveContent(belowTheFold.current)) {
      setInteractive(false);
      return;
    } else if (!getInteractiveContent(aboveTheFold.current)) {
      setInteractive(false);
    }
  }, []);

  useIsomorphicEffect(() => {
    if (isExpanded) {
      tile.current.style.maxHeight = null;
    } else {
      tile.current.style.maxHeight = isTileMaxHeight + isTilePadding + 'px';
    }
  }, [isExpanded, isTileMaxHeight, isTilePadding]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const [aboveTheFold] = entries;
      setIsTileMaxHeight(aboveTheFold.contentRect.height);
    });

    resizeObserver.observe(aboveTheFold.current);

    return () => resizeObserver.disconnect();
  }, []);
  return interactive ? (
    <div
      ref={ref}
      className={interactiveClassNames}
      aria-expanded={isExpanded}
      {...rest}>
      <div ref={tileContent}>
        <div ref={aboveTheFold} className={`${prefix}--tile-content`}>
          {childrenAsArray[0]}
        </div>
        <button
          type="button"
          aria-expanded={isExpanded}
          onKeyUp={composeEventHandlers([onKeyUp, handleKeyUp])}
          onClick={composeEventHandlers([onClick, handleClick])}
          aria-label={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
          className={chevronInteractiveClassNames}>
          <ChevronDown />
        </button>
        <div ref={belowTheFold} className={`${prefix}--tile-content`}>
          {childrenAsArray[1]}
        </div>
      </div>
    </div>
  ) : (
    <button
      type="button"
      ref={ref}
      className={classNames}
      aria-expanded={isExpanded}
      title={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
      {...rest}
      onKeyUp={composeEventHandlers([onKeyUp, handleKeyUp])}
      onClick={composeEventHandlers([onClick, handleClick])}
      tabIndex={tabIndex}>
      <div ref={tileContent}>
        <div ref={aboveTheFold} className={`${prefix}--tile-content`}>
          {childrenAsArray[0]}
        </div>
        <div className={`${prefix}--tile__chevron`}>
          <span>{isExpanded ? tileExpandedLabel : tileCollapsedLabel}</span>
          <ChevronDown />
        </div>
        <div ref={belowTheFold} className={`${prefix}--tile-content`}>
          {childrenAsArray[1]}
        </div>
      </div>
    </button>
  );
});

ExpandableTile.propTypes = {
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
   * An ID that can be provided to aria-labelledby
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ExpandableTile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

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

ExpandableTile.defaultProps = {
  tabIndex: 0,
  expanded: false,
  tileMaxHeight: 0,
  tilePadding: 0,
  onClick: () => {},
  tileCollapsedIconText: 'Interact to expand Tile',
  tileExpandedIconText: 'Interact to collapse Tile',
};

ExpandableTile.displayName = 'ExpandableTile';

export const TileAboveTheFoldContent = React.forwardRef(
  function TilAboveTheFoldContent({ children }, ref) {
    const prefix = usePrefix();

    return (
      <span ref={ref} className={`${prefix}--tile-content__above-the-fold`}>
        {children}
      </span>
    );
  }
);

TileAboveTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

TileAboveTheFoldContent.displayName = 'TileAboveTheFoldContent';

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

TileBelowTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

TileBelowTheFoldContent.displayName = 'TileBelowTheFoldContent';
