/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Tooltip } from '../Tooltip';
import { useControllableState } from '../../internal/useControllableState';
import { useEffectOnce } from '../../internal/useEffectOnce';
import { useId } from '../../internal/useId';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { getInteractiveContent } from '../../internal/useNoInteractiveChildren';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match, matches } from '../../internal/keyboard';
import { usePressable } from './usePressable';
import deprecate from '../../prop-types/deprecate';

// Used to manage the overall state of the Tabs
const TabsContext = React.createContext();

// Used to keep track of position in a tablist
const TabContext = React.createContext();

// Used to keep track of position in a list of tab panels
const TabPanelContext = React.createContext();
function Tabs({
  children,
  defaultSelectedIndex = 0,
  onChange,
  selectedIndex: controlledSelectedIndex,
}) {
  const baseId = useId('ccs');
  // The active index is used to track the element which has focus in our tablist
  const [activeIndex, setActiveIndex] = useState(defaultSelectedIndex);
  // The selected index is used for the tab/panel pairing which is "visible"
  const [selectedIndex, setSelectedIndex] = useControllableState({
    value: controlledSelectedIndex,
    defaultValue: defaultSelectedIndex,
    onChange: (value) => {
      if (onChange) {
        onChange({ selectedIndex: value });
      }
    },
  });

  const value = {
    baseId,
    activeIndex,
    defaultSelectedIndex,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

Tabs.propTypes = {
  /**
   * Provide child elements to be rendered inside of the `Tabs`.
   * These elements should render either `TabsList` or `TabsPanels`
   */
  children: PropTypes.node,

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex: PropTypes.number,

  /**
   * Provide an optional function which is called whenever the state of the
   * `Tabs` changes
   */
  onChange: PropTypes.func,

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex: PropTypes.number,
};

/**
 * Get the next index for a given keyboard event given a count of the total
 * items and the current index
 * @param {Event} event
 * @param {number} total
 * @param {number} index
 * @returns {number}
 */
function getNextIndex(event, total, index) {
  if (match(event, keys.ArrowRight)) {
    return (index + 1) % total;
  } else if (match(event, keys.ArrowLeft)) {
    return (total + index - 1) % total;
  } else if (match(event, keys.Home)) {
    return 0;
  } else if (match(event, keys.End)) {
    return total - 1;
  }
}

function TabList({
  activation = 'automatic',
  'aria-label': label,
  children,
  className: customClassName,
  contained = false,
  iconSize,
  leftOverflowButtonProps,
  light,
  rightOverflowButtonProps,
  scrollDebounceWait = 200,
  scrollIntoView,
  ...rest
}) {
  const { activeIndex, selectedIndex, setSelectedIndex, setActiveIndex } =
    React.useContext(TabsContext);
  const prefix = usePrefix();
  const ref = useRef(null);
  const previousButton = useRef(null);
  const nextButton = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(null);
  const hasSecondaryLabelTabs =
    contained &&
    !!React.Children.toArray(children).filter(
      (child) => child.props.secondaryLabel
    ).length;
  const className = cx(`${prefix}--tabs`, customClassName, {
    [`${prefix}--tabs--contained`]: contained,
    [`${prefix}--tabs--light`]: light,
    [`${prefix}--tabs__icon--default`]: iconSize === 'default',
    [`${prefix}--tabs__icon--lg`]: iconSize === 'lg',
    [`${prefix}--tabs--tall`]: hasSecondaryLabelTabs,
  });

  // Previous Button
  // VISIBLE IF:
  //   SCROLLABLE
  //   AND SCROLL_LEFT > 0
  const buttonWidth = 44;
  const isPreviousButtonVisible = ref.current
    ? isScrollable && scrollLeft > 0
    : false;
  // Next Button
  // VISIBLE IF:
  //   SCROLLABLE
  //   AND SCROLL_LEFT + CLIENT_WIDTH < SCROLL_WIDTH
  const isNextButtonVisible = ref.current
    ? scrollLeft + buttonWidth + ref.current.clientWidth <
      ref.current.scrollWidth
    : false;
  const previousButtonClasses = cx(
    `${prefix}--tab--overflow-nav-button`,
    `${prefix}--tab--overflow-nav-button--previous`,
    {
      [`${prefix}--tab--overflow-nav-button--hidden`]: !isPreviousButtonVisible,
    }
  );
  const nextButtonClasses = cx(
    `${prefix}--tab--overflow-nav-button`,
    `${prefix}--tab--overflow-nav-button--next`,
    {
      [`${prefix}--tab--overflow-nav-button--hidden`]: !isNextButtonVisible,
    }
  );

  const tabs = useRef([]);
  const debouncedOnScroll = useCallback(() => {
    return debounce((event) => {
      setScrollLeft(event.target.scrollLeft);
    }, scrollDebounceWait);
  }, [scrollDebounceWait]);

  function onKeyDown(event) {
    if (
      matches(event, [keys.ArrowRight, keys.ArrowLeft, keys.Home, keys.End])
    ) {
      event.preventDefault();

      const activeTabs = tabs.current.filter((tab) => {
        return !tab.disabled;
      });

      const currentIndex = activeTabs.indexOf(
        tabs.current[activation === 'automatic' ? selectedIndex : activeIndex]
      );
      const nextIndex = tabs.current.indexOf(
        activeTabs[getNextIndex(event, activeTabs.length, currentIndex)]
      );

      if (activation === 'automatic') {
        setSelectedIndex(nextIndex);
      } else if (activation === 'manual') {
        setActiveIndex(nextIndex);
      }

      tabs.current[nextIndex].focus();
    }
  }

  useEffectOnce(() => {
    const tab = tabs.current[selectedIndex];
    if (scrollIntoView && tab) {
      tab.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  });

  useEffectOnce(() => {
    if (tabs.current[selectedIndex].disabled) {
      const activeTabs = tabs.current.filter((tab) => {
        return !tab.disabled;
      });

      if (activeTabs.length > 0) {
        const tab = activeTabs[0];
        setSelectedIndex(tabs.current.indexOf(tab));
      }
    }
  });

  useIsomorphicEffect(() => {
    if (ref.current) {
      setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth);
    }

    function handler() {
      if (ref.current) {
        setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth);
      }
    }

    const debouncedHandler = debounce(handler, 200);
    window.addEventListener('resize', debouncedHandler);
    return () => {
      debouncedHandler.cancel();
      window.removeEventListener('resize', debouncedHandler);
    };
  }, []);

  // updates scroll location for all scroll behavior.
  useIsomorphicEffect(() => {
    if (scrollLeft !== null) {
      ref.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  useIsomorphicEffect(() => {
    if (!isScrollable) {
      return;
    }

    const tab =
      activation === 'manual'
        ? tabs.current[activeIndex]
        : tabs.current[selectedIndex];
    if (tab) {
      // The width of the "scroll buttons"

      // The start and end position of the selected tab
      const { width: tabWidth } = tab.getBoundingClientRect();
      const start = tab.offsetLeft;
      const end = tab.offsetLeft + tabWidth;

      // The start and end of the visible area for the tabs
      const visibleStart = ref.current.scrollLeft + buttonWidth;
      const visibleEnd =
        ref.current.scrollLeft + ref.current.clientWidth - buttonWidth;

      // The beginning of the tab is clipped and not visible
      if (start < visibleStart) {
        setScrollLeft(start - buttonWidth);
      }

      // The end of teh tab is clipped and not visible
      if (end > visibleEnd) {
        setScrollLeft(end + buttonWidth - ref.current.clientWidth);
      }
    }
  }, [activation, activeIndex, selectedIndex, isScrollable]);

  usePressable(previousButton, {
    onPress({ longPress }) {
      if (!longPress) {
        setScrollLeft(
          Math.max(
            scrollLeft - (ref.current.scrollWidth / tabs.current.length) * 1.5,
            0
          )
        );
      }
    },
    onLongPress() {
      return createLongPressBehavior(ref, 'backward', setScrollLeft);
    },
  });

  usePressable(nextButton, {
    onPress({ longPress }) {
      if (!longPress) {
        setScrollLeft(
          Math.min(
            scrollLeft + (ref.current.scrollWidth / tabs.current.length) * 1.5,
            ref.current.scrollWidth - ref.current.clientWidth
          )
        );
      }
    },
    onLongPress() {
      return createLongPressBehavior(ref, 'forward', setScrollLeft);
    },
  });

  return (
    <div className={className}>
      <button
        aria-hidden="true"
        tabIndex="-1"
        aria-label="Scroll left"
        ref={previousButton}
        className={previousButtonClasses}
        type="button"
        {...leftOverflowButtonProps}>
        <ChevronLeft />
      </button>
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        {...rest}
        aria-label={label}
        ref={ref}
        role="tablist"
        className={`${prefix}--tab--list`}
        onScroll={debouncedOnScroll}
        onKeyDown={onKeyDown}>
        {React.Children.map(children, (child, index) => {
          return (
            <TabContext.Provider
              value={{ index, hasSecondaryLabel: hasSecondaryLabelTabs }}>
              {React.cloneElement(child, {
                ref: (node) => {
                  tabs.current[index] = node;
                },
              })}
            </TabContext.Provider>
          );
        })}
      </div>
      <button
        aria-hidden="true"
        tabIndex="-1"
        aria-label="Scroll right"
        ref={nextButton}
        className={nextButtonClasses}
        type="button"
        {...rightOverflowButtonProps}>
        <ChevronRight />
      </button>
    </div>
  );
}

TabList.propTypes = {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation: PropTypes.oneOf(['automatic', 'manual']),

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label': PropTypes.string.isRequired,

  /**
   * Provide child elements to be rendered inside of `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether component is contained type
   */
  contained: PropTypes.bool,

  /**
   * If using `IconTab`, specify the size of the icon being used.
   */
  iconSize: PropTypes.oneOf(['default', 'lg']),

  /**
   * Provide the props that describe the left overflow button
   */
  leftOverflowButtonProps: PropTypes.object,

  /**
   * Specify whether or not to use the light component variant
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `TabList` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Provide the props that describe the right overflow button
   */
  rightOverflowButtonProps: PropTypes.object,

  /**
   * Optionally provide a delay (in milliseconds) passed to the lodash
   * debounce of the onScroll handler. This will impact the responsiveness
   * of scroll arrow buttons rendering when scrolling to the first or last tab.
   */
  scrollDebounceWait: PropTypes.number,

  /**
   * Choose whether or not to automatically scroll to newly selected tabs
   * on component rerender
   */
  scrollIntoView: PropTypes.bool,
};

/**
 * Helper function to setup the behavior when a button is "long pressed". This
 * function will take a ref to the tablist, a direction, and a setter for
 * scrollLeft and will update the scroll position within a
 * requestAnimationFrame.
 *
 * It returns a cleanup function to be run when the long press is
 * deactivated
 *
 * @param {RefObject} ref
 * @param {'forward' | 'backward'} direction
 * @param {Function} setScrollLeft
 * @returns {Function}
 */
function createLongPressBehavior(ref, direction, setScrollLeft) {
  // We manually override the scroll behavior to be "auto". If it is set as
  // smooth, this animation does not update correctly
  let defaultScrollBehavior = ref.current.style['scroll-behavior'];
  ref.current.style['scroll-behavior'] = 'auto';

  const scrollDelta = direction === 'forward' ? 5 : -5;
  let frameId = null;

  function tick() {
    ref.current.scrollLeft = ref.current.scrollLeft + scrollDelta;
    frameId = requestAnimationFrame(tick);
  }

  frameId = requestAnimationFrame(tick);

  return () => {
    // Restore the previous scroll behavior
    ref.current.style['scroll-behavior'] = defaultScrollBehavior;

    // Make sure that our `scrollLeft` value is in sync with the existing
    // `ref` after our requestAnimationFrame loop above
    setScrollLeft(ref.current.scrollLeft);

    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  };
}

const Tab = React.forwardRef(function Tab(
  {
    as: BaseComponent = 'button',
    children,
    className: customClassName,
    disabled,
    onClick,
    onKeyDown,
    secondaryLabel,
    renderIcon: Icon,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const { selectedIndex, setSelectedIndex, baseId } =
    React.useContext(TabsContext);
  const { index, hasSecondaryLabel } = React.useContext(TabContext);
  const id = `${baseId}-tab-${index}`;
  const panelId = `${baseId}-tabpanel-${index}`;
  const className = cx(
    `${prefix}--tabs__nav-item`,
    `${prefix}--tabs__nav-link`,
    customClassName,
    {
      [`${prefix}--tabs__nav-item--selected`]: selectedIndex === index,
      [`${prefix}--tabs__nav-item--disabled`]: disabled,
    }
  );

  return (
    <BaseComponent
      {...rest}
      aria-controls={panelId}
      aria-disabled={disabled}
      aria-selected={selectedIndex === index}
      ref={ref}
      id={id}
      role="tab"
      className={className}
      disabled={disabled}
      onClick={(evt) => {
        if (disabled) {
          return;
        }
        setSelectedIndex(index);
        if (onClick) {
          onClick(evt);
        }
      }}
      onKeyDown={onKeyDown}
      tabIndex={selectedIndex === index ? '0' : '-1'}
      type="button">
      <div className={`${prefix}--tabs__nav-item-label-wrapper`}>
        <span className={`${prefix}--tabs__nav-item-label`}>{children}</span>
        {Icon && (
          <div className={`${prefix}--tabs__nav-item--icon`}>
            <Icon size={16} />
          </div>
        )}
      </div>
      {hasSecondaryLabel && (
        <div className={`${prefix}--tabs__nav-item-secondary-label`}>
          {secondaryLabel}
        </div>
      )}
    </BaseComponent>
  );
});

Tab.propTypes = {
  /**
   * Provide a custom element to render instead of the default button
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Provide child elements to be rendered inside of `Tab`.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Tab
   */
  className: PropTypes.string,

  /**
   * Whether your Tab is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,

  /*
   * An optional parameter to allow overriding the anchor rendering.
   * Useful for using Tab along with react-router or other client
   * side router libraries.
   **/
  renderButton: PropTypes.func,

  /**
   * Optional prop to render an icon next to the label.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /*
   * An optional label to render under the primary tab label.
  /* This prop is only useful for conained tabs
   **/
  secondaryLabel: PropTypes.string,
};

const IconTab = React.forwardRef(function IconTab(
  {
    children,
    className: customClassName,
    defaultOpen = false,
    enterDelayMs,
    leaveDelayMs,
    label,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const classNames = cx(
    `${prefix}--tabs__nav-item--icon-only`,
    customClassName
  );
  return (
    <Tooltip
      align="bottom"
      defaultOpen={defaultOpen}
      className={`${prefix}--icon-tooltip`}
      enterDelayMs={enterDelayMs}
      label={label}
      leaveDelayMs={leaveDelayMs}>
      <Tab className={classNames} ref={ref} {...rest}>
        {children}
      </Tab>
    </Tooltip>
  );
});

IconTab.propTypes = {
  /**
   * Provide an icon to be rendered inside of `IconTab` as the visual label for Tab.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Tab
   */
  className: PropTypes.string,

  /**
   * Specify whether the tooltip for the icon should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip for the icon.
   */
  enterDelayMs: PropTypes.number,

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader.
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,
};

const TabPanel = React.forwardRef(function TabPanel(
  { children, className: customClassName, ...rest },
  forwardRef
) {
  const prefix = usePrefix();
  const panel = useRef(null);
  const ref = useMergedRefs([forwardRef, panel]);

  const [tabIndex, setTabIndex] = useState('0');
  const [interactiveContent, setInteractiveContent] = useState(false);
  const { selectedIndex, baseId } = React.useContext(TabsContext);
  const index = React.useContext(TabPanelContext);
  const id = `${baseId}-tabpanel-${index}`;
  const tabId = `${baseId}-tab-${index}`;
  const className = cx(`${prefix}--tab-content`, customClassName, {
    [`${prefix}--tab-content--interactive`]: interactiveContent,
  });

  useEffectOnce(() => {
    if (!panel.current) {
      return;
    }

    const content = getInteractiveContent(panel.current);
    if (content) {
      setInteractiveContent(true);
      setTabIndex('-1');
    }
  });

  // tabindex should only be 0 if no interactive content in children
  useEffect(() => {
    if (!panel.current) {
      return;
    }

    const { current: node } = panel;

    function callback() {
      const content = getInteractiveContent(node);
      if (content) {
        setInteractiveContent(true);
        setTabIndex('-1');
      } else {
        setInteractiveContent(false);
        setTabIndex('0');
      }
    }

    const observer = new MutationObserver(callback);

    observer.observe(node, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect(node);
    };
  }, []);

  return (
    <div
      {...rest}
      aria-labelledby={tabId}
      id={id}
      className={className}
      ref={ref}
      role="tabpanel"
      tabIndex={tabIndex}
      hidden={selectedIndex !== index}>
      {children}
    </div>
  );
});

TabPanel.propTypes = {
  /**
   * Provide child elements to be rendered inside of `TabPanel`.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to TabPanel.
   */
  className: PropTypes.string,
};

function TabPanels({ children }) {
  return React.Children.map(children, (child, index) => {
    return (
      <TabPanelContext.Provider value={index}>{child}</TabPanelContext.Provider>
    );
  });
}

TabPanels.propTypes = {
  /**
   * Provide child elements to be rendered inside of `TabPanels`.
   */
  children: PropTypes.node,
};

export { Tabs, Tab, IconTab, TabPanel, TabPanels, TabList };
