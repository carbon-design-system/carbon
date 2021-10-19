/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { ChevronLeft16, ChevronRight16 } from '@carbon/icons-react';
import debounce from 'lodash.debounce';
import { keys, match, matches } from '../../../internal/keyboard';
import TabContent from '../../TabContent';
import deprecate from '../../../prop-types/deprecate';
import { usePrefix } from '../../../internal/usePrefix';

const Tabs = React.forwardRef(function Tabs(
  {
    children,
    className,
    leftOverflowButtonProps,
    light = false,
    onSelectionChange,
    rightOverflowButtonProps,
    scrollIntoView = true,
    selected = 0,
    selectionMode = 'automatic',
    tabContentClassName,
    type = 'default',
    ...other
  },
  ref
) {
  const prefix = usePrefix();

  //refs
  const tablist = useRef();
  const leftOverflowNavButton = useRef();
  const rightOverflowNavButton = useRef();
  const tabs = useRef([]);

  //states
  const [horizontalOverflow, setHorizontalOverflow] = useState(false);
  const [tablistClientWidth, setTablistClientWidth] = useState(null);
  const [tablistScrollWidth, setTablistScrollWidth] = useState(null);
  const [tablistScrollLeft, setTablistScrollLeft] = useState(null);
  const [isSelected, setIsSelected] = useState(selected);
  const [prevSelected, setPrevSelected] = useState(isSelected);

  /**
   * prop + state alignment - getDerivedStateFromProps
   * only update if selected prop changes
   */
  useEffect(() => {
    if (selected !== prevSelected) {
      setIsSelected(selected);
      setPrevSelected(selected);
    }
  }, [selected]); //eslint-disable-line react-hooks/exhaustive-deps

  // width of the overflow buttons
  let OVERFLOW_BUTTON_OFFSET = 40;

  /**
   * `scroll` event handler to save tablist clientWidth, scrollWidth, and
   * scrollLeft
   */
  const handleScroll = () => {
    if (!tablist?.current) {
      return;
    }
    const { clientWidth, scrollLeft, scrollWidth } = tablist.current;

    setTablistClientWidth(clientWidth);
    setTablistScrollWidth(scrollWidth);
    setTablistScrollLeft(scrollLeft);
    setHorizontalOverflow(scrollWidth > clientWidth);
  };

  /**
   * The debounced version of the `resize` event handler.
   * @type {Function}
   * @private
   */
  const _debouncedHandleWindowResize = useRef();

  const _handleWindowResize = handleScroll;

  /**
   * returns all tabs that are not disabled
   * used for keyboard navigation
   */
  const getEnabledTabs = () =>
    React.Children.toArray(children).reduce(
      (enabledTabs, tab, index) =>
        !tab.props.disabled ? enabledTabs.concat(index) : enabledTabs,
      []
    );

  /**
   * returns the index of the next tab we are going to when navigating L/R arrow keys (i.e. 0, 1, 2)
   * used in handleTabKeyDown to get the next index after keyboard arrow evt, which then updates selected tab
   */
  const getNextIndex = (index, direction) => {
    const enabledTabs = getEnabledTabs();
    const nextIndex = Math.max(
      enabledTabs.indexOf(index) + direction,
      // For `tab` not found in `enabledTabs`
      -1
    );
    const nextIndexLooped =
      nextIndex >= 0 && nextIndex < enabledTabs.length
        ? nextIndex
        : nextIndex - Math.sign(nextIndex) * enabledTabs.length;
    return enabledTabs[nextIndexLooped];
  };

  /**
   * used as second argument for getNextIndex(i,d)
   * returns -1, 1 or 0 depending on arrow key
   * number is then used in math calculations to find the index of the next tab we are navigating to
   */
  const getDirection = (evt) => {
    if (match(evt, keys.ArrowLeft)) {
      return -1;
    }
    if (match(evt, keys.ArrowRight)) {
      return 1;
    }
    return 0;
  };

  const getTabAt = useCallback(
    (index) => tabs.current[index] || React.Children.toArray(children)[index],
    [tabs, children]
  );

  const scrollTabIntoView = (event, { index }) => {
    const tab = getTabAt(index);
    if (
      matches(event, [keys.ArrowLeft, keys.ArrowRight]) ||
      event.type === 'click'
    ) {
      const currentScrollLeft = tablistScrollLeft;
      tab?.tabAnchor?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
      tab?.tabAnchor?.focus();
      const newScrollLeft = tablist.current.scrollLeft;
      if (newScrollLeft > currentScrollLeft) {
        tablist.current.scrollLeft += OVERFLOW_BUTTON_OFFSET;
      }
    }
  };

  /**
   * selecting tab on click and on keyboard nav
   * index = tab to be selected, returned in handleTabKeyDown
   * onSelectionChange = optional prop for event handler
   */
  const selectTabAt = (event, { index, onSelectionChange }) => {
    scrollTabIntoView(event, { index });
    if (isSelected !== index) {
      setIsSelected(index);
      setPrevSelected(index);
      if (typeof onSelectionChange === 'function') {
        onSelectionChange(index);
      }
    }
  };

  /**
   *  keyboard event handler
   */
  const handleTabKeyDown = (onSelectionChange) => {
    return (index, evt) => {
      if (matches(evt, [keys.Enter, keys.Space])) {
        selectTabAt(evt, { index, onSelectionChange });
      }

      const nextIndex = (() => {
        if (matches(evt, [keys.ArrowLeft, keys.ArrowRight])) {
          return getNextIndex(index, getDirection(evt));
        }
        if (match(evt, keys.Home)) {
          return 0;
        }
        if (match(evt, keys.End)) {
          return getEnabledTabs().pop();
        }
      })();
      const tab = getTabAt(nextIndex);

      // updating selected tab
      if (
        matches(evt, [keys.ArrowLeft, keys.ArrowRight, keys.Home, keys.End])
      ) {
        evt.preventDefault();
        if (selectionMode !== 'manual') {
          selectTabAt(evt, { index: nextIndex, onSelectionChange });
        } else {
          scrollTabIntoView(evt, { index: nextIndex });
        }
        tab?.focus();
      }
    };
  };

  const getTabs = () => React.Children.map(children, (tab) => tab);

  /**
   *  click handler
   *  passed down to Tab children as a prop in `tabsWithProps`
   *  following functions (handle*) are Props on Tab.js, see Tab.js for parameters
   */
  const handleTabClick = (onSelectionChange) => (index, evt) => {
    evt.preventDefault();
    selectTabAt(evt, { index, onSelectionChange });
  };

  /**
   * creates an array of all the child tab items
   */
  const setTabAt = (index, tabRef) => {
    tabs.current[index] = tabRef;
  };

  let overflowNavInterval = null;

  /**
   * group - overflow scroll
   * scrolling via overflow btn click
   * click handler for scrollable tabs L/R arrow buttons
   */
  const handleOverflowNavClick = (_, { direction, multiplier = 10 }) => {
    // account for overflow button appearing and causing tablist width change
    const { clientWidth, scrollLeft, scrollWidth } = tablist?.current;
    if (direction === 1 && !scrollLeft) {
      tablist.current.scrollLeft += OVERFLOW_BUTTON_OFFSET;
    }

    tablist.current.scrollLeft += direction * multiplier;

    const leftEdgeReached =
      direction === -1 && scrollLeft < OVERFLOW_BUTTON_OFFSET;

    const rightEdgeReached =
      direction === 1 &&
      scrollLeft + clientWidth >= scrollWidth - OVERFLOW_BUTTON_OFFSET;

    if (leftEdgeReached || rightEdgeReached) {
      if (leftEdgeReached) {
        rightOverflowNavButton?.current?.focus();
      }
      if (rightEdgeReached) {
        leftOverflowNavButton?.current?.focus();
      }
    }
  };

  /**
   * group - overflow scroll
   * scrolling w/ mouse event
   * mousedown handler for scrollable tabs
   */
  const handleOverflowNavMouseDown = (event, { direction }) => {
    // disregard mouse buttons aside from LMB
    if (event.buttons !== 1) {
      return;
    }

    overflowNavInterval = setInterval(() => {
      const { clientWidth, scrollLeft, scrollWidth } = tablist?.current;

      // clear interval if scroll reaches left or right edge
      const leftEdgeReached =
        direction === -1 && scrollLeft < OVERFLOW_BUTTON_OFFSET;

      const rightEdgeReached =
        direction === 1 &&
        scrollLeft + clientWidth >= scrollWidth - OVERFLOW_BUTTON_OFFSET;

      if (leftEdgeReached || rightEdgeReached) {
        clearInterval(overflowNavInterval);
      }

      // account for overflow button appearing and causing tablist width change
      handleOverflowNavClick(event, { direction });
    });
  };

  /**
   * group - overflow scroll
   * scrolling w/ mouse event
   * mouseup handler for scrollable tabs
   */
  const handleOverflowNavMouseUp = () => {
    clearInterval(overflowNavInterval);
  };

  /**
   * only run once - component did mount equivalent
   */
  useEffect(() => {
    _debouncedHandleWindowResize.current = debounce(_handleWindowResize, 200);

    _handleWindowResize();
    window.addEventListener('resize', _debouncedHandleWindowResize.current);

    // scroll selected tab into view on mount
    const { clientWidth, scrollLeft, scrollWidth } = tablist?.current || {};

    setTablistClientWidth(clientWidth);
    setTablistScrollWidth(scrollWidth);
    setTablistScrollLeft(scrollLeft);

    const tab = getTabAt(isSelected);
    const horizontalOverflow = scrollWidth > clientWidth;

    if (horizontalOverflow) {
      const leftOverflowNavButtonHidden =
        tab?.tabAnchor?.getBoundingClientRect().right <
        tab?.tabAnchor?.offsetParent.getBoundingClientRect().right;

      const rightOverflowNavButtonHidden =
        scrollLeft + clientWidth === scrollWidth;
      scrollIntoView &&
        tab?.tabAnchor?.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });

      // account for overflow buttons in scroll position on mount
      if (!leftOverflowNavButtonHidden && !rightOverflowNavButtonHidden) {
        tablist.current.scrollLeft += OVERFLOW_BUTTON_OFFSET * 2;
      }
    }

    //component will unmount equivalent
    return () => {
      if (_debouncedHandleWindowResize.current) {
        _debouncedHandleWindowResize.current.cancel();
      }
      window.removeEventListener(
        'resize',
        _debouncedHandleWindowResize.current
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * component did update equivalent
   */
  useEffect(() => {
    // compare current tablist properties to current state
    const {
      clientWidth: currentTablistClientWidth,
      scrollLeft: currentTablistScrollLeft,
      scrollWidth: currentTablistScrollWidth,
    } = tablist.current;

    if (
      currentTablistClientWidth !== tablistClientWidth ||
      currentTablistScrollLeft !== tablistScrollLeft ||
      currentTablistScrollWidth !== tablistScrollWidth
    ) {
      setTablistClientWidth(currentTablistClientWidth);
      setTablistScrollWidth(currentTablistScrollWidth);
      setTablistScrollLeft(currentTablistScrollLeft);
      setHorizontalOverflow(
        currentTablistScrollWidth > currentTablistClientWidth
      );
    }

    if (scrollIntoView && prevSelected !== isSelected) {
      getTabAt(isSelected)?.tabAnchor?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [
    isSelected,
    prevSelected,
    scrollIntoView,
    tablistClientWidth,
    tablistScrollLeft,
    tablistScrollWidth,
    getTabAt,
  ]);

  /**
   * The tab panel acts like a tab panel when the screen is wider, but acts
   * like a select list when the screen is narrow.  In the wide case we want
   * to allow the user to use the tab key to set the focus in the tab panel
   * and then use the left and right arrow keys to navigate the tabs.  In the
   * narrow case we want to use the tab key to select different options in
   * the list.
   *
   * We set the tab index based on the different states so the browser will treat
   * the whole tab panel as a single focus component when it looks like a tab
   * panel and separate components when it looks like a select list.
   */
  const tabsWithProps = getTabs().map((tab, index) => {
    const tabIndex = index === isSelected ? 0 : -1;
    const newTab = React.cloneElement(tab, {
      index,
      selected: index === isSelected,
      handleTabClick: handleTabClick(onSelectionChange),
      tabIndex,
      ref: (e) => {
        setTabAt(index, e);
      },
      handleTabKeyDown: handleTabKeyDown(onSelectionChange),
    });

    return newTab;
  });

  const tabContentWithProps = React.Children.map(tabsWithProps, (tab) => {
    const {
      id: tabId,
      children,
      selected,
      renderContent: Content = TabContent,
    } = tab.props;

    return (
      <Content
        id={tabId && `${tabId}__panel`}
        className={tabContentClassName}
        hidden={!selected}
        selected={selected}
        aria-labelledby={tabId}>
        {children}
      </Content>
    );
  });

  const leftOverflowNavButtonHidden = !horizontalOverflow || !tablistScrollLeft;

  const rightOverflowNavButtonHidden =
    !horizontalOverflow ||
    tablistScrollLeft + tablistClientWidth === tablistScrollWidth;

  const classes = {
    // TODO: remove scrollable from classnames in next major release and uncomment classnames that don't contain scrollable
    tabs: classNames(
      className,
      // `${prefix}--tabs`,
      `${prefix}--tabs--scrollable`,
      {
        // [`${prefix}--tabs--container`]: type === 'container',
        [`${prefix}--tabs--scrollable--container`]: type === 'container',
        // [`${prefix}--tabs--light`]: light,
        [`${prefix}--tabs--scrollable--light`]: light,
      }
    ),
    // TODO: remove scrollable from classnames in next major release and uncomment classnames that don't contain scrollable
    tablist: classNames(
      // `${prefix}--tabs__nav`,
      `${prefix}--tabs--scrollable__nav`
    ),
    leftOverflowButtonClasses: classNames({
      [`${prefix}--tab--overflow-nav-button`]: horizontalOverflow,
      [`${prefix}--tab--overflow-nav-button--hidden`]: leftOverflowNavButtonHidden,
    }),
    rightOverflowButtonClasses: classNames({
      [`${prefix}--tab--overflow-nav-button`]: horizontalOverflow,
      [`${prefix}--tab--overflow-nav-button--hidden`]: rightOverflowNavButtonHidden,
    }),
  };

  return (
    <>
      <div
        className={classes.tabs}
        onScroll={handleScroll}
        ref={ref}
        {...other}>
        <button
          aria-hidden="true"
          aria-label="Scroll left"
          className={classes.leftOverflowButtonClasses}
          onClick={(_) => handleOverflowNavClick(_, { direction: -1 })}
          onMouseDown={(event) =>
            handleOverflowNavMouseDown(event, { direction: -1 })
          }
          onMouseUp={handleOverflowNavMouseUp}
          ref={leftOverflowNavButton}
          tabIndex="-1"
          type="button"
          {...leftOverflowButtonProps}>
          <ChevronLeft16 />
        </button>
        {!leftOverflowNavButtonHidden && (
          <div className={`${prefix}--tabs__overflow-indicator--left`} />
        )}
        <ul
          role="tablist"
          tabIndex={-1}
          className={classes.tablist}
          ref={tablist}>
          {tabsWithProps}
        </ul>
        {!rightOverflowNavButtonHidden && (
          <div className={`${prefix}--tabs__overflow-indicator--right`} />
        )}
        <button
          aria-hidden="true"
          aria-label="Scroll right"
          className={classes.rightOverflowButtonClasses}
          onClick={(_) => handleOverflowNavClick(_, { direction: 1 })}
          onMouseDown={(event) =>
            handleOverflowNavMouseDown(event, { direction: 1 })
          }
          onMouseUp={handleOverflowNavMouseUp}
          ref={rightOverflowNavButton}
          tabIndex="-1"
          type="button"
          {...rightOverflowButtonProps}>
          <ChevronRight16 />
        </button>
      </div>
      {tabContentWithProps}
    </>
  );
});

Tabs.propTypes = {
  /**
   * Pass in a collection of <Tab> children to be rendered depending on the
   * currently selected tab
   */
  children: PropTypes.node,

  /**
   * Provide a className that is applied to the root <div> component for the
   * <Tabs>
   */
  className: PropTypes.string,

  /**
   * Specify whether the Tab content is hidden
   */
  hidden: PropTypes.bool,

  /**
   * Provide the props that describe the left overflow button
   */
  leftOverflowButtonProps: PropTypes.object,

  /**
   * Specify whether or not to use the light component variant
   */
  light: deprecate(
    PropTypes.bool,
    'The light prop has been deprecated in v11 in favor of our new layering model that uses the Layer component'
  ),

  /**
   * Optionally provide an `onClick` handler that is invoked when a <Tab> is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Optionally provide an `onKeyDown` handler that is invoked when keyed
   * navigation is triggered
   */
  onKeyDown: PropTypes.func,

  /**
   * Provide an optional handler that is called whenever the selection
   * changes. This method is called with the index of the tab that was
   * selected
   */
  onSelectionChange: PropTypes.func,

  /**
   * Provide the props that describe the right overflow button
   */
  rightOverflowButtonProps: PropTypes.object,

  /**
   * Choose whether or not to automatically scroll to newly selected tabs
   * on component rerender
   */
  scrollIntoView: PropTypes.bool,

  /**
   * Optionally provide an index for the currently selected <Tab>
   */
  selected: PropTypes.number,

  /**
   * Choose whether or not to automatically change selection on focus
   */
  selectionMode: PropTypes.oneOf(['automatic', 'manual']),

  /**
   * Provide a className that is applied to the <TabContent> components
   */
  tabContentClassName: PropTypes.string,

  /**
   * Provide the type of Tab
   */
  type: PropTypes.oneOf(['default', 'container']),
};

export default Tabs;
