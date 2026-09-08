/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import cx from 'classnames';
import { Column } from '../Grid';
import { Grid } from '../Grid';
import { usePrefix } from '../../internal/usePrefix';
import { Error403SVG } from './assets/Error403SVG';
import { Error404SVG } from './assets/Error404SVG';
import { ErrorGenericSVG } from './assets/ErrorGenericSVG';

const componentName = 'FullPageError';

export interface FullPageErrorProps {
  /**
   * Provide the contents of the FullPageError.
   */
  children?: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * String that will provide the description for the error code.
   * This is optional for 403 and 404 kinds, and passing this would override their default descriptions.
   */
  description: string;
  /**
   * The kind of error page to be displayed, default is custom
   */
  kind?: 'custom' | '403' | '404';
  /**
   * String that will describe the error that occurred
   */
  label: string;
  /**
   * This will be for the main title of the FullPageError component
   */
  title: string;
}

// Default values for props
const defaults = {
  kind: 'custom' as const,
};

/**
 * Display a full-page error when the requested page is unavailable to the user.
 * This is typically caused by issues with the requested URL or access permissions.
 */
export const FullPageError = React.forwardRef<
  HTMLDivElement,
  FullPageErrorProps
>(
  (
    {
      // The component props, in alphabetical order (for consistency).
      children,
      className,
      description,
      kind = defaults.kind,
      label,
      title,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--full-page-error`;

    const errorData = {
      403: {
        svg: (
          <Error403SVG className={`${blockClass}__svg ${blockClass}__403`} />
        ),
      },
      404: {
        svg: (
          <Error404SVG className={`${blockClass}__svg ${blockClass}__404`} />
        ),
      },
      custom: {
        svg: (
          <ErrorGenericSVG
            className={`${blockClass}__svg ${blockClass}__custom`}
          />
        ),
      },
    };

    return (
      <div
        {...rest}
        className={cx(blockClass, className)}
        data-component-name={componentName}
        ref={ref}
        role="main">
        <div className={`${blockClass}__container`}>
          <Grid className={`${blockClass}__grid`}>
            <Column sm={4} md={3} lg={6} className={`${blockClass}__column`}>
              <h1 className={`${blockClass}__title`}>
                <span className={`${blockClass}__label`}>
                  <span aria-hidden="true">↳ </span>
                  {label}
                </span>
                <span>{title}</span>
              </h1>
              <p className={`${blockClass}__description`}>{description}</p>
              <div className={`${blockClass}__body`}>{children}</div>
            </Column>
            <Column sm={4} md={5} lg={10}>
              <div className={`${blockClass}__svg-container`}>
                {errorData[kind].svg}
              </div>
            </Column>
          </Grid>
        </div>
      </div>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
FullPageError.displayName = componentName;
