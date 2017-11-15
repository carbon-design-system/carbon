import React from 'react';
import PropTypes from 'prop-types';
import ToolbarSearch from '../ToolbarSearch';
import classNames from 'classnames';

const Toolbar = ({ children, className, ...other }) => {
  const wrapperClasses = classNames('bx--toolbar', className);

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node,
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
  children: PropTypes.node,
  type: PropTypes.string,
  placeHolderText: PropTypes.string,
};

ToolbarItem.defaultProps = {
  placeHolderText: 'Provide placeHolderText',
};

export const ToolbarTitle = ({ title }) => (
  <li className="bx--toolbar-menu__title">{title}</li>
);

ToolbarTitle.propTypes = {
  title: PropTypes.string,
};

export const ToolbarOption = ({ children }) => (
  <li className="bx--toolbar-menu__option">{children}</li>
);

ToolbarOption.propTypes = {
  children: PropTypes.node,
};

export const ToolbarDivider = () => (
  <hr className="bx--toolbar-menu__divider" />
);

export default Toolbar;
