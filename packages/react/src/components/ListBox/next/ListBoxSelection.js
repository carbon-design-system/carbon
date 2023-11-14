/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@carbon/icons-react';
import { usePrefix } from '../../../internal/usePrefix';

/**
 * `ListBoxSelection` is used to provide controls for clearing a selection, in
 * addition to conditionally rendering a badge if the control has more than one
 * selection.
 */

export const translationIds = {
  'clear.all': 'clear.all',
  'clear.selection': 'clear.selection',
};

const defaultTranslations = {
  [translationIds['clear.all']]: 'Clear all selected items',
  [translationIds['clear.selection']]: 'Clear selected item',
};

const defaultTranslateWithId = (id) => defaultTranslations[id];

function ListBoxSelection({
  clearSelection,
  selectionCount,
  translateWithId: t = defaultTranslateWithId,
  disabled,
  onClearSelection,
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--list-box__selection`, {
    [`${prefix}--tag--filter`]: selectionCount,
    [`${prefix}--list-box__selection--multi`]: selectionCount,
  });
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  const tagClasses = cx(
    `${prefix}--tag`,
    `${prefix}--tag--filter`,
    `${prefix}--tag--high-contrast`,
    {
      [`${prefix}--tag--disabled`]: disabled,
    }
  );

  function onClick(event) {
    event.stopPropagation();
    if (disabled) {
      return;
    }
    clearSelection(event);
    if (onClearSelection) {
      onClearSelection(event);
    }
  }

  if (selectionCount) {
    return (
      <div className={tagClasses}>
        <span className={`${prefix}--tag__label`} title={selectionCount}>
          {selectionCount}
        </span>
        <button
          aria-label={description}
          className={`${prefix}--tag__close-icon`}
          disabled={disabled}
          onClick={onClick}
          tabIndex={-1}
          title={description}
          type="button">
          <Close />
        </button>
      </div>
    );
  }

  return (
    <button
      {...rest}
      aria-label={description}
      className={className}
      disabled={disabled}
      onClick={onClick}
      tabIndex={-1}
      title={description}
      type="button">
      <Close />
    </button>
  );
}

ListBoxSelection.propTypes = {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection: PropTypes.func.isRequired,

  /**
   * Specify whether or not the clear selection element should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify an optional `onClearSelection` handler that is called when the underlying
   * element is cleared
   */
  onClearSelection: PropTypes.func,

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * clear selection element is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify an optional `onKeyDown` handler that is called when the underlying
   * clear selection element fires a keydown event
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify an optional `selectionCount` value that will be used to determine
   * whether the selection should display a badge or a single clear icon.
   */
  selectionCount: PropTypes.number,

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxSelection;
