/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from '@carbon/icons-react';
import { usePrefix } from '../../../internal/usePrefix';

export const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
} as const;

export type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['close.menu']]: 'Close',
  [translationIds['open.menu']]: 'Open',
};

const defaultTranslateWithId = (id: TranslationKey): string =>
  defaultTranslations[id];

export interface ListBoxTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: boolean;
  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId?: (id: TranslationKey) => string;
}

/**
 * `ListBoxTrigger` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */

const ListBoxTrigger = React.forwardRef<HTMLButtonElement, ListBoxTriggerProps>(
  function ListBoxTrigger(
    { isOpen, translateWithId: t = defaultTranslateWithId, ...rest },
    ref
  ) {
    const prefix = usePrefix();
    const className = cx({
      [`${prefix}--list-box__menu-icon`]: true,
      [`${prefix}--list-box__menu-icon--open`]: isOpen,
    });
    const description = isOpen ? t('close.menu') : t('open.menu');
    return (
      <button
        {...rest}
        aria-label={description}
        title={description}
        className={className}
        type="button"
        tabIndex={-1}
        ref={ref}>
        <ChevronDown />
      </button>
    );
  }
);

ListBoxTrigger.propTypes = {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxTrigger;
