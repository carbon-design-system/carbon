/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import './index';
import { FILE_UPLOADER_ITEM_STATE } from './file-uploader-item';
import { BUTTON_KIND, BUTTON_SIZE } from '../button/button';

const kind = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Tertiary button (${BUTTON_KIND.TERTIARY})`]: BUTTON_KIND.TERTIARY,
  [`Danger primary button (${BUTTON_KIND.DANGER_PRIMARY})`]:
    BUTTON_KIND.DANGER_PRIMARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const states = {
  [`Upload in progress (${FILE_UPLOADER_ITEM_STATE.UPLOADING})`]:
    FILE_UPLOADER_ITEM_STATE.UPLOADING,
  [`Upload complete (${FILE_UPLOADER_ITEM_STATE.COMPLETE})`]:
    FILE_UPLOADER_ITEM_STATE.COMPLETE,
  [`Edit upload (${FILE_UPLOADER_ITEM_STATE.EDIT})`]:
    FILE_UPLOADER_ITEM_STATE.EDIT,
};

const sizes = {
  [`sm (${BUTTON_SIZE.SMALL})`]: BUTTON_SIZE.SMALL,
  [`md (${BUTTON_SIZE.MEDIUM})`]: BUTTON_SIZE.MEDIUM,
  [`lg (${BUTTON_SIZE.LARGE})`]: BUTTON_SIZE.LARGE,
};

const args = {
  buttonKind: BUTTON_KIND.PRIMARY,
  buttonLabel: 'Add file',
  disabled: false,
  state: FILE_UPLOADER_ITEM_STATE.UPLOADING,
  iconDescription: 'Delete file',
  labelDescription: 'Max file size is 500kb. Only .jpg files are supported.',
  labelTitle: 'Upload files',
  name: '',
  multiple: false,
  size: BUTTON_SIZE.MEDIUM,
};

const argTypes = {
  buttonKind: {
    control: 'select',
    options: kind,
    description:
      'Specify the types of files that this input should be able to receive.',
  },
  buttonLabel: {
    control: 'text',
    description:
      'Provide the label text to be read by screen readers when interacting with the <code>&lt;cds-file-uploader-button&gt;</code>.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether file input is disabled.',
  },
  state: {
    control: 'select',
    description: 'File uploader item state (state)',
    options: states,
  },
  iconDescription: {
    control: 'text',
    description:
      'Provide a description for the complete/close icon that can be read by screen readers.',
  },
  labelDescription: {
    control: 'text',
    description:
      'Specify the description text of this <code>&lt;cds-file-uploader&gt;</code>.',
  },
  labelTitle: {
    control: 'text',
    description:
      'Specify the title text of this <code>&lt;cds-file-uploader&gt;</code>.',
  },
  name: {
    control: 'text',
    description:
      'Provide a name for the underlying <code>&lt;input&gt;</code> node.',
  },
  multiple: {
    control: 'boolean',
    description:
      'Specify if the component should accept multiple files to upload.',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the <code>&lt;cds-file-uploader-button&gt;</code>, from a list of available sizes.',
    options: sizes,
  },
  onDelete: {
    action: `${prefix}-file-uploader-item-deleted`,
  },
  onChange: {
    action: `${prefix}-drop-container-changed`,
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      buttonKind,
      buttonLabel,
      disabled,
      state,
      iconDescription,
      labelDescription,
      labelTitle,
      multiple,
      onDelete,
      onChange,
      name,
      size,
    } = args ?? {};

    return html`
      <cds-file-uploader
        label-title="${labelTitle}"
        label-description="${labelDescription}"
        ?multiple="${multiple}"
        input-state="${state}"
        ?disabled="${disabled}"
        icon-description="${iconDescription}"
        @cds-file-uploader-item-deleted="${onDelete}"
        @cds-file-uploader-drop-container-changed="${onChange}"
        input-name="${ifDefined(name)}">
        <cds-file-uploader-button
          button-kind="${buttonKind}"
          accept="image/jpeg"
          name="default-file-uploader-button"
          size="${ifDefined(size)}">
          ${buttonLabel}
        </cds-file-uploader-button>
      </cds-file-uploader>
    `;
  },
};

export const DragAndDropUploadContainerExampleApplication = {
  render: () => {
    return html`
      <cds-file-uploader
        label-title="Upload files"
        label-description="Max file size is 1 MB. Supported file types are .jpg and .png."
        multiple>
        <cds-file-uploader-drop-container accept="image/jpeg image/png">
          Drag and drop files here or click to upload
        </cds-file-uploader-drop-container>
      </cds-file-uploader>
    `;
  },
};

export const DragAndDropUploadSingleContainerExampleApplication = {
  render: () => {
    return html`
      <cds-file-uploader
        label-title="Upload a file"
        label-description="Max file size is 1 MB. Only .jpg files are supported.">
        <cds-file-uploader-drop-container accept="image/jpeg">
          Drag and drop a file here or click to upload
        </cds-file-uploader-drop-container>
      </cds-file-uploader>
    `;
  },
};

export const FileUploaderDropContainer = {
  render: () => {
    return html`
      <cds-file-uploader>
        <cds-file-uploader-drop-container
          multiple
          accept="image/jpeg image/png">
          Drag and drop files here or click to upload
        </cds-file-uploader-drop-container>
      </cds-file-uploader>
    `;
  },
};

export const FileUploaderItem = {
  render: () => {
    return html`
      <cds-file-uploader-item state="${FILE_UPLOADER_ITEM_STATE.EDIT}">
        README.md
      </cds-file-uploader-item>
    `;
  },
};

export const Skeleton = {
  render: () => {
    return html` <cds-file-uploader-skeleton></cds-file-uploader-skeleton> `;
  },
};

const meta = {
  title: 'Components/File uploader',
};

export default meta;
