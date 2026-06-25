//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// Import portions of React that are needed.
import React, { ForwardedRef, PropsWithChildren } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';

// Carbon and package components we use.
import { IconButton } from '@carbon/react';
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';

// The block part of our conventional BEM class names (blockClass__E--M).
const componentName = 'ActionBarItem';
const blockClass = `${pkg.prefix}--action-bar-item`;

interface ActionBarItemProps extends PropsWithChildren {
  /**
   * Specify an optional className to be added to your Button
   *
   * (inherited from Carbon Button)
   */
  className?: string;
  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   *
   * (inherited from Carbon Button)
   */
  label?: string;
  /**
   * Optional click handler
   *
   * (inherited from Carbon Button)
   */
  onClick?: () => void;
  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   *
   * (inherited from Carbon Button)
   */
  renderIcon?: CarbonIconType;

  /**
   * Optional tab index
   */
  tabIndex?: number;
}

// NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The ActionBarItem is used in the page header to populate the action bar
 */
export const ActionBarItem = React.forwardRef(
  (
    { label, className, renderIcon, ...rest }: ActionBarItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const Icon = renderIcon;

    return (
      <IconButton
        {...{
          ...rest,
          ref,
          className: cx(blockClass, className),
          kind: 'ghost',
          size: 'md',
          align: 'bottom-end',
          type: 'button',
          label,
        }}
      >
        {Icon ? <Icon /> : null}
      </IconButton>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// Props the user cannot change
const reservedProps = ['kind', 'size', 'align', 'type'];
// Base props on Carbon Button
const propTypes = { ...IconButton.propTypes };

// Remove reserved props
reservedProps.forEach((prop) => {
  delete propTypes[prop];
});

ActionBarItem.displayName = componentName;
ActionBarItem.propTypes = {
  /**
   * The ...propTypes are copies of those from Button minus the props reserved for use by this component
   */
  ...propTypes,
  /* ***************************************
  /
  /  The declarations below allow storybook & DocGen to produce documentation.
  /  Some or all of them may be inherited from the underlying Carbon component.
  /
  / ****************************************/
  /**
   * Specify an optional className to be added to your Button
   *
   * (inherited from Carbon Button)
   */
  className: PropTypes.string,
  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   *
   * (inherited from Carbon Button)
   */
  label: PropTypes.string,
  /**
   * Optional click handler
   *
   * (inherited from Carbon Button)
   */
  onClick: PropTypes.func,
  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   *
   * (inherited from Carbon Button)
   */
  /**@ts-ignore */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional tab index
   */
  tabIndex: PropTypes.number,
};
