/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Checkbox,
  CheckboxCheckedFilled,
  ChevronDown,
  Error,
  ArrowRight,
  AiLabel,
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
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Tile` component
   */
  decorator?: ReactNode;
  /** @deprecated */
  light?: boolean;

  /**
   * **Experimental**: Specify if the `Tile` component should be rendered with rounded corners. Only valid
   * when an AILabel is present
   */
  hasRoundedCorners?: boolean;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Tile` component
   */
  slug?: ReactNode;
}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(function Tile(
  {
    children,
    className,
    decorator,
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
      [`${prefix}--tile--decorator`]: decorator,
      [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
    },
    className
  );
  return (
    <div className={tileClasses} ref={ref} {...rest}>
      {children}
      {slug}
      {decorator && (
        <div className={`${prefix}--tile--inner-decorator`}>{decorator}</div>
      )}
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
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Tile` component
   */
  decorator: PropTypes.node,

  /**
   * **Experimental**: Specify if the `Tile` component should be rendered with rounded corners. Only valid
   * when an AILabel is present
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
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `Tile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),
};

export interface ClickableTileProps extends HTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component or set the boolean to True for an AILabel icon to be rendered inside the `ClickableTile` component
   */
  decorator?: boolean | ReactNode;

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
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

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
   * @deprecated please use `decorator` instead.
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
    decorator,
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
      [`${prefix}--tile--decorator`]: decorator,
      [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
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
      {slug || decorator ? (
        <div className={`${prefix}--tile-content`}>{children}</div>
      ) : (
        children
      )}
      {(slug === true || decorator === true) && (
        <AiLabel size="24" className={`${prefix}--tile--ai-label-icon`} />
      )}
      {React.isValidElement(decorator) && (
        <div className={`${prefix}--tile--inner-decorator`}>{decorator}</div>
      )}
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
   * **Experimental**: Provide a `decorator` component or set the boolean to True for an AILabel icon to be rendered inside the `ClickableTile` component
   */
  decorator: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

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
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export interface SelectableTileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `SelectableTile` component
   */
  decorator?: ReactNode;

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
  onChange?(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    selected?: boolean,
    id?: string
  ): void;

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
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `SelectableTile` component
   */
  slug?: ReactNode;

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
  value?: string | number;
}

export const SelectableTile = React.forwardRef<
  HTMLDivElement,
  SelectableTileProps
>(function SelectableTile(
  {
    children,
    className,
    decorator,
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

  // Use useEffect to sync with prop changes instead of render-time logic
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const classes = cx(
    `${prefix}--tile`,
    `${prefix}--tile--selectable`,
    {
      [`${prefix}--tile--is-selected`]: isSelected,
      [`${prefix}--tile--light`]: light,
      [`${prefix}--tile--disabled`]: disabled,
      [`${prefix}--tile--slug`]: slug,
      [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
      [`${prefix}--tile--decorator`]: decorator,
      [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
    },
    className
  );

  // Single function to handle selection changes
  const handleSelectionChange = useCallback(
    (
      evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
      newSelected: boolean
    ) => {
      setIsSelected(newSelected);
      onChange(evt, newSelected, id);
    },
    [onChange, id]
  );

  function handleClick(evt: MouseEvent<HTMLDivElement>) {
    evt.preventDefault();
    evt?.persist?.();
    if (
      normalizedDecorator &&
      decoratorRef.current &&
      evt.target instanceof Node &&
      decoratorRef.current.contains(evt.target)
    ) {
      return;
    }

    const newSelected = !isSelected;
    handleSelectionChange(evt, newSelected);
    clickHandler(evt);
  }

  function handleKeyDown(evt: KeyboardEvent<HTMLDivElement>) {
    evt?.persist?.();
    if (matches(evt, [keys.Enter, keys.Space])) {
      evt.preventDefault();
      const newSelected = !isSelected;
      handleSelectionChange(evt, newSelected);
    }
    keyDownHandler(evt);
  }

  // AILabel is always size `xs`
  const decoratorRef = useRef<HTMLInputElement>(null);
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'xs', ref: decoratorRef })
    : null;

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      className={classes}
      onClick={!disabled ? handleClick : undefined}
      role="checkbox"
      aria-checked={isSelected}
      onKeyDown={!disabled ? handleKeyDown : undefined}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={!disabled ? tabIndex : undefined}
      ref={ref}
      id={id}
      title={title}
      {...rest}>
      <span
        className={`${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent`}>
        {isSelected ? <CheckboxCheckedFilled /> : <Checkbox />}
      </span>
      <Text as="label" htmlFor={id} className={`${prefix}--tile-content`}>
        {children}
      </Text>
      {slug ? (
        normalizedDecorator
      ) : decorator ? (
        <div className={`${prefix}--tile--inner-decorator`}>
          {normalizedDecorator}
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

SelectableTile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `SelectableTile` component
   */
  decorator: PropTypes.node,

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
  name: deprecate(
    PropTypes.string,
    'The `name` property is no longer used.  It will be removed in the next major release.'
  ),

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
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `SelectableTile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

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
  value: deprecate(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'The `value` property is no longer used.  It will be removed in the next major release.`'
  ),
};

export interface ExpandableTileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ExpandableTile` component
   */
  decorator?: ReactNode;

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
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ExpandableTile` component
   */
  slug?: ReactNode;

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
    decorator,
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
  const chevronInteractiveRef = useRef<HTMLButtonElement>(null);
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
    if (
      evt.target !== tile.current &&
      evt.target !== chevronInteractiveRef.current
    ) {
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
      [`${prefix}--tile--decorator`]: decorator,
      [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
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
      !(slug || decorator)
    ) {
      setInteractive(false);
    }
  }, [slug, decorator]);

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

  // AILabel is always size `xs`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'xs' })
    : null;

  return interactive ? (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={interactiveClassNames}
      {...rest}>
      <div ref={tileContent}>
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--tile--inner-decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
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
          ref={chevronInteractiveRef}
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
      ref={ref as Ref<HTMLButtonElement>}
      className={classNames}
      aria-expanded={isExpanded}
      title={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
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
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ExpandableTile` component
   */
  decorator: PropTypes.node,

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
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `ExpandableTile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

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
  HTMLDivElement,
  TileAboveTheFoldContentProps
>(function TilAboveTheFoldContent({ children }, ref) {
  const prefix = usePrefix();

  return (
    <div ref={ref} className={`${prefix}--tile-content__above-the-fold`}>
      {children}
    </div>
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
  HTMLDivElement,
  TileBelowTheFoldContentProps
>(function TileBelowTheFoldContent({ children }, ref) {
  const prefix = usePrefix();

  return (
    <div ref={ref} className={`${prefix}--tile-content__below-the-fold`}>
      {children}
    </div>
  );
});

TileBelowTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};
TileBelowTheFoldContent.displayName = 'TileBelowTheFoldContent';
