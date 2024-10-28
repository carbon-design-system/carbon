/**
 * Copyright IBM Corp. 2016, 2024
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
} as const;

export type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  'clear.all': 'Clear all selected items',
  'clear.selection': 'Clear selected item',
};

function defaultTranslateWithId(id: TranslationKey): string {
  return defaultTranslations[id];
}

export interface ListBoxSelectionProps {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Specify an optional `selectionCount` value that will be used to determine
   * whether the selection should display a badge or a single clear icon.
   */
  selectionCount?: number;
  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId?: (id: TranslationKey) => string;
  /**
   * Specify whether or not the clear selection element should be disabled
   */
  disabled?: boolean;
  /**
   * Whether or not the listbox is readonly
   */
  readOnly?: boolean;

  /**
   * Specify an optional `onClearSelection` handler that is called when the underlying
   * element is cleared
   */
  onClearSelection?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * clear selection element is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Specify an optional `onKeyDown` handler that is called when the underlying
   * clear selection element fires a keydown event
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;

  /**
   * Specify an optional `onMouseUp` handler that is called when the underlying
   * clear selection element fires a mouseup event
   */
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
}

function ListBoxSelection({
  clearSelection,
  selectionCount,
  translateWithId: t = defaultTranslateWithId,
  disabled,
  readOnly,
  onClearSelection,
  ...rest
}: ListBoxSelectionProps) {
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

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    if (disabled || readOnly) {
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
        <span
          className={`${prefix}--tag__label`}
          title={selectionCount?.toString()}>
          {selectionCount}
        </span>
        <button
          aria-label={description}
          className={`${prefix}--tag__close-icon`}
          disabled={disabled || readOnly}
          onClick={onClick}
          tabIndex={-1}
          title={description}
          type="button"
          aria-disabled={readOnly ? true : undefined}>
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
      disabled={disabled || readOnly}
      onClick={onClick}
      tabIndex={-1}
      title={description}
      type="button"
      aria-disabled={readOnly ? true : undefined}>
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
   * Whether or not the listbox is readonly
   */
  readOnly: PropTypes.bool,

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
   * Specify an optional `onClick` handler that is called when the underlying
   * clear selection element is clicked
   */
  onMouseUp: PropTypes.func,

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
