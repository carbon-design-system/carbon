/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  BATCH,
  CLEAR_FILTERS,
  FLYOUT,
  INSTANT,
  SAVED_FILTERS,
} from './constants';
import { IconButton, usePrefix } from '@carbon/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { breakpoints, px } from '@carbon/layout';
import {
  useClickOutside,
  useWindowResize,
} from '../../../../../global/js/hooks';
import {
  useFilters,
  useShouldDisableButtons,
  useSubscribeToEventEmitter,
} from './hooks';

import { ActionSet } from '../../../../ActionSet';
import { Filter } from '@carbon/react/icons';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../../../../settings';
import { FilterContext } from './FilterProvider';

const blockClass = `${pkg.prefix}--datagrid`;
const componentClass = `${blockClass}-filter-flyout`;

const defaults = {
  flyoutIconDescription: 'Open filters',
  title: 'Filter',
  primaryActionLabel: 'Apply',
  secondaryActionLabel: 'Cancel',
  align: 'bottom',
};

// Use same empty array every time, for benefit of useEffect() etc. dependency checking.
const emptyArray = [];

const FilterFlyout = ({
  updateMethod,
  flyoutIconDescription = defaults.flyoutIconDescription,
  align = defaults.align,
  filters = emptyArray,
  title = defaults.title,
  primaryActionLabel = defaults.primaryActionLabel,
  onFlyoutOpen = () => {},
  onFlyoutClose = () => {},
  onApply = () => {},
  onCancel = () => {},
  secondaryActionLabel = defaults.secondaryActionLabel,
  setAllFilters,
  data = emptyArray,
  reactTableFiltersState = emptyArray,
}) => {
  /** State */
  const [open, setOpen] = useState(false);
  const [stackedLayout, setStackedLayout] = useState(false);

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

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
    filters,
    setAllFilters,
    variation: FLYOUT,
    reactTableFiltersState,
    onCancel: handleCancel,
  });

  const { width } = breakpoints.md;
  const mdPxWidth = parseInt(width) * 16;

  /** Refs */
  const filterFlyoutRef = useRef(null);
  const flyoutInnerRef = useRef(null);
  const flyoutFiltersContainerRef = useRef(null);

  /** State from hooks */
  const [shouldDisableButtons, setShouldDisableButtons] =
    useShouldDisableButtons({
      initialValue: true,
      filtersState,
      prevFiltersRef,
      open,
    });

  // Skip resize testing
  /* istanbul ignore next */
  const handleResize = (current) => {
    const filterFlyoutRefPosition =
      flyoutInnerRef?.current.getBoundingClientRect();
    const originalFlyoutWidth = parseInt(
      window.getComputedStyle(flyoutInnerRef?.current).getPropertyValue('width')
    );
    // Check to see if left value from flyout getBoundingClientRect is a negative number
    // If it is, that is the amount we need to subtract from the flyout width
    if (Math.sign(filterFlyoutRefPosition.left) === -1) {
      const newFlyoutWidth =
        originalFlyoutWidth - Math.abs(filterFlyoutRefPosition.left);
      flyoutInnerRef.current.style.width = px(newFlyoutWidth);
    }
    // Check to see if left value from flyout getBoundingClientRect is a positive number or 0
    // If it is, that is the amount we need to add to the flyout width until we reach the
    // max-width of the flyout (642)
    if (
      (originalFlyoutWidth < 642 &&
        Math.sign(filterFlyoutRefPosition.left) === 1) ||
      Math.sign(filterFlyoutRefPosition.left).toString() === '0'
    ) {
      const newFlyoutWidth =
        originalFlyoutWidth + Math.abs(filterFlyoutRefPosition.left);
      flyoutInnerRef.current.style.width = px(newFlyoutWidth);
    }
    // Begin stacking filters at this specific point
    if (current?.innerWidth <= mdPxWidth + 254) {
      setStackedLayout(true);
    } else {
      setStackedLayout(false);
    }
  };

  useWindowResize(({ current }) => {
    handleResize(current);
  });

  /** Context */
  const { dispatch: localDispatch } = useContext(FilterContext);

  /** Memos */
  const showActionSet = updateMethod === BATCH;
  const carbonPrefix = usePrefix();

  /** Methods */
  const openFlyout = () => {
    setOpen(true);
    onFlyoutOpen();
  };

  const closeFlyout = () => {
    setOpen(false);
    onFlyoutClose();
    flyoutInnerRef.current.style.width = px(642);
  };

  useEffect(() => {
    // Initialize flyout width
    flyoutInnerRef.current.style.width = px(642);
  }, []);

  const apply = () => {
    setAllFilters(filtersObjectArray);
    closeFlyout();
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

  /** Renders all filters */
  const renderFilters = () => filters.map(renderFilter);

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
              isExpressive: false,
              disabled: shouldDisableButtons,
            },
            {
              key: 3,
              kind: 'secondary',
              label: secondaryActionLabel,
              onClick: cancel,
              isExpressive: false,
            },
          ]}
          size="md"
          buttonSize="md"
        />
      )
    );
  };

  /** Effects */
  // Close flyout when clicking outside
  useClickOutside(filterFlyoutRef, (target) => {
    const hasClickedOnDatePicker = target.closest('.flatpickr-calendar');
    const hasClickedOnDropdown =
      target.className === `${carbonPrefix}--list-box__menu-item__option`;

    // Do not do anything if flyout is closed or if clicking on anything
    // rendered via a portal
    if (!open || hasClickedOnDatePicker || hasClickedOnDropdown) {
      return;
    }

    closeFlyout();
    cancel();
  });

  // tableId is passed in from the event emitter from the FilterSummary component
  // in  DatagridContent
  useSubscribeToEventEmitter(CLEAR_FILTERS, (tableId) => {
    reset(tableId);
  });

  return (
    <div className={`${componentClass}__container`} ref={filterFlyoutRef}>
      <IconButton
        label={flyoutIconDescription}
        kind="ghost"
        align={align}
        onClick={open ? closeFlyout : openFlyout}
        className={cx(`${componentClass}__trigger`, {
          [`${componentClass}__trigger--open`]: open,
        })}
        disabled={data.length === 0}
      >
        <Filter />
      </IconButton>
      <div
        className={cx(componentClass, {
          [`${componentClass}--open`]: open,
          [`${componentClass}--batch`]: showActionSet,
          [`${componentClass}--instant`]: !showActionSet,
        })}
        ref={flyoutInnerRef}
      >
        <div className={`${componentClass}__inner-container`}>
          <span className={`${componentClass}__title`}>{title}</span>
          <div
            className={cx(`${componentClass}__filters`, {
              [`${componentClass}__stacked`]: stackedLayout,
            })}
            ref={flyoutFiltersContainerRef}
          >
            {renderFilters()}
          </div>
        </div>
        {renderActionSet()}
      </div>
    </div>
  );
};

FilterFlyout.propTypes = {
  /**
   * Tooltip alignment for the filter button
   */
  align: PropTypes.string,
  /**
   * All data rows in the table
   */
  data: PropTypes.array.isRequired,

  /**
   * Array of filters to render
   */
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      column: PropTypes.string.isRequired,
      props: PropTypes.object.isRequired,
    })
  ).isRequired,

  /**
   * Icon description for the filter flyout button
   */
  flyoutIconDescription: PropTypes.string,

  /**
   * Callback when the apply button is clicked
   */
  onApply: PropTypes.func,

  /**
   * Callback when the cancel button is clicked
   */
  onCancel: PropTypes.func,

  /**
   * Callback when the flyout closes
   */
  onFlyoutClose: PropTypes.func,

  /**
   * Callback when the flyout opens
   */
  onFlyoutOpen: PropTypes.func,

  /**
   * Label text of the primary action in the flyout
   */
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

  /**
   * Label text of the secondary action in the flyout
   */
  secondaryActionLabel: PropTypes.string,

  /**
   * Function that sets all the filters, this comes from the datagridState
   */
  setAllFilters: PropTypes.func.isRequired,

  /**
   * Title of the filter flyout
   */
  title: PropTypes.string,

  /**
   * The update method used to apply the filters
   */
  updateMethod: PropTypes.oneOf([BATCH, INSTANT]).isRequired,
};

export default FilterFlyout;
