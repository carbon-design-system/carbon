import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

const TableToolbarAction = ({
  className,
  icon,
  iconName,
  iconDescription,
  ...rest
}) => {
  const toolbarActionClasses = cx(className, 'bx--toolbar-action');
  return (
    <button className={toolbarActionClasses} {...rest}>
      <Icon
        className="bx--toolbar-action__icon"
        icon={icon}
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
   * Specify the icon for the toolbar action
   */
  icon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string.isRequired,
    svgData: PropTypes.object.isRequired,
  }).isRequired,

  /**
   * Specify the name of the icon for the toolbar action
   */
  iconName: PropTypes.string,

  /**
   * Specify the description of the icon for the toolbar action
   */
  iconDescription: PropTypes.string.isRequired,
};

export default TableToolbarAction;
