//
// Copyright IBM Corp. 2020, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import {
  Button,
  ComposedModal,
  FormGroup,
  Loading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PasswordInput,
  RadioButton,
  RadioButtonGroup,
  TextInput,
  unstable_FeatureFlags as FeatureFlags,
  usePrefix,
} from '@carbon/react';
import { CheckmarkFilled, ErrorFilled } from '@carbon/react/icons';
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  RefObject,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';
import uuidv4 from '../../global/js/utils/uuidv4';

const componentName = 'ExportModal';

// Default values for props
const defaults = {
  inputType: 'text',
  preformattedExtensions: Object.freeze([]),
  validExtensions: Object.freeze([]),
};

type InputType = 'text' | 'password';

type PreformattedExtensions = {
  extension?: string;
  description?: string;
};
export interface ExportModalProps
  extends React.ComponentProps<typeof ComposedModal> {
  /**
   * Body content for the modal
   */
  body?: string;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * specify if an error occurred
   */
  error?: boolean;
  /**
   * messaging to display in the event of an error
   */
  errorMessage?: string;
  /**
   * name of the file being exported
   */
  filename: string;
  /**
   * label text that's displayed when hovering over visibility toggler to hide key
   */
  hidePasswordLabel?: string;
  /**
   * label for the text input
   */
  inputLabel?: string;
  /**
   * specify the type of text input
   */
  inputType: InputType;
  /**
   * text for an invalid input
   */
  invalidInputText?: string;
  /**
   * specify if the modal is in a loading state
   */
  loading?: boolean;
  /**
   * message to display during the loading state
   */
  loadingMessage?: string;
  /**
   * Specify a handler for closing modal
   */
  onClose?: () => void;
  /**
   * Specify a handler for "submitting" modal. Returns the file name
   */
  onRequestSubmit?: (value?: string) => void;
  /**
   * Specify whether the Modal is currently open
   */
  open?: boolean;
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget?: ReactNode;
  /**
   * Array of extensions to display as radio buttons
   */
  preformattedExtensions: readonly PreformattedExtensions[];
  /**
   * Label for the preformatted label form group
   */
  preformattedExtensionsLabel?: string;
  /**
   * Specify the text for the primary button
   */
  primaryButtonText: string;
  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: string;
  /**
   * label text that's displayed when hovering over visibility toggler to show key
   */
  showPasswordLabel?: string;
  /**
   * messaging to display if the export was successful
   */
  successMessage?: string;
  /**
   * specify if the export was successful
   */
  successful?: boolean;
  /**
   * The text displayed at the top of the modal
   */
  title: string;
  /**
   * Reference to trigger button
   */
  triggerButtonRef?: RefObject<any>;
  /**
   * array of valid extensions the file can have
   */
  validExtensions: readonly any[];
}

/**
 * Modal dialog version of the export pattern
 */
export const ExportModal = forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      body,
      className,
      error,
      errorMessage,
      filename,
      hidePasswordLabel,
      inputLabel,
      inputType = 'text',
      invalidInputText,
      loading,
      loadingMessage,
      onClose,
      onRequestSubmit,
      open,
      portalTarget: portalTargetIn,
      preformattedExtensions = defaults.preformattedExtensions,
      preformattedExtensionsLabel,
      primaryButtonText,
      secondaryButtonText,
      showPasswordLabel,
      successMessage,
      successful,
      title,
      triggerButtonRef,
      validExtensions = defaults.validExtensions,

      // Collect any other property values passed in.
      ...rest
    }: React.PropsWithChildren<ExportModalProps>,
    ref
  ) => {
    const blockClass = `${pkg.prefix}--export-modal`;
    const [name, setName] = useState('');
    const [dirtyInput, setDirtyInput] = useState(false);
    // by default (if it exists) use the first extension in the extension array
    const [extension, setExtension] = useState('');
    const renderPortalUse = usePortalTarget(portalTargetIn);
    const carbonPrefix = usePrefix();

    useEffect(() => {
      setName(filename);
      if (
        preformattedExtensions &&
        preformattedExtensions.length > 0 &&
        preformattedExtensions[0]?.extension
      ) {
        setExtension(preformattedExtensions?.[0]?.extension);
      }
    }, [filename, preformattedExtensions, open]);

    useEffect(() => {
      if (successful) {
        const button: HTMLButtonElement | null = document.querySelector(
          `.${blockClass} .${carbonPrefix}--modal-close-button button`
        );
        button?.focus();
      }
    }, [successful, blockClass, carbonPrefix]);

    const onNameChangeHandler = (evt) => {
      setName(evt.target.value);
    };

    const onExtensionChangeHandler = (value) => {
      setExtension(value);
    };

    const onBlurHandler = () => {
      setDirtyInput(true);
    };

    const onSubmitHandler = () => {
      const returnName = extension
        ? `${filename}.${extension.toLocaleLowerCase()}`
        : name;
      onRequestSubmit?.(returnName);
    };

    const hasInvalidExtension = () => {
      if (!dirtyInput || !validExtensions || !validExtensions.length) {
        return false;
      }
      if (!name.includes('.')) {
        return true;
      }
      const ext = name.split('.').pop();
      if (!validExtensions.includes(ext)) {
        return true;
      }
      return false;
    };

    const internalId = useRef(uuidv4());
    const primaryButtonDisabled = loading || !name || hasInvalidExtension();
    const submitted = loading || error || successful;

    const commonInputProps = {
      id: `text-input--${internalId.current}`,
      value: name,
      onChange: onNameChangeHandler,
      labelText: inputLabel,
      invalid: hasInvalidExtension(),
      invalidText: invalidInputText,
      onBlur: onBlurHandler,
      ['data-modal-primary-focus']: true,
    };
    return renderPortalUse(
      <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
        <ComposedModal
          {...rest}
          className={cx(blockClass, className)}
          aria-label={title}
          size="sm"
          preventCloseOnClickOutside
          launcherButtonRef={triggerButtonRef}
          {...{ open, ref, onClose, ...getDevtoolsProps(componentName) }}
        >
          <ModalHeader
            className={`${blockClass}__header`}
            closeModal={onClose}
            title={title}
          />
          <ModalBody className={`${blockClass}__body-container`}>
            {!submitted && (
              <>
                {body && <p className={`${blockClass}__body`}>{body}</p>}
                {preformattedExtensions.length ? (
                  <FormGroup legendText={preformattedExtensionsLabel}>
                    <RadioButtonGroup
                      orientation="vertical"
                      onChange={onExtensionChangeHandler}
                      valueSelected={extension}
                      name="extensions"
                      aria-label="extensions"
                    >
                      {preformattedExtensions.map((o) => (
                        <RadioButton
                          key={o.extension}
                          id={o.extension}
                          value={o.extension}
                          labelText={`${o.extension} (${o.description})`}
                          data-modal-primary-focus
                        />
                      ))}
                    </RadioButtonGroup>
                  </FormGroup>
                ) : (
                  <div className={`${blockClass}__input-container`}>
                    {inputType === 'text' ? (
                      <TextInput {...commonInputProps} />
                    ) : (
                      <PasswordInput
                        {...commonInputProps}
                        showPasswordLabel={showPasswordLabel}
                        hidePasswordLabel={hidePasswordLabel}
                        tooltipPosition="left"
                      />
                    )}
                  </div>
                )}
              </>
            )}
            <div aria-live="polite" className={`${blockClass}__messaging`}>
              {loading && (
                <>
                  <Loading
                    aria-live="off"
                    description=""
                    small
                    withOverlay={false}
                  />
                  <p>{loadingMessage}</p>
                </>
              )}
              {successful && (
                <>
                  <CheckmarkFilled
                    size={16}
                    className={`${blockClass}__checkmark-icon`}
                  />
                  <p>{successMessage}</p>
                </>
              )}
              {error && (
                <>
                  <ErrorFilled
                    size={16}
                    className={`${blockClass}__error-icon`}
                  />
                  <p>{errorMessage}</p>
                </>
              )}
            </div>
          </ModalBody>
          {!submitted && (
            <ModalFooter className={`${blockClass}__footer`}>
              <Button type="button" kind="secondary" onClick={onClose}>
                {secondaryButtonText}
              </Button>
              <Button
                type="submit"
                kind="primary"
                onClick={onSubmitHandler}
                disabled={primaryButtonDisabled}
              >
                {primaryButtonText}
              </Button>
            </ModalFooter>
          )}
        </ComposedModal>
      </FeatureFlags>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

ExportModal.propTypes = {
  /**
   * Body content for the modal
   */
  /**@ts-ignore*/
  body: PropTypes.string,
  /**
   * Optional class name
   */
  className: PropTypes.string,
  /**
   * specify if an error occurred
   */
  error: PropTypes.bool,
  /**
   * messaging to display in the event of an error
   */
  errorMessage: PropTypes.string,
  /**
   * name of the file being exported
   */
  filename: PropTypes.string.isRequired,
  /**
   * label text that's displayed when hovering over visibility toggler to hide key
   */
  hidePasswordLabel: PropTypes.string,
  /**
   * label for the text input
   */
  inputLabel: PropTypes.string,
  /**
   * specify the type of text input
   */
  /**@ts-ignore */
  inputType: PropTypes.oneOf(['text', 'password']),
  /**
   * text for an invalid input
   */
  invalidInputText: PropTypes.string,
  /**
   * specify if the modal is in a loading state
   */
  loading: PropTypes.bool,
  /**
   * message to display during the loading state
   */
  loadingMessage: PropTypes.string,
  /**
   * Specify a handler for closing modal
   */
  onClose: PropTypes.func,
  /**
   * Specify a handler for "submitting" modal. Returns the file name
   */
  onRequestSubmit: PropTypes.func,
  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool,
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget: PropTypes.node,
  /**
   * Array of extensions to display as radio buttons
   */
  /**@ts-ignore */
  preformattedExtensions: PropTypes.arrayOf(
    PropTypes.shape({
      extension: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  /**
   * Label for the preformatted label form group
   */
  preformattedExtensionsLabel: PropTypes.string,
  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string.isRequired,
  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string.isRequired,
  /**
   * label text that's displayed when hovering over visibility toggler to show key
   */
  showPasswordLabel: PropTypes.string,
  /**
   * messaging to display if the export was successful
   */
  successMessage: PropTypes.string,
  /**
   * specify if the export was successful
   */
  successful: PropTypes.bool,
  /**
   * The text displayed at the top of the modal
   */
  title: PropTypes.string.isRequired,
  /**
   * Sets the trigger button ref
   */
  triggerButtonRef: PropTypes.any,
  /**
   * array of valid extensions the file can have
   */
  /**@ts-ignore */
  validExtensions: PropTypes.array,
};

ExportModal.displayName = componentName;
