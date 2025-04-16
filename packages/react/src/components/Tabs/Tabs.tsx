/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import { breakpoints } from '@carbon/layout';
import cx from 'classnames';
import { debounce } from 'es-toolkit/compat';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  createContext,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type HTMLAttributes,
  type RefObject,
  type ComponentType,
  type HTMLElementType,
  type ElementType,
  isValidElement,
  ReactElement,
} from 'react';
import { Grid } from '../Grid';
import { isElement } from 'react-is';
import { Tooltip } from '../Tooltip';
import { useControllableState } from '../../internal/useControllableState';
import { useId } from '../../internal/useId';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { getInteractiveContent } from '../../internal/useNoInteractiveChildren';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match, matches } from '../../internal/keyboard';
import { usePressable } from './usePressable';
import deprecate from '../../prop-types/deprecate';
import { Close } from '@carbon/icons-react';
import { useEvent } from '../../internal/useEvent';
import { useMatchMedia } from '../../internal/useMatchMedia';
import { Text } from '../Text';
import BadgeIndicator from '../BadgeIndicator';

const verticalTabHeight = 64;

// Used to manage the overall state of the Tabs
type TabsContextType = {
  baseId: string;
  activeIndex: number;
  defaultSelectedIndex: number;
  dismissable?: boolean;
  onTabCloseRequest?(index: number): void;
  setActiveIndex(index: number): void;
  selectedIndex: number;
  setSelectedIndex(index: number): void;
};
const TabsContext = React.createContext<TabsContextType>({
  baseId: '',
  activeIndex: 0,
  defaultSelectedIndex: 0,
  dismissable: false,
  onTabCloseRequest() {},
  setActiveIndex() {},
  selectedIndex: 0,
  setSelectedIndex() {},
});

// Used to keep track of position in a tablist
const TabContext = React.createContext<{
  contained?: boolean;
  index: number;
  hasSecondaryLabel: boolean;
}>({
  index: 0,
  hasSecondaryLabel: false,
});

const lgMediaQuery = `(min-width: ${breakpoints.lg.width})`;
const smMediaQuery = `(max-width: ${breakpoints.md.width})`;

// Used to keep track of position in a list of tab panels
const TabPanelContext = React.createContext<number>(0);

type DivAttributes = HTMLAttributes<HTMLDivElement>;

/**
 * Tabs
 */

export interface TabsProps {
  /**
   * Provide child elements to be rendered inside the `Tabs`.
   * These elements should render either `TabsList` or `TabsPanels`
   */
  children?: ReactNode;

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex?: number;

  /**
   * Whether the rendered Tab children should be dismissable.
   */
  dismissable?: boolean;

  /**
   * Provide an optional function which is called
   * whenever the state of the `Tabs` changes
   */
  onChange?(state: { selectedIndex: number }): void;

  /**
   * If specifying the `onTabCloseRequest` prop, provide a callback function
   * responsible for removing the tab when close button is pressed on one of the Tab elements
   */
  onTabCloseRequest?(tabIndex: number): void;

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex?: number;
}

function Tabs({
  children,
  defaultSelectedIndex = 0,
  onChange,
  selectedIndex: controlledSelectedIndex,
  dismissable,
  onTabCloseRequest,
}: TabsProps) {
  const baseId = useId('ccs');
  if (dismissable && !onTabCloseRequest) {
    console.error(
      'dismissable property specified without also providing an onTabCloseRequest property.'
    );
  }
  // The active index is used to track the element which has focus in our tablist
  const [activeIndex, setActiveIndex] = useState(defaultSelectedIndex);
  // The selected index is used for the tab/panel pairing which is "visible"
  const [selectedIndex, setSelectedIndex] = useControllableState({
    value: controlledSelectedIndex,
    defaultValue: defaultSelectedIndex,
    onChange: (value) => onChange?.({ selectedIndex: value }),
  });

  const value: TabsContextType = {
    baseId,
    activeIndex,
    defaultSelectedIndex,
    dismissable,
    onTabCloseRequest,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

Tabs.propTypes = {
  /**
   * Provide child elements to be rendered inside the `Tabs`.
   * These elements should render either `TabsList` or `TabsPanels`
   */
  children: PropTypes.node,

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex: PropTypes.number,

  /**
   * Whether the render Tab children should be dismissable.
   */
  dismissable: PropTypes.bool,

  /**
   * Provide an optional function which is called whenever the state of the
   * `Tabs` changes
   */
  onChange: PropTypes.func,

  /**
   * If specifying the `onTabCloseRequest` prop, provide a callback function
   * responsible for removing the tab when close button is pressed on one of the Tab elements
   */
  onTabCloseRequest: (props) => {
    if (props.dismissable && !props.onTabCloseRequest) {
      return new Error(
        'dismissable property specified without also providing an onTabCloseRequest property.'
      );
    }
    return undefined;
  },

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex: PropTypes.number,
};

export interface TabsVerticalProps {
  /**
   * Provide child elements to be rendered inside the `TabsVertical`.
   * These elements should render either `TabsListVertical` or `TabsPanels`
   */
  children?: ReactNode;

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex?: number;

  /**
   * Option to set a height style only if using vertical variation
   */
  height?: string;

  /**
   * Provide an optional function which is called
   * whenever the state of the `Tabs` changes
   */
  onChange?(state: { selectedIndex: number }): void;

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex?: number;
}

function TabsVertical({
  children,
  height,
  defaultSelectedIndex = 0,
  onChange,
  selectedIndex: controlledSelectedIndex,
  ...rest
}: TabsVerticalProps) {
  const [selectedIndex, setSelectedIndex] = useControllableState({
    value: controlledSelectedIndex,
    defaultValue: defaultSelectedIndex,
    onChange: (value) => onChange?.({ selectedIndex: value }),
  });

  const props = {
    ...rest,
    selectedIndex,
    onChange: ({ selectedIndex }) => setSelectedIndex(selectedIndex),
  };

  const isSm = useMatchMedia(smMediaQuery);

  if (!isSm) {
    return (
      // eslint-disable-next-line react/forbid-component-props
      <Grid style={{ height: height }}>
        <Tabs {...props}>{children}</Tabs>
      </Grid>
    );
  }
  return <Tabs {...props}>{children}</Tabs>;
}

TabsVertical.propTypes = {
  /**
   * Provide child elements to be rendered inside the `TabsVertical`.
   * These elements should render either `TabsListVertical` or `TabsPanels`
   */
  children: PropTypes.node,

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex: PropTypes.number,

  /**
   * Option to set a height style only if using vertical variation
   */
  height: PropTypes.string,

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
 * Get the next index for a given keyboard event
 * given a count of the total items and the current index
 */
function getNextIndex(
  event: KeyboardEvent,
  total: number,
  index: number
): number {
  switch (true) {
    case match(event, keys.ArrowRight):
      return (index + 1) % total;

    case match(event, keys.ArrowLeft):
      return (total + index - 1) % total;

    case match(event, keys.Home):
      return 0;

    case match(event, keys.End):
      return total - 1;

    default:
      return index;
  }
}

/**
 * Get the next index for a given keyboard event
 * given a count of the total items and the current index
 */
function getNextIndexVertical(
  event: KeyboardEvent,
  total: number,
  index: number
): number {
  switch (true) {
    case match(event, keys.ArrowDown):
      return (index + 1) % total;

    case match(event, keys.ArrowUp):
      return (total + index - 1) % total;

    case match(event, keys.Home):
      return 0;

    case match(event, keys.End):
      return total - 1;

    default:
      return index;
  }
}

/**
 * TabList
 */

export interface TabListProps extends DivAttributes {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation?: 'automatic' | 'manual';

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label'?: string;

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to the container node
   */
  className?: string;

  /**
   * Specify whether component is contained type
   */
  contained?: boolean;

  /**
   * Used for tabs within a grid, this makes it so tabs span the full container width and have the same width. Only available on contained tabs with <9 children
   */
  fullWidth?: boolean;

  /**
   * If using `IconTab`, specify the size of the icon being used.
   */
  iconSize?: 'default' | 'lg';

  /**
   * Provide the props that describe the left overflow button
   */
  leftOverflowButtonProps?: HTMLAttributes<HTMLButtonElement>;

  /**
   * Specify whether to use the light component variant
   */
  light?: boolean;

  /**
   * Provide the props that describe the right overflow button
   */
  rightOverflowButtonProps?: HTMLAttributes<HTMLButtonElement>;

  /**
   * Optionally provide a delay (in milliseconds) passed to the lodash
   * debounce of the onScroll handler. This will impact the responsiveness
   * of scroll arrow buttons rendering when scrolling to the first or last tab.
   */
  scrollDebounceWait?: number;

  /**
   * Choose whether to automatically scroll to newly selected tabs
   * on component rerender
   */
  scrollIntoView?: boolean;
}
type TabElement = HTMLElement & { disabled?: boolean };

function TabList({
  activation = 'automatic',
  'aria-label': label,
  children,
  className: customClassName,
  contained = false,
  fullWidth = false,
  iconSize,
  leftOverflowButtonProps,
  light,
  rightOverflowButtonProps,
  scrollDebounceWait = 200,
  scrollIntoView,
  ...rest
}: TabListProps) {
  const {
    activeIndex,
    selectedIndex,
    setSelectedIndex,
    setActiveIndex,
    dismissable,
  } = React.useContext(TabsContext);
  const prefix = usePrefix();
  const ref = useRef<HTMLDivElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  let hasSecondaryLabelTabs = false;
  if (contained) {
    hasSecondaryLabelTabs = React.Children.toArray(children).some((child) => {
      const _child = child as React.ReactElement<any>;
      return React.isValidElement(child) && !!_child.props.secondaryLabel;
    });
  }

  const isLg = useMatchMedia(lgMediaQuery);

  const distributeWidth =
    fullWidth &&
    contained &&
    isLg &&
    React.Children.toArray(children).length < 9;

  const className = cx(
    `${prefix}--tabs`,
    {
      [`${prefix}--tabs--contained`]: contained,
      [`${prefix}--tabs--light`]: light,
      [`${prefix}--tabs__icon--default`]: iconSize === 'default',
      [`${prefix}--tabs__icon--lg`]: iconSize === 'lg', // TODO: V12 - Remove this class
      [`${prefix}--layout--size-lg`]: iconSize === 'lg',
      [`${prefix}--tabs--tall`]: hasSecondaryLabelTabs,
      [`${prefix}--tabs--full-width`]: distributeWidth,
      [`${prefix}--tabs--dismissable`]: dismissable,
    },
    customClassName
  );

  // Previous Button
  // VISIBLE IF:
  //   SCROLLABLE
  //   AND SCROLL_LEFT > 0
  const buttonWidth = 44;
  // Next Button
  // VISIBLE IF:
  //   SCROLLABLE
  //   AND SCROLL_LEFT + CLIENT_WIDTH < SCROLL_WIDTH
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(
    ref.current
      ? scrollLeft + buttonWidth + ref.current.clientWidth <
          ref.current.scrollWidth
      : false
  );

  const isPreviousButtonVisible = ref.current
    ? isScrollable && scrollLeft > 0
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

  const tabs = useRef<TabElement[]>([]);
  const debouncedOnScroll = useCallback(() => {
    return debounce((event) => {
      setScrollLeft(event.target.scrollLeft);
    }, scrollDebounceWait);
  }, [scrollDebounceWait]);

  function onKeyDown(event: KeyboardEvent) {
    if (
      matches(event, [keys.ArrowRight, keys.ArrowLeft, keys.Home, keys.End])
    ) {
      event.preventDefault();

      const filteredTabs = tabs.current.filter((tab) => tab !== null);

      const activeTabs: TabElement[] = filteredTabs.filter(
        (tab) => !tab.disabled
      );

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
      tabs.current[nextIndex]?.focus();
    }
  }

  function handleBlur({
    relatedTarget: currentActiveNode,
  }: React.FocusEvent<HTMLDivElement>) {
    if (ref.current?.contains(currentActiveNode)) {
      return;
    }
    // reset active index to selected tab index for manual activation
    if (activation === 'manual') {
      setActiveIndex(selectedIndex);
    }
  }

  /**
   * Scroll the tab into view if it is not already visible
   * @param tab - The tab to scroll into view
   * @returns {void}
   */
  function scrollTabIntoView(tab) {
    if (!isScrollable || !ref.current) {
      return;
    }
    if (tab) {
      // The width of the "scroll buttons"
      const { width: tabWidth } = tab.getBoundingClientRect();

      // The start and end position of the selected tab
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

      // The end of the tab is clipped and not visible
      if (end > visibleEnd) {
        setScrollLeft(end + buttonWidth - ref.current.clientWidth);
      }
    }
  }

  useEffect(() => {
    const tab = tabs.current[selectedIndex];
    if (scrollIntoView && tab) {
      tab.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, []);

  useEffect(() => {
    //adding 1 in calculation for firefox support
    setIsNextButtonVisible(
      ref.current
        ? scrollLeft + buttonWidth + ref.current.clientWidth + 1 <
            ref.current.scrollWidth
        : false
    );

    if (dismissable) {
      if (ref.current) {
        setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth);
      }
    }
  }, [scrollLeft, children, dismissable, isScrollable]);

  useEffect(() => {
    if (tabs.current[selectedIndex]?.disabled) {
      const activeTabs = tabs.current.filter((tab) => {
        return !tab.disabled;
      });

      if (activeTabs.length > 0) {
        const tab = activeTabs[0];
        setSelectedIndex(tabs.current.indexOf(tab));
      }
    }
  }, []);

  useIsomorphicEffect(() => {
    if (ref.current) {
      // adding 1 in calculation for firefox support
      setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth + 1);
    }

    function handler() {
      if (ref.current) {
        // adding 1 in calculation for firefox support
        setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth + 1);
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
    if (scrollLeft !== null && ref.current) {
      ref.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  // scroll manual tabs when active index changes (focus outline movement)
  useIsomorphicEffect(() => {
    const tab =
      activation === 'manual'
        ? tabs.current[activeIndex]
        : tabs.current[selectedIndex];

    scrollTabIntoView(tab);
  }, [activation, activeIndex]);

  // scroll tabs when selected index changes
  useIsomorphicEffect(() => {
    const tab = tabs.current[selectedIndex];
    scrollTabIntoView(tab);
  }, [selectedIndex, isScrollable, children]);

  usePressable(previousButton, {
    onPress({ longPress }) {
      if (!longPress && ref.current) {
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
      if (!longPress && ref.current) {
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
        tabIndex={-1}
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
        onKeyDown={onKeyDown}
        onBlur={handleBlur}>
        {React.Children.map(children, (child, index) => {
          return !isElement(child) ? null : (
            <TabContext.Provider
              value={{
                index,
                hasSecondaryLabel: hasSecondaryLabelTabs,
                contained,
              }}>
              {React.cloneElement(
                child as React.ReactElement<{ ref?: React.Ref<any> }>,
                {
                  ref: (node) => {
                    tabs.current[index] = node;
                  },
                }
              )}
            </TabContext.Provider>
          );
        })}
      </div>
      <button
        aria-hidden="true"
        tabIndex={-1}
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
  'aria-label': PropTypes.string,

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
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
   * Used for tabs within a grid, this makes it so tabs span the full container width and have the same width. Only available on contained tabs with <9 children
   */
  fullWidth: PropTypes.bool,

  /**
   * If using `IconTab`, specify the size of the icon being used.
   */
  iconSize: PropTypes.oneOf(['default', 'lg']),

  /**
   * Provide the props that describe the left overflow button
   */
  leftOverflowButtonProps: PropTypes.object,

  /**
   * Specify whether to use the light component variant
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
   * Choose whether to automatically scroll
   * to newly selected tabs on component rerender
   */
  scrollIntoView: PropTypes.bool,
};

/**
 * TabListVertical
 */

export interface TabListVerticalProps extends DivAttributes {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation?: 'automatic' | 'manual';

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label'?: string;

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to the container node
   */
  className?: string;

  /**
   * Choose whether to automatically scroll to newly selected tabs
   * on component rerender
   */
  scrollIntoView?: boolean;
}
// type TabElement = HTMLElement & { disabled?: boolean };

function TabListVertical({
  activation = 'automatic',
  'aria-label': label,
  children,
  className: customClassName,
  scrollIntoView,
  ...rest
}: TabListVerticalProps) {
  const { activeIndex, selectedIndex, setSelectedIndex, setActiveIndex } =
    React.useContext(TabsContext);
  const prefix = usePrefix();
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflowingBottom, setIsOverflowingBottom] = useState(false);
  const [isOverflowingTop, setIsOverflowingTop] = useState(false);

  const isSm = useMatchMedia(smMediaQuery);

  const className = cx(
    `${prefix}--tabs`,
    `${prefix}--tabs--vertical`,
    `${prefix}--tabs--contained`,
    customClassName
  );

  const tabs = useRef<TabElement[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    if (matches(event, [keys.ArrowDown, keys.ArrowUp, keys.Home, keys.End])) {
      event.preventDefault();

      const filteredTabs = tabs.current.filter((tab) => tab !== null);

      const activeTabs: TabElement[] = filteredTabs.filter(
        (tab) => !tab.disabled
      );

      const currentIndex = activeTabs.indexOf(
        tabs.current[activation === 'automatic' ? selectedIndex : activeIndex]
      );
      const nextIndex = tabs.current.indexOf(
        activeTabs[getNextIndexVertical(event, activeTabs.length, currentIndex)]
      );

      if (activation === 'automatic') {
        setSelectedIndex(nextIndex);
      } else if (activation === 'manual') {
        setActiveIndex(nextIndex);
      }
      tabs.current[nextIndex]?.focus();
    }
  }

  function handleBlur({
    relatedTarget: currentActiveNode,
  }: React.FocusEvent<HTMLDivElement>) {
    if (ref.current?.contains(currentActiveNode)) {
      return;
    }
    // reset active index to selected tab index for manual activation
    if (activation === 'manual') {
      setActiveIndex(selectedIndex);
    }
  }

  useEffect(() => {
    if (tabs.current[selectedIndex]?.disabled) {
      const activeTabs = tabs.current.filter((tab) => {
        return !tab.disabled;
      });

      if (activeTabs.length > 0) {
        const tab = activeTabs[0];
        setSelectedIndex(tabs.current.indexOf(tab));
      }
    }
  }, []);

  useEffect(() => {
    function handler() {
      const containerHeight = ref.current?.offsetHeight;
      const containerTop = ref.current?.getBoundingClientRect().top;
      const selectedPositionTop =
        tabs.current[selectedIndex]?.getBoundingClientRect().top;

      const halfTabHeight = verticalTabHeight / 2;
      if (containerTop && containerHeight) {
        // scrolls so selected tab is in view
        if (
          selectedPositionTop - halfTabHeight < containerTop ||
          selectedPositionTop -
            containerTop +
            verticalTabHeight +
            halfTabHeight >
            containerHeight
        ) {
          ref.current &&
            ref.current.scrollTo({
              top: (selectedIndex - 1) * verticalTabHeight,
              behavior: 'smooth',
            });
        }
      }
    }

    window.addEventListener('resize', handler);

    handler();

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [selectedIndex, scrollIntoView]);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handler = () => {
      const halfTabHeight = verticalTabHeight / 2;
      setIsOverflowingBottom(
        element.scrollTop + element.clientHeight + halfTabHeight <=
          element.scrollHeight
      );
      setIsOverflowingTop(element.scrollTop > halfTabHeight);
    };

    const resizeObserver = new ResizeObserver(() => handler());
    resizeObserver.observe(element);
    element.addEventListener('scroll', handler);

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', handler);
    };
  });

  if (isSm) {
    return (
      <TabList {...rest} aria-label={label} contained>
        {children}
      </TabList>
    );
  }

  return (
    <div className={className}>
      {isOverflowingTop && (
        <div className={`${prefix}--tab--list-gradient_top`}></div>
      )}
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        {...rest}
        aria-label={label}
        ref={ref}
        role="tablist"
        className={`${prefix}--tab--list`}
        onKeyDown={onKeyDown}
        onBlur={handleBlur}>
        {React.Children.map(children, (child, index) => {
          return !isElement(child) ? null : (
            <TabContext.Provider
              value={{
                index,
                hasSecondaryLabel: false,
              }}>
              {React.cloneElement(
                child as React.ReactElement<{ ref?: React.Ref<any> }>,
                {
                  ref: (node) => {
                    tabs.current[index] = node;
                  },
                }
              )}
            </TabContext.Provider>
          );
        })}
      </div>
      {isOverflowingBottom && (
        <div className={`${prefix}--tab--list-gradient_bottom`}></div>
      )}
    </div>
  );
}

TabListVertical.propTypes = {
  /**
   * Specify whether the content tab should be activated automatically or
   * manually
   */
  activation: PropTypes.oneOf(['automatic', 'manual']),

  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label': PropTypes.string,

  /**
   * Provide child elements to be rendered inside `ContentTabs`.
   * These elements should render a `ContentTab`
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the container node
   */
  className: PropTypes.string,
};

/**
 * Helper function to set up the behavior when a button is "long pressed".
 * This function will take a ref to the tablist, a direction, and a setter
 * for scrollLeft and will update the scroll position within a requestAnimationFrame.
 *
 * It returns a cleanup function to be run
 * when the long press is deactivated
 */
function createLongPressBehavior(
  ref: RefObject<HTMLElement | null>,
  direction: 'forward' | 'backward',
  setScrollLeft
) {
  const node = ref.current;
  if (!node) {
    return () => {};
  }

  // We manually override the scroll behavior to be "auto".
  // If it is set as smooth, this animation does not update correctly
  const defaultScrollBehavior = node?.style['scroll-behavior'];
  node.style['scroll-behavior'] = 'auto';

  const scrollDelta = direction === 'forward' ? 5 : -5;
  let frameId: number | null = null;

  function tick() {
    if (!node) {
      return;
    }

    node.scrollLeft = node.scrollLeft + scrollDelta;
    frameId = requestAnimationFrame(tick);
  }

  frameId = requestAnimationFrame(tick);

  return () => {
    // Restore the previous scroll behavior
    node.style['scroll-behavior'] = defaultScrollBehavior;

    // Make sure that our `scrollLeft` value is in sync with the existing
    // `ref` after our requestAnimationFrame loop above
    setScrollLeft(node.scrollLeft);

    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Tab
 */

export interface TabProps extends HTMLAttributes<HTMLElement> {
  /**
   * Provide a custom element to render instead of the default button
   */
  as?: HTMLElementType | ComponentType;

  /**
   * Provide child elements to be rendered inside `Tab`.
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to your Tab
   */
  className?: string;

  /**
   * Whether your Tab is disabled.
   */
  disabled?: boolean;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?(event: MouseEvent): void;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?(event: KeyboardEvent): void;

  /**
   * An optional parameter to allow overriding the anchor rendering.
   * Useful for using Tab along with react-router or other client
   * side router libraries.
   */
  renderButton?(): ReactNode;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * An optional label to render under the primary tab label.
   * Only useful for contained tabs.
   */
  secondaryLabel?: string;
}

const Tab = forwardRef<HTMLElement, TabProps>(function Tab(
  {
    as = 'button',
    children,
    className: customClassName,
    disabled,
    onClick,
    onKeyDown,
    secondaryLabel,
    renderIcon: Icon,
    ...rest
  },
  forwardRef
) {
  const prefix = usePrefix();
  const {
    selectedIndex,
    setSelectedIndex,
    baseId,
    dismissable,
    onTabCloseRequest,
  } = React.useContext(TabsContext);
  const { index, hasSecondaryLabel, contained } = React.useContext(TabContext);
  const { badgeIndicator } = React.useContext(IconTabContext) || {};
  const dismissIconRef = useRef<HTMLButtonElement>(null);
  const tabRef = useRef<HTMLElement>(null);
  const ref = useMergedRefs([forwardRef, tabRef]);
  const [ignoreHover, setIgnoreHover] = useState(false);
  const id = `${baseId}-tab-${index}`;
  const panelId = `${baseId}-tabpanel-${index}`;
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

  const isEllipsisActive = (element: any) => {
    setIsEllipsisApplied(element.offsetHeight < element.scrollHeight);
    return element.offsetHeight < element.scrollHeight;
  };

  const className = cx(
    `${prefix}--tabs__nav-item`,
    `${prefix}--tabs__nav-link`,
    {
      [`${prefix}--tabs__nav-item--selected`]: selectedIndex === index,
      [`${prefix}--tabs__nav-item--disabled`]: disabled,
      [`${prefix}--tabs__nav-item--hover-off`]: ignoreHover,
    },
    customClassName
  );

  const BaseComponent = as as ElementType;

  const onDismissIconMouseEnter = (evt) => {
    if (contained && tabRef.current) {
      evt.stopPropagation();
      setIgnoreHover(true);
      tabRef.current.classList.add(`${prefix}--tabs__nav-item--hover-off`);
    }
  };

  const onDismissIconMouseLeave = () => {
    if (contained && tabRef.current) {
      tabRef.current.classList.remove(`${prefix}--tabs__nav-item--hover-off`);
      setIgnoreHover(false);
    }
  };

  useEvent(dismissIconRef, 'mouseover', onDismissIconMouseEnter);
  useEvent(dismissIconRef, 'mouseleave', onDismissIconMouseLeave);

  useIsomorphicEffect(() => {
    function handler() {
      const elementTabId = document.getElementById(`${id}`) || tabRef.current;
      if (elementTabId?.closest(`.${prefix}--tabs--vertical`)) {
        const newElement = elementTabId?.getElementsByClassName(
          `${prefix}--tabs__nav-item-label`
        )[0];
        isEllipsisActive(newElement);
      }
    }
    handler();
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [prefix, id]);

  const handleClose = (evt) => {
    evt.stopPropagation();
    onTabCloseRequest?.(index);

    // set focus after removing tab
    if (tabRef.current && tabRef.current.parentElement) {
      // determine number of tabs, excluding disabled
      const tabCount = Array.from(
        tabRef.current.parentElement.childNodes
      ).filter((node) => {
        const element = node as HTMLElement;
        return (
          element.classList.contains(`${prefix}--tabs__nav-link`) &&
          !element.classList.contains(`${prefix}--tabs__nav-item--disabled`)
        );
      }).length;

      // if not removing last tab focus on next tab
      if (tabRef.current && index + 1 !== tabCount) {
        tabRef.current.focus();
      }
      // if removing last tab focus on previous tab
      else {
        const prevTabIndex = (tabCount - 2) * 2;
        (
          tabRef.current.parentElement.childNodes[prevTabIndex] as HTMLElement
        )?.focus();
      }
    }
  };

  const handleKeyDown = (event) => {
    if (dismissable && match(event, keys.Delete)) {
      handleClose(event);
    }
    onKeyDown?.(event);
  };

  const DismissIcon = (
    <div
      className={cx({
        [`${prefix}--tabs__nav-item--close`]: dismissable,
        [`${prefix}--tabs__nav-item--close--hidden`]: !dismissable,
      })}>
      <button
        type="button"
        tabIndex={selectedIndex === index && dismissable ? 0 : -1}
        aria-disabled={disabled}
        aria-hidden={selectedIndex === index && dismissable ? 'false' : 'true'}
        disabled={disabled}
        className={cx({
          [`${prefix}--tabs__nav-item--close-icon`]: dismissable,
          [`${prefix}--visually-hidden`]: !dismissable,
          [`${prefix}--tabs__nav-item--close-icon--selected`]:
            selectedIndex === index,
          [`${prefix}--tabs__nav-item--close-icon--disabled`]: disabled,
        })}
        onClick={handleClose}
        title={`Remove ${typeof children === 'string' ? children : ''} tab`}
        ref={dismissIconRef}>
        <Close
          aria-hidden={
            selectedIndex === index && dismissable ? 'false' : 'true'
          }
          aria-label={`Press delete to remove ${
            typeof children === 'string' ? children : ''
          } tab`}
        />
      </button>
    </div>
  );

  const hasIcon = Icon ?? dismissable;

  // should only happen for vertical variation, so no dismissable icon is needed here
  if (isEllipsisApplied) {
    return (
      <Tooltip
        label={children}
        align="top"
        leaveDelayMs={0}
        autoAlign
        onMouseEnter={() => false}
        closeOnActivation>
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
          title={children}
          onClick={(evt) => {
            if (disabled) {
              return;
            }
            setSelectedIndex(index);
            onClick?.(evt);
          }}
          onKeyDown={handleKeyDown}
          tabIndex={selectedIndex === index ? '0' : '-1'}
          type="button">
          <div className={`${prefix}--tabs__nav-item-label-wrapper`}>
            <Text className={`${prefix}--tabs__nav-item-label`}>
              {children}
            </Text>
          </div>
          {hasSecondaryLabel && secondaryLabel && (
            <Text
              as="div"
              className={`${prefix}--tabs__nav-item-secondary-label`}
              title={secondaryLabel}>
              {secondaryLabel}
            </Text>
          )}
        </BaseComponent>
      </Tooltip>
    );
  }

  return (
    <>
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
          onClick?.(evt);
        }}
        onKeyDown={handleKeyDown}
        tabIndex={selectedIndex === index ? '0' : '-1'}
        type="button">
        <div className={`${prefix}--tabs__nav-item-label-wrapper`}>
          {dismissable && Icon && (
            <div className={`${prefix}--tabs__nav-item--icon-left`}>
              {<Icon size={16} />}
            </div>
          )}
          <Text className={`${prefix}--tabs__nav-item-label`}>{children}</Text>
          {!dismissable && Icon && (
            <div
              className={cx(`${prefix}--tabs__nav-item--icon`, {
                [`${prefix}--visually-hidden`]: !hasIcon,
              })}>
              {!dismissable && Icon && <Icon size={16} />}
            </div>
          )}
        </div>
        {hasSecondaryLabel && secondaryLabel && (
          <Text
            as="div"
            className={`${prefix}--tabs__nav-item-secondary-label`}
            title={secondaryLabel}>
            {secondaryLabel}
          </Text>
        )}
        {!disabled && badgeIndicator && <BadgeIndicator />}
      </BaseComponent>
      {/* always rendering dismissIcon so we don't lose reference to it, otherwise events do not work when switching from/to dismissable state */}
      {DismissIcon}
    </>
  );
});
Tab.propTypes = {
  /**
   * Provide a custom element to render instead of the default button
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Provide child elements to be rendered inside `Tab`.
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

  /**
   * An optional parameter to allow overriding the anchor rendering.
   * Useful for using Tab along with react-router or other client
   * side router libraries.
   */
  renderButton: PropTypes.func,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * An optional label to render under the primary tab label.
   * Only useful for contained tabs.
   */
  secondaryLabel: PropTypes.string,
};

/**
 * IconTab
 */

const IconTabContext = createContext<{ badgeIndicator?: boolean } | false>(
  false
);

export interface IconTabProps extends DivAttributes {
  /**
   * **Experimental**: Display an empty dot badge on the Tab.
   */
  badgeIndicator?: boolean;
  /**
   * Provide an icon to be rendered inside `IconTab` as the visual label for Tab.
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to your Tab
   */
  className?: string;

  /**
   * Specify whether the tooltip for the icon should be open when it first renders
   */
  defaultOpen?: boolean;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip for the icon.
   */
  enterDelayMs?: number;

  /**
   * Provide the label to be rendered inside the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader. If using the badgeIndicator then provide a
   * label with describing that there is a new notification.
   */
  label: ReactNode;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs?: number;
}

const IconTab = React.forwardRef<HTMLDivElement, IconTabProps>(function IconTab(
  {
    badgeIndicator,
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
  const value = useMemo(() => ({ badgeIndicator }), [badgeIndicator]);

  const hasSize20 =
    isValidElement(children) &&
    (children as ReactElement<{ size?: number }>).props.size === 20;

  const classNames = cx(
    `${prefix}--tabs__nav-item--icon-only`,
    customClassName,
    { [`${prefix}--tabs__nav-item--icon-only__20`]: hasSize20 }
  );
  return (
    <IconTabContext.Provider value={value}>
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
    </IconTabContext.Provider>
  );
});

IconTab.propTypes = {
  /**
   * **Experimental**: Display an empty dot badge on the Tab.
   */
  badgeIndicator: PropTypes.bool,
  /**
   * Provide an icon to be rendered inside `IconTab` as the visual label for Tab.
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
   * Provide the label to be rendered inside the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader. If using the badgeIndicator then provide a
   * label with describing that there is a new notification.
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,
};

/**
 * TabPanel
 */

export interface TabPanelProps extends DivAttributes {
  /**
   * Provide child elements to be rendered inside `TabPanel`.
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to TabPanel.
   */
  className?: string;
}

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel(
    { children, className: customClassName, ...rest },
    forwardRef
  ) {
    const prefix = usePrefix();
    const panel = useRef<HTMLDivElement>(null);
    const ref = useMergedRefs([forwardRef, panel]);

    const [tabIndex, setTabIndex] = useState(0);
    const [interactiveContent, setInteractiveContent] = useState(false);
    const { selectedIndex, baseId } = React.useContext(TabsContext);
    const index = React.useContext(TabPanelContext);
    const id = `${baseId}-tabpanel-${index}`;
    const tabId = `${baseId}-tab-${index}`;
    const className = cx(`${prefix}--tab-content`, customClassName, {
      [`${prefix}--tab-content--interactive`]: interactiveContent,
    });

    useEffect(() => {
      if (!panel.current) {
        return;
      }

      const content = getInteractiveContent(panel.current);
      if (content) {
        setInteractiveContent(true);
        setTabIndex(-1);
      }
    }, []);

    // tabindex should only be 0 if no interactive content in children
    useEffect(() => {
      const node = panel.current;
      if (!node) {
        return;
      }

      function callback() {
        const content = getInteractiveContent(node as HTMLElement);
        if (content) {
          setInteractiveContent(true);
          setTabIndex(-1);
        } else {
          setInteractiveContent(false);
          setTabIndex(0);
        }
      }
      const observer = new MutationObserver(callback);

      observer.observe(node, {
        childList: true,
        subtree: true,
      });
      return () => observer.disconnect();
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
  }
);

TabPanel.propTypes = {
  /**
   * Provide child elements to be rendered inside `TabPanel`.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to TabPanel.
   */
  className: PropTypes.string,
};

/**
 * TabPanels
 */

export interface TabPanelsProps {
  /**
   * Provide child elements to be rendered inside `TabPanels`.
   */
  children?: ReactNode;
}

function TabPanels({ children }: TabPanelsProps) {
  const prefix = usePrefix();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const hiddenStates = useRef<boolean[]>([]);

  useIsomorphicEffect(() => {
    const tabContainer = refs.current[0]?.previousElementSibling;
    const isVertical = tabContainer?.classList.contains(
      `${prefix}--tabs--vertical`
    );
    const parentHasHeight = tabContainer?.parentElement?.style.height;

    // Should only apply same height to vertical Tab Panels without a given height
    if (isVertical && !parentHasHeight) {
      hiddenStates.current = refs.current.map((ref) => ref?.hidden || false);

      // un-hide hidden Tab Panels to get heights
      refs.current.forEach((ref) => {
        if (ref) {
          ref.hidden = false;
        }
      });

      // set max height to TabList
      const heights = refs.current.map((ref) => ref?.offsetHeight || 0);
      const max = Math.max(...heights);
      (tabContainer as HTMLElement).style.height = max + 'px';

      // re-hide hidden Tab Panels
      refs.current.forEach((ref, index) => {
        if (ref) {
          ref.hidden = hiddenStates.current[index];
        }
      });
    }
  });

  return (
    <>
      {React.Children.map(children, (child, index) => {
        return !isElement(child) ? null : (
          <TabPanelContext.Provider value={index}>
            {React.cloneElement(child as React.ReactElement<any>, {
              ref: (element: HTMLDivElement) => {
                refs.current[index] = element;
              },
            })}
          </TabPanelContext.Provider>
        );
      })}
    </>
  );
}

TabPanels.propTypes = {
  /**
   * Provide child elements to be rendered inside `TabPanels`.
   */
  children: PropTypes.node,
};

export {
  Tabs,
  TabsVertical,
  Tab,
  IconTab,
  TabPanel,
  TabPanels,
  TabList,
  TabListVertical,
};
