/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ToolbarSearch from '../ToolbarSearch';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const Toolbar = ({ children, className, ...other }) => {
  const wrapperClasses = classNames(`${prefix}--toolbar`, className);

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

Toolbar.propTypes = {
  /**
   * Specify a collection of ToolbarItem's that should render in the Toolbar
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the containing Toolbar node
   */
  className: PropTypes.string,
};

export const ToolbarItem = ({ children, type, placeHolderText }) => {
  const toolbarItem =
    type === 'search' ? (
      <ToolbarSearch placeHolderText={placeHolderText} />
    ) : (
      children
    );
  return toolbarItem;
};

ToolbarItem.propTypes = {
  /**
   * Specify the contents of the ToolbarItem
   */
  children: PropTypes.node,

  /**
   * Specify the type of the ToolbarItem. The `search` type will render a
   * `ToolbarSearch` component
   */
  type: PropTypes.string,

  /**
   * Specify the placeholder text for the ToolbarSearch component. Useful if
   * `type` is set to 'search'
   */
  placeHolderText: PropTypes.string,
};

ToolbarItem.defaultProps = {
  placeHolderText: 'Provide placeHolderText',
};

export const ToolbarTitle = ({ title }) => (
  <li className={`${prefix}--toolbar-menu__title`}>{title}</li>
);

ToolbarTitle.propTypes = {
  /**
   * Specify the title of the Toolbar
   */
  title: PropTypes.string,
};

export const ToolbarOption = ({ children }) => (
  <li className={`${prefix}--toolbar-menu__option`}>{children}</li>
);

ToolbarOption.propTypes = {
  /**
   * Specify the contents of the ToolbarOption
   */
  children: PropTypes.node,
};

export const ToolbarDivider = () => (
  <hr className={`${prefix}--toolbar-menu__divider`} />
);

export default Toolbar;
