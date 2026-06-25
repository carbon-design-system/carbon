//
// Copyright IBM Corp. 2020, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import {
  Button,
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from '@carbon/react';
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';
import { usePreviousValue } from '../../global/js/hooks';
import uuidv4 from '../../global/js/utils/uuidv4';

const componentName = 'RemoveModal';
export interface RemoveModalProps
  extends React.ComponentProps<typeof ComposedModal> {
  /**
   * The content to be displayed in the body of the modal
   */
  body: ReactNode;
  /**
   * Optional classname
   */
  className?: string;
  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: string;
  /**
   * Message showed when user input fails validation
   */
  inputInvalidText?: string;
  /**
   * Label for text box
   */
  inputLabelText?: ReactNode;
  /**
   * Placeholder for text box
   */
  inputPlaceholderText?: string;
  /**
   * Specify the modal label texts
   */
  label?: string;
  /**
   * Callback function that runs when user closes the modal
   */
  onClose?: () => void;
  /**
   * Callback function that runs when user submits the modal
   */
  onRequestSubmit?: () => void;
  /**
   * Specify whether the Modal is currently open
   */
  open: boolean;
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget?: HTMLElement;
  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside?: boolean;
  /**
   * Specify whether the primary button should be disabled. This value will override textConfirmation
   */
  primaryButtonDisabled?: boolean;
  /**
   * Specify the text for the primary button
   */
  primaryButtonText?: string;

  /**
   * Specify the danger description on the primary button
   */
  primaryDangerDescription?: string;

  /**
   * The name of the resource being acted upon
   */
  resourceName: string;
  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText?: string;
  /**
   * Specify whether or not to show the text confirmation input
   */
  textConfirmation?: boolean;
  /**
   * The text displayed at the top of the modal
   */
  title: string;
}
/**
The `RemoveModal` covers what is known as high impact and medium impact deleting.
Enabling `textConfirmation` enables what would be considered the high impact state of the modal.
For additional information on differentiating between delete / remove and low / medium / high impact please refer to the usage guidelines.
 */
interface PrevType {
  open: boolean;
}
export const RemoveModal = forwardRef(
  (
    {
      body,
      className,
      iconDescription,
      inputInvalidText,
      inputLabelText,
      inputPlaceholderText,
      label,
      onClose,
      onRequestSubmit,
      open,
      portalTarget: portalTargetIn,
      preventCloseOnClickOutside,
      primaryButtonDisabled,
      primaryButtonText,
      primaryDangerDescription,
      resourceName,
      secondaryButtonText,
      textConfirmation,
      title,
      ...rest
    }: React.PropsWithChildren<RemoveModalProps>,
    ref
  ) => {
    const previousState = usePreviousValue({ open }) as PrevType | undefined;
    const [userInput, setUserInput] = useState('');
    const idRef = useRef(uuidv4());
    const renderPortalUse = usePortalTarget(portalTargetIn);
    const onChangeHandler = (e) => {
      setUserInput(e.target.value);
    };
    const checkPrimaryButtonDisabled = () => {
      // user control should be used primarily
      if (primaryButtonDisabled) {
        return true;
      } else if (textConfirmation && userInput !== resourceName) {
        return true;
      }
      return false;
    };
    const primaryButtonStatus = checkPrimaryButtonDisabled();
    const blockClass = `${pkg.prefix}--remove-modal`;

    // Clear the user input this way so that if the onRequestSubmit handler fails for some reason
    // the value of the input will still remain: we only want to empty the input value
    // when open actually changes to false.
    useEffect(() => {
      if (!open && previousState?.open) {
        setUserInput('');
      }
    }, [open, previousState?.open]);

    return renderPortalUse(
      <ComposedModal
        {...rest}
        className={cx(blockClass, className)}
        size="sm"
        aria-label={title}
        {...{
          open,
          ref,
          preventCloseOnClickOutside,
          onClose,
          ...getDevtoolsProps(componentName),
        }}
      >
        <ModalHeader
          title={title}
          label={label}
          iconDescription={iconDescription}
        />
        <ModalBody>
          {typeof body === 'string' ? (
            <p className={`${blockClass}__body`}>{body}</p>
          ) : (
            body
          )}
          {textConfirmation && (
            <TextInput
              id={`${idRef.current}-confirmation-input`}
              className={`${blockClass}__input`}
              invalidText={inputInvalidText}
              labelText={inputLabelText}
              placeholder={inputPlaceholderText}
              onChange={onChangeHandler}
              value={userInput}
              data-modal-primary-focus
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            kind="secondary"
            onClick={onClose}
            data-modal-primary-focus={!textConfirmation}
          >
            {secondaryButtonText}
          </Button>
          <Button
            type="submit"
            kind="danger"
            dangerDescription={primaryDangerDescription}
            onClick={onRequestSubmit}
            disabled={primaryButtonStatus}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ComposedModal>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

RemoveModal.propTypes = {
  /**
   * The content to be displayed in the body of the modal
   */
  body: PropTypes.node.isRequired,
  /**
   * Optional classname
   */
  className: PropTypes.string,
  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes.string.isRequired,
  /**
   * Message showed when user input fails validation
   */
  inputInvalidText: PropTypes.string,
  /**
   * Label for text box
   */
  inputLabelText: PropTypes.node,
  /**
   * Placeholder for text box
   */
  inputPlaceholderText: PropTypes.string,
  /**
   * Specify the modal label texts
   */
  label: PropTypes.string,
  /**
   * Callback function that runs when user closes the modal
   */
  onClose: PropTypes.func,
  /**
   * Callback function that runs when user submits the modal
   */
  onRequestSubmit: PropTypes.func,
  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool.isRequired,
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget: PropTypes.node,
  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside: PropTypes.bool,
  /**
   * Specify whether the primary button should be disabled. This value will override textConfirmation
   */
  primaryButtonDisabled: PropTypes.bool,
  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string,

  /**
   * Specify the danger description on the primary button
   */
  primaryDangerDescription: PropTypes.string,

  /**
   * The name of the resource being acted upon
   */
  resourceName: PropTypes.string.isRequired,
  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string,
  /**
   * Specify whether or not to show the text confirmation input
   */
  textConfirmation: PropTypes.bool,
  /**
   * The text displayed at the top of the modal
   */
  title: PropTypes.string.isRequired,
};

RemoveModal.displayName = componentName;
