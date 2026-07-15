/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import ButtonSet from '../ButtonSet';

export interface PageFooterProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Provide the buttons to render in the page footer. PageFooter supports up
   * to four buttons and orders them by their button kind.
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be added to the page footer.
   */
  className?: string;
}

const PageFooter = forwardRef<HTMLDivElement, PageFooterProps>(
  function PageFooter({ children, className, ...rest }, ref) {
    const prefix = usePrefix();
    const classes = classNames(
      `${prefix}--page-footer`,
      `${prefix}--layout--size-2xl`,
      className
    );

    return (
      <div role="group" {...rest} className={classes} ref={ref}>
        <ButtonSet fluid className={`${prefix}--page-footer__button-set`}>
          {children}
        </ButtonSet>
      </div>
    );
  }
);

PageFooter.displayName = 'PageFooter';
PageFooter.propTypes = {
  /**
   * Provide the buttons to render in the page footer. PageFooter supports up
   * to four buttons and orders them by their button kind.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the page footer.
   */
  className: PropTypes.string,
};

export default PageFooter;
