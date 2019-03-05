/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import warning from 'warning';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';
import { breakingChangesX } from '../../internal/FeatureFlags';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

const TableToolbarAction = ({
  className,
  renderIcon,
  icon,
  iconName,
  iconDescription,
  ...rest
}) => {
  if (__DEV__ && breakingChangesX && (icon || iconName)) {
    warning(
      didWarnAboutDeprecation,
      'The `icon`/`iconName` properties in the `TableToolbarAction` component is being removed in the next release of ' +
        '`carbon-components-react`. Please use `renderIcon` instead.'
    );
    didWarnAboutDeprecation = true;
  }

  const toolbarActionClasses = cx(className, `${prefix}--toolbar-action`);
  const tableToolbarActionIcon = (() => {
    if (Object(renderIcon) === renderIcon) {
      const IconTag = renderIcon;
      return (
        <IconTag
          className={`${prefix}--toolbar-action__icon`}
          aria-label={iconDescription}
        />
      );
    } else if (!breakingChangesX && (icon || iconName)) {
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
     * Optional prop to allow overriding the toolbar icon rendering.
     * Can be a React component class
     */
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

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
