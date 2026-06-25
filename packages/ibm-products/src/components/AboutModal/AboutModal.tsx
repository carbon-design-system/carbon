/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import {
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  unstable_FeatureFlags as FeatureFlags,
} from '@carbon/react';
// Import portions of React that are needed.
import React, { MutableRefObject, ReactNode, useEffect, useRef } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { useFocus } from '../../global/js/hooks/useFocus';
import { pkg } from '../../settings';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';
import uuidv4 from '../../global/js/utils/uuidv4';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--about-modal`;
const componentName = 'AboutModal';

export interface AboutModalProps {
  /**
   * Provide additional detail for the modal footer, such as logos of
   * technologies used in the product, legally required for some products
   */
  additionalInfo?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Provide an accessible name for the close icon
   */
  closeIconDescription: string;

  /**
   * Provide any relevant product disclaimers or legal information
   */
  content?: ReactNode;

  /**
   * Specify the first year of product release to the current year
   */
  copyrightText: string;

  /**
   * Provide an array of Carbon `Link`s for additional detail about the
   * product
   */
  links?: ReactNode[];

  /**
   * Provide a visual representation of the product
   */
  logo: ReactNode;

  /**
   * Specify an aria-label for the modal
   */
  modalAriaLabel?: string;

  /**
   * Specify an optional handler for closing modal. Returning `false`
   * prevents the modal from closing
   */
  onClose?: () => void | boolean;

  /**
   * Specify whether the modal is currently open
   */
  open?: boolean;

  /**
   * Provide the DOM node where the modal should be rendered.
   * Defaults to `document.body`
   */
  portalTarget?: ReactNode;

  /**
   * Provide the product name for the modal header
   */
  title: ReactNode;

  /**
   * Provide the product’s version number
   */
  version: string;
}

// NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The `AboutModal` component provides a way to communicate product information
 * to users. It is triggered by a user’s action, appears on top of the main
 * page content, and is persistent until dismissed. The purpose of this modal
 * should be immediately apparent to the user, with a clear and obvious path
 * to completion.
 */
export const AboutModal = React.forwardRef(
  (
    {
      additionalInfo,
      className,
      closeIconDescription,
      copyrightText,
      content,
      links,
      logo,
      modalAriaLabel,
      onClose,
      open,
      portalTarget: portalTargetIn,
      title,
      version,
      // Collect any other property values passed in.
      ...rest
    }: AboutModalProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const bodyRef = useRef<HTMLElement | null | undefined>(null);
    const localRef = useRef(undefined);
    const modalRef = (ref || localRef) as MutableRefObject<HTMLDivElement>;
    const contentRef = useRef<HTMLDivElement>(null);
    const contentId = uuidv4();
    const renderPortalUse = usePortalTarget(portalTargetIn);
    const { claimFocus } = useFocus(modalRef);

    // We can't add a ref directly to the ModalBody, so track it in a ref
    // as the parent of the current bodyRef element
    useEffect(() => {
      bodyRef.current = contentRef.current?.parentElement;
    }, [bodyRef]);

    useEffect(() => {
      if (open) {
        claimFocus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalRef, open]);

    return renderPortalUse(
      <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
        <ComposedModal
          {
            // Pass through any other property values as HTML attributes.
            ...rest
          }
          className={cx(
            blockClass, // Apply the block class to the main HTML element
            className // Apply any supplied class names to the main HTML element.
          )}
          aria-label={modalAriaLabel}
          ref={modalRef}
          {...{ onClose, open, ...getDevtoolsProps(componentName) }}
        >
          <div className={`${blockClass}__logo`}>{logo}</div>
          <ModalHeader
            className={`${blockClass}__header`}
            closeModal={onClose}
            iconDescription={closeIconDescription}
            label={title}
            labelClassName={`${blockClass}__title`}
          />
          <ModalBody className={`${blockClass}__body`}>
            <div
              className={`${blockClass}__body-content`}
              ref={contentRef}
              id={contentId}
            >
              <div className={`${blockClass}__version`}>{version}</div>
              {links && links.length > 0 && (
                <div className={`${blockClass}__links-container`}>
                  {links.map((link, i) => (
                    <React.Fragment key={i}>{link}</React.Fragment>
                  ))}
                </div>
              )}
              {content && <p className={`${blockClass}__content`}>{content}</p>}
              {copyrightText && (
                <p className={`${blockClass}__copyright-text`}>
                  {copyrightText}
                </p>
              )}
            </div>
          </ModalBody>
          {additionalInfo && (
            <ModalFooter className={`${blockClass}__footer`}>
              {additionalInfo}
            </ModalFooter>
          )}
        </ComposedModal>
      </FeatureFlags>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
AboutModal.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
AboutModal.propTypes = {
  /**
   * Provide additional detail for the modal footer, such as logos of
   * technologies used in the product, legally required for some products
   */
  additionalInfo: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Provide an accessible name for the close icon
   */
  closeIconDescription: PropTypes.string.isRequired,

  /**
   * Provide any relevant product disclaimers or legal information
   */
  content: PropTypes.node,

  /**
   * Specify the first year of product release to the current year
   */
  copyrightText: PropTypes.string.isRequired,

  /**
   * Provide an array of Carbon `Link`s for additional detail about the
   * product
   */
  links: PropTypes.arrayOf(PropTypes.element),

  /**
   * Provide a visual representation of the product
   */
  logo: PropTypes.node.isRequired,

  /**
   * Specify an aria-label for the modal
   */
  modalAriaLabel: PropTypes.string,

  /**
   * Specify an optional handler for closing modal. Returning `false`
   * prevents the modal from closing
   */
  onClose: PropTypes.func,

  /**
   * Specify whether the modal is currently open
   */
  open: PropTypes.bool,

  /**
   * Provide the DOM node where the modal should be rendered.
   * Defaults to `document.body`
   */
  portalTarget: PropTypes.node,

  /**
   * Provide the product name for the modal header
   */
  title: PropTypes.node.isRequired,

  /**
   * Provide the product’s version number
   */
  version: PropTypes.string.isRequired,
};
