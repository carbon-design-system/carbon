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
import { warning } from '../../internal/warning';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

const Toolbar = ({ children, className, ...other }) => {
  const wrapperClasses = classNames(`${prefix}--toolbar`, className);

  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The Toolbar component has been deprecated and will be removed in the next major release of `carbon-components-react`'
    );
    didWarnAboutDeprecation = true;
  }

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
   * Specify the placeholder text for the ToolbarSearch component. Useful if
   * `type` is set to 'search'
   */
  placeHolderText: PropTypes.string,

  /**
   * Specify the type of the ToolbarItem. The `search` type will render a
   * `ToolbarSearch` component
   */
  type: PropTypes.string,
};

ToolbarItem.defaultProps = {
  placeHolderText: 'Provide placeHolderText',
};

// eslint-disable-next-line react/display-name
export const ToolbarTitle = React.forwardRef(({ title }, ref) => (
  <li ref={ref} className={`${prefix}--toolbar-menu__title`}>
    {title}
  </li>
));

ToolbarTitle.displayName = 'ToolbarTitle';
ToolbarTitle.propTypes = {
  /**
   * Specify the title of the Toolbar
   */
  title: PropTypes.string,
};

// eslint-disable-next-line react/display-name
export const ToolbarOption = React.forwardRef(({ children }, ref) => (
  <li ref={ref} className={`${prefix}--toolbar-menu__option`}>
    {children}
  </li>
));

ToolbarOption.displayName = 'ToolbarOption';
ToolbarOption.propTypes = {
  /**
   * Specify the contents of the ToolbarOption
   */
  children: PropTypes.node,
};

// eslint-disable-next-line react/display-name
export const ToolbarDivider = React.forwardRef((props, ref) => (
  <hr ref={ref} className={`${prefix}--toolbar-menu__divider`} />
));

ToolbarDivider.displayName = 'ToolbarDivider';

export default Toolbar;
