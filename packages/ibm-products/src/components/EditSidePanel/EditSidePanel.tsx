/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../global/js/utils/props-helper';

// Import portions of React that are needed.
import React, { ForwardedRef, ReactNode } from 'react';

// Carbon and package components we use.
import { ButtonProps, Form } from '@carbon/react';
// Other standard imports.
import PropTypes from 'prop-types';
import { SidePanel } from '../SidePanel';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--edit-side-panel`;
const componentName = 'EditSidePanel';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

export interface EditSidePanelProps {
  /**
   * Sets the body content of the create side panel
   */
  children: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

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
   * Specifies a required field that provides a title for a form
   */
  formTitle: ReactNode;

  /**
   * Unique identifier
   */
  id?: string;

  /**
   * Specifies an optional handler which is called when the CreateSidePanel
   * is closed.
   */
  onRequestClose?: () => void;

  /**
   * Specifies an optional handler which is called when the CreateSidePanel
   * primary button is pressed.
   */
  onRequestSubmit?: () => void;

  /**
   * Specifies whether the CreateSidePanel is open or not.
   */
  open: boolean;

  /**
   * Determines if the side panel is on the right or left
   */
  placement?: 'left' | 'right';

  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: string;

  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: string;

  /**
   * This is the selector to the element that contains all of the page content that will shrink if the panel is a slide in.
   * This prop is required when using the `slideIn` variant of the side panel.
   */
  selectorPageContent?: string;

  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus?: string;

  /**
   * Sets the size of the side panel
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | '2xl';

  /**
   * Specifies which DOM element in the form should be focused.
   */
  slideIn?: boolean;

  /**
   *  **Experimental:** Provide a `Slug` component to be rendered inside the `SidePanel` component
   */
  slug?: ReactNode;

  /**
   * The subtitle of the CreateSidePanel is optional and serves to provide more information about the modal.
   */
  subtitle?: ReactNode;

  /**
   * The title of the CreateSidePanel is usually the product or service name.
   */
  title: string;
}

/**
 * **This component is deprecated.** <br>
 * Use with medium complexity edits if the user needs page context.
 * @deprecated
 */
export const EditSidePanel = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      children,
      className,
      disableSubmit,
      id,
      formTitle,
      formDescription,
      onRequestClose,
      onRequestSubmit,
      open,
      placement = 'right',
      primaryButtonText,
      secondaryButtonText,
      selectorPrimaryFocus,
      selectorPageContent,
      size = 'md',
      slideIn,
      subtitle,
      title,

      // Collect any other property values passed in.
      ...rest
    }: EditSidePanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const actions: ButtonProps<React.ElementType>[] = [
      {
        label: primaryButtonText,
        onClick: (event) => {
          event.preventDefault();
          onRequestSubmit?.();
        },
        kind: 'primary',
        disabled: disableSubmit,
        type: 'submit',
      },
      {
        label: secondaryButtonText,
        onClick: onRequestClose,
        kind: 'secondary',
      },
    ];

    const formTitleId = uuidv4();

    return (
      <SidePanel
        {...rest}
        {...{
          open,
          ref,
          selectorPageContent,
          onRequestClose,
          title,
          subtitle,
          selectorPrimaryFocus,
          id,
          ...getDevtoolsProps(componentName),
        }}
        placement={placement}
        slideIn={slideIn as any}
        animateTitle={false}
        className={cx(blockClass, className)}
        size={size}
        preventCloseOnClickOutside
        actions={actions}
      >
        {formTitle && (
          <h3
            id={formTitleId}
            className={`${blockClass}__form-title-text ${blockClass}__content-text`}
          >
            {formTitle}
          </h3>
        )}
        {formDescription && (
          <p
            className={`${blockClass}__form-description-text ${blockClass}__content-text`}
          >
            {formDescription}
          </p>
        )}
        <Form className={`${blockClass}__form`} aria-labelledby={formTitleId}>
          {children}
        </Form>
      </SidePanel>
    );
  }
);

/**@ts-ignore*/
EditSidePanel.deprecated = {
  level: 'warn',
  details: `This component is deprecated and will be removed in the next major version.`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
EditSidePanel.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
EditSidePanel.propTypes = {
  /**
   * Sets the body content of the create side panel
   */
  /**@ts-ignore*/
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

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
   * Specifies a required field that provides a title for a form
   */
  formTitle: PropTypes.node.isRequired,

  /**
   * Unique identifier
   */
  id: PropTypes.string,

  /**
   * Specifies an optional handler which is called when the CreateSidePanel
   * is closed.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specifies an optional handler which is called when the CreateSidePanel
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specifies whether the CreateSidePanel is open or not.
   */
  open: PropTypes.bool.isRequired,

  /**
   * Determines if the side panel is on the right or left
   */
  placement: PropTypes.oneOf(['left', 'right']),

  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: PropTypes.string.isRequired,

  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: PropTypes.string.isRequired,

  /**
   * This is the selector to the element that contains all of the page content that will shrink if the panel is a slide in.
   * This prop is required when using the `slideIn` variant of the side panel.
   */
  /**@ts-ignore*/
  selectorPageContent: PropTypes.string,

  /**
   * Specifies which DOM element in the form should be focused.
   */
  /**@ts-ignore*/
  selectorPrimaryFocus: PropTypes.node.isRequired,

  /**
   * Sets the size of the side panel
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', '2xl']),

  /**
   * Specifies which DOM element in the form should be focused.
   */
  slideIn: PropTypes.bool,

  /**
   *  **Experimental:** Provide a `Slug` component to be rendered inside the `SidePanel` component
   */
  slug: PropTypes.node,

  /**
   * The subtitle of the CreateSidePanel is optional and serves to provide more information about the modal.
   */
  subtitle: PropTypes.node,

  /**
   * The title of the CreateSidePanel is usually the product or service name.
   */
  /**@ts-ignore*/
  title: PropTypes.node.isRequired,
};
