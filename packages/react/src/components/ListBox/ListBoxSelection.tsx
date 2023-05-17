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
import { usePrefix } from '../../internal/usePrefix';
import { KeyboardEvent, MouseEvent } from 'react';

export interface ListBoxSelectionProps {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ): void;

  /**
   * Specify whether or not the clear selection element should be disabled
   */
  disabled?: boolean;

  /**
   * Specify an optional `onClearSelection` handler that is called when the underlying
   * element is cleared
   */
  onClearSelection?(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ): void;

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly?: boolean;

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
  translateWithId(messageId: string, args?: Record<string, unknown>): string;
}

export type ListBoxSelectionComponent = React.FC<ListBoxSelectionProps>;

/**
 * `ListBoxSelection` is used to provide controls for clearing a selection, in
 * addition to conditionally rendering a badge if the control has more than one
 * selection.
 */
const ListBoxSelection: ListBoxSelectionComponent = ({
  clearSelection,
  selectionCount,
  translateWithId: t,
  disabled,
  onClearSelection,
  readOnly,
}: ListBoxSelectionProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--list-box__selection`, {
    [`${prefix}--tag--filter`]: selectionCount,
    [`${prefix}--list-box__selection--multi`]: selectionCount,
  });
  const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (disabled || readOnly) {
      return;
    }
    clearSelection(event);
    if (onClearSelection) {
      onClearSelection(event);
    }
  };
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  const tagClasses = cx(
    `${prefix}--tag`,
    `${prefix}--tag--filter`,
    `${prefix}--tag--high-contrast`,
    {
      [`${prefix}--tag--disabled`]: disabled,
    }
  );

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return selectionCount ? (
    <div className={tagClasses}>
      <span className={`${prefix}--tag__label`} title={`${selectionCount}`}>
        {selectionCount}
      </span>
      <div
        role="button"
        tabIndex={-1}
        className={`${prefix}--tag__close-icon`}
        onClick={handleOnClick}
        aria-label={t('clear.all')}
        title={description}
        aria-disabled={readOnly ? true : undefined}>
        <Close />
      </div>
    </div>
  ) : (
    <div
      role="button"
      className={className}
      tabIndex={-1}
      onClick={handleOnClick}
      aria-label={description}
      title={description}>
      {selectionCount}
      <Close />
    </div>
  );
};

export const translationIds = {
  'clear.all': 'clear.all',
  'clear.selection': 'clear.selection',
};

const defaultTranslations = {
  [translationIds['clear.all']]: 'Clear all selected items',
  [translationIds['clear.selection']]: 'Clear selected item',
};

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
   * Whether or not the Dropdown is readonly
   */
  readOnly: PropTypes.bool,

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
  translateWithId: PropTypes.func.isRequired,
};

ListBoxSelection.defaultProps = {
  translateWithId: (id: string) => defaultTranslations[id],
};

export default ListBoxSelection;
