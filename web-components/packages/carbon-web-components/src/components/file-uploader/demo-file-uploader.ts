/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement, customElement } from 'lit-element';

import { delay } from 'bluebird';
import { prefix } from '../../globals/settings';
import { ifDefined } from 'lit/directives/if-defined';
import './file-uploader';
import './drop-container';
import {
  FILE_UPLOADER_ITEM_SIZE,
  FILE_UPLOADER_ITEM_STATE,
} from './file-uploader-item';
import { FileData } from './stories/types';

/**
 * A class to manage file uploading states, like sending file contents to server.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in file uploading tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
@customElement(`${prefix}-ce-demo-file-uploader`)
export default class BXCEDemoFileUploader extends LitElement {
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
              state: FILE_UPLOADER_ITEM_STATE.EDITING,
              invalid: true,
              validityMessage: 'File size exceeds limit',
              supplementalValidityMessage:
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
              state: FILE_UPLOADER_ITEM_STATE.UPLOADED,
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
              state: FILE_UPLOADER_ITEM_STATE.EDITING,
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
  disabled = false;

  /**
   * The helper text.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * `true` if the drop container should accept more than one files at once.
   * Note that even with `false` set here, user _can_ select multiple files one by one.
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * The size of the file uploader items.
   */
  @property({ reflect: true })
  size = FILE_UPLOADER_ITEM_SIZE.REGULAR;

  render() {
    const {
      accept,
      disabled,
      helperText,
      labelText,
      multiple,
      size,
      _files: files,
      _handleChange: handleChange,
      _handleDelete: handleDelete,
    } = this;
    return html`
      <cds-file-uploader
        helper-text="${ifDefined(helperText)}"
        label-text="${ifDefined(labelText)}">
        <cds-file-drop-container
          accept="${ifDefined(accept)}"
          ?disabled="${disabled}"
          ?multiple="${multiple}"
          @cds-file-drop-container-changed="${handleChange}">
          Drag and drop files here or click to upload
        </cds-file-drop-container>
        ${files.map(
          ({
            id,
            invalid,
            file,
            state,
            supplementalValidityMessage,
            validityMessage,
          }) => html`
            <cds-file-uploader-item
              data-file-id="${id}"
              ?invalid="${invalid}"
              size="${ifDefined(size)}"
              state="${ifDefined(state)}"
              validity-message="${ifDefined(validityMessage)}"
              @cds-file-uploader-item-deleted="${handleDelete}">
              ${file.name}
              <span slot="validity-message-supplement"
                >${supplementalValidityMessage}</span
              >
            </cds-file-uploader-item>
          `
        )}
      </cds-file-uploader>
    `;
  }
}
