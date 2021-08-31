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
import { useId } from '../../../internal/useId';

const { prefix } = settings;

const ContentSwitcherContext = React.createContext();

function ContentSwitcher({ children, defaultSelectedIndex = 0 }) {
  const prefix = useId('ccs');
  // Active index is for the element which has focus in our tablist
  const [activeIndex, setActiveIndex] = React.useState(defaultSelectedIndex);
  // Selected index is for the tab/panel pairing which is "visible"
  const [selectedIndex, setSelectedIndex] = React.useState(
    defaultSelectedIndex
  );
  const value = {
    activeIndex,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
    prefix,
  };

  return (
    <ContentSwitcherContext.Provider value={value}>
      {children}
    </ContentSwitcherContext.Provider>
  );
}

ContentSwitcher.propTypes = {
  // children: PropTypes.node,
  // className: PropTypes.string,
  // size: PropTypes.oneOf(['sm', 'md', 'lg']),
  // Controlled / uncontrolled state stuff
  // onChange: PropTypes.func.isRequired,
  // selectedIndex: PropTypes.number,
  // Odd one out style, referring to how focus gets triggered
  // selectionMode: PropTypes.oneOf(['automatic', 'manual']),
};

// Alias for old ContentSwitcher
function ContentTabs({
  'aria-label': label,
  children,
  mode = 'automatic',
  ...rest
}) {
  const {
    activeIndex,
    selectedIndex,
    setSelectedIndex,
    setActiveIndex,
  } = React.useContext(ContentSwitcherContext);
  const className = cx(
    `${prefix}--content-switcher`,
    `${prefix}--content-switcher--sm`
  );
  const count = React.Children.count(children);

  return (
    <div
      {...rest}
      aria-label={label}
      role="tablist"
      className={className}
      onKeyDown={(event) => {
        if (mode === 'automatic') {
          if (event.key === 'ArrowRight') {
            // how do we know what the "upper limit" is of items?
            if (selectedIndex + 1 < count) {
              setSelectedIndex(selectedIndex + 1);
              // tabs[selectedIndex + 1].current.focus();
            }
          } else if (event.key === 'ArrowLeft') {
            // we're going to go left
            if (selectedIndex - 1 >= 0) {
              setSelectedIndex(selectedIndex - 1);
              // tabs[selectedIndex - 1].current.focus();
            }
          }
        }
      }}>
      {React.Children.map(children, (child, index) => {
        return (
          <ContentTabContext.Provider value={index}>
            {child}
          </ContentTabContext.Provider>
        );
      })}
    </div>
  );
}

ContentTabs.propTypes = {
  //
};

const ContentTabContext = React.createContext();

// Alias for Switch
const ContentTab = React.forwardRef(function ContentTab(
  { children, ...rest },
  ref
) {
  const {
    selectedIndex,
    setSelectedIndex,
    prefix: idPrefix,
  } = React.useContext(ContentSwitcherContext);
  const index = React.useContext(ContentTabContext);
  const id = `${idPrefix}-tab-${index}`;
  const panelId = `${idPrefix}-tabpanel-${index}`;
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
      type="button"
      role="tab"
      className={className}
      onClick={() => {
        setSelectedIndex(index);
      }}>
      {children}
    </button>
  );
});

function ContentPanels({ children }) {
  return React.Children.map(children, (child, index) => {
    return (
      <ContentPanelContext.Provider value={index}>
        {child}
      </ContentPanelContext.Provider>
    );
  });
}

const ContentPanelContext = React.createContext();

function ContentPanel({ children, ...rest }) {
  const { selectedIndex, prefix } = React.useContext(ContentSwitcherContext);
  const index = React.useContext(ContentPanelContext);
  const id = `${prefix}-tabpanel-${index}`;
  const tabId = `${prefix}-tab-${index}`;

  // Note: tabindex should only be 0 if no interactive content in children
  return (
    <div
      {...rest}
      aria-labelledby={tabId}
      id={id}
      role="tabpanel"
      tabIndex="0"
      hidden={selectedIndex !== index}>
      {children}
    </div>
  );
}

export {
  ContentSwitcher,
  ContentTabs,
  ContentTab,
  ContentPanels,
  ContentPanel,
};
