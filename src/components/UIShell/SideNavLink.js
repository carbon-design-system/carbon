/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Link, { LinkPropTypes } from './Link';
import SideNavIcon from './SideNavIcon';
import SideNavItem from './SideNavItem';
import SideNavLinkText from './SideNavLinkText';

const { prefix } = settings;

const SideNavLink = ({
  className: customClassName,
  children,
  renderIcon: IconElement,
  isActive,
  ...rest
}) => {
  const className = cx({
    [`${prefix}--side-nav__link`]: true,
    [`${prefix}--side-nav__link--current`]: isActive,
    [customClassName]: !!customClassName,
  });

  return (
    <SideNavItem>
      <Link {...rest} className={className}>
        {IconElement && (
          <SideNavIcon small>
            <IconElement />
          </SideNavIcon>
        )}
        <SideNavLinkText>{children}</SideNavLinkText>
      </Link>
    </SideNavItem>
  );
};

SideNavLink.propTypes = {
  ...LinkPropTypes,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide an icon to render in the side navigation link. Should be a React class.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the text content for the link
   */
  children: PropTypes.string.isRequired,
};

SideNavLink.defaultProps = {
  element: 'a',
};

export const createCustomSideNavLink = element => props => {
  return <SideNavLink element={element} {...props} />;
};

export default SideNavLink;
