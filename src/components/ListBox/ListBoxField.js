import React from 'react';
import { settings } from 'carbon-components';
import ListBoxMenuIcon from './ListBoxMenuIcon';
import ListBoxSelection from './ListBoxSelection';
import childrenOf from '../../prop-types/childrenOf';

const { prefix } = settings;

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
const ListBoxField = ({ children, ...rest }) => (
  <div
    role="button"
    className={`${prefix}--list-box__field`}
    tabIndex="0"
    {...rest}>
    {children}
  </div>
);

ListBoxField.propTypes = {
  /**
   * Provide the contents of your ListBoxField
   */
  children: childrenOf([ListBoxMenuIcon, ListBoxSelection, 'span', 'input']),
};

export default ListBoxField;
