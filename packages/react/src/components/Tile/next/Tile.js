import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ChevronDown16 } from '@carbon/icons-react';
import { keys, matches } from '../../../internal/keyboard';
import { composeEventHandlers } from '../../../tools/events';
import { usePrefix } from '../../../internal/usePrefix';
import useIsomorphicEffect from '../../../internal/useIsomorphicEffect';

export default function ExpandableTile({
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
  onBeforeClick,
  light,
  ...rest
}) {
  const [isTileMaxHeight, setIsTileMaxHeight] = useState(tileMaxHeight);
  const [isTilePadding, setIsTilePadding] = useState(tilePadding);
  const [prevExpanded, setPrevExpanded] = useState(expanded);
  const [prevTileMaxHeight, setPrevTileMaxHeight] = useState(tileMaxHeight);
  const [prevTilePadding, setPrevTilePadding] = useState(tilePadding);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const aboveTheFold = useRef(null);
  const tileContent = useRef(null);
  const tile = useRef(null);
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
    if (isExpanded) {
      setIsTileMaxHeight(tileContent.current.getBoundingClientRect().height);
    }

    setIsTileMaxHeight(aboveTheFold.current.getBoundingClientRect().height);
  }

  function handleClick(evt) {
    if (!onBeforeClick(evt) || evt.target.tagName === 'INPUT') {
      return;
    }

    evt.persist();
    setIsExpanded(!isExpanded);
    setMaxHeight();

    if (onClick) {
      onClick(evt);
    }
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
    maxHeight: isExpanded ? null : isTileMaxHeight + isTilePadding,
  };

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
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const [aboveTheFold] = entries;
      setIsTileMaxHeight(aboveTheFold.contentRect.height);
    });

    resizeObserver.observe(aboveTheFold.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <button
      type="button"
      ref={tile}
      style={tileStyle}
      className={classes}
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
          <ChevronDown16 />
        </div>
        <div className={`${prefix}--tile-content`}>{childrenAsArray[1]}</div>
      </div>
    </button>
  );
}

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
  light: PropTypes.bool,

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

ExpandableTile.defaultProps = {
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

export function TileAboveTheFoldContent({ children }) {
  const prefix = usePrefix();

  return (
    <span className={`${prefix}--tile-content__above-the-fold`}>
      {children}
    </span>
  );
}

TileAboveTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export function TileBelowTheFoldContent({ children }) {
  const prefix = usePrefix();

  return (
    <span className={`${prefix}--tile-content__below-the-fold`}>
      {children}
    </span>
  );
}

TileBelowTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};
