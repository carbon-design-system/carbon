import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';

const { prefix } = settings;

const TableToolbarAction = ({
  className,
  icon,
  iconName,
  iconDescription,
  ...rest
}) => {
  const toolbarActionClasses = cx(className, `${prefix}--toolbar-action`);
  return (
    <button className={toolbarActionClasses} {...rest}>
      <Icon
        className={`${prefix}--toolbar-action__icon`}
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

  ...isRequiredOneOf({
    /**
     * Specify the icon for the toolbar action
     */
    icon: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      viewBox: PropTypes.string.isRequired,
      svgData: PropTypes.object.isRequired,
    }),

    /**
     * Specify the name of the icon for the toolbar action
     */
    iconName: PropTypes.string,
  }),

  /**
   * Specify the description of the icon for the toolbar action
   */
  iconDescription: PropTypes.string.isRequired,
};

export default TableToolbarAction;
