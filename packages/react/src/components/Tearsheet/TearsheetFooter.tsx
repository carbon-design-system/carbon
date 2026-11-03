/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ReactNode, useContext } from 'react';
import cx from 'classnames';
import Button, { type ButtonProps } from '../Button';
import { ButtonSet } from '../ButtonSet';
import { TearsheetContext } from './context';
import { usePrefix } from '../../internal/usePrefix';

export interface TearsheetFooterProps {
  /**
   * Optional children to render in the footer. If provided, children are
   * rendered as-is (full custom layout).
   */
  children?: ReactNode;
  /**
   * Optional class name to add to the footer element.
   */
  className?: string;
  /**
   * Optional array of action button configurations rendered in a fluid
   * `ButtonSet`. Buttons are ordered ghost → secondary → primary automatically.
   * Ignored when `children` is provided.
   */
  actions?: (ButtonProps<React.ElementType> & { label?: string })[];
  /**
   * Size applied to every action button. Defaults to `'2xl'` for wide
   * tearsheets and `'xl'` for narrow ones.
   */
  buttonSize?: ButtonProps<React.ElementType>['size'];
}

const TearsheetFooter = forwardRef<HTMLDivElement, TearsheetFooterProps>(
  ({ children, className, actions, buttonSize }, ref) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--tearsheet`;
    const { variant } = useContext(TearsheetContext);
    const defaultSize = variant === 'wide' ? '2xl' : 'xl';
    const resolvedSize = buttonSize ?? defaultSize;

    return (
      <div className={cx(`${blockClass}__footer`, className)} ref={ref}>
        {children}
        {!children && actions && actions.length > 0 && (
          <ButtonSet fluid className={`${blockClass}__footer-button-set`}>
            {actions.map(({ label, ...action }, i) => (
              <Button key={i} {...action} size={resolvedSize}>
                {label}
              </Button>
            ))}
          </ButtonSet>
        )}
      </div>
    );
  }
);

TearsheetFooter.displayName = 'TearsheetFooter';

export default TearsheetFooter;
