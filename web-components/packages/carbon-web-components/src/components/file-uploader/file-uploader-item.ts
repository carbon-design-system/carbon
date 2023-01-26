/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import Close16 from '@carbon/icons/lib/close/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import settings from 'carbon-components/es/globals/js/settings';
import { LOADING_TYPE } from '../loading/loading';
import { FILE_UPLOADER_ITEM_SIZE, FILE_UPLOADER_ITEM_STATE } from './defs';
import styles from './file-uploader.scss';

export { FILE_UPLOADER_ITEM_SIZE, FILE_UPLOADER_ITEM_STATE };

const { prefix } = settings;

/**
 * File uploader item.
 *
 * @element bx-file-uploader-item
 * @slot validity-message The validity message.
 * @slot validity-message-supplement The supplemental validity message.
 * @fires bx-file-uploader-item-beingdeleted
 *   The custom event fired before this file uploader item is being deleted upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of deleting this file uploader item.
 * @fires bx-file-uploader-item-deleted - The custom event fired after this file uploader item is deleted upon a user gesture.
 */
@customElement(`${prefix}-file-uploader-item`)
class BXFileUploaderItem extends LitElement {
  /**
   * Handles `click` event on the delete button.
   */
  private _handleClickDeleteButton() {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
    };
    const { eventBeforeDelete, eventDelete } = this
      .constructor as typeof BXFileUploaderItem;
    if (this.dispatchEvent(new CustomEvent(eventBeforeDelete, init))) {
      this.dispatchEvent(new CustomEvent(eventDelete, init));
    }
  }

  /**
   * @returns The content showing the editing UI of this file uploader item.
   */
  private _renderEditing() {
    const {
      deleteAssistiveText,
      invalid,
      _handleClickDeleteButton: handleClickDeleteButton,
    } = this;
    return html`
      ${!invalid
        ? undefined
        : WarningFilled16({ class: `${prefix}--file-invalid` })}
      <button
        type="button"
        aria-label="${deleteAssistiveText}"
        class="${prefix}--file-close"
        @click="${handleClickDeleteButton}">
        ${Close16()}
      </button>
    `;
  }

  /**
   * @returns The content showing this file uploader's file uploading status as in progress.
   */
  private _renderUploading() {
    const { uploadingAssistiveText } = this;
    return html`
      <bx-loading
        assistive-text="${uploadingAssistiveText}"
        type="${LOADING_TYPE.SMALL}"></bx-loading>
    `;
  }

  /**
   * @returns The content showing this file uploader's file uploading status as complete.
   */
  private _renderUploaded() {
    const { uploadedAssistiveText } = this;
    return CheckmarkFilled16({
      class: `${prefix}--file-complete`,
      'aria-label': uploadedAssistiveText,
    });
  }

  /**
   * @returns The content showing this file uploader's status.
   */
  private _renderStatus() {
    const { state } = this;
    switch (state) {
      case FILE_UPLOADER_ITEM_STATE.EDITING:
        return this._renderEditing();
      case FILE_UPLOADER_ITEM_STATE.UPLOADING:
        return this._renderUploading();
      case FILE_UPLOADER_ITEM_STATE.UPLOADED:
        return this._renderUploaded();
      default:
        return undefined;
    }
  }

  /**
   * The `aria-label` attribute for the icon to delete this file uploader item.
   */
  @property({ attribute: 'delete-assistive-text' })
  deleteAssistiveText = 'Delete this file';

  /**
   * Controls the invalid state and visibility of the `validityMessage`.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * The size of this file uploader item.
   */
  @property({ reflect: true })
  size = FILE_UPLOADER_ITEM_SIZE.REGULAR;

  /**
   * The state of this file uploader item.
   */
  @property({ reflect: true })
  state = FILE_UPLOADER_ITEM_STATE.UPLOADING;

  /**
   * The `aria-label` attribute for the icon to indicate file uploading is in progress.
   */
  @property({ attribute: 'uploading-assistive-text' })
  uploadingAssistiveText = 'Uploading';

  /**
   * The `aria-label` attribute for the icon to indicate file uploading is complete.
   */
  @property({ attribute: 'uploaded-assistive-text' })
  uploadedAssistiveText = 'Uploaded';

  /**
   * The validity message.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  render() {
    const { validityMessage } = this;
    return html`
      <p class="${prefix}--file-filename"><slot></slot></p>
      <span class="${prefix}--file__state-container"
        >${this._renderStatus()}</span
      >
      <div class="${prefix}--form-requirement">
        <div class="${prefix}--form-requirement__title">
          <slot name="validity-message">${validityMessage}</slot>
        </div>
        <p class="${prefix}--form-requirement__supplement">
          <slot name="validity-message-supplement"></slot>
        </p>
      </div>
    `;
  }

  /**
   * The name of the custom event fired before this file uplodaer item is being deleted upon a user gesture.
   * Cancellation of this event stops the user-initiated action of deleting this file uploader item.
   */
  static get eventBeforeDelete() {
    return `${prefix}-file-uploader-item-beingdeleted`;
  }

  /**
   * The name of the custom event fired after this file uplodaer item is deleted upon a user gesture.
   */
  static get eventDelete() {
    return `${prefix}-file-uploader-item-deleted`;
  }

  static styles = styles;
}

export default BXFileUploaderItem;
