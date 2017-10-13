import React from 'react';
import PropTypes from 'prop-types';
import ToolbarSearch from './ToolbarSearch';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const toolbarItemPropTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  placeHolderText: PropTypes.string,
};

const toolbarTitlePropTypes = {
  title: PropTypes.string,
};

const toolbarTitleDefaultProps = {
  title: PropTypes.string,
};

const toolbarItemDefaultProps = {
  placeHolderText: 'Provide placeHolderText',
};

const toolbarOptionPropTypes = {
  children: PropTypes.node,
};

const Toolbar = ({ children, className, ...other }) => {
  const wrapperClasses = classNames('bx--toolbar', className);

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

const ToolbarItem = ({ children, type, placeHolderText }) => {
  const toolbarItem =
    type === 'search' ? (
      <ToolbarSearch placeHolderText={placeHolderText} />
    ) : (
      children
    );
  return toolbarItem;
};

const ToolbarTitle = ({ title }) => (
  <li className="bx--toolbar-menu__title">{title}</li>
);

const ToolbarOption = ({ children }) => (
  <li className="bx--toolbar-menu__option">{children}</li>
);

const ToolbarDivider = () => <hr className="bx--toolbar-menu__divider" />;

Toolbar.propTypes = propTypes;
ToolbarItem.propTypes = toolbarItemPropTypes;
ToolbarTitle.propTypes = toolbarTitlePropTypes;
ToolbarOption.propTypes = toolbarOptionPropTypes;

ToolbarItem.defaultProps = toolbarItemDefaultProps;
ToolbarTitle.defaultProps = toolbarTitleDefaultProps;

export default Toolbar;
export { ToolbarItem, ToolbarTitle, ToolbarOption, ToolbarDivider };
