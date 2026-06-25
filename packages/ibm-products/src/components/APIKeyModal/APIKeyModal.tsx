//
// Copyright IBM Corp. 2021, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  RefObject,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ComposedModal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  TextInput,
  PasswordInput,
  InlineLoading,
  Form,
  Button,
  unstable_FeatureFlags as FeatureFlags,
} from '@carbon/react';
import {
  InformationFilled,
  Copy,
  ErrorFilled,
  CheckmarkFilled,
} from '@carbon/react/icons';
import { APIKeyDownloader } from './APIKeyDownloader';
import { pkg } from '../../settings';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import uuidv4 from '../../global/js/utils/uuidv4';
import { APIKeyModalProps } from './APIKeyModal.types';
import { useFocus, usePreviousValue } from '../../global/js/hooks';

const componentName = 'APIKeyModal';

// Default values for props
const defaults = {
  apiKeyName: '',
  customSteps: [],
};

export const APIKeyModal: React.FC<APIKeyModalProps> = forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      apiKey,
      apiKeyLabel,
      apiKeyName = defaults.apiKeyName,
      body,
      className,
      closeButtonText,
      copyButtonText,
      copyErrorText,
      copyIconDescription,
      customSteps = defaults.customSteps,
      downloadBodyText,
      downloadFileName,
      downloadFileType,
      downloadLinkText,
      downloadLinkLabel = downloadLinkText,
      editButtonText,
      editSuccess,
      editSuccessTitle,
      editSuccessMessage,
      editing,
      error,
      errorText,
      generateButtonText,
      generateSuccessBody,
      generateSuccessTitle,
      generateSuccessMessage,
      generateTitle,
      hasAPIKeyVisibilityToggle,
      hasDownloadLink,
      hideAPIKeyLabel,
      launcherButtonRef,
      loading,
      loadingText,
      modalLabel,
      nameHelperText,
      nameLabel,
      namePlaceholder,
      nameRequired,
      nextStepButtonText,
      onClose,
      onCopy,
      onRequestEdit,
      onRequestGenerate,
      open,
      portalTarget: portalTargetIn,
      previousStepButtonText,
      showAPIKeyLabel,
      helperText,

      // Collect any other property values passed in.
      ...rest
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [title, setTitle] = useState<string | null | undefined>(null);
    const [successMessage, setSuccessMessage] = useState<
      string | null | undefined
    >(null);
    const [copyError, setCopyError] = useState(false);
    const [name, setName] = useState(apiKeyName);
    const [currentStep, setCurrentStep] = useState(0);
    const copyRef = useRef<HTMLButtonElement | undefined>(undefined);
    const apiKeyInputId = useRef(uuidv4());
    const nameInputId = useRef(uuidv4());
    const renderPortalUse = usePortalTarget(portalTargetIn);
    const hasSteps = Boolean(customSteps.length);
    const apiKeyLoaded = apiKey && !loading;
    const hasNextStep = hasSteps && currentStep < customSteps.length - 1;
    const hasPreviousStep = hasSteps && currentStep !== 0;
    const copyButtonProps = {
      renderIcon: (props) => <Copy size={16} {...props} />,
      iconDescription: copyIconDescription,
      ref: copyRef,
    };
    const blockClass = `${pkg.prefix}--apikey-modal`;
    const localRef = useRef(undefined);
    const PasswordInputRef = useRef<HTMLElement | null>(null);
    const modalRef = (ref || localRef) as RefObject<HTMLDivElement>;
    const { firstElement, keyDownListener, claimFocus } = useFocus(modalRef);
    const prevOpen = usePreviousValue(open);

    useEffect(() => {
      if (copyRef.current && open && apiKeyLoaded) {
        copyRef.current.focus();
      }
      if (PasswordInputRef?.current) {
        PasswordInputRef?.current.setAttribute('readOnly', 'true');
      }
    }, [open, apiKeyLoaded]);

    useEffect(() => {
      if (open) {
        // Focusing the first element or selectorPrimaryFocus element
        setTimeout(() => claimFocus(), 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalRef, open, firstElement]);

    useEffect(() => {
      if (prevOpen && !open && launcherButtonRef) {
        setTimeout(() => {
          launcherButtonRef.current.focus();
        }, 0);
      }
    }, [launcherButtonRef, open, prevOpen]);

    const isPrimaryButtonDisabled = () => {
      if (loading) {
        return true;
      }
      if (hasSteps && 'valid' in (customSteps?.[currentStep] || [])) {
        return !customSteps[currentStep]?.valid;
      }
      if (!hasSteps && nameRequired && !name) {
        return true;
      }
      return false;
    };

    const getPrimaryButtonText = () => {
      if (hasNextStep) {
        return nextStepButtonText;
      }
      if (apiKeyLoaded) {
        return copyButtonText;
      }
      if (editing) {
        return editButtonText;
      }
      return generateButtonText;
    };

    const getSecondaryButtonText = () => {
      if (hasPreviousStep && !apiKeyLoaded) {
        return previousStepButtonText;
      }
      return closeButtonText;
    };

    useEffect(() => {
      if (editing && editSuccess) {
        setTitle(generateTitle);
        setSuccessMessage(editSuccessMessage ?? editSuccessTitle);
      } else if (apiKeyLoaded) {
        setTitle(generateTitle);
        setSuccessMessage(generateSuccessMessage ?? generateSuccessTitle);
      } else if (hasSteps) {
        setTitle(customSteps[currentStep]?.title);
      } else {
        setTitle(generateTitle);
      }
    }, [
      apiKeyLoaded,
      loading,
      editing,
      editSuccess,
      editSuccessTitle,
      editSuccessMessage,
      hasSteps,
      generateSuccessTitle,
      generateSuccessMessage,
      generateTitle,
      currentStep,
      customSteps,
    ]);

    const setNameHandler = (evt) => {
      setName(evt.target.value);
    };

    const onCloseHandler = () => {
      setName('');
      setCurrentStep(0);
      onClose?.();
    };

    const submitHandler = async (e) => {
      e.preventDefault();
      if (hasNextStep) {
        setCurrentStep(currentStep + 1);
      } else if (apiKeyLoaded) {
        if (onCopy) {
          onCopy(apiKey);
        } else {
          try {
            await navigator.clipboard.writeText(apiKey);
          } catch (e) {
            console.error(e);
            setCopyError(true);
          }
        }
      } else if (editing) {
        onRequestEdit?.(name);
      } else {
        onRequestGenerate?.(name);
      }
    };

    const onBackHandler = () => {
      if (hasPreviousStep && !apiKeyLoaded) {
        setCurrentStep(currentStep - 1);
      } else {
        onCloseHandler();
      }
    };

    return renderPortalUse(
      <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
        <ComposedModal
          {...rest}
          {...{ open, ...getDevtoolsProps(componentName) }}
          ref={modalRef}
          onKeyDown={keyDownListener}
          className={cx(className, blockClass)}
          onClose={onCloseHandler}
          size="sm"
          aria-label={modalLabel}
          preventCloseOnClickOutside
        >
          <ModalHeader
            className={`${blockClass}__header`}
            title={title}
            label={modalLabel}
          />
          <ModalBody className={`${blockClass}__body-container`}>
            {hasSteps && !apiKeyLoaded ? (
              customSteps[currentStep]?.content
            ) : (
              <>
                {body && <p className={`${blockClass}__body`}>{body}</p>}
                {!editing && apiKey && hasAPIKeyVisibilityToggle && (
                  <PasswordInput
                    value={apiKey}
                    labelText={apiKeyLabel}
                    id={apiKeyInputId.current}
                    showPasswordLabel={showAPIKeyLabel}
                    hidePasswordLabel={hideAPIKeyLabel}
                    tooltipPosition="left"
                    helperText={helperText}
                    ref={PasswordInputRef}
                  />
                )}
                {!editing && apiKey && !hasAPIKeyVisibilityToggle && (
                  <TextInput
                    value={apiKey}
                    labelText={apiKeyLabel}
                    id={apiKeyInputId.current}
                  />
                )}
                {(editing || (!apiKeyLoaded && nameRequired)) && (
                  <Form
                    onSubmit={submitHandler}
                    aria-label={title ?? undefined}
                  >
                    <TextInput
                      helperText={nameHelperText}
                      placeholder={namePlaceholder}
                      labelText={nameLabel}
                      onChange={setNameHandler}
                      value={name}
                      id={nameInputId.current}
                      disabled={loading}
                      required={nameRequired}
                      data-modal-primary-focus
                    />
                  </Form>
                )}
                {loading && (
                  <InlineLoading
                    description={loadingText}
                    className={`${blockClass}__loader`}
                  />
                )}
                {(copyError || error) && (
                  <div className={`${blockClass}__messaging`}>
                    <div className={`${blockClass}__error-icon`}>
                      <ErrorFilled size={16} />
                    </div>
                    <p
                      className={`${blockClass}__messaging-text`}
                      role="alert"
                      aria-live="assertive"
                    >
                      {copyError ? copyErrorText : errorText}
                    </p>
                  </div>
                )}
                {apiKeyLoaded && (
                  <div className={`${blockClass}__messaging`}>
                    <InformationFilled size={16} />
                    {hasDownloadLink ? (
                      <APIKeyDownloader
                        apiKey={apiKey}
                        body={downloadBodyText}
                        fileName={downloadFileName}
                        linkText={downloadLinkText}
                        fileType={downloadFileType}
                        downloadLinkLabel={downloadLinkLabel}
                      />
                    ) : (
                      <div
                        className={`${blockClass}__messaging-text`}
                        role="alert"
                        aria-live="assertive"
                      >
                        {generateSuccessBody}
                      </div>
                    )}
                  </div>
                )}

                {(editSuccess || (apiKeyLoaded && successMessage)) && (
                  <div className={`${blockClass}__messaging`}>
                    <CheckmarkFilled
                      size={16}
                      className={`${blockClass}__checkmark-icon`}
                    />
                    <p
                      className={`${blockClass}__messaging-text`}
                      role="alert"
                      aria-live="assertive"
                    >
                      {successMessage}
                    </p>
                  </div>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter className={`${blockClass}__footer`}>
            <Button type="button" kind="secondary" onClick={onBackHandler}>
              {getSecondaryButtonText()}
            </Button>
            <Button
              {...(apiKeyLoaded && copyButtonProps)}
              type="submit"
              kind="primary"
              onClick={submitHandler}
              disabled={isPrimaryButtonDisabled()}
            >
              {getPrimaryButtonText()}
            </Button>
          </ModalFooter>
        </ComposedModal>
      </FeatureFlags>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

export const deprecatedProps = {
  /**
   * deprecated
   * title for a successful edit
   */
  editSuccessTitle: PropTypes.string,

  /**
   * deprecated
   * title for a successful key generation
   */
  generateSuccessTitle: PropTypes.string,
};

APIKeyModal.propTypes = {
  /**
   * the api key that's displayed to the user when a request to create is fulfilled.
   */
  apiKey: PropTypes.string,
  /**
   * label for the text input that holds the api key.
   */
  apiKeyLabel: PropTypes.string,
  /**
   * the name of the api key. should only be supplied in edit mode.
   */
  apiKeyName: PropTypes.string,
  /**
   * body content for the modal
   */
  body: PropTypes.string,
  /**
   * optional class name
   */
  className: PropTypes.string,
  /**
   * text for the close button
   */
  closeButtonText: PropTypes.string,
  /**
   * text for the copy button
   */
  copyButtonText: PropTypes.string,
  /**
   * Error message for when the copy function fails
   */
  copyErrorText: PropTypes.string,
  /**
   * text description for the copy button icon
   */
  copyIconDescription: PropTypes.string,
  /**
   * if you need more options for key creation beyond just the name use custom steps to obtain whatever data is required.
   */
  /**@ts-ignore*/
  customSteps: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * designates if the step has passed whatever validation rules are in place.
       */
      valid: PropTypes.bool,
      /**
       * designates content is the JSX that holds whatever inputs you need
       */
      content: PropTypes.node,
      /**
       * designates the title that's displayed at the top of the modal for each step
       */
      title: PropTypes.string,
    })
  ),
  /**
   * the content that appears that indicates the key is downloadable
   */
  downloadBodyText: PropTypes.string,
  /**
   * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
   */
  downloadFileName: PropTypes.string,
  /**
   * designates the file type for the downloadable key
   */
  downloadFileType: PropTypes.oneOf(['txt', 'json']),
  /**
   * aria-label for the download link
   */
  downloadLinkLabel: PropTypes.string,
  /**
   * anchor text for the download link
   */
  downloadLinkText: PropTypes.string,
  /**
   * text for the edit button
   */
  editButtonText: PropTypes.string,
  /**
   * designates if the edit request was successful
   */
  editSuccess: PropTypes.bool,
  /**
   * title for a successful edit
   */
  editSuccessMessage: PropTypes.string,
  /**
   * designates if the modal is in the edit mode
   */
  editing: PropTypes.bool,
  /**
   * designates if an error has occurred in a request
   */
  error: PropTypes.bool,
  /**
   * text to display if an error has occurred
   */
  errorText: PropTypes.string,
  /**
   * default primary button text for modal in assumed default mode create or generate.
   * in create mode this is the button text prior to supplying an api key, which then
   * uses copyButtonText
   */
  generateButtonText: PropTypes.string,
  /**
   * content to display if generate request was successful
   */
  generateSuccessBody: PropTypes.node,
  /**
   * title for a successful key generation
   */
  generateSuccessMessage: PropTypes.string,
  /**
   * default title for the modal in generate key mode
   */
  generateTitle: PropTypes.string,
  /**
   * designates if the api input has the visibility toggle enabled
   */
  hasAPIKeyVisibilityToggle: PropTypes.bool,
  /**
   * designates if user is able to download the api key
   */
  hasDownloadLink: PropTypes.bool,
  /**
   * helper text for password input
   */
  helperText: PropTypes.string,
  /**
   * label text that's displayed when hovering over visibility toggler to hide key
   */
  hideAPIKeyLabel: PropTypes.string,
  /**
   * Provide a ref to return focus to once the tearsheet is closed.
   */
  /**@ts-ignore */
  launcherButtonRef: PropTypes.any,
  /**
   * designates if the modal is in a loading state via a request or some other in progress operation
   */
  loading: PropTypes.bool,
  /**
   * text that displays while modal is in the loading state
   */
  loadingText: PropTypes.string,
  /**
   * general label text for modal
   */
  modalLabel: PropTypes.string,
  /**
   * helper text for name input
   */
  nameHelperText: PropTypes.string,
  /**
   * label for api key name input
   */
  nameLabel: PropTypes.string,
  /**
   * placeholder text for api key name input
   */
  namePlaceholder: PropTypes.string,
  /**
   * designates if a name is required or not for key generation. NOTE- if using custom steps set this to false since you will be using your own validation
   */
  nameRequired: PropTypes.bool,
  /**
   * text that displays in the primary button when using custom steps to indicate to the user that there is a next step
   */
  nextStepButtonText: PropTypes.string,
  /**
   * handler for on modal close
   */
  onClose: PropTypes.func,
  /**
   * Optional callback if you want to use your own copy function instead of the build in one
   * onCopy(apiKey)
   */
  onCopy: PropTypes.func,
  /**
   * handler for api key edit
   */
  onRequestEdit: PropTypes.func,
  /**
   * handler for api key generation
   */
  onRequestGenerate: PropTypes.func,
  /**
   * designates if modal is open or closed
   */
  open: PropTypes.bool.isRequired,
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget: PropTypes.node,
  /**
   * text that displays in the secondary button when using custom steps to indicate to the user that there is a previous step
   */
  previousStepButtonText: PropTypes.string,
  /**
   * label text that's displayed when hovering over visibility toggler to show key
   */
  showAPIKeyLabel: PropTypes.string,

  ...deprecatedProps,
};

APIKeyModal.displayName = componentName;
