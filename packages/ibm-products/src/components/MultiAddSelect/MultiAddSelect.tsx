//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { ForwardedRef, ReactNode, forwardRef } from 'react';

import { AddSelect } from '../AddSelect';
import { AddSelectProps } from '../AddSelect/AddSelect';
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const componentName = 'MultiAddSelect';

type Filter = {
  id?: string;
  label?: string;
};

type Modifier = {
  label?: string;
  options?: string[];
  /**
   * Allows to select multiple modifier items, default it is false
   */
  multiSelect?: boolean;
};

interface Entry {
  avatar?: {
    alt?: string;
    icon?: () => void;
    src?: string;
    theme?: 'light' | 'dark';
  };
  children?: ReactNode;
  icon?: () => void;
  id: string;
  subtitle?: string;
  title: string;
  value: string;
}

type Theme = 'light' | 'dark';

type ItemType = {
  entries?: Entry[];
  modifiers: Modifier;
  sortBy: string[];
  filterBy: string[];
};

export interface MultiAddSelectProps {
  /**
   * optional class name
   */
  className?: string;
  /**
   * placeholder for column input filter
   */
  columnInputPlaceholder?: string;
  /**
   * text description that appears under the title
   */
  description?: string;
  /**
   * options to display in the global filter box. values are generated
   * from the id which should correlate with a specific property in an
   * item entry
   */
  globalFilters?: Filter[];
  globalFiltersIconDescription?: string;
  /**
   * placeholder text for the global filter dropdown
   */
  globalFiltersPlaceholderText?: string;
  /**
   * text for the global filter primary button
   */
  globalFiltersPrimaryButtonText?: string;
  /**
   * text for the global filter secondary button
   */
  globalFiltersSecondaryButtonText?: string;
  /**
   * label for global search input
   */
  globalSearchLabel?: string;
  /**
   * placeholder for global search input
   */
  globalSearchPlaceholder?: string;
  /**
   * the theme for the empty state illustration
   */
  illustrationTheme?: Theme;
  /**
   * title that displays in the sidebar / influencer
   */
  influencerTitle?: string;
  /**
   * object that contains the item data. for more information reference the
   * "Structuring items" section in the docs tab
   */
  items?: ItemType;
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
   * text body that displays in the sidebar when nothing is selected
   */
  noSelectionDescription?: string;
  /**
   * title that displays in the sidebar when nothing is selected
   */
  noSelectionTitle?: string;
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
  searchResultsTitle?: string;
  /**
   * header text
   */
  title?: string;
}

/**
 * Used to add or select multiple or more items from larger lists or hierarchies.
 */
export const MultiAddSelect = forwardRef(
  (props: MultiAddSelectProps, ref: ForwardedRef<HTMLDivElement>) => (
    <AddSelect
      {...(props as AddSelectProps)}
      multi
      ref={ref}
      {...getDevtoolsProps(componentName)}
    />
  )
);

MultiAddSelect.propTypes = {
  /**
   * optional class name
   */
  className: PropTypes.string,
  /**
   * placeholder for column input filter
   */
  columnInputPlaceholder: PropTypes.string,
  /**
   * text description that appears under the title
   */
  description: PropTypes.string,
  /**
   * options to display in the global filter box. values are generated
   * from the id which should correlate with a specific property in an
   * item entry
   */
  /**@ts-ignore */
  globalFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  globalFiltersIconDescription: PropTypes.string,
  /**
   * placeholder text for the global filter dropdown
   */
  globalFiltersPlaceholderText: PropTypes.string,
  /**
   * text for the global filter primary button
   */
  globalFiltersPrimaryButtonText: PropTypes.string,
  /**
   * text for the global filter secondary button
   */
  globalFiltersSecondaryButtonText: PropTypes.string,
  /**
   * label for global search input
   */
  globalSearchLabel: PropTypes.string,
  /**
   * placeholder for global search input
   */
  globalSearchPlaceholder: PropTypes.string,
  /**
   * the theme for the empty state illustration
   */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),
  /**
   * title that displays in the sidebar / influencer
   */
  influencerTitle: PropTypes.string,
  /**
   * object that contains the item data. for more information reference the
   * "Structuring items" section in the docs tab
   */
  /**@ts-ignore */
  items: PropTypes.shape({
    modifiers: PropTypes.shape({
      label: PropTypes.string,
      options: PropTypes.array,
      multiSelect: PropTypes.bool,
    }),
    sortBy: PropTypes.array,
    filterBy: PropTypes.array,
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        avatar: PropTypes.shape({
          alt: PropTypes.string,
          icon: PropTypes.func,
          src: PropTypes.string,
          theme: PropTypes.oneOf(['light', 'dark']),
        }),
        children: PropTypes.object,
        icon: PropTypes.func,
        id: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
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
   * text body that displays in the sidebar when nothing is selected
   */
  noSelectionDescription: PropTypes.string,
  /**
   * title that displays in the sidebar when nothing is selected
   */
  noSelectionTitle: PropTypes.string,
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
  searchResultsTitle: PropTypes.string,
  /**
   * header text
   */
  title: PropTypes.string,
};

MultiAddSelect.displayName = componentName;
