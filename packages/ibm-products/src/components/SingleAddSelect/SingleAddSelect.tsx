//
// Copyright IBM Corp. 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { ForwardedRef, forwardRef } from 'react';

import { AddSelect } from '../AddSelect';
import { AddSelectProps } from '../AddSelect/AddSelect';
import { Entry } from '../AddSelect/types';
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { prepareProps } from '../../global/js/utils/props-helper';

const componentName = 'SingleAddSelect';

export interface SingleAddSelectProps {
  /**
   * optional class name
   */
  className?: string;
  /**
   * text description that appears under the title
   */
  description?: string;
  /**
   * label for global search input
   */
  globalSearchLabel?: string;
  /**
   * placeholder for global search input
   */
  globalSearchPlaceholder?: string;
  /**
   * object that contains the item data. for more information reference the
   * "Structuring items" section in the docs tab
   */
  items?: {
    entries: Entry[];
  };
  /**
   * label that display above the list of items
   */
  itemsLabel?: string;
  /**
   * text to display when no results are found from the global search
   */
  noResultsDescription?: string;
  /**
   * title to display when no results are found from the global search
   */
  noResultsTitle?: string;
  /**
   * Determines if the component should be rendered within a Tearsheet component
   */
  noTearsheet?: boolean;
  /**
   * function to call when the close button clicked
   */
  onClose?: () => void;
  /**
   * text for close button
   */
  onCloseButtonText?: string;
  /**
   * function to call when the submit button is clicked. returns a selection
   */
  onSubmit?: () => void;
  /**
   * text for the submit button
   */
  onSubmitButtonText?: string;
  /**
   * specifies if the component is open or not
   */
  open?: boolean;
  /**
   * text that displays when displaying filtered items
   */
  searchResultsLabel?: string;
  /**
   * header text
   */
  title?: string;
}

/**
 * Used to add or select one or more items from larger lists or hierarchies.
 */
export const SingleAddSelect = forwardRef(
  (props: SingleAddSelectProps, ref: ForwardedRef<HTMLDivElement>) => {
    // remove multi add select specific props
    const validProps = prepareProps(props, [
      'columnInputPlaceholder',
      'globalFilters',
      'globalFiltersIconDescription',
      'globalFiltersPlaceholderText',
      'globalFiltersPrimaryButtonText',
      'globalFiltersSecondaryButtonText',
      'influencerTitle',
      'multi',
      'noSelectionDescription',
      'noSelectionTitle',
      'removeIconDescription',
    ]) as AddSelectProps;

    return (
      <AddSelect
        {...validProps}
        ref={ref}
        {...getDevtoolsProps(componentName)}
        multi={false}
      />
    );
  }
);

SingleAddSelect.propTypes = {
  /**
   * optional class name
   */
  /**@ts-ignore */
  className: PropTypes.string,
  /**
   * text description that appears under the title
   */
  description: PropTypes.string,
  /**
   * label for global search input
   */
  globalSearchLabel: PropTypes.string,
  /**
   * placeholder for global search input
   */
  globalSearchPlaceholder: PropTypes.string,
  /**
   * object that contains the item data. for more information reference the
   * "Structuring items" section in the docs tab
   */
  /**@ts-ignore */
  items: PropTypes.shape({
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.object,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }),
  /**
   * label that display above the list of items
   */
  itemsLabel: PropTypes.string,
  /**
   * text to display when no results are found from the global search
   */
  noResultsDescription: PropTypes.string,
  /**
   * title to display when no results are found from the global search
   */
  noResultsTitle: PropTypes.string,
  /**
   * Determines if the component should be rendered within a Tearsheet component
   */
  noTearsheet: PropTypes.bool,
  /**
   * function to call when the close button clicked
   */
  onClose: PropTypes.func,
  /**
   * text for close button
   */
  onCloseButtonText: PropTypes.string,
  /**
   * function to call when the submit button is clicked. returns a selection
   */
  onSubmit: PropTypes.func,
  /**
   * text for the submit button
   */
  onSubmitButtonText: PropTypes.string,
  /**
   * specifies if the component is open or not
   */
  open: PropTypes.bool,
  /**
   * text that displays when displaying filtered items
   */
  searchResultsLabel: PropTypes.string,
  /**
   * header text
   */
  title: PropTypes.string,
};

SingleAddSelect.displayName = componentName;
