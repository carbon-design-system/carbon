/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Vue from 'vue';
import { delay } from 'bluebird';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { FILE_UPLOADER_ITEM_SIZE, FILE_UPLOADER_ITEM_STATE } from './file-uploader-item';
import { Default as baseDefault } from './file-uploader-story';
import { FileData } from './stories/types';

export { default } from './file-uploader-story';

/**
 * A class to manage table states, like selection and sorting.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in data table tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
Vue.component('bx-ce-demo-file-uploader', {
  props: {
    /**
     * The file types the file input should accept, separated by space.
     */
    accept: {
      type: String,
      default: '',
    },

    /**
     * `true` if the drop container should be disabled.
     */
    disabled: Boolean,

    /**
     * The helper text.
     */
    helperText: String,

    /**
     * The label text.
     */
    labelText: String,

    /**
     * `true` if the drop container should accept more than one files at once.
     * Note that even with `false` set here, user _can_ select multiple files one by one.
     */
    multiple: Boolean,

    /**
     * The size of the file uploader items.
     */
    size: {
      type: String,
      default: FILE_UPLOADER_ITEM_SIZE.REGULAR,
    },
  },

  data: (): {
    files: FileData[];
  } => ({
    files: [],
  }),

  methods: {
    /**
     * Handles `bx-drop-container-changed` on `<bx-file-drop-container>`.
     * @param event The event.
     */
    handleChange(event: CustomEvent) {
      const { addedFiles } = event.detail;
      const newFiles: FileData[] = addedFiles.map(
        item =>
          ({
            id: Math.random().toString(36).slice(2),
            file: item,
            state: FILE_UPLOADER_ITEM_STATE.UPLOADING,
          } as FileData)
      );
      const { multiple, files, simulateUpload } = this;
      if (multiple) {
        files.push(...newFiles);
        newFiles.forEach(simulateUpload, this);
      } else if (addedFiles.length > 0) {
        files.push(newFiles[0]);
        this.simulateUpload(newFiles[0]);
      }
    },

    /**
     * Handles `bx-file-uploader-item-deleted` on `<bx-file-uploader-item>`.
     * @param event The event.
     */
    handleDelete(event: CustomEvent) {
      const { fileId: idToDelete } = (event.target as HTMLElement).dataset;
      const { files } = this;
      for (let i = files.length - 1; i >= 0; --i) {
        if (idToDelete === files[i].id) {
          files.splice(i, 1);
        }
      }
    },

    /**
     * Simulates updating file.
     * @param data The data of the file being uploaded.
     */
    async simulateUpload(data: FileData) {
      const { id, file } = data;
      if (file.size > 524288) {
        this.files.forEach(item => {
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
        this.files.forEach(item => {
          if (id === item.id) {
            item.state = FILE_UPLOADER_ITEM_STATE.UPLOADED;
          }
        });
        // Shows x icon after 1 second
        await delay(1000);
        this.files.forEach(item => {
          if (id === item.id) {
            item.state = FILE_UPLOADER_ITEM_STATE.EDITING;
          }
        });
      }
    },
  },

  template: `
    <bx-file-uploader :helper-text="helperText" :label-text="labelText">
      <bx-file-drop-container
        :accept="accept"
        :disabled="disabled"
        :multiple="multiple"
        @bx-file-drop-container-changed="handleChange"
      >
        Drag and drop files here or click to upload
      </bx-file-drop-container>
      <bx-file-uploader-item
        v-for="file in files"
        :key="file.id"
        :data-file-id="file.id"
        :invalid="file.invalid"
        :size="size"
        :state="file.state"
        :validity-message="file.validityMessage"
        @bx-file-uploader-item-deleted="handleDelete"
      >
        {{ file.file.name }}
        <span slot="validity-message-supplement">{{ file.supplementalValidityMessage }}</span>
      </bx-file-uploader-item>
    </bx-file-uploader>
  `,
});

export const Default = args => {
  const { props = {}, methods = {} } = createVueBindingsFromProps({
    ...args?.['bx-file-uploader'],
    ...args?.['bx-file-drop-container'],
    ...args?.['bx-file-uploader-item'],
  });
  return {
    template: `
      <bx-ce-demo-file-uploader
        :accept="accept"
        :disabled="disabled"
        :helper-text="helperText"
        :label-text="labelText"
        :multiple="multiple"
        :size="size"
        @bx-file-uploader-item-beingdeleted="handleBeforeDelete"
        @bx-file-uploader-item-deleted="onDelete"
      >
      </bx-ce-demo-file-uploader>
    `,
    props,
    methods: (({ disableDelete, onBeforeDelete, ...rest }) => ({
      ...rest,
      handleBeforeDelete(event: CustomEvent) {
        onBeforeDelete(event);
        if (disableDelete) {
          event.preventDefault();
        }
      },
    }))(methods),
  };
};

Object.assign(Default, baseDefault);
