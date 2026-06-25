/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ReactNode, useContext } from 'react';
import cx from 'classnames';
import { ButtonProps } from '@carbon/react';
import { ActionSet, ActionSetProps } from '../../ActionSet';
import { blockClass, TearsheetContext } from './context';

export interface TearsheetFooterProps {
  /**
   * Optional children to render in the footer. If provided, children are rendered first,
   * followed by the ActionSet (if actions are provided).
   */
  children?: ReactNode;
  /**
   * Optional class name to add to the footer element.
   */
  className?: string;
  /**
   * Optional array of action button configurations. If provided, an ActionSet will be
   * rendered after any children. Each action follows the ActionSet button specification.
   */
  actions?: ButtonProps<React.ElementType>[];
  /**
   * Optional size for the ActionSet buttons. Defaults to the ActionSet's default size.
   */
  buttonSize?: ActionSetProps['buttonSize'];
}

const TearsheetFooter = forwardRef<HTMLDivElement, TearsheetFooterProps>(
  ({ children, className, actions, buttonSize }, ref) => {
    const { variant } = useContext(TearsheetContext);
    const actionCount = actions?.length || 0;

    return (
      <div
        className={cx(`${blockClass}__footer`, className, {
          [`${blockClass}__footer--three-actions`]: actionCount == 3,
          [`${blockClass}__footer--many-actions`]: actionCount > 3,
        })}
        ref={ref}
      >
        {children}
        {actions && actions.length > 0 && (
          <ActionSet
            actions={actions}
            buttonSize={buttonSize}
            disableStacking={true}
            size={variant == 'wide' ? '2xl' : 'lg'}
          />
        )}
      </div>
    );
  }
);

TearsheetFooter.displayName = 'TearsheetFooter';

export default TearsheetFooter;
