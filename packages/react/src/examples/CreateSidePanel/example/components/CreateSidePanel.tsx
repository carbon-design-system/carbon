/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropsWithChildren, ReactNode, RefObject, useMemo } from 'react';
import { SidePanel } from '@carbon/ibm-products';
import { Form } from '@carbon/react';

const blockClass = `create-side-panel`;

export interface CreateSidePanelProps extends PropsWithChildren {
  /** Optional class applied to the outermost element. */
  className?: string;
  /** Disables the primary submit button — use for form validation. */
  disableSubmit?: boolean;
  /** Optional description rendered below the form title inside the panel body. */
  formDescription?: ReactNode;
  /** Required title for the form section inside the panel body. */
  formTitle: ReactNode;
  /** Unique identifier forwarded to the underlying SidePanel. */
  id?: string;
  /** Provide a ref to return focus to once the side panel is closed. */
  launcherButtonRef?: RefObject<HTMLButtonElement | null>;
  /** Called when the panel close action is triggered. */
  onRequestClose?(): void;
  /** Called when the primary submit button is clicked. */
  onRequestSubmit?(): void | Promise<void>;
  /** Controls whether the panel is open. */
  open: boolean;
  /** Label text shown above the panel title. */
  label?: string;
  /** Text for the primary (submit) action button. */
  primaryButtonText: string;
  /** Text for the secondary (cancel) action button. */
  secondaryButtonText: string;
  /**
   * CSS selector for the element that contains all page content.
   * Required for the `slideIn` variant so the page content can shrink.
   */
  selectorPageContent: string;
  /** CSS selector for the element that should receive focus when the panel opens. */
  selectorPrimaryFocus?: string;
  /** Optional subtitle shown in the panel header. */
  subtitle?: ReactNode;
  /** Panel header title. */
  title: string;
  /** Optional decorator (e.g. Slug / AI label) rendered inside the SidePanel. */
  decorator?: ReactNode;
}

export const CreateSidePanel = React.forwardRef<
  HTMLDivElement,
  CreateSidePanelProps
>(
  (
    {
      children,
      className,
      decorator,
      disableSubmit = false,
      formDescription,
      formTitle,
      id,
      label,
      launcherButtonRef,
      onRequestClose,
      onRequestSubmit,
      open,
      primaryButtonText,
      secondaryButtonText,
      selectorPageContent,
      selectorPrimaryFocus,
      subtitle,
      title,
      ...rest
    },
    ref
  ) => {
    const actions = useMemo(
      () => [
        {
          key: 'submit',
          kind: 'primary' as const,
          label: primaryButtonText,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            onRequestSubmit?.();
          },
          disabled: disableSubmit,
          type: 'submit' as const,
        },
        {
          key: 'cancel',
          kind: 'secondary' as const,
          label: secondaryButtonText,
          onClick: onRequestClose,
        },
      ],
      [
        primaryButtonText,
        secondaryButtonText,
        disableSubmit,
        onRequestClose,
        onRequestSubmit,
      ]
    );

    return (
      <SidePanel
        {...rest}
        ref={ref}
        id={id}
        open={open}
        title={title}
        subtitle={subtitle}
        labelText={label}
        placement="right"
        slideIn
        animateTitle={false}
        size="md"
        className={`${blockClass}${className ? ` ${className}` : ''}`}
        selectorPageContent={selectorPageContent}
        selectorPrimaryFocus={selectorPrimaryFocus}
        launcherButtonRef={launcherButtonRef}
        onRequestClose={onRequestClose}
        actions={actions}
        decorator={decorator}
        preventCloseOnClickOutside
      >
        {formTitle && (
          <h3 className={`${blockClass}__form-title`}>{formTitle}</h3>
        )}
        {formDescription && (
          <p className={`${blockClass}__form-description`}>{formDescription}</p>
        )}
        <Form
          className={`${blockClass}__form`}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          {children}
        </Form>
      </SidePanel>
    );
  }
);

CreateSidePanel.displayName = 'CreateSidePanel';
