/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from '@carbon/icons-react';
import { usePrefix } from '../../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../../types/common';

const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['close.menu']]: 'Close',
  [translationIds['open.menu']]: 'Open',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

export interface ListBoxTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    TranslateWithId<TranslationKey> {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: boolean;
}

/**
 * `ListBoxTrigger` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const ListBoxTrigger = React.forwardRef<HTMLButtonElement, ListBoxTriggerProps>(
  ({ isOpen, translateWithId: t = defaultTranslateWithId, ...rest }, ref) => {
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
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxTrigger;
