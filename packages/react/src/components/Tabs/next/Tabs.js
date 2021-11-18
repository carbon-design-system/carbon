/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import cx from 'classnames';
// import { ChevronLeft16, ChevronRight16 } from '@carbon/icons-react';
// import debounce from 'lodash.debounce';
import { keys, match, matches } from '../../../internal/keyboard';
// import TabContent from '../../TabContent';
// import deprecate from '../../../prop-types/deprecate';
import { usePrefix } from '../../../internal/usePrefix';
import { useId } from '../../../internal/useId';
import { useControllableState } from '../../ContentSwitcher/next/useControllableState';

// Used to manage the overall state of the Tabs
const TabsContext = React.createContext();

// Used to keep track of position in a tablist
const TabContext = React.createContext();

// Used to keep track of position in a list of tab panels
const TabPanelContext = React.createContext();

export function Tabs({
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

const TabPanel = React.forwardRef(function TabPanel(
  { children, className: customClassName, ...rest },
  ref
) {
  const prefix = usePrefix();

  const { selectedIndex, baseId } = React.useContext(TabsContext);
  const index = React.useContext(TabPanelContext);
  const id = `${baseId}-tabpanel-${index}`;
  const tabId = `${baseId}-tab-${index}`;
  const className = cx(`${prefix}--tab-content`, {
    customClassName: customClassName,
  });

  // TODO: tabindex should only be 0 if no interactive content in children
  return (
    <div
      {...rest}
      aria-labelledby={tabId}
      id={id}
      className={className}
      ref={ref}
      role="tabpanel"
      tabIndex="0"
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
};

export function TabPanels({ children }) {
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

export function TabList({
  activation = 'automatic',
  'aria-label': label,
  children,
  className: customClassName,
  ...rest
}) {
  const {
    activeIndex,
    selectedIndex,
    setSelectedIndex,
    setActiveIndex,
  } = React.useContext(TabsContext);
  const prefix = usePrefix();
  const ref = useRef(null);
  const className = cx(
    `${prefix}--tabs`,
    `${prefix}--tabs--scrollable`,
    `${prefix}--tabs--scrollable__nav`,
    customClassName
  );
  const count = React.Children.count(children);
  const tabs = [];

  function onKeyDown(event) {
    if (
      matches(event, [keys.ArrowRight, keys.ArrowLeft, keys.Home, keys.End])
    ) {
      const nextIndex = getNextIndex(
        event,
        count,
        activation === 'automatic' ? selectedIndex : activeIndex
      );

      if (activation === 'automatic') {
        setSelectedIndex(nextIndex);
      } else if (activation === 'manual') {
        setActiveIndex(nextIndex);
      }

      tabs[nextIndex].current.focus();
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      {...rest}
      aria-label={label}
      ref={ref}
      role="tablist"
      className={className}
      onKeyDown={onKeyDown}>
      {React.Children.map(children, (child, index) => {
        const ref = React.createRef();
        tabs.push(ref);
        return (
          <TabContext.Provider value={index}>
            {React.cloneElement(child, {
              ref,
            })}
          </TabContext.Provider>
        );
      })}
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

const Tab = React.forwardRef(function Tab(
  {
    children,
    className: customClassName,
    disabled,
    onClick,
    onKeyDown,
    renderButton,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const { selectedIndex, setSelectedIndex, baseId } = React.useContext(
    TabsContext
  );
  const index = React.useContext(TabContext);
  const id = `${baseId}-tab-${index}`;
  const panelId = `${baseId}-tabpanel-${index}`;
  const className = cx(
    `${prefix}--tabs--scrollable__nav-item`,
    `${prefix}--tabs__nav-item`,
    `${prefix}--tabs__nav-link`,
    {
      [`${prefix}--tabs--scrollable__nav-item--selected`]:
        selectedIndex === index,
      [`${prefix}--tabs__nav-item--disabled`]: disabled,
      [`${prefix}--tabs--scrollable__nav-item--disabled`]: disabled,
      customClassName: customClassName,
    }
  );

  // const classes = classNames(
  //   className,
  //   // TODO: remove scrollable in next major release
  //   // `${prefix}--tabs__nav-item`,
  //   `${prefix}--tabs--scrollable__nav-item`,
  //   {
  //     [`${prefix}--tabs__nav-item--disabled`]: disabled,
  //     [`${prefix}--tabs__nav-item--selected`]: selected,
  //     // TODO: remove scrollable in next major release
  //     [`${prefix}--tabs--scrollable__nav-item--disabled`]: disabled,
  //     [`${prefix}--tabs--scrollable__nav-item--selected`]: selected,
  //  }

  return (
    <button
      {...rest}
      aria-controls={panelId}
      aria-selected={selectedIndex === index}
      ref={ref}
      id={id}
      role="tab"
      className={className}
      onClick={(evt) => {
        setSelectedIndex(index);
        onClick(evt);
      }}
      onKeyDown={(evt) => {
        onKeyDown(evt);
      }}
      tabIndex={selectedIndex === index ? '0' : '-1'}
      type="button">
      {children}
    </button>
  );
});

Tab.propTypes = {
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
};

export { Tab, TabPanel };

export default Tabs;

// static propTypes = {

/**
 * Provide the props that describe the left overflow button
 */
// leftOverflowButtonProps: PropTypes.object,

/**
 * Specify whether or not to use the light component variant
 */
// light: PropTypes.bool,

/**
 * Provide the props that describe the right overflow button
 */
// rightOverflowButtonProps: PropTypes.object,

/**
 * Choose whether or not to automatically scroll to newly selected tabs
 * on component rerender
 */
// scrollIntoView: PropTypes.bool,

/**
 * Provide the type of Tab
 */
// type: PropTypes.oneOf(['default', 'container']),
