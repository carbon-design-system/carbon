/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { PropsWithChildren, ReactNode } from 'react';

import { Form } from '@carbon/react';
// Other standard imports.
import PropTypes from 'prop-types';
import { TearsheetNarrow } from '../Tearsheet/TearsheetNarrow';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--create-tearsheet-narrow`;
const componentName = 'CreateTearsheetNarrow';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

type VerticalPosition = 'normal' | 'lower';
export interface CreateTearsheetNarrowProps extends PropsWithChildren {
  /**
   * Provide the contents of the CreateTearsheetNarrow.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description?: ReactNode;

  /**
   * Specifies a boolean for disabling or enabling the primary button. This is important for form validation
   * Returning `true` prevents the primary button from being clicked until required fields are completed.
   */
  disableSubmit?: boolean;

  /**
   * Specifies an optional field that provides a additional context for a form
   */
  formDescription?: ReactNode;

  /**
   * Specifies a field that provides a title for a form
   */
  formTitle?: ReactNode;

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label?: ReactNode;

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onRequestClose?: () => void;

  /**
   * Specifies an optional handler which is called when the CreateTearsheetNarrow
   * primary button is pressed.
   */
  onRequestSubmit?: () => void;

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open?: boolean;

  /**
   * Specifies the primary button's text in the CreateTearsheetNarrow.
   */
  primaryButtonText: string;

  /**
   * Specifies the secondary button's text in the CreateTearsheetNarrow.
   */
  secondaryButtonText: string;

  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus?: ReactNode;

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title?: ReactNode;

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition?: VerticalPosition;
}
/**
 * Use a narrow tearsheet as an alternative to a modal when there is scrolling.
 * Use when the form fields can be broken down into sections using section headers.
 */
export const CreateTearsheetNarrow = React.forwardRef(
  (
    {
      children,
      className,
      description,
      disableSubmit,
      formDescription,
      formTitle,
      label,
      open,
      onRequestClose,
      onRequestSubmit,
      primaryButtonText,
      secondaryButtonText,
      selectorPrimaryFocus,
      title,
      verticalPosition,
      ...rest
    }: CreateTearsheetNarrowProps,
    ref
  ) => {
    const actions = [
      {
        label: primaryButtonText,
        onClick: onRequestSubmit,
        kind: 'primary',
        disabled: disableSubmit,
      },
      {
        label: secondaryButtonText,
        onClick: onRequestClose,
        kind: 'secondary',
      },
    ];

    const formTextClass = `${blockClass}__content-text`;
    const formTitleId = uuidv4();

    return (
      <TearsheetNarrow
        {
          // Pass through any other property values as HTML attributes.
          ...(rest as any)
        }
        title={title}
        description={description}
        className={cx(blockClass, className)}
        actions={actions}
        open={open}
        ref={ref}
        onClose={() => {
          onRequestClose?.();
          return false;
        }}
        label={label}
        selectorPrimaryFocus={selectorPrimaryFocus}
        verticalPosition={verticalPosition}
        role="presentation"
        {...getDevtoolsProps(componentName)}
      >
        <h3
          className={cx(`${blockClass}__form-title-text`, formTextClass)}
          id={formTitleId}
        >
          {formTitle}
        </h3>
        <p
          className={cx(`${blockClass}__form-description-text`, formTextClass)}
        >
          {formDescription}
        </p>
        <Form
          className={`${blockClass}__form`}
          aria-labelledby={formTitleId}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          {children}
        </Form>
      </TearsheetNarrow>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CreateTearsheetNarrow.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CreateTearsheetNarrow.propTypes = {
  /**
   * Provide the contents of the CreateTearsheetNarrow.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes.node,

  /**
   * Specifies a boolean for disabling or enabling the primary button. This is important for form validation
   * Returning `true` prevents the primary button from being clicked until required fields are completed.
   */
  disableSubmit: PropTypes.bool,

  /**
   * Specifies an optional field that provides a additional context for a form
   */
  formDescription: PropTypes.node,

  /**
   * Specifies a field that provides a title for a form
   */
  formTitle: PropTypes.node,

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes.node,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specifies an optional handler which is called when the CreateTearsheetNarrow
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes.bool,

  /**
   * Specifies the primary button's text in the CreateTearsheetNarrow.
   */
  primaryButtonText: PropTypes.string.isRequired,

  /**
   * Specifies the secondary button's text in the CreateTearsheetNarrow.
   */
  secondaryButtonText: PropTypes.string.isRequired,

  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: PropTypes.node,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes.node,

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes.oneOf(['normal', 'lower']),
};
