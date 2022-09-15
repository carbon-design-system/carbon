/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { delay } from 'bluebird';
import { moduleMetadata } from '@storybook/angular';
import { FILE_UPLOADER_ITEM_SIZE, FILE_UPLOADER_ITEM_STATE } from './file-uploader-item';
import baseStory, { Default as baseDefault } from './file-uploader-story';
import { FileData } from './stories/types';

/**
 * A class to manage file uploading states, like sending file contents to server.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in file uploading tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
@Component({
  selector: 'bx-ce-demo-file-uploader',
  template: `
    <bx-file-uploader [helperText]="helperText" [labelText]="labelText">
      <bx-file-drop-container
        [accept]="accept"
        [disabled]="disabled"
        [multiple]="multiple"
        (bx-file-drop-container-changed)="_handleChange($event)">
        Drag and drop files here or click to upload
      </bx-file-drop-container>
      <bx-file-uploader-item
        *ngFor="let file of _files"
        [attr.data-file-id]="file.id"
        [invalid]="file.invalid"
        [size]="size"
        [state]="file.state"
        [validityMessage]="file.validityMessage"
        (bx-file-uploader-item-deleted)="_handleDelete($event)">
        {{ file.file.name }}
        <span slot="validity-message-supplement">{{ file.supplementalValidityMessage }}</span>
      </bx-file-uploader-item>
    </bx-file-uploader>
  `,
})
class BXCEDemoFileUploader {
  /**
   * The files being uploaded.
   */
  _files: FileData[] = [];

  /**
   * Handles `bx-drop-container-changed` on `<bx-file-drop-container>`.
   * @param event The event.
   */
  _handleChange(event: CustomEvent) {
    const { addedFiles } = event.detail;
    const newFiles: FileData[] = addedFiles.map(
      item =>
        ({
          id: Math.random().toString(36).slice(2),
          file: item,
          state: FILE_UPLOADER_ITEM_STATE.UPLOADING,
        } as FileData)
    );
    const { multiple, _files: files, _simulateUpload: simulateUpload } = this;
    if (multiple) {
      files.push(...newFiles);
      newFiles.forEach(simulateUpload, this);
    } else if (addedFiles.length > 0) {
      files.push(newFiles[0]);
      this._simulateUpload(newFiles[0]);
    }
  }

  /**
   * Handles `bx-file-uploader-item-deleted` on `<bx-file-uploader-item>`.
   * @param event The event.
   */
  _handleDelete(event: CustomEvent) {
    const { fileId: idToDelete } = (event.target as HTMLElement).dataset;
    const { _files: files } = this;
    for (let i = files.length - 1; i >= 0; --i) {
      if (idToDelete === files[i].id) {
        files.splice(i, 1);
      }
    }
  }

  /**
   * Simulates updating file.
   * @param data The data of the file being uploaded.
   */
  async _simulateUpload(data: FileData) {
    const { id, file } = data;
    if (file.size > 524288) {
      this._files.forEach(item => {
        if (id === item.id) {
          item.state = FILE_UPLOADER_ITEM_STATE.EDITING;
          item.invalid = true;
          item.validityMessage = 'File size exceeds limit';
          item.supplementalValidityMessage = '500kb max file size. Select a new file and try again.';
        }
      });
    } else {
      // Simulates network request time
      const rand = Math.random() * 1000;
      await delay(rand);
      this._files.forEach(item => {
        if (id === item.id) {
          item.state = FILE_UPLOADER_ITEM_STATE.UPLOADED;
        }
      });
      // Shows x icon after 1 second
      await delay(1000);
      this._files.forEach(item => {
        if (id === item.id) {
          item.state = FILE_UPLOADER_ITEM_STATE.EDITING;
        }
      });
    }
  }

  /**
   * The file types the file input should accept, separated by space.
   */
  @Input()
  accept = '';

  /**
   * `true` if the drop container should be disabled.
   */
  @Input()
  disabled = false;

  /**
   * The helper text.
   */
  @Input()
  helperText = '';

  /**
   * The label text.
   */
  @Input()
  labelText = '';

  /**
   * `true` if the drop container should accept more than one files at once.
   * Note that even with `false` set here, user _can_ select multiple files one by one.
   */
  @Input()
  multiple = false;

  /**
   * The size of the file uploader items.
   */
  @Input()
  size = FILE_UPLOADER_ITEM_SIZE.REGULAR;
}

export const Default = args => ({
  template: `
    <bx-ce-demo-file-uploader
      [accept]="accept"
      [disabled]="disabled"
      [helperText]="helperText"
      [labelText]="labelText"
      [multiple]="multiple"
      [size]="size"
      (bx-file-uploader-item-beingdeleted)="handleBeforeDelete($event)"
      (bx-file-uploader-item-deleted)="onDelete($event)"
    >
    </bx-ce-demo-file-uploader>
  `,
  props: (({ disableDelete, onBeforeDelete, ...rest }) => ({
    ...rest,
    handleBeforeDelete(event: CustomEvent) {
      onBeforeDelete(event);
      if (disableDelete) {
        event.preventDefault();
      }
    },
  }))({
    ...args?.['bx-file-uploader'],
    ...args?.['bx-file-drop-container'],
    ...args?.['bx-file-uploader-item'],
  }),
});

Object.assign(Default, baseDefault, {
  decorators: [
    moduleMetadata({
      declarations: [BXCEDemoFileUploader],
    }),
  ],
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
