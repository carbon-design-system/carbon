/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accordion, AccordionItem, Button, Layer, Search } from '@carbon/react';
import {
  BATCH,
  CLEAR_FILTERS,
  INSTANT,
  PANEL,
  SAVED_FILTERS,
} from './constants';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useFilters,
  useShouldDisableButtons,
  useSubscribeToEventEmitter,
} from './hooks';

import { ActionSet } from '../../../../ActionSet';
import { Close } from '@carbon/react/icons';
import { FilterContext } from './FilterProvider';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../../../../settings';
import { rem } from '@carbon/layout';
import {
  useIsomorphicEffect,
  usePrefersReducedMotion,
  usePresence,
} from '../../../../../global/js/hooks';
const blockClass = `${pkg.prefix}--datagrid`;
export const componentClass = `${blockClass}-filter-panel`;

const defaults = {
  title: 'Filter',
  closeIconDescription: 'Close filter panel',
  primaryActionLabel: 'Apply',
  secondaryActionLabel: 'Cancel',
  searchLabelText: 'Filter search',
  searchPlaceholder: 'Find filters',
};

// Use same empty array every time, for benefit of useEffect() etc. dependency checking.
const emptyArray = [];

const FilterPanel = ({
  title = defaults.title,
  closeIconDescription = defaults.closeIconDescription,
  updateMethod,
  filterSections,
  setAllFilters,
  onApply = () => {},
  onCancel = () => {},
  onPanelOpen = () => {},
  onPanelClose = () => {},
  showFilterSearch = false,
  filterPanelMinHeight = 600,
  primaryActionLabel = defaults.primaryActionLabel,
  secondaryActionLabel = defaults.secondaryActionLabel,
  searchLabelText = defaults.searchLabelText,
  searchPlaceholder = defaults.searchPlaceholder,
  reactTableFiltersState = emptyArray,
  autoHideFilters = false,
  isFetching = false,
}) => {
  /** State */
  const [showDividerLine, setShowDividerLine] = useState(false);

  /** Context */
  const {
    panelOpen,
    setPanelOpen,
    dispatch: localDispatch,
  } = useContext(FilterContext);

  const {
    filtersState,
    prevFiltersObjectArrayRef,
    prevFiltersRef,
    cancel,
    reset,
    renderFilter,
    filtersObjectArray,
    lastAppliedFilters,
  } = useFilters({
    updateMethod,
    filters: filterSections,
    setAllFilters,
    variation: PANEL,
    reactTableFiltersState,
    onCancel,
    panelOpen,
    autoHideFilters,
    isFetching,
  });

  /** Refs */
  const filterPanelRef = useRef(undefined);
  const filterHeadingRef = useRef(undefined);
  const filterSearchRef = useRef(undefined);
  const actionSetRef = useRef(undefined);
  const innerContainerRef = useRef(undefined);
  /** State from hooks */
  const [shouldDisableButtons, setShouldDisableButtons] =
    useShouldDisableButtons({
      initialValue: true,
      filtersState,
      prevFiltersRef,
      open: panelOpen,
    });

  const shouldReduceMotion = usePrefersReducedMotion();

  const exitAnimationName = shouldReduceMotion
    ? 'filter-panel-exit-reduced'
    : 'filter-panel-exit-left';

  const { shouldRender } = usePresence(
    panelOpen,
    filterPanelRef,
    exitAnimationName
  );

  const [animationComplete, setAnimationComplete] = useState(false);

  /** Memos */
  const showActionSet = useMemo(() => updateMethod === BATCH, [updateMethod]);

  /** Methods */
  const closePanel = () => {
    cancel();
    setPanelOpen(false);
  };

  // Set the internal state `animationComplete` to true if
  // prefers reduced motion is true
  useEffect(() => {
    if (shouldReduceMotion) {
      setAnimationComplete(true);
    }
  }, [shouldReduceMotion]);

  // initializes the side panel to open
  const onAnimationStart = () => {
    setAnimationComplete(false);
  };
  const onAnimationEnd = () => {
    setAnimationComplete(!animationComplete);
  };

  const apply = () => {
    setAllFilters(filtersObjectArray);
    // From the user
    onApply({
      filtersState,
      filtersObjectArray,
      lastAppliedFilters,
    });
    // When the user clicks apply, the action set buttons should be disabled again
    setShouldDisableButtons(true);

    // updates the ref so next time the flyout opens we have records of the previous filters
    prevFiltersRef.current = JSON.stringify(filtersState);
    prevFiltersObjectArrayRef.current = JSON.stringify(filtersObjectArray);

    // Update the last applied filters
    lastAppliedFilters.current = JSON.stringify(filtersObjectArray);

    // Dispatch action from local filter context to track filters in order
    // to keep history if `isFetching` becomes true. If so, react-table
    // clears all filter history
    localDispatch({
      type: SAVED_FILTERS,
      payload: {
        savedFilters: filtersObjectArray,
      },
    });
  };

  const renderActionSet = () => {
    return (
      showActionSet && (
        <ActionSet
          actions={[
            {
              key: 1,
              kind: 'primary',
              label: primaryActionLabel,
              onClick: apply,
              disabled: shouldDisableButtons,
            },
            {
              key: 2,
              kind: 'secondary',
              label: secondaryActionLabel,
              onClick: cancel,
              disabled: shouldDisableButtons,
            },
          ]}
          className={cx(`${componentClass}__action-set`, {
            [`${componentClass}__animationComplete`]: animationComplete,
          })}
          ref={actionSetRef}
        />
      )
    );
  };

  const onInnerContainerScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setShowDividerLine(true);
    } else {
      setShowDividerLine(false);
    }
  };

  /** Effects */
  useEffect(
    function liftOpenStateToParent() {
      if (panelOpen) {
        onPanelOpen(panelOpen);
      } else {
        onPanelClose(panelOpen);
      }
    },
    [panelOpen, onPanelClose, onPanelOpen]
  );

  useEffect(
    function setPanelMinimumHeight() {
      filterPanelRef.current?.style.setProperty(
        '--filter-panel-min-height',
        rem(filterPanelMinHeight)
      );
    },
    [filterPanelMinHeight, shouldRender]
  );

  // tableId is passed in from the event emitter from the FilterSummary component
  // in DatagridContent
  useSubscribeToEventEmitter(CLEAR_FILTERS, (tableId) => {
    reset(tableId);
  });

  const getScrollableContainerHeight = useCallback(() => {
    const filterHeadingHeight =
      filterHeadingRef.current?.getBoundingClientRect().height;
    const filterSearchHeight =
      filterSearchRef.current?.getBoundingClientRect().height;
    const actionSetHeight =
      actionSetRef.current?.getBoundingClientRect().height;

    const height = panelOpen
      ? `calc(100vh - ${filterHeadingHeight}px - ${
          /* istanbul ignore next */
          showFilterSearch ? filterSearchHeight : 0
        }px - ${updateMethod === BATCH ? actionSetHeight : 0}px)`
      : 0;
    return height;
  }, [
    filterHeadingRef,
    filterSearchRef,
    actionSetRef,
    panelOpen,
    showFilterSearch,
    updateMethod,
  ]);

  useIsomorphicEffect(() => {
    const height = getScrollableContainerHeight();
    if (
      innerContainerRef.current &&
      innerContainerRef.current.style &&
      height
    ) {
      innerContainerRef.current.style.height = height;
    }
  }, [getScrollableContainerHeight, innerContainerRef, shouldRender]);

  return shouldRender ? (
    <div
      ref={filterPanelRef}
      onAnimationEnd={onAnimationEnd}
      onAnimationStart={onAnimationStart}
      className={cx(
        componentClass,
        `${componentClass}__container`,
        `${componentClass}--left-placement`,
        {
          [`${componentClass}--open`]: panelOpen,
          [`${componentClass}--closing`]: !panelOpen,
          [`${componentClass}--reduced-motion`]: shouldReduceMotion,
          [`${componentClass}--batch`]: showActionSet,
          [`${componentClass}--instant`]: !showActionSet,
        }
      )}
    >
      <div>
        <header
          ref={filterHeadingRef}
          className={cx(`${componentClass}__heading`, {
            [`${componentClass}__heading--with-divider`]: showDividerLine,
          })}
        >
          <div className={`${componentClass}__title`}>{title}</div>
          <Button
            hasIconOnly
            renderIcon={(props) => <Close size={16} {...props} />}
            iconDescription={closeIconDescription}
            kind="ghost"
            tooltipPosition="bottom"
            tooltipAlignment="end"
            onClick={closePanel}
          />
          {showFilterSearch && (
            /* istanbul ignore next */
            <div ref={filterSearchRef} className={`${componentClass}__search`}>
              <Layer>
                <Search
                  labelText={searchLabelText}
                  placeholder={searchPlaceholder}
                  size="sm"
                />
              </Layer>
            </div>
          )}
        </header>

        <div
          className={`${componentClass}__inner-container`}
          ref={innerContainerRef}
          onScroll={onInnerContainerScroll}
        >
          {filterSections.map(
            ({ categoryTitle = null, filters = [], hasAccordion }, index) => {
              return (
                <div key={index} className={`${componentClass}__category`}>
                  {categoryTitle && (
                    <div className={`${componentClass}__category-title`}>
                      {categoryTitle}
                    </div>
                  )}

                  {hasAccordion ? (
                    <Accordion>
                      {filters.map(({ filterLabel, filter }) => {
                        return (
                          <AccordionItem title={filterLabel} key={filterLabel}>
                            {renderFilter(filter)}
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  ) : (
                    filters.map(({ filter }) => renderFilter(filter))
                  )}
                </div>
              );
            }
          )}
        </div>
        {renderActionSet()}
      </div>
    </div>
  ) : null;
};

FilterPanel.propTypes = {
  autoHideFilters: PropTypes.bool,
  closeIconDescription: PropTypes.string,
  filterPanelMinHeight: PropTypes.number,
  filterSections: PropTypes.array,
  isFetching: PropTypes.bool,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onPanelClose: PropTypes.func,
  onPanelOpen: PropTypes.func,
  open: PropTypes.bool,
  primaryActionLabel: PropTypes.string,
  /**
   * Filters from react table's state
   */
  reactTableFiltersState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  searchLabelText: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  secondaryActionLabel: PropTypes.string,
  setAllFilters: PropTypes.func,
  showFilterSearch: PropTypes.bool,
  title: PropTypes.string,
  updateMethod: PropTypes.oneOf([BATCH, INSTANT]),
};

export default FilterPanel;
