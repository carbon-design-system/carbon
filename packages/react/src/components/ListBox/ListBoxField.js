/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import ListBoxMenuIcon from './ListBoxMenuIcon';
import ListBoxSelection from './ListBoxSelection';
import childrenOf from '../../prop-types/childrenOf';

const { prefix } = settings;

export const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
};

const defaultTranslations = {
  [translationIds['close.menu']]: 'Close menu',
  [translationIds['open.menu']]: 'Open menu',
};

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
const ListBoxField = ({
  children,
  id,
  disabled,
  tabIndex,
  translateWithId: t,
  ...rest
}) => (
  <div
    role={rest['aria-expanded'] ? 'combobox' : rest.role || 'combobox'}
    aria-owns={(rest['aria-expanded'] && `${id}__menu`) || null}
    aria-controls={(rest['aria-expanded'] && `${id}__menu`) || null}
    className={`${prefix}--list-box__field`}
    tabIndex={(!disabled && tabIndex) || -1}
    {...rest}
    aria-label={rest['aria-expanded'] ? t('close.menu') : t('open.menu')}>
    {children}
  </div>
);

ListBoxField.propTypes = {
  /**
   * Provide the contents of your ListBoxField
   */
  children: childrenOf([ListBoxMenuIcon, ListBoxSelection, 'span', 'input']),

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify if the parent <ListBox> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optional prop to specify the tabIndex of the <ListBox> trigger button
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func.isRequired,
};

ListBoxField.defaultProps = {
  translateWithId: id => defaultTranslations[id],
};

export default ListBoxField;
