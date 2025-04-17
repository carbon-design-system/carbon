/**
 * Copyright IBM Corp. 2014, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';
import { ReactAttr } from '../../types/common';
import { Text } from '../Text';
import { Layer } from '../Layer';
import ButtonSet from '../ButtonSet';

/**
 * ----------
 * Dialog
 * ----------
 */
export interface DialogProps extends ReactAttr<HTMLDialogElement> {
  /**
   * Provide the contents of the Dialog
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Specifies whether the dialog is modal or non-modal. This cannot be changed
   * while open=true
   */
  modal?: boolean;

  /**
   * Specify a handler for the dialog's cancel event.
   * The browser fires this event when the user presses the Esc key and is cancelable.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a click handler applied to the dialog.
   */
  onClick?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a handler the dialog's close event.
   * The browser fires this event after the dialog has closed.
   */
  onClose?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a handler for closing Dialog.
   * The handler should care of closing Dialog, e.g. changing `open` prop.
   */
  onRequestClose?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify whether the Dialog is currently open
   */
  open?: boolean;

  /**
   * Specify whether the Dialog is for dangerous actions
   */
  danger?: boolean;

  /**
   * Specify whether the dialog contains scrolling content
   */
  hasScrollingContent?: boolean;

  /**
   * Specify the size variant.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify the role of the dialog for accessibility
   * 'dialog' is the default, but 'alertdialog' can be used for important messages requiring user attention
   */
  role?: 'dialog' | 'alertdialog';

  /**
   * Specify a label for screen readers
   */
  ariaLabel?: string;

  /**
   * Specify the ID of an element that labels this dialog
   */
  ariaLabelledBy?: string;

  /**
   * Specify the ID of an element that describes this dialog
   */
  ariaDescribedBy?: string;
}

export const unstable__Dialog = React.forwardRef(
  (
    {
      children,
      className,
      modal,
      onCancel = noopFn,
      onClick = noopFn,
      onClose = noopFn,
      onRequestClose = noopFn,
      open = false,
      danger = false,
      hasScrollingContent = false,
      size,
      role = 'dialog',
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ...rest
    }: DialogProps,
    forwardRef
  ) => {
    const prefix = usePrefix();

    // This component needs access to a ref, placed on the dialog, to call the
    // various imperative dialog functions (show(), close(), etc.).
    // If the parent component has not passed a ref for forwardRef, forwardRef
    // will be null. A "backup" ref is needed to ensure the dialog's instance
    // methods can always be called within this component.
    const backupRef = useRef(null);
    const ref = (forwardRef ??
      backupRef) as MutableRefObject<HTMLDialogElement>;

    // Clicks on the backdrop of an open modal dialog should request the consuming component to close
    // the dialog. Clicks elsewhere, or on non-modal dialogs should not request
    // to close the dialog.
    function handleModalBackdropClick(e) {
      if (open && modal && e.target === ref.current) {
        onRequestClose(e);
      }
    }

    function handleClick(e) {
      handleModalBackdropClick(e);

      // onClick should always be called, no matter if the target is a modal
      // dialog, modal dialog backdrop, or non-modal dialog.
      onClick(e);
    }

    useEffect(() => {
      if (ref.current) {
        if (open) {
          if (modal) {
            // Display the dialog as a modal, over the top of any other dialogs
            // that might be present. Everything outside the dialog are inert
            // with interactions outside the dialog being blocked.
            ref.current.showModal();
          } else {
            // Display the dialog modelessly, i.e. still allowing interaction
            // with content outside of the dialog.
            ref.current.show();
          }
        } else {
          ref.current.close();
        }
      }
    }, [modal, open]);

    // Apply body overflow: hidden when modal is open
    useEffect(() => {
      if (modal && open) {
        document.body.classList.add(`${prefix}--body--with-modal-open`);
      } else {
        document.body.classList.remove(`${prefix}--body--with-modal-open`);
      }

      return () => {
        document.body.classList.remove(`${prefix}--body--with-modal-open`);
      };
    }, [modal, open, prefix]);

    // Create a container element for the dialog content with proper classes
    const containerClasses = cx(`${prefix}--dialog-container`, {
      [`${prefix}--dialog-container--${size}`]: size,
    });

    return (
      <dialog
        {...rest}
        className={cx(
          `${prefix}--dialog`,
          {
            [`${prefix}--dialog--modal`]: modal,
            [`${prefix}--dialog--danger`]: danger,
            [`${prefix}--dialog--scrolling`]: hasScrollingContent,
          },
          className
        )}
        ref={ref}
        onCancel={onCancel}
        onClick={handleClick}
        onClose={onClose}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}>
        <div className={containerClasses}>{children}</div>
      </dialog>
    );
  }
);

unstable__Dialog.displayName = 'Dialog';

unstable__Dialog.propTypes = {
  /**
   * Provide children to be rendered inside of the Dialog
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Modal specifies whether the Dialog is modal or non-modal. This cannot be
   * changed while open=true
   */
  modal: PropTypes.bool,

  /**
   * Specify a handler for closing Dialog.
   * The handler should care of closing Dialog, e.g. changing `open` prop.
   */
  onRequestClose: PropTypes.func,

  /**
   * open initial state
   */
  open: PropTypes.bool,

  /**
   * Specify whether the Dialog is for dangerous actions
   */
  danger: PropTypes.bool,

  /**
   * Specify whether the dialog contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify the role of the dialog for accessibility
   */
  role: PropTypes.oneOf(['dialog', 'alertdialog']),

  /**
   * Specify a label for screen readers
   */
  ariaLabel: PropTypes.string,

  /**
   * Specify the ID of an element that labels this dialog
   */
  ariaLabelledBy: PropTypes.string,

  /**
   * Specify the ID of an element that describes this dialog
   */
  ariaDescribedBy: PropTypes.string,
};

/**
 * -------------
 * DialogHeader
 * -------------
 */
export interface DialogHeaderProps extends ReactAttr<HTMLDivElement> {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children?: React.ReactNode;
}
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, ...rest }, ref) => {
    const prefix = usePrefix();
    return (
      <div className={`${prefix}--dialog__header`} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

DialogHeader.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,
};

/**
 * ---------------
 * DialogControls
 * ---------------
 */
export interface DialogControlsProps extends ReactAttr<HTMLDivElement> {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children?: React.ReactNode;
}
export const DialogControls = React.forwardRef<
  HTMLDivElement,
  DialogControlsProps
>(({ children, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    // @ts-ignore
    <div className={`${prefix}--dialog__header-controls`} ref={ref} {...rest}>
      {children}
    </div>
  );
});

DialogControls.displayName = 'DialogControls';

DialogControls.propTypes = {
  /**
   * Provide children to be rendered inside of this component
   */
  children: PropTypes.node,
};

/**
 * -------------------
 * DialogCloseButton
 * -------------------
 */
export interface DialogCloseButtonProps extends ReactAttr<HTMLDivElement> {
  /**
   * Specify a click handler applied to the IconButton
   */
  onClick?: React.MouseEventHandler;
}
export const DialogCloseButton = React.forwardRef<
  HTMLDivElement,
  DialogCloseButtonProps
>(({ onClick, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    // @ts-ignore
    <IconButton
      kind="ghost"
      className={`${prefix}--dialog__close`}
      label="Close"
      title="Close"
      aria-label="Close"
      align="left"
      onClick={onClick}
      ref={ref}
      {...rest}>
      <Close
        size={20}
        aria-hidden="true"
        tabIndex={-1}
        className={`${prefix}--icon__close`}
      />
    </IconButton>
  );
});

DialogCloseButton.displayName = 'DialogCloseButton';

DialogCloseButton.propTypes = {
  /**
   * Specify a click handler applied to the IconButton
   */
  onClick: PropTypes.func,
};

/**
 * ------------
 * DialogTitle
 * ------------
 */
export interface DialogTitleProps extends ReactAttr<HTMLHeadingElement> {
  /**
   * Provide the contents of the DialogTitle
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the title node
   */
  className?: string;
}

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(({ children, className, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    <Text
      as="h2"
      className={cx(`${prefix}--dialog-header__heading`, className)}
      ref={ref}
      {...rest}>
      {children}
    </Text>
  );
});

DialogTitle.displayName = 'DialogTitle';

DialogTitle.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the title node
   */
  className: PropTypes.string,
};

/**
 * ---------------
 * DialogSubtitle
 * ---------------
 */
export interface DialogSubtitleProps extends ReactAttr<HTMLParagraphElement> {
  /**
   * Provide the contents of the DialogSubtitle
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the subtitle node
   */
  className?: string;
}

export const DialogSubtitle = React.forwardRef<
  HTMLParagraphElement,
  DialogSubtitleProps
>(({ children, className, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    <Text
      as="h2"
      className={cx(`${prefix}--dialog-header__label`, className)}
      ref={ref}
      {...rest}>
      {children}
    </Text>
  );
});

DialogSubtitle.displayName = 'DialogSubtitle';

DialogSubtitle.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the subtitle node
   */
  className: PropTypes.string,
};

/**
 * -----------
 * DialogBody
 * -----------
 */
export interface DialogBodyProps extends ReactAttr<HTMLDivElement> {
  /**
   * Provide the contents of the DialogBody
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the body node
   */
  className?: string;

  /**
   * Specify whether the content has overflow that should be scrollable
   */
  hasScrollingContent?: boolean;

  /**
   * Specify whether to use the Layer component
   */
  useLayer?: boolean;
}

export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  (
    { children, className, hasScrollingContent, useLayer = true, ...rest },
    ref
  ) => {
    const prefix = usePrefix();
    const contentClasses = cx(
      `${prefix}--dialog-content`,
      {
        [`${prefix}--dialog-scroll-content`]: hasScrollingContent,
      },
      className
    );

    // Use IntersectionObserver to detect when content is scrolled
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!hasScrollingContent && contentRef.current) {
        // Only set up observer if hasScrollingContent is not explicitly set
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.target.scrollHeight > entry.target.clientHeight) {
              entry.target.classList.add(`${prefix}--dialog-scroll-content`);
            } else {
              entry.target.classList.remove(`${prefix}--dialog-scroll-content`);
            }
          },
          { threshold: [0, 0.5, 1] }
        );

        observer.observe(contentRef.current);
        return () => {
          observer.disconnect();
        };
      }
      return undefined;
    }, [hasScrollingContent, prefix]);

    const localRef = useRef<HTMLDivElement>(null);
    // Combine refs
    const combinedRef = (el: HTMLDivElement) => {
      // Update both refs
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement>).current = el;
      }
      localRef.current = el;
      contentRef.current = el;
    };

    if (useLayer) {
      return (
        <Layer className={contentClasses} ref={combinedRef} {...rest}>
          {children}
        </Layer>
      );
    }

    return (
      <div className={contentClasses} ref={combinedRef} {...rest}>
        {children}
      </div>
    );
  }
);

DialogBody.displayName = 'DialogBody';

DialogBody.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the body node
   */
  className: PropTypes.string,

  /**
   * Specify whether the content has overflow that should be scrollable
   */
  hasScrollingContent: PropTypes.bool,

  /**
   * Specify whether to use the Layer component
   */
  useLayer: PropTypes.bool,
};

/**
 * -------------
 * DialogContent (alias for DialogBody)
 * -------------
 */
export const DialogContent = DialogBody;
DialogContent.displayName = 'DialogContent';

/**
 * -------------
 * DialogFooter
 * -------------
 */
export interface DialogFooterProps extends ReactAttr<HTMLDivElement> {
  /**
   * Provide the contents of the DialogFooter
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the footer node
   */
  className?: string;

  /**
   * Specify whether to use ButtonSet as a wrapper
   * Default is true for backward compatibility with Modal
   */
  useButtonSet?: boolean;
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, useButtonSet = true, ...rest }, ref) => {
    const prefix = usePrefix();
    const classes = cx(`${prefix}--dialog-footer`, className);

    if (useButtonSet) {
      return (
        <ButtonSet className={classes} ref={ref} {...rest}>
          {children}
        </ButtonSet>
      );
    }

    return (
      <div className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

DialogFooter.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the footer node
   */
  className: PropTypes.string,

  /**
   * Specify whether to use ButtonSet as a wrapper
   */
  useButtonSet: PropTypes.bool,
};

/**
 * -------
 * Types for composable Dialog
 * -------
 */
interface DialogComponent
  extends React.ForwardRefExoticComponent<
    DialogProps & React.RefAttributes<HTMLDialogElement>
  > {
  Header: typeof DialogHeader;
  Controls: typeof DialogControls;
  CloseButton: typeof DialogCloseButton;
  Title: typeof DialogTitle;
  Subtitle: typeof DialogSubtitle;
  Body: typeof DialogBody;
  Content: typeof DialogContent;
  Footer: typeof DialogFooter;
}

/**
 * -------
 * Exports
 * -------
 */
const Header = DialogHeader;
Header.displayName = 'Dialog.Header';

const Controls = DialogControls;
Controls.displayName = 'Dialog.Controls';

const CloseButton = DialogCloseButton;
CloseButton.displayName = 'Dialog.CloseButton';

const Title = DialogTitle;
Title.displayName = 'Dialog.Title';

const Subtitle = DialogSubtitle;
Subtitle.displayName = 'Dialog.Subtitle';

const Body = DialogBody;
Body.displayName = 'Dialog.Body';

const Content = DialogContent;
Content.displayName = 'Dialog.Content';

const Footer = DialogFooter;
Footer.displayName = 'Dialog.Footer';

// Add composable components to unstable__Dialog
// Use type assertion to tell TypeScript that we're adding properties
(unstable__Dialog as DialogComponent).Header = Header;
(unstable__Dialog as DialogComponent).Controls = Controls;
(unstable__Dialog as DialogComponent).CloseButton = CloseButton;
(unstable__Dialog as DialogComponent).Title = Title;
(unstable__Dialog as DialogComponent).Subtitle = Subtitle;
(unstable__Dialog as DialogComponent).Body = Body;
(unstable__Dialog as DialogComponent).Content = Content;
(unstable__Dialog as DialogComponent).Footer = Footer;

// Create a Dialog namespace for direct access
export const Dialog = unstable__Dialog as DialogComponent;
