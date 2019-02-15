/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

const TableToolbarAction = ({
  className,
  icon,
  iconName,
  iconDescription,
  ...rest
}) => {
  const toolbarActionClasses = cx(className, `${prefix}--toolbar-action`);
  const tableToolbarActionIcon = (() => {
    if (componentsX && icon) {
      const IconTag = icon;
      return (
        <IconTag
          className={`${prefix}--toolbar-action__icon`}
          aria-label={iconDescription}
        />
      );
    }
    if (!componentsX && icon) {
      return (
        <Icon
          className={`${prefix}--toolbar-action__icon`}
          icon={icon}
          name={iconName}
          description={iconDescription}
        />
      );
    }
    return null;
  })();
  return (
    <button className={toolbarActionClasses} {...rest}>
      {tableToolbarActionIcon}
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
