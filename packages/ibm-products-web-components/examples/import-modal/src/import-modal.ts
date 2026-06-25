/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/file-uploader/file-uploader.js';
import '@carbon/web-components/es/components/file-uploader/file-uploader-drop-container.js';
import '@carbon/web-components/es/components/file-uploader/file-uploader-item.js';
import { ref } from 'lit/directives/ref.js';
import styles from './import-modal.scss?lit';

const blockClass = `c4p--import-modal`;

export type FileType = {
  fetchError?: undefined | boolean;
  fileData?: File;
  fileSize?: number;
  iconDescription?: string;
  invalidFileType?: boolean;
  name: string;
  status?: 'uploading' | 'edit' | 'complete';
  uuid?: string;
  invalid?: boolean;
  errorBody?: string;
  errorSubject?: string;
};

/**
 * ImportModal.
 *
 * @element import-modal
 *
 * */

@customElement(`import-modal`)
class ImportModal extends HostListenerMixin(LitElement) {
  @state()
  files: FileType[] = [];

  @state()
  fileStatusString = '';

  @state()
  importUrl: string = '';

  /**
   * Handles `submit` in import modal.
   *
   */
  private submitHandler = () => {
    this.dispatchEvent(
      new CustomEvent('request-submit', {
        detail: this.files,
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    const accept = 'image/png image/jpeg image/gif';
    let modalRef: HTMLElement | null = null;
    const isInvalidFileType = (file) => {
      const acceptSet = new Set(accept);
      const name = file.name;
      const mimeType = file.type;
      const extension = `.${name.split('.').pop()}`;
      if (
        acceptSet.has(mimeType) ||
        acceptSet.has(extension) ||
        accept.length === 0
      ) {
        return false;
      }
      return true;
    };

    const fetchFile = async (url) => {
      if (!url) {
        this.fileStatusString = 'No URL provided.';
        return;
      }

      const fileName = url.substring(url.lastIndexOf('/') + 1).split('?')[0];

      const pendingFile = {
        name: fileName,
        status: 'uploading',
        uuid: 'dummy',
      };

      try {
        const response = await fetch(this.importUrl);
        if (!response.ok || response.status !== 200) {
          throw new Error(`${response.status}`);
        }
        const blob = await response.blob();
        const fetchedFile: FileType = new File([blob], fileName, {
          type: blob.type,
        });
        fetchedFile.invalidFileType = isInvalidFileType(fetchedFile);
        fetchedFile.uuid = pendingFile.uuid;
        updateFiles([fetchedFile]);
      } catch (err) {
        const failedFile = {
          ...pendingFile,
          fetchError: true,
        };
        updateFiles([failedFile]);
      }
    };

    const updateFiles = (newFiles) => {
      const updatedFiles = newFiles.map((file) => {
        const newFile = {
          uuid: file.uuid,
          status: 'edit',
          iconDescription: 'invalidIconDescription',
          name: file.name,
          fileSize: file.size,
          invalidFileType: file.invalidFileType,
          fileData: file,
          fetchError: file.fetchError,
        } as FileType;

        if (newFile.fetchError) {
          newFile.errorBody = 'Unable to fetch URL.';
          newFile.errorSubject = 'Import failed';
          newFile.invalid = true;
        } else if (newFile.invalidFileType) {
          newFile.errorBody = 'Invalid file type.';
          newFile.errorSubject = 'Import failed';
          newFile.invalid = true;
        } else if ((newFile?.fileSize ?? 0) > 500000) {
          newFile.errorBody =
            '500kb max file size. Select a new file and try again.';
          newFile.errorSubject = 'Import failed';
          newFile.invalid = true;
        }
        return newFile;
      });

      this.files = [...updatedFiles];
      this.fileStatusString = `${this.files.filter((f) => !f.invalid).length} / ${this.files.length} files uploaded`;
    };

    const onAddFile = (evt) => {
      console.log(evt.detail.addedFiles);

      const addedFiles = evt.detail.addedFiles;
      evt.stopPropagation();
      updateFiles(addedFiles);
    };

    const onRemoveFile = (_evt, uuid) => {
      this.files = this.files.filter((f) => f.uuid !== uuid);
    };

    const inputHandler = (evt) => {
      this.importUrl = evt.target.value;
    };

    const onCloseHandler = () => {
      this.files = [];
      this.importUrl = '';
    };

    const handleImportFile = () => {
      fetchFile(this.importUrl);
    };

    const numberOfFiles = this.files.length;
    const numberOfValidFiles = this.files.filter(
      (f: FileType) => !f.invalid
    ).length;
    const hasFiles = numberOfFiles > 0;
    const primaryButtonDisabled = !hasFiles || !(numberOfValidFiles > 0);
    const importButtonDisabled = !this.importUrl || hasFiles;
    return html`
      <style>
        ${styles}
      </style>
      <cds-button
        kind="primary"
        @click=${() => modalRef?.setAttribute('open', '')}
      >
        Launch Modal
      </cds-button>
      <cds-modal
        class=${blockClass}
        size="sm"
        ?open="false"
        ${ref((el) => (modalRef = el as HTMLElement))}
        @cds-modal-closed=${() => {
          modalRef?.removeAttribute('open');
          onCloseHandler();
        }}
      >
        <cds-modal-header>
          <cds-modal-heading>Import</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body class=${`${blockClass}__body-container`}>
          <cds-modal-body-content class=${`${blockClass}__body`}>
            You can specify a file to import by either dragging it into the drag
            and drop area or by specifying a URL. (Maximum file size of 500KB)
          </cds-modal-body-content>
          <cds-file-uploader label-title="Add files using drag and drop">
            <cds-file-uploader-drop-container
              accept=${accept}
              ?disabled=${hasFiles}
              @cds-file-uploader-drop-container-changed=${(evt) => {
                onAddFile(evt);
              }}
            >
              Drag and drop files here or click to upload
            </cds-file-uploader-drop-container>
          </cds-file-uploader>

          <p class=${`${blockClass}__label`}>Add a file by specifying a URL</p>
          <cds-form-item class=${`${blockClass}__input-group`}>
            <cds-text-input
              placeholder="URL"
              label=""
              id="test-id"
              .value=${this.importUrl}
              @input="${inputHandler}"
              ?disabled=${hasFiles}
            ></cds-text-input>
            <cds-button
              class=${`${blockClass}__import-button`}
              .kind="primary"
              size="md"
              .type="Submit"
              ?disabled=${importButtonDisabled}
              @click=${handleImportFile}
            >
              Add file
            </cds-button>
          </cds-form-item>

          <div class="${blockClass}__file-container cds--file-container">
            ${hasFiles
              ? html`<p class=${`${blockClass}__helper-text`}>
                  ${this.fileStatusString}
                </p>`
              : null}
            ${this.files.map(
              (file) => html`
                <cds-file-uploader-item
                  name=${file.name}
                  class=${`${blockClass}__file-uploader-item`}
                  size="lg"
                  state=${file.status}
                  icon-description=${file.iconDescription}
                  ?invalid=${file.invalid === true}
                  error-subject=${file.errorSubject || ''}
                  error-body=${file.errorBody || ''}
                  uuid=${file.uuid}
                  @cds-file-uploader-item-deleted=${(evt) =>
                    onRemoveFile(evt, file.uuid)}
                  >${file.name}</cds-file-uploader-item
                >
              `
            )}
          </div>
        </cds-modal-body>
        <cds-modal-footer>
          <cds-modal-footer-button
            kind="secondary"
            data-modal-close
            @click=${() => {
              onCloseHandler;
            }}
            >Cancel</cds-modal-footer-button
          >
          <cds-modal-footer-button
            ?disabled=${primaryButtonDisabled}
            @click=${this.submitHandler}
            >Import</cds-modal-footer-button
          >
        </cds-modal-footer>
      </cds-modal>
    `;
  }
  static styles = styles;
}
export default ImportModal;
