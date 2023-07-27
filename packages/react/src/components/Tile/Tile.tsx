import React, {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type HTMLAttributes,
  type ChangeEvent,
  type ComponentType,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Checkbox,
  CheckboxCheckedFilled,
  ChevronDown,
  Error,
  ArrowRight,
} from '@carbon/icons-react';
import Link from '../Link';
import { keys, matches } from '../../internal/keyboard';
import deprecate from '../../prop-types/deprecate';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import {
  getInteractiveContent,
  getRoleContent,
} from '../../internal/useNoInteractiveChildren';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useFeatureFlag } from '../FeatureFlags';
import { useId } from '../../internal/useId';

export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /** @deprecated */
  light?: boolean;
}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(function Tile(
  { children, className, light = false, ...rest },
  ref
) {
  const prefix = usePrefix();

  const tileClasses = cx(
    `${prefix}--tile`,
    light && `${prefix}--tile--light`,
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
   *
   * @deprecated
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Tile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),
};

export interface ClickableTileProps extends HTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  className?: string;

  /** @deprecated */
  light?: boolean;

  /**
   * Boolean for whether a tile has been clicked.
   */
  clicked?: boolean;

  /**
   * Specify whether the ClickableTile should be disabled
   */
  disabled?: boolean;

  /**
   * The href for the link.
   */
  href?: string;

  /**
   * Optional prop to allow overriding the icon rendering.
   */
  renderIcon?: ComponentType<{ className?: string }>;

  /**
   * Specify the function to run when the ClickableTile is clicked
   */
  onClick?(event: MouseEvent): void;

  /**
   * Specify the function to run when the ClickableTile is interacted with via a keyboard
   */
  onKeyDown?(event: KeyboardEvent): void;

  /**
   * The rel property for the link.
   */
  rel?: string;
}

export const ClickableTile = React.forwardRef<
  HTMLAnchorElement,
  ClickableTileProps
>(function ClickableTile(
  {
    children,
    className,
    clicked = false,
    disabled,
    href,
    light,
    onClick = () => {},
    onKeyDown = () => {},
    renderIcon: Icon,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const classes = cx(
    `${prefix}--tile`,
    `${prefix}--tile--clickable`,
    clicked && `${prefix}--tile--is-clicked`,
    light && `${prefix}--tile--light`,
    className
  );

  const [isSelected, setIsSelected] = useState(clicked);

  function handleOnClick(evt: MouseEvent) {
    evt.persist();
    setIsSelected(!isSelected);
    onClick(evt);
  }

  function handleOnKeyDown(evt: KeyboardEvent) {
    evt.persist();
    if (matches(evt, [keys.Enter, keys.Space])) {
      evt.preventDefault();
      setIsSelected(!isSelected);
      onKeyDown(evt);
    }
    onKeyDown(evt);
  }

  const v12DefaultIcons = useFeatureFlag('enable-v12-tile-default-icons');
  if (v12DefaultIcons) {
    if (!Icon) {
      Icon = ArrowRight;
    }

    if (disabled) {
      Icon = Error;
    }
  }

  const iconClasses = cx({
    [`${prefix}--tile--icon`]:
      !v12DefaultIcons || (v12DefaultIcons && !disabled),
    [`${prefix}--tile--disabled-icon`]: v12DefaultIcons && disabled,
  });

  return (
    <Link
      className={classes}
      href={href}
      onClick={!disabled ? handleOnClick : undefined}
      onKeyDown={handleOnKeyDown}
      ref={ref}
      disabled={disabled}
      {...rest}>
      {children}
      {Icon && <Icon className={iconClasses} aria-hidden="true" />}
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

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  // @ts-expect-error: Invalid derived prop type, seemingly no real solution.
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export interface SelectableTileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;

  /** @deprecated */
  light?: boolean;

  /**
   * Specify whether the SelectableTile should be disabled
   */
  disabled?: boolean;

  /**
   * The ID of the `<input>`.
   */
  id?: string;

  /**
   * The `name` of the `<input>`.
   * @deprecated
   */
  name?: string;

  /**
   * The empty handler of the `<input>`.
   */
  onChange?(event: ChangeEvent<HTMLDivElement>): void;

  /**
   * Specify the function to run when the SelectableTile is clicked
   */
  onClick?(event: MouseEvent<HTMLDivElement>): void;

  /**
   * Specify the function to run when the SelectableTile is interacted with via a keyboard
   */
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void;

  /**
   * `true` to select this tile.
   */
  selected?: boolean;

  /**
   * Specify the tab index of the wrapper element
   */
  tabIndex?: number;

  /**
   * The `title` of the `<input>`.
   */
  title?: string;

  /**
   * The value of the `<input>`.
   * @deprecated
   */
  value: string | number;
}

export const SelectableTile = React.forwardRef<
  HTMLDivElement,
  SelectableTileProps
>(function SelectableTile(
  {
    children,
    className,
    disabled,
    id,
    light,
    onClick = () => {},
    onChange = () => {},
    onKeyDown = () => {},
    selected = false,
    tabIndex = 0,
    title = 'title',
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const clickHandler = onClick;
  const keyDownHandler = onKeyDown;

  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const [prevSelected, setPrevSelected] = useState<boolean>(selected);

  const classes = cx(
    `${prefix}--tile`,
    `${prefix}--tile--selectable`,
    isSelected && `${prefix}--tile--is-selected`,
    light && `${prefix}--tile--light`,
    disabled && `${prefix}--tile--disabled`,
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
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      className={classes}
      onClick={!disabled ? handleOnClick : undefined}
      role="checkbox"
      aria-checked={isSelected}
      onKeyDown={!disabled ? handleOnKeyDown : undefined}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={!disabled ? tabIndex : undefined}
      ref={ref}
      id={id}
      onChange={!disabled ? handleChange : undefined}
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
  children: PropTypes.node,
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
   * @deprecated
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
   * @deprecated
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export interface ExpandableTileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;

  /** @deprecated */
  light?: boolean;

  /**
   * `true` if the tile is expanded.
   */
  expanded?: boolean;

  /**
   * An ID that can be provided to aria-labelledby
   */
  id?: string;

  /**
   * Specify the function to run when the ExpandableTile is clicked
   */
  onClick?(event: MouseEvent): void;

  /**
   * optional handler to trigger a function when a key is pressed
   */
  onKeyUp?(event: KeyboardEvent): void;

  /**
   * The `tabindex` attribute.
   */
  tabIndex?: number;

  /**
   * The description of the "collapsed" icon that can be read by screen readers.
   */
  tileCollapsedIconText?: string;

  /**
   * When "collapsed", a label to appear next to the chevron (e.g., "View more").
   */
  tileCollapsedLabel?: string;

  /**
   * The description of the "expanded" icon that can be read by screen readers.
   */
  tileExpandedIconText?: string;

  /**
   * When "expanded", a label to appear next to the chevron (e.g., "View less").
   */
  tileExpandedLabel?: string;

  tileMaxHeight?: number;

  tilePadding?: number;
}

export const ExpandableTile = React.forwardRef<
  HTMLElement,
  ExpandableTileProps
>(function ExpandableTile(
  {
    tabIndex = 0,
    className,
    children,
    expanded = false,
    tileMaxHeight = 0, // eslint-disable-line
    tilePadding = 0, // eslint-disable-line
    onClick,
    onKeyUp,
    tileCollapsedIconText = 'Interact to expand Tile',
    tileExpandedIconText = 'Interact to collapse Tile',
    tileCollapsedLabel,
    tileExpandedLabel,
    light,
    ...rest
  },
  forwardRef
) {
  const [isTileMaxHeight, setIsTileMaxHeight] = useState<number>(tileMaxHeight);
  const [isTilePadding, setIsTilePadding] = useState<number>(tilePadding);
  const [prevExpanded, setPrevExpanded] = useState<boolean>(expanded);
  const [prevTileMaxHeight, setPrevTileMaxHeight] =
    useState<number>(tileMaxHeight);
  const [prevTilePadding, setPrevTilePadding] = useState<number>(tilePadding);
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);
  const [interactive, setInteractive] = useState<boolean>(true);
  const aboveTheFold = useRef<HTMLDivElement>(null);
  const belowTheFold = useRef<HTMLDivElement>(null);
  const tileContent = useRef<HTMLDivElement>(null);
  const tile = useRef<HTMLElement>(null);
  const ref = useMergedRefs([forwardRef, tile]);
  const prefix = usePrefix();

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
    if (isExpanded && tileContent.current) {
      setIsTileMaxHeight(tileContent.current.getBoundingClientRect()?.height);
    }

    if (aboveTheFold.current) {
      setIsTileMaxHeight(aboveTheFold.current.getBoundingClientRect().height);
    }
  }

  function handleClick(evt: MouseEvent) {
    evt.persist();
    setIsExpanded(!isExpanded);
    setMaxHeight();
  }

  function handleKeyUp(evt: KeyboardEvent) {
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
    isExpanded && `${prefix}--tile--is-expanded`,
    light && `${prefix}--tile--light`,
    className
  );

  const chevronInteractiveClassNames = cx(
    `${prefix}--tile__chevron`,
    `${prefix}--tile__chevron--interactive`
  );

  const childrenAsArray = getChildren();

  useIsomorphicEffect(() => {
    if (!tile.current || !aboveTheFold.current) {
      return;
    }

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
    if (!aboveTheFold.current || !belowTheFold.current) {
      return;
    }

    // Interactive elements or elements that are given a role should be treated
    // the same because elements with a role can not be rendered inside a `button`
    if (
      !getInteractiveContent(belowTheFold.current) &&
      !getRoleContent(belowTheFold.current) &&
      !getInteractiveContent(aboveTheFold.current) &&
      !getRoleContent(aboveTheFold.current)
    ) {
      setInteractive(false);
    }
  }, []);

  useIsomorphicEffect(() => {
    if (!tile.current) {
      return;
    }

    if (isExpanded) {
      tile.current.style.maxHeight = '';
    } else {
      tile.current.style.maxHeight = isTileMaxHeight + isTilePadding + 'px';
    }
  }, [isExpanded, isTileMaxHeight, isTilePadding]);

  useEffect(() => {
    if (!aboveTheFold.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const [aboveTheFold] = entries;
      setIsTileMaxHeight(aboveTheFold.contentRect.height);
    });
    resizeObserver.observe(aboveTheFold.current);

    return () => resizeObserver.disconnect();
  }, []);

  const belowTheFoldId = useId('expandable-tile-interactive');

  return interactive ? (
    <div
      // @ts-expect-error: Needlesly strict & deep typing for the element type
      ref={ref}
      className={interactiveClassNames}
      {...rest}>
      <div ref={tileContent}>
        <div ref={aboveTheFold} className={`${prefix}--tile-content`}>
          {childrenAsArray[0]}
        </div>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={belowTheFoldId}
          onKeyUp={composeEventHandlers([onKeyUp, handleKeyUp])}
          onClick={composeEventHandlers([onClick, handleClick])}
          aria-label={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
          className={chevronInteractiveClassNames}>
          <ChevronDown />
        </button>
        <div
          ref={belowTheFold}
          className={`${prefix}--tile-content`}
          id={belowTheFoldId}>
          {childrenAsArray[1]}
        </div>
      </div>
    </div>
  ) : (
    <button
      type="button"
      // @ts-expect-error: Needlesly strict & deep typing for the element type
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
  children: PropTypes.node,
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
ExpandableTile.displayName = 'ExpandableTile';

export interface TileAboveTheFoldContentProps {
  /**
   * The child nodes.
   */
  children?: ReactNode;
}

export const TileAboveTheFoldContent = React.forwardRef<
  HTMLSpanElement,
  TileAboveTheFoldContentProps
>(function TilAboveTheFoldContent({ children }, ref) {
  const prefix = usePrefix();

  return (
    <span ref={ref} className={`${prefix}--tile-content__above-the-fold`}>
      {children}
    </span>
  );
});

TileAboveTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};
TileAboveTheFoldContent.displayName = 'TileAboveTheFoldContent';

export interface TileBelowTheFoldContentProps {
  /**
   * The child nodes.
   */
  children?: ReactNode;
}

export const TileBelowTheFoldContent = React.forwardRef<
  HTMLSpanElement,
  TileBelowTheFoldContentProps
>(function TileBelowTheFoldContent({ children }, ref) {
  const prefix = usePrefix();

  return (
    <span ref={ref} className={`${prefix}--tile-content__below-the-fold`}>
      {children}
    </span>
  );
});

TileBelowTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};
TileBelowTheFoldContent.displayName = 'TileBelowTheFoldContent';
