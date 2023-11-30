/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { delay } from 'bluebird';
import { prefix } from '../../globals/settings';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import { FILE_UPLOADER_ITEM_STATE } from './file-uploader-item';
import { BUTTON_SIZE } from '../button/button';
import { FileData } from './stories/types';

/**
 * A class to manage file uploading states, like sending file contents to server.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in file uploading tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
@customElement(`${prefix}-ce-demo-file-uploader`)
export default class CDSCEDemoFileUploader extends LitElement {
  /**
   * The files being uploaded.
   */
  private _files: FileData[] = [];

  /**
   * Handles `cds-drop-container-changed` on `<cds-file-drop-container>`.
   *
   * @param event The event.
   */
  private _handleChange(event: CustomEvent) {
    const { addedFiles } = event.detail;
    const newFiles: FileData[] = addedFiles.map(
      (item) =>
        ({
          id: Math.random().toString(36).slice(2),
          file: item,
          state: FILE_UPLOADER_ITEM_STATE.UPLOADING,
        } as FileData)
    );
    const { multiple, _files: files, _simulateUpload: simulateUpload } = this;
    if (multiple) {
      this._files = files.concat(newFiles);
      this.requestUpdate();
      newFiles.forEach(simulateUpload, this);
    } else if (addedFiles.length > 0) {
      this._files = files.concat(newFiles[0]);
      this.requestUpdate();
      this._simulateUpload(newFiles[0]);
    }
  }

  /**
   * Handles `cds-file-uploader-item-deleted` on `<cds-file-uploader-item>`.
   *
   * @param event The event.
   */
  private _handleDelete(event: CustomEvent) {
    const { fileId: idToDelete } = (event.target as HTMLElement).dataset;
    this._files = this._files.filter(({ id }) => idToDelete !== id);
    this.requestUpdate();
  }

  /**
   * Simulates updating file.
   *
   * @param data The data of the file being uploaded.
   */
  private async _simulateUpload(data: FileData) {
    const { id, file } = data;
    if (file.size > 524288) {
      this._files = this._files.map((item) =>
        id !== item.id
          ? item
          : {
              ...item,
              state: FILE_UPLOADER_ITEM_STATE.EDIT,
              invalid: true,
              errorSubject: 'File size exceeds limit',
              errorBody:
                '500kb max file size. Select a new file and try again.',
            }
      );
      this.requestUpdate();
    } else {
      // Simulates network request time
      const rand = Math.random() * 1000;
      await delay(rand);
      this._files = this._files.map((item) =>
        id !== item.id
          ? item
          : {
              ...item,
              state: FILE_UPLOADER_ITEM_STATE.COMPLETE,
            }
      );
      this.requestUpdate();
      // Shows x icon after 1 second
      await delay(1000);
      this._files = this._files.map((item) =>
        id !== item.id
          ? item
          : {
              ...item,
              state: FILE_UPLOADER_ITEM_STATE.EDIT,
            }
      );
      this.requestUpdate();
    }
  }

  /**
   * The file types the file input should accept, separated by space.
   */
  @property()
  accept = '';

  /**
   * `true` if the drop container should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  button = false;

  /**
   * Button kind.
   */
  @property({ attribute: 'button-kind' })
  buttonKind = 'primary';

  /**
   * Button label.
   */
  @property({ attribute: 'button-label' })
  buttonLabel = 'Add file';

  /**
   * `true` if the drop container should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Icon description.
   */
  @property({ attribute: 'icon-description' })
  iconDescription = '';

  /**
   * The input name.
   */
  @property({ attribute: 'input-name' })
  inputName = '';

  /**
   * The label description text.
   */
  @property({ attribute: 'label-description' })
  labelDescription = '';

  /**
   * The label title.
   */
  @property({ attribute: 'label-title' })
  labelTitle = '';

  /**
   * `true` if the drop container should accept more than one files at once.
   * Note that even with `false` set here, user _can_ select multiple files one by one.
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * The size of the button item.
   */
  @property({ reflect: true })
  size = BUTTON_SIZE.MEDIUM;

  /**
   * The state of this file uploader item.
   */
  @property({ reflect: true, attribute: 'input-state' })
  inputState = '';

  render() {
    const {
      accept,
      button,
      buttonKind,
      buttonLabel,
      disabled,
      labelDescription,
      labelTitle,
      multiple,
      size,
      inputState,
      iconDescription,
      _files: files,
      _handleChange: handleChange,
      _handleDelete: handleDelete,
    } = this;
    return html`
      <cds-file-uploader
        label-description="${ifDefined(labelDescription)}"
        label-title="${ifDefined(labelTitle)}"
        ?disabled="${disabled}">
        ${!button
          ? html` <cds-file-uploader-drop-container
              accept="${ifDefined(accept)}"
              ?multiple="${multiple}"
              name="${ifDefined(this.inputName)}"
              @cds-file-uploader-drop-container-changed="${handleChange}">
              Drag and drop files here or click to upload
            </cds-file-uploader-drop-container>`
          : html` <cds-file-uploader-button
              size="${ifDefined(size)}"
              button-kind="${buttonKind}"
              accept="${ifDefined(accept)}"
              name="${ifDefined(this.inputName)}"
              ?multiple="${multiple}"
              @cds-file-uploader-button-changed="${handleChange}">
              ${buttonLabel}
            </cds-file-uploader-button>`}
        ${files.map(
          ({ id, invalid, file, state, errorSubject, errorBody }) => html`
            <cds-file-uploader-item
              data-file-id="${id}"
              ?invalid="${invalid}"
              state="${inputState || ifDefined(state)}"
              icon-description="${ifDefined(iconDescription)}"
              error-subject="${ifDefined(errorSubject)}"
              error-body="${ifDefined(errorBody)}"
              @cds-file-uploader-item-deleted="${handleDelete}">
              ${file.name}
            </cds-file-uploader-item>
          `
        )}
      </cds-file-uploader>
    `;
  }
}
