/**
 * Copyright IBM Corp. 2025,
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ElementType, ForwardedRef, Ref, ComponentProps } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import Button from '../Button';
import SideNavItem from './SideNavItem';
import cx from 'classnames';

export type SideNavButtonProps = ComponentProps<typeof Button> & {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;
};

const SideNavButton = React.forwardRef<HTMLElement, SideNavButtonProps>(
  function SideNavButton(props, ref: ForwardedRef<HTMLElement>) {
    const prefix = usePrefix();
    const { children, className: customClassName, onClick, ...rest } = props;
    const className = cx({
      [customClassName as string]: !!customClassName,
    });
    return (
      <SideNavItem>
        <Button
          className={className}
          {...rest}
          onClick={onClick}
          ref={ref as Ref<ElementType>}>
          {children}
        </Button>
      </SideNavItem>
    );
  }
);

SideNavButton.displayName = 'SideNavButton';
SideNavButton.propTypes = {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: PropTypes.func,
};

export default SideNavButton;
