/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode, RefObject } from 'react';

interface APIKeyModalCommonProps {
  /**
   * the api key that's displayed to the user when a request to create is fulfilled.
   */
  apiKey?: string;
  /**
   * label for the text input that holds the api key.
   */
  apiKeyLabel?: string;
  /**
   * the name of the api key. should only be supplied in edit mode.
   */
  apiKeyName?: string;
  /**
   * body content for the modal
   */
  body?: string;
  /**
   * optional class name
   */
  className?: string;
  /**
   * text for the close button
   */
  closeButtonText?: string;
  /**
   * text for the copy button
   */
  copyButtonText?: string;
  /**
   * Error message for when the copy function fails
   */
  copyErrorText?: string;
  /**
   * text description for the copy button icon
   */
  copyIconDescription?: string;
  /**
   * if you need more options for key creation beyond just the name use custom steps to obtain whatever data is required.
   */
  customSteps?: Array<{
    valid?: boolean;
    content?: ReactNode;
    title?: string;
  }>;
  /**
   * designates if the modal is in the edit mode
   */
  editing?: boolean;
  /**
   * designates if an error has occurred in a request
   */
  error?: boolean;
  /**
   * text to display if an error has occurred
   */
  errorText?: string;
  /**
   * default primary button text for modal in assumed default mode create or generate.
   * in create mode this is the button text prior to supplying an api key, which then
   * uses copyButtonText
   */
  generateButtonText?: string;
  /**
   * content to display if generate request was successful
   */
  generateSuccessBody?: ReactNode;
  /**
   * * @deprecated use `generateSuccessMessage` instead
   * title for a successful key generation
   */
  generateSuccessTitle?: string;
  /**
   * success message for a successful key generation
   */
  generateSuccessMessage?: string;
  /**
   * default title for the modal in generate key mode
   */
  generateTitle?: string;
  /**
   * designates if the api input has the visibility toggle enabled
   */
  hasAPIKeyVisibilityToggle?: boolean;
  /**
   * designates if user is able to download the api key
   */
  hasDownloadLink?: boolean;
  /**
   * label text that's displayed when hovering over visibility toggler to hide key
   */
  hideAPIKeyLabel?: string;
  /**
   * Provide a ref to return focus to once the tearsheet is closed.
   */
  launcherButtonRef?: RefObject<any>;
  /**
   * designates if the modal is in a loading state via a request or some other in progress operation
   */
  loading?: boolean;
  /**
   * text that displays while modal is in the loading state
   */
  loadingText?: string;
  /**
   * general label text for modal
   */
  modalLabel?: string;
  /**
   * helper text for name input
   */
  nameHelperText?: string;
  /**
   * label for api key name input
   */
  nameLabel?: string;
  /**
   * placeholder text for api key name input
   */
  namePlaceholder?: string;
  /**
   * designates if a name is required or not for key generation. NOTE- if using custom steps set this to false since you will be using your own validation
   */
  nameRequired?: boolean;
  /**
   * handler for on modal close
   */
  onClose?(): void;
  /**
   * Optional callback if you want to use your own copy function instead of the build in one
   * onCopy(apiKey)
   */
  onCopy?(apiKey: string): void;
  /**
   * handler for api key edit
   */
  onRequestEdit?(apiKeyName: string): void;
  /**
   * handler for api key generation
   */
  onRequestGenerate?(apiKeyName: string): void;
  /**
   * designates if modal is open or closed
   */
  open: boolean;
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget?: ReactNode;
  /**
   * label text that's displayed when hovering over visibility toggler to show key
   */
  showAPIKeyLabel?: string;
  /**
   * helper text for password input
   */
  helperText?: string;
}

type CustomStepConditionalProps = {
  /**
   * if you need more options for key creation beyond just the name use custom steps to obtain whatever data is required.
   */
  customSteps?: Array<{
    valid?: boolean;
    content?: ReactNode;
    title?: string;
  }>;
  /**
   * text that displays in the secondary button when using custom steps to indicate to the user that there is a previous step
   */
  previousStepButtonText: string;
  /**
   * text that displays in the primary button when using custom steps to indicate to the user that there is a next step
   */
  nextStepButtonText: string;
};

type EditingConditionalProps = {
  /**
   * designates if the modal is in the edit mode
   */
  editing?: boolean;
  /**
   * text for the edit button
   */
  editButtonText: string;
  /**
   * designates if the edit request was successful
   */
  editSuccess: boolean;
  /**
   * * @deprecated use `editSuccessMessage` instead
   * title for a successful edit
   */
  editSuccessTitle?: string;
  /**
   * success message for edit
   */
  editSuccessMessage: string;
};

type HasDownloadLinkProps = {
  /**
   * designates if user is able to download the api key
   */
  hasDownloadLink?: boolean;
  /**
   * the content that appears that indicates the key is downloadable
   */
  downloadBodyText?: string;
  /**
   * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
   */
  downloadFileName: string;
  /**
   * designates the file type for the downloadable key
   */
  downloadFileType: 'txt' | 'json';
  /**
   * anchor text for the download link
   */
  downloadLinkText: string;
  /**
   * Aria-label for the download link
   */
  downloadLinkLabel?: string;
};

export type APIKeyModalProps = APIKeyModalCommonProps &
  CustomStepConditionalProps &
  EditingConditionalProps &
  HasDownloadLinkProps;
