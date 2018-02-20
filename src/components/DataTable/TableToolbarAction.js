import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

const TableToolbarAction = ({
  className,
  iconName,
  iconDescription,
  ...rest
}) => {
  const toolbarActionClasses = cx(className, 'bx--toolbar-action');
  return (
    <button className={toolbarActionClasses} {...rest}>
      <Icon
        className="bx--toolbar-action__icon"
        name={iconName}
        description={iconDescription}
      />
    </button>
  );
};

TableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Specify the name of the icon for the toolbar action
   */
  iconName: PropTypes.string.isRequired,

  /**
   * Specify the description of the icon for the toolbar action
   */
  iconDescription: PropTypes.string.isRequired,
};

export default TableToolbarAction;
