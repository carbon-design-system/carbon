/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { match, matches, keys } from '../../../internal/keyboard';
import { useId } from '../../../internal/useId';
import { useControllableState } from './useControllableState';

const { prefix } = settings;

// Used to manage the overall state of the ContentSwitcher
const ContentSwitcherContext = React.createContext();

// Used to keep track of position in a tablist
const ContentTabContext = React.createContext();

// Used to keep track of position in a list of tab panels
const ContentPanelContext = React.createContext();

function ContentSwitcher({
  children,
  defaultSelectedIndex = 0,
  onChange,
  selectedIndex: controlledSelectedIndex,
}) {
  const baseId = useId('ccs');
  // The active index is used to track the element which has focus in our tablist
  const [activeIndex, setActiveIndex] = React.useState(defaultSelectedIndex);
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

  return (
    <ContentSwitcherContext.Provider value={value}>
      {children}
    </ContentSwitcherContext.Provider>
  );
}

ContentSwitcher.propTypes = {
  /**
   * Provide child elements to be rendered inside of the `ContentSwitcher`.
   * These elements should render either `ContentTabs` or `ContentPanels`
   */
  children: PropTypes.node,

  /**
   * Specify which content tab should be initially selected when the component
   * is first rendered
   */
  defaultSelectedIndex: PropTypes.number,

  /**
   * Provide an optional function which is called whenever the state of the
   * `ContentSwitcher` changes
   */
  onChange: PropTypes.func,

  /**
   * Control which content panel is currently selected. This puts the component
   * in a controlled mode and should be used along with `onChange`
   */
  selectedIndex: PropTypes.number,
};

/**
 * A `ContentPanel` corresponds to a tablist in the Tabs pattern as written in
 * WAI-ARIA Authoring Practices.
 *
 * @see https://w3c.github.io/aria-practices/#tabpanel
 */
function ContentTabs({
  activation = 'automatic',
  'aria-label': label,
  children,
  className: customClassName,
  size = 'md',
  ...rest
}) {
  const {
    activeIndex,
    selectedIndex,
    setSelectedIndex,
    setActiveIndex,
  } = React.useContext(ContentSwitcherContext);
  const ref = React.useRef(null);
  const className = cx(customClassName, `${prefix}--content-switcher`, {
    [`${prefix}--content-switcher--${size}`]: size,
  });
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
          <ContentTabContext.Provider value={index}>
            {React.cloneElement(child, {
              ref,
            })}
          </ContentTabContext.Provider>
        );
      })}
    </div>
  );
}

ContentTabs.propTypes = {
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
   * Specify the size of the Content Switcher. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

/**
 * Get the next index for a givne keyboard event given a count of the total
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

const ContentTab = React.forwardRef(function ContentTab(
  { children, ...rest },
  ref
) {
  const { selectedIndex, setSelectedIndex, baseId } = React.useContext(
    ContentSwitcherContext
  );
  const index = React.useContext(ContentTabContext);
  const id = `${baseId}-tab-${index}`;
  const panelId = `${baseId}-tabpanel-${index}`;
  const className = cx(`${prefix}--content-switcher-btn`, {
    [`${prefix}--content-switcher--selected`]: selectedIndex === index,
  });

  return (
    <button
      {...rest}
      aria-controls={panelId}
      aria-selected={selectedIndex === index}
      ref={ref}
      id={id}
      role="tab"
      className={className}
      onClick={() => {
        setSelectedIndex(index);
      }}
      tabIndex={selectedIndex === index ? '0' : '-1'}
      type="button">
      {children}
    </button>
  );
});

ContentTab.propTypes = {
  /**
   * Provide child elements to be rendered inside of `ContentTab`.
   * These elements must be noninteractive
   */
  children: PropTypes.node,
};

/**
 * Used to display all of the tab panels inside of a Content Switcher. This
 * components keeps track of position in for each ContentPanel.
 *
 * Note: children should either be a `ContentPanel` or should render a
 * `ContentPanel`. Fragments are not currently supported.
 */
function ContentPanels({ children }) {
  return React.Children.map(children, (child, index) => {
    return (
      <ContentPanelContext.Provider value={index}>
        {child}
      </ContentPanelContext.Provider>
    );
  });
}

ContentPanels.propTypes = {
  /**
   * Provide child elements to be rendered inside of `ContentPanels`.
   * These elements should render a `ContentPanel`
   */
  children: PropTypes.node,
};

/**
 * A `ContentPanel` corresponds to a tabpanel in the Tabs pattern as written in
 * WAI-ARIA Authoring Practices. This component reads the selected
 * index and base id from context in order to determine the correct `id` and
 * display status of the component.
 *
 * @see https://w3c.github.io/aria-practices/#tabpanel
 */
const ContentPanel = React.forwardRef(function ContentPanel(props, ref) {
  const { children, ...rest } = props;
  const { selectedIndex, baseId } = React.useContext(ContentSwitcherContext);
  const index = React.useContext(ContentPanelContext);
  const id = `${baseId}-tabpanel-${index}`;
  const tabId = `${baseId}-tab-${index}`;

  // TODO: tabindex should only be 0 if no interactive content in children
  return (
    <div
      {...rest}
      aria-labelledby={tabId}
      id={id}
      ref={ref}
      role="tabpanel"
      tabIndex="0"
      hidden={selectedIndex !== index}>
      {children}
    </div>
  );
});

ContentPanel.propTypes = {
  /**
   * Provide child elements to be rendered inside of `ContentPanel`.
   */
  children: PropTypes.node,
};

export {
  ContentSwitcher,
  ContentTabs,
  ContentTab,
  ContentPanels,
  ContentPanel,
};
