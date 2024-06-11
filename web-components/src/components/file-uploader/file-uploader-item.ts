/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import Close16 from '@carbon/icons/lib/close/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import { prefix } from '../../globals/settings';
import { LOADING_TYPE } from '../loading/loading';
import { FILE_UPLOADER_ITEM_SIZE, FILE_UPLOADER_ITEM_STATE } from './defs';
import styles from './file-uploader.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { FILE_UPLOADER_ITEM_SIZE, FILE_UPLOADER_ITEM_STATE };

/**
 * File uploader item.
 *
 * @element cds-file-uploader-item
 * @slot validity-message The validity message.
 * @slot validity-message-supplement The supplemental validity message.
 * @fires cds-file-uploader-item-beingdeleted
 *   The custom event fired before this file uploader item is being deleted upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of deleting this file uploader item.
 * @fires cds-file-uploader-item-deleted - The custom event fired after this file uploader item is deleted upon a user gesture.
 */
@customElement(`${prefix}-file-uploader-item`)
class CDSFileUploaderItem extends LitElement {
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
      .constructor as typeof CDSFileUploaderItem;
    if (this.dispatchEvent(new CustomEvent(eventBeforeDelete, init))) {
      this.dispatchEvent(new CustomEvent(eventDelete, init));
    }
  }

  /**
   * @returns The content showing the editing UI of this file uploader item.
   */
  private _renderEditing() {
    const {
      iconDescription,
      invalid,
      _handleClickDeleteButton: handleClickDeleteButton,
    } = this;
    return html`
      ${!invalid
        ? undefined
        : WarningFilled16({ class: `${prefix}--file-invalid` })}
      <button
        type="button"
        aria-label="${iconDescription}"
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
    const { iconDescription } = this;
    return html`
      <cds-loading
        assistive-text="${iconDescription}"
        type="${LOADING_TYPE.SMALL}"></cds-loading>
    `;
  }

  /**
   * @returns The content showing this file uploader's file uploading status as complete.
   */
  private _renderUploaded() {
    const { iconDescription } = this;
    return CheckmarkFilled16({
      class: `${prefix}--file-complete`,
      'aria-label': iconDescription,
    });
  }

  /**
   * @returns The content showing this file uploader's status.
   */
  private _renderStatus() {
    const { state } = this;
    switch (state) {
      case FILE_UPLOADER_ITEM_STATE.EDIT:
        return this._renderEditing();
      case FILE_UPLOADER_ITEM_STATE.UPLOADING:
        return this._renderUploading();
      case FILE_UPLOADER_ITEM_STATE.COMPLETE:
        return this._renderUploaded();
      default:
        return undefined;
    }
  }

  /**
   * The `aria-label` attribute for the icon to delete this file uploader item.
   */
  @property({ attribute: 'icon-description' })
  iconDescription = 'Delete this file';

  /**
   * Controls the invalid state and visibility of the `validityMessage`.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * The size of this file uploader item.
   */
  @property({ reflect: true })
  size = FILE_UPLOADER_ITEM_SIZE.MEDIUM;

  /**
   * The state of this file uploader item.
   */
  @property({ reflect: true })
  state = FILE_UPLOADER_ITEM_STATE.UPLOADING;

  /**
   * The error subject text.
   */
  @property({ attribute: 'error-subject' })
  errorSubject = '';

  /**
   * The error body text
   */
  @property({ attribute: 'error-body' })
  errorBody = '';

  render() {
    const { invalid, errorSubject, errorBody } = this;
    return html` <p class="${prefix}--file-filename"><slot></slot></p>
      <span class="${prefix}--file__state-container"
        >${this._renderStatus()}</span
      >
      <div
        class="${prefix}--form-requirement"
        ?hidden="${!invalid && !errorSubject}">
        <div class="${prefix}--form-requirement__title">${errorSubject}</div>
        <p
          class="${prefix}--form-requirement__supplement"
          ?hidden="${!errorBody}">
          ${errorBody}
        </p>
      </div>`;
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

export default CDSFileUploaderItem;
