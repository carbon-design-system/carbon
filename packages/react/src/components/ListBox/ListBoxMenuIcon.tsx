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

export const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
};

const defaultTranslations = {
  [translationIds['close.menu']]: 'Close menu',
  [translationIds['open.menu']]: 'Open menu',
};

const defaultTranslateWithId = (id: string) => defaultTranslations[id]

export interface ListBoxMenuIconProps {
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
  translateWithId?(messageId: string, args?: Record<string, unknown>): string;
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
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func.isRequired,
};

ListBoxMenuIcon.defaultProps = {
  translateWithId: defaultTranslateWithId,
};

export default ListBoxMenuIcon;
