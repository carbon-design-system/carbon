/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { FilterableMultiSelect } from '../FilterableMultiSelect';
import MultiSelect from '../MultiSelect';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

const FluidMultiSelect = React.forwardRef(function FluidMultiSelect(
  { className, isCondensed, isFilterable, ...other },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(
    `${prefix}--list-box__wrapper--fluid`,
    className,
    { [`${prefix}--list-box__wrapper--fluid--condensed`]: isCondensed }
  );

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      {isFilterable ? (
        <FilterableMultiSelect ref={ref} className={classNames} {...other} />
      ) : (
        <MultiSelect ref={ref} className={classNames} {...other} />
      )}
    </FormContext.Provider>
  );
});

FluidMultiSelect.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control.
   */
  compareItems: PropTypes.func,

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift
   */
  downshiftProps: PropTypes.object,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems: PropTypes.array,

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Specify if the `FluidMultiSelect` should render its menu items in condensed mode
   */
  isCondensed: PropTypes.bool,

  /**
   * Specify if the `FluidMultiSelect` should render the `filterable` variant of `FluidMultiSelect`
   */
  isFilterable: PropTypes.bool,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale: PropTypes.string,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * **Filterable variant only** - `onInputValueChange` is a utility for this controlled component to communicate to
   * the currently typed input.
   */
  onInputValueChange: PropTypes.func,

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange: PropTypes.func,

  /**
   * Whether or not the Multiselect is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * For full control of the selected items
   */
  selectedItems: PropTypes.array,

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback: PropTypes.oneOf(['top', 'fixed', 'top-after-reopen']),

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems: PropTypes.func,

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.node,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

  /**
   * Specify title to show title on hover
   */
  useTitleInItem: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidMultiSelect;
