import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import React from 'react';

const { prefix } = settings;

const HeaderMenuItem = props => {
  const { className, children, role, innerRef, ...rest } = props;
  return (
    <li className={className} role={role}>
      <a
        {...rest}
        className={`${prefix}--header__menu-item`}
        ref={innerRef}
        role="menuitem">
        <span className={`${prefix}--text-truncate--end`}>{children}</span>
      </a>
    </li>
  );
};

HeaderMenuItem.propTypes = {
  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally supply a role for the underlying <li> node. Useful for resetting
   * <ul> semantics for menus.
   */
  role: PropTypes.string,
};

export default React.forwardRef((props, ref) => {
  return <HeaderMenuItem {...props} innerRef={ref} />;
});
