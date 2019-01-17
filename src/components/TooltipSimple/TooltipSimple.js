/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { iconInfoGlyph } from 'carbon-icons';
import classNames from 'classnames';
import warning from 'warning';
import { settings } from 'carbon-components';
import Icon from '../Icon';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

const TooltipSimple = ({
  children,
  className,
  position,
  text,
  showIcon,
  icon,
  iconName,
  iconDescription,
  ...other
}) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The `TooltipSimple` component has been deprecated and will be removed ' +
        'in the next major release of `carbon-components-react`. Please use ' +
        '`TooltipDefinition` or `TooltipIcon` instead.'
    );
    didWarnAboutDeprecation = true;
  }
  const tooltipClasses = classNames(`${prefix}--tooltip--simple__${position}`);

  const tooltipWrapperClasses = classNames(
    `${prefix}--tooltip--simple`,
    className
  );
  return (
    <div className={tooltipWrapperClasses}>
      {showIcon ? (
        <>
          {children}
          <div
            className={tooltipClasses}
            data-tooltip-text={text}
            tabIndex="0"
            role="button"
            {...other}>
            <Icon
              role="img"
              icon={!icon && !iconName ? iconInfoGlyph : icon}
              name={iconName}
              description={iconDescription}
            />
          </div>
        </>
      ) : (
        <div
          className={tooltipClasses}
          data-tooltip-text={text}
          tabIndex="0"
          role="button"
          {...other}>
          {children}
        </div>
      )}
    </div>
  );
};

TooltipSimple.propTypes = {
  /**
   * The content to put into the trigger UI, except the (default) tooltip icon.
   */
  children: PropTypes.node,

  /**
   * The CSS class names of the tooltip.
   */
  className: PropTypes.string,

  /**
   * Where to put the tooltip, relative to the trigger UI.
   */
  position: PropTypes.oneOf(['bottom', 'top']),

  /**
   * Contents to put into the tooltip.
   */
  text: PropTypes.string.isRequired,

  /**
   * `true` to show the default tooltip icon.
   */
  showIcon: PropTypes.bool,

  /**
   * The the default tooltip icon.
   */
  icon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string.isRequired,
    svgData: PropTypes.object.isRequired,
  }),

  /**
   * The name of the default tooltip icon.
   */
  iconName: PropTypes.string,

  /**
   * The description of the default tooltip icon, to be put in its SVG `<title>` element.
   */
  iconDescription: PropTypes.string,
};

TooltipSimple.defaultProps = {
  position: 'top',
  showIcon: true,
  iconDescription: 'tooltip',
  text: 'Provide text',
};

export default TooltipSimple;
