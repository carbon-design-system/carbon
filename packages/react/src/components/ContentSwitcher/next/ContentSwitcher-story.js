/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  ContentSwitcher,
  ContentTabs,
  ContentTab,
  ContentPanels,
  ContentPanel,
} from './';

export default {
  title: 'Experimental/unstable_ContentSwitcher',
};

export const Default = () => {
  // Active index is for the element which has focus in our tablist
  const [activeIndex, setActiveIndex] = React.useState(0);
  // Selected index is for the tab/panel pairing which is "visible"
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const mode = 'automatic';
  const tabOne = React.useRef(null);
  const tabTwo = React.useRef(null);
  const tabThree = React.useRef(null);
  const tabs = [tabOne, tabTwo, tabThree];

  return (
    <>
      <ContentSwitcher>
        <ContentTabs
          onKeyDown={(event) => {
            if (mode === 'automatic') {
              // activation modes
              // automatic
              if (event.key === 'ArrowRight') {
                // we're going to go right
                if (selectedIndex + 1 <= 2) {
                  setSelectedIndex(selectedIndex + 1);
                  tabs[selectedIndex + 1].current.focus();
                }
              } else if (event.key === 'ArrowLeft') {
                // we're going to go left
                if (selectedIndex - 1 >= 0) {
                  setSelectedIndex(selectedIndex - 1);
                  tabs[selectedIndex - 1].current.focus();
                }
              } else if (event.key === 'Home') {
                // we should go to the first item
                setSelectedIndex(0);
                tabs[0].current.focus();
              } else if (event.key === 'End') {
                // we should go to the last item
                setSelectedIndex(2);
                tabs[2].current.focus();
              }
            }

            if (mode === 'manual') {
              if (event.key === 'ArrowRight') {
                // we're going to go right
                if (activeIndex + 1 <= 2) {
                  setActiveIndex(activeIndex + 1);
                  tabs[activeIndex + 1].current.focus();
                }
              } else if (event.key === 'ArrowLeft') {
                // we're going to go left
                if (activeIndex - 1 >= 0) {
                  setActiveIndex(activeIndex - 1);
                  tabs[activeIndex - 1].current.focus();
                }
              } else if (event.key === 'Home') {
                // we should go to the first item
                setActiveIndex(0);
                tabs[0].current.focus();
              } else if (event.key === 'End') {
                // we should go to the last item
                setActiveIndex(2);
                tabs[2].current.focus();
              }
            }
          }}>
          <ContentTab ref={tabOne}>Tab 1</ContentTab>
          <ContentTab ref={tabTwo}>Tab 2</ContentTab>
          <ContentTab ref={tabThree}>Tab 3</ContentTab>
        </ContentTabs>
        <ContentPanels>
          <ContentPanel>Panel 1</ContentPanel>
          <ContentPanel>Panel 2</ContentPanel>
          <ContentPanel>Panel 3</ContentPanel>
        </ContentPanels>
      </ContentSwitcher>
      <div>
        <p>Programmatic use-case</p>
        <button
          type="button"
          onClick={() => {
            setSelectedIndex(0);
            tabs[0].current.focus();
          }}>
          First item is active
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedIndex(2);
            tabs[2].current.focus();
          }}>
          Last item is active
        </button>
      </div>
    </>
  );
};
