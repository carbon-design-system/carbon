//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { Tag, Accordion, AccordionItem } from '@carbon/react';
import PropTypes from 'prop-types';
import { NoDataEmptyState } from '../../components/EmptyStates/NoDataEmptyState';
import { pkg } from '../../settings';
import { AddSelectMetaPanel } from './AddSelectMetaPanel';

const blockClass = `${pkg.prefix}--add-select__sidebar`;
const componentName = 'AddSelectSidebar';

export let AddSelectSidebar = ({
  appliedModifiers,
  closeIconDescription,
  displayMetalPanel,
  illustrationTheme,
  influencerTitle,
  items,
  metaPanelTitle,
  modifiers,
  multiSelection,
  noSelectionDescription,
  noSelectionTitle,
  setDisplayMetaPanel,
}) => {
  const hasModifiers = modifiers?.options?.length > 0;
  const hasSelections = multiSelection.length > 0;

  const getNewItem = (item) => {
    // certain properties should not be displayed in the sidebar
    // eslint-disable-next-line no-unused-vars
    const { meta, icon, avatar, ...newItem } = item;
    return newItem;
  };

  const sidebarItems = multiSelection.map((selectionId) => {
    if (Array.isArray(items)) {
      const selectedItem = items.find((item) => item.id === selectionId);
      return getNewItem(selectedItem);
    }
    return getNewItem(items[selectionId]);
  });

  const getTitle = (item) => {
    let modifierEl;

    if (hasModifiers) {
      const _modifiers = appliedModifiers?.find(
        (modifier) => modifier?.id === item?.id
      )[modifiers?.id];

      modifierEl = _modifiers;

      if (Array.isArray(_modifiers)) {
        modifierEl = _modifiers?.map(
          (_modifier, index) =>
            `${_modifier}${index + 1 !== _modifiers.length ? ', ' : ''}`
        );
      }
    }

    return (
      <div className={`${blockClass}-accordion-title`}>
        <div className={`${blockClass}-selected-item`}>
          <p className={`${blockClass}-selected-item-title`}>{item.title}</p>
          <p className={`${blockClass}-selected-item-subtitle`}>
            {item.subtitle}
          </p>
        </div>
        {hasModifiers && <div>{modifierEl}</div>}
      </div>
    );
  };

  if (Object.keys(displayMetalPanel).length !== 0) {
    return (
      <AddSelectMetaPanel
        closeIconDescription={closeIconDescription}
        meta={displayMetalPanel.meta}
        setDisplayMetaPanel={setDisplayMetaPanel}
        title={metaPanelTitle}
      />
    );
  }

  return (
    <div className={blockClass}>
      <div className={`${blockClass}-header`}>
        <p className={`${blockClass}-title`}>{influencerTitle}</p>
        <Tag type="gray" size="sm">
          {multiSelection.length}
        </Tag>
      </div>
      {hasSelections ? (
        <Accordion align="start">
          {sidebarItems.map((item) => (
            <AccordionItem title={getTitle(item)} key={item.id}>
              {Object.keys(item).map((key) => (
                <div className={`${blockClass}-item`} key={key}>
                  <p className={`${blockClass}-item-header`}>{key}</p>
                  <p className={`${blockClass}-item-body`}>{item[key]}</p>
                </div>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className={`${blockClass}-body`}>
          <NoDataEmptyState
            subtitle={noSelectionDescription}
            title={noSelectionTitle}
            size="sm"
            illustrationTheme={illustrationTheme}
          />
        </div>
      )}
    </div>
  );
};

AddSelectSidebar.propTypes = {
  appliedModifiers: PropTypes.array,
  closeIconDescription: PropTypes.string,
  displayMetalPanel: PropTypes.object,
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),
  influencerTitle: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  metaPanelTitle: PropTypes.string,
  modifiers: PropTypes.object,
  multiSelection: PropTypes.array,
  noSelectionDescription: PropTypes.string,
  noSelectionTitle: PropTypes.string,
  setDisplayMetaPanel: PropTypes.func,
};

AddSelectSidebar.displayName = componentName;
