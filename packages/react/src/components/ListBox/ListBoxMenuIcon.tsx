/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';

export type ListBoxMenuIconTranslationKey = 'close.menu' | 'open.menu';

const defaultTranslations: Record<ListBoxMenuIconTranslationKey, string> = {
  'close.menu': 'Close menu',
  'open.menu': 'Open menu',
};

const defaultTranslateWithId = (id: ListBoxMenuIconTranslationKey): string =>
  defaultTranslations[id];

export interface ListBoxMenuIconProps {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: boolean;

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in a ListBoxMenuIconTranslationKey and should
   * return a string message for that given message id.
   */
  translateWithId?(
    messageId: ListBoxMenuIconTranslationKey,
    args?: Record<string, unknown>
  ): string;
}

export type ListBoxMenuIconComponent = React.FC<ListBoxMenuIconProps>;

/**
 * `ListBoxMenuIcon` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */
const ListBoxMenuIcon: ListBoxMenuIconComponent = ({
  isOpen,
  translateWithId: t = defaultTranslateWithId,
}: ListBoxMenuIconProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--list-box__menu-icon`, {
    [`${prefix}--list-box__menu-icon--open`]: isOpen,
  });
  const description = isOpen ? t('close.menu') : t('open.menu');
  return (
    <div className={className}>
      <ChevronDown name="chevron--down" aria-label={description}>
        <title>{description}</title>
      </ChevronDown>
    </div>
  );
};

ListBoxMenuIcon.propTypes = {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes a ListBoxMenuIconTranslationKey and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxMenuIcon;
