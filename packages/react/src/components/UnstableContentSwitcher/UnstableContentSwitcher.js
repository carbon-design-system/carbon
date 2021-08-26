/* eslint-disable react/prop-types */
import './styles.scss';
import PropTypes from 'prop-types';
import React from 'react';

const ContentSwitcherContext = React.createContext();

const ContentSwitcher = React.forwardRef(function ContentSwitcher(props, ref) {
  const id = 'custom-id';
  const [activeIndex, setActiveIndex] = React.useState(0);
  const value = {
    id,
    activeIndex,
    setActiveIndex,
  };

  return (
    <ContentSwitcherContext.Provider value={value}>
      <div className="content-switcher">{props.children}</div>
    </ContentSwitcherContext.Provider>
  );
});

ContentSwitcher.propTypes = {};

const ContentTabContext = React.createContext();

const ContentTabs = React.forwardRef(function ContentTabs(props, ref) {
  return (
    <div role="tablist" aria-label={props['aria-label']}>
      {React.Children.map(props.children, (child, index) => {
        return (
          <ContentTabContext.Provider value={index}>
            {child}
          </ContentTabContext.Provider>
        );
      })}
    </div>
  );
});

ContentTabs.propTypes = {
  'aria-label': PropTypes.string.isRequired,
};

const ContentTab = React.forwardRef(function ContentTab(props, ref) {
  const context = React.useContext(ContentSwitcherContext);
  const index = React.useContext(ContentTabContext);
  const id = `${context.id}-tab-${index}`;
  const panelId = `${context.id}-tabpanel-${index}`;

  // TODOs
  // How does a tab know when it's selected?
  // How do you select a tab?
  // How do you get the id of an associated tabpanel
  // Roving tabindex????
  return (
    <button
      role="tab"
      tabIndex="-1"
      type="button"
      aria-selected={context.activeIndex === index}
      id={id}
      aria-controls={panelId}
      onClick={() => {
        context.setActiveIndex(index);
      }}>
      {props.children}
    </button>
  );
});

ContentTab.propTypes = {};

const ContentPanelContext = React.createContext();

const ContentPanels = React.forwardRef(function ContentPanels(props, ref) {
  return React.Children.map(props.children, (child, index) => {
    return (
      <ContentPanelContext.Provider value={index}>
        {child}
      </ContentPanelContext.Provider>
    );
  });
});

ContentPanels.propTypes = {};

const ContentPanel = React.forwardRef(function ContentPanel(props, ref) {
  const context = React.useContext(ContentSwitcherContext);
  const index = React.useContext(ContentPanelContext);
  const id = `${context.id}-tabpanel-${index}`;
  const tabId = `${context.id}-tab-${index}`;

  // TODOs
  // how do we get the id of a `ContentTab` that relates to this panel?
  //   -> aria-labelledby
  // how does the ContentTab get the id of this tabpanel???
  // state: how does this tabpanel know when to hide versus be shown?
  // The tabpanel should only have tabIndex set if and only if there is no interactive content
  return (
    <div
      aria-labelledby={tabId}
      id={id}
      tabIndex="0"
      role="tabpanel"
      className={context.activeIndex !== index ? 'hidden' : ''}>
      {props.children}
      {console.log(context.activeIndex, index)}
    </div>
  );
});

ContentPanel.propTypes = {};

export default function App() {
  return (
    <ContentSwitcher>
      <ContentTabs aria-label="Demo content switcher">
        <ContentTab>One</ContentTab>
        <ContentTab>Two</ContentTab>
        <ContentTab>Three</ContentTab>
      </ContentTabs>
      <ContentPanels>
        <ContentPanel>Panel one</ContentPanel>
        <ContentPanel>Panel two</ContentPanel>
        <ContentPanel>Panel three</ContentPanel>
      </ContentPanels>
    </ContentSwitcher>
  );
}
