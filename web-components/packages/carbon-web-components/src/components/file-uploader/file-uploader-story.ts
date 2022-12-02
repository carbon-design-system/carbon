/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import { delay } from 'bluebird';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import './file-uploader';
import './drop-container';
import {
  FILE_UPLOADER_ITEM_SIZE,
  FILE_UPLOADER_ITEM_STATE,
} from './file-uploader-item';
import textNullable from '../../../.storybook/knob-text-nullable';
import { FileData } from './stories/types';
import storyDocs from './file-uploader-story.mdx';

const sizes = {
  'Regular size': null,
  [`Small size (${FILE_UPLOADER_ITEM_SIZE.SMALL})`]:
    FILE_UPLOADER_ITEM_SIZE.SMALL,
  [`Size for form field (${FILE_UPLOADER_ITEM_SIZE.FIELD})`]:
    FILE_UPLOADER_ITEM_SIZE.FIELD,
};

/**
 * A class to manage file uploading states, like sending file contents to server.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in file uploading tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
class BXCEDemoFileUploader extends LitElement {
  /**
   * The files being uploaded.
   */
  private _files: FileData[] = [];

  /**
   * Handles `bx-drop-container-changed` on `<bx-file-drop-container>`.
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
   * Handles `bx-file-uploader-item-deleted` on `<bx-file-uploader-item>`.
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
      <bx-file-uploader
        helper-text="${ifNonNull(helperText)}"
        label-text="${ifNonNull(labelText)}">
        <bx-file-drop-container
          accept="${ifNonNull(accept)}"
          ?disabled="${disabled}"
          ?multiple="${multiple}"
          @bx-file-drop-container-changed="${handleChange}">
          Drag and drop files here or click to upload
        </bx-file-drop-container>
        ${files.map(
          ({
            id,
            invalid,
            file,
            state,
            supplementalValidityMessage,
            validityMessage,
          }) => html`
            <bx-file-uploader-item
              data-file-id="${id}"
              ?invalid="${invalid}"
              size="${ifNonNull(size)}"
              state="${ifNonNull(state)}"
              validity-message="${ifNonNull(validityMessage)}"
              @bx-file-uploader-item-deleted="${handleDelete}">
              ${file.name}
              <span slot="validity-message-supplement"
                >${supplementalValidityMessage}</span
              >
            </bx-file-uploader-item>
          `
        )}
      </bx-file-uploader>
    `;
  }
}

const defineDemoFileUploader = (() => {
  let hasDemoFileUploaderDefined;
  return () => {
    if (!hasDemoFileUploaderDefined) {
      hasDemoFileUploaderDefined = true;
      const ce = customElements;
      // Prevents `web-component-analyzer` from harvesting `<bx-ce-demo-data-table>`
      ce.define('bx-ce-demo-file-uploader', BXCEDemoFileUploader);
    }
  };
})();

export const Default = (args) => {
  const { helperText, labelText } = args?.['bx-file-uploader'] ?? {};
  const { accept, disabled, multiple } = args?.['bx-file-drop-container'] ?? {};
  const { size, disableDelete, onBeforeDelete, onDelete } =
    args?.['bx-file-uploader-item'] ?? {};
  const handleBeforeDelete = (event: CustomEvent) => {
    onBeforeDelete(event);
    if (disableDelete) {
      event.preventDefault();
    }
  };
  defineDemoFileUploader();
  return html`
    <bx-ce-demo-file-uploader
      accept="${ifNonNull(accept)}"
      ?disabled="${disabled}"
      helper-text="${ifNonNull(helperText)}"
      label-text="${ifNonNull(labelText)}"
      ?multiple="${multiple}"
      size="${ifNonNull(size)}"
      @bx-file-uploader-item-beingdeleted="${handleBeforeDelete}"
      @bx-file-uploader-item-deleted="${onDelete}">
    </bx-ce-demo-file-uploader>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/File uploader',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-file-uploader': () => ({
        helperText: textNullable(
          'Helper text (helper-text)',
          'Only .jpg and .png files. 500kb max file size'
        ),
        labelText: textNullable('Label text (label-text)', 'Account photo'),
      }),
      'bx-file-drop-container': () => ({
        accept: textNullable(
          'Accepted MIME types or file extensions (accept)',
          'image/jpeg image/png'
        ),
        disabled: boolean('Disabled (disabled)', false),
        multiple: boolean(
          'Supports uploading multiple files at once (multiple)',
          true
        ),
      }),
      'bx-file-uploader-item': () => ({
        size: select('Filename height (size)', sizes, null),
        disableDelete: boolean(
          'Disable user-initiated delete action (Call event.preventDefault() in bx-file-uploader-item-beingdeleted event)',
          false
        ),
        onBeforeDelete: action('bx-file-uploader-item-beingdeleted'),
        onDelete: action('bx-file-uploader-item-deleted'),
      }),
    },
  },
};
