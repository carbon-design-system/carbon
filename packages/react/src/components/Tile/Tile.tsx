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
import PropTypes, { ReactNodeLike } from 'prop-types';
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
import { Text } from '../Text';

export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /** @deprecated */
  light?: boolean;

  /**
   * **Experimental**: Specify if the `Tile` component should be rendered with rounded corners. Only valid
   * when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `SelectableTile` component
   */
  slug?: ReactNodeLike;
}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(function Tile(
  {
    children,
    className,
    light = false,
    slug,
    hasRoundedCorners = false,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const tileClasses = cx(
    `${prefix}--tile`,
    {
      [`${prefix}--tile--light`]: light,
      [`${prefix}--tile--slug`]: slug,
      [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
    },
    className
  );
  return (
    <div className={tileClasses} ref={ref} {...rest}>
      {children}
      {slug}
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
   * **Experimental**: Specify if the `Tile` component should be rendered with rounded corners. Only valid
   * when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

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

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Tile` component
   */
  slug: PropTypes.node,
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
   * **Experimental**: Specify if the `ClickableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

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

  /**
   * **Experimental**: Specify if a `Slug` icon should be rendered inside the `ClickableTile`
   */
  slug?: boolean;
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
    hasRoundedCorners,
    slug,
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
      [`${prefix}--tile--slug`]: slug,
      [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
    },
    className
  );

  const [isSelected, setIsSelected] = useState(clicked);

  function handleOnClick(evt: MouseEvent) {
    evt?.persist?.();
    setIsSelected(!isSelected);
    onClick(evt);
  }

  function handleOnKeyDown(evt: KeyboardEvent) {
    evt?.persist?.();
    if (matches(evt, [keys.Enter, keys.Space])) {
      setIsSelected(!isSelected);
    }
    onKeyDown(evt);
  }

  // To Do: Replace with an an icon from `@carbon/react`
  // since the hollow slug in `ClickableTile` is not interactive
  const hollowSlugIcon = (
    <svg
      className={`${prefix}--tile--slug-icon`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="23" height="23" />
      <path
        d="M13.2436 16H11.5996L10.9276 13.864H7.95164L7.29164 16H5.68364L8.49164 7.624H10.4596L13.2436 16ZM10.5436 12.508L9.46364 9.064H9.40364L8.33564 12.508H10.5436ZM17.9341 16H14.1301V14.728H15.2341V8.896H14.1301V7.624H17.9341V8.896H16.8181V14.728H17.9341V16Z"
        fill="#161616"
      />
    </svg>
  );

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
      tabIndex={!href && !disabled ? 0 : undefined}
      onClick={!disabled ? handleOnClick : undefined}
      onKeyDown={handleOnKeyDown}
      ref={ref}
      disabled={disabled}
      {...rest}>
      {slug ? (
        <div className={`${prefix}--tile-content`}>{children}</div>
      ) : (
        children
      )}
      {slug && hollowSlugIcon}
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
   * **Experimental**: Specify if the `ClickableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

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
   * **Experimental**: Specify if the `SelectableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `SelectableTile` component
   */
  slug?: ReactNodeLike;

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
    slug,
    hasRoundedCorners,
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
    {
      [`${prefix}--tile--is-selected`]: isSelected,
      [`${prefix}--tile--light`]: light,
      [`${prefix}--tile--disabled`]: disabled,
      [`${prefix}--tile--slug`]: slug,
      [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
    },
    className
  );

  // TODO: rename to handleClick when handleClick prop is deprecated
  function handleOnClick(evt) {
    evt.preventDefault();
    evt?.persist?.();
    if (slug && slugRef.current && slugRef.current.contains(evt.target)) {
      return;
    }
    setIsSelected(!isSelected);
    clickHandler(evt);
    onChange(evt);
  }

  // TODO: rename to handleKeyDown when handleKeyDown prop is deprecated
  function handleOnKeyDown(evt) {
    evt?.persist?.();
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

  // Slug is always size `xs`
  const slugRef = useRef<HTMLInputElement>(null);
  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'xs',
      ref: slugRef,
    });
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
      <Text as="label" htmlFor={id} className={`${prefix}--tile-content`}>
        {children}
      </Text>
      {normalizedSlug}
    </div>
  );
});

SelectableTile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Specify whether the SelectableTile should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * **Experimental**: Specify if the `SelectableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `SelectableTile` component
   */
  slug: PropTypes.node,

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
   * **Experimental**: Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ExpandableTile` component
   */
  slug?: ReactNodeLike;

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
    slug,
    hasRoundedCorners,
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
    evt?.persist?.();
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
    {
      [`${prefix}--tile--is-expanded`]: isExpanded,
      [`${prefix}--tile--light`]: light,
      [`${prefix}--tile--slug`]: slug,
      [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
    },
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
      !getRoleContent(aboveTheFold.current) &&
      !slug
    ) {
      setInteractive(false);
    }
  }, [slug]);

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

  // Slug is always size `xs`
  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'xs',
    });
  }

  return interactive ? (
    <div
      // @ts-expect-error: Needlesly strict & deep typing for the element type
      ref={ref}
      className={interactiveClassNames}
      {...rest}>
      <div ref={tileContent}>
        {normalizedSlug}
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
   * Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ExpandableTile` component
   */
  slug: PropTypes.node,

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
