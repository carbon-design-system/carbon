/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import './index';
import {
  FILE_UPLOADER_ITEM_SIZE,
  FILE_UPLOADER_ITEM_STATE,
} from './file-uploader-item';
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

const defaultArgs = {
  accept: 'image/jpeg',
  buttonKind: BUTTON_KIND.PRIMARY,
  buttonLabel: 'Add file',
  disabled: false,
  labelDescription: 'Max file size is 500kb. Only .jpg files are supported.',
  labelTitle: 'Upload files',
  name: '',
  multiple: false,
  size: BUTTON_SIZE.MEDIUM,
};

const argTypes = {
  accept: {
    control: 'text',
    description: 'Specify the types of files that this input can receive.',
  },
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
  onChange: {
    action: `${prefix}-file-uploader-button-changed`,
  },
};

const dropContainerArgs = {
  accept: 'image/jpeg image/png',
  disabled: false,
  labelDescription:
    'Max file size is 1 MB. Supported file types are .jpg and .png.',
  labelText: 'Drag and drop files here or click to upload',
  labelTitle: 'Upload files',
  multiple: true,
  name: '',
};

const dropContainerArgTypes = {
  accept: { control: 'text' },
  disabled: { control: 'boolean' },
  labelDescription: { control: 'text' },
  labelText: { control: 'text' },
  labelTitle: { control: 'text' },
  multiple: { control: 'boolean' },
  name: { control: 'text' },
  onChange: {
    action: `${prefix}-file-uploader-drop-container-changed`,
  },
};

const fileUploaderItemArgs = {
  disabled: false,
  errorBody: '1 MB max file size. Select a new file and try again.',
  errorSubject: 'File size exceeds limit',
  iconDescription: 'Delete file',
  invalid: false,
  name: 'README.md',
  size: FILE_UPLOADER_ITEM_SIZE.MEDIUM,
  state: FILE_UPLOADER_ITEM_STATE.EDIT,
};

const fileUploaderItemArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Controls the disabled state of this file uploader item.',
  },
  errorBody: { control: 'text' },
  errorSubject: { control: 'text' },
  iconDescription: { control: 'text' },
  invalid: { control: 'boolean' },
  name: { control: 'text' },
  onDelete: {
    action: `${prefix}-file-uploader-item-deleted`,
  },
  size: {
    control: 'select',
    options: {
      Small: FILE_UPLOADER_ITEM_SIZE.SMALL,
      Medium: FILE_UPLOADER_ITEM_SIZE.MEDIUM,
      Large: FILE_UPLOADER_ITEM_SIZE.LARGE,
    },
  },
  state: {
    control: 'select',
    options: states,
  },
};

export const Default = {
  args: defaultArgs,
  argTypes,
  render: (args) => {
    const {
      accept,
      buttonKind,
      buttonLabel,
      disabled,
      labelDescription,
      labelTitle,
      multiple,
      onChange,
      name,
      size,
    } = args ?? {};

    return html`
      <cds-file-uploader
        label-title="${labelTitle}"
        label-description="${labelDescription}"
        ?disabled="${disabled}">
        <cds-file-uploader-button
          button-kind="${buttonKind}"
          accept="${accept}"
          ?multiple="${multiple}"
          name="${ifDefined(name)}"
          size="${ifDefined(size)}"
          @cds-file-uploader-button-changed="${onChange}">
          ${buttonLabel}
        </cds-file-uploader-button>
      </cds-file-uploader>
    `;
  },
};

export const DragAndDropUploadContainerExampleApplication = {
  args: { ...dropContainerArgs },
  argTypes: { ...dropContainerArgTypes },
  render: ({
    accept,
    disabled,
    labelDescription,
    labelText,
    labelTitle,
    multiple,
    name,
    onChange,
  }) => {
    return html`
      <cds-file-uploader
        label-title="${labelTitle}"
        label-description="${labelDescription}"
        ?disabled=${disabled}>
        <cds-file-uploader-drop-container
          accept="${accept}"
          ?disabled=${disabled}
          ?multiple=${multiple}
          name="${name}"
          @cds-file-uploader-drop-container-changed=${onChange}>
          ${labelText}
        </cds-file-uploader-drop-container>
      </cds-file-uploader>
    `;
  },
};

export const DragAndDropUploadSingleContainerExampleApplication = {
  args: {
    ...dropContainerArgs,
    accept: 'image/jpeg',
    labelDescription: 'Max file size is 1 MB. Only .jpg files are supported.',
    labelText: 'Drag and drop a file here or click to upload',
    labelTitle: 'Upload a file',
    multiple: false,
  },
  argTypes: {
    ...dropContainerArgTypes,
    multiple: {
      ...dropContainerArgTypes.multiple,
      table: { readonly: true },
    },
  },
  render: ({
    accept,
    disabled,
    labelDescription,
    labelText,
    labelTitle,
    multiple,
    name,
    onChange,
  }) => {
    return html`
      <cds-file-uploader
        label-title="${labelTitle}"
        label-description="${labelDescription}"
        ?disabled=${disabled}>
        <cds-file-uploader-drop-container
          accept="${accept}"
          ?disabled=${disabled}
          ?multiple=${multiple}
          name="${name}"
          @cds-file-uploader-drop-container-changed=${onChange}>
          ${labelText}
        </cds-file-uploader-drop-container>
      </cds-file-uploader>
    `;
  },
};

export const FileUploaderDropContainer = {
  args: { ...dropContainerArgs },
  argTypes: { ...dropContainerArgTypes },
  render: ({
    accept,
    disabled,
    labelDescription,
    labelText,
    labelTitle,
    multiple,
    name,
    onChange,
  }) => {
    return html`
      <cds-file-uploader
        label-title="${labelTitle}"
        label-description="${labelDescription}"
        ?disabled=${disabled}>
        <cds-file-uploader-drop-container
          accept="${accept}"
          ?disabled=${disabled}
          ?multiple=${multiple}
          name="${name}"
          @cds-file-uploader-drop-container-changed=${onChange}>
          ${labelText}
        </cds-file-uploader-drop-container>
      </cds-file-uploader>
    `;
  },
};

export const FileUploaderItem = {
  argTypes: { ...fileUploaderItemArgTypes },
  args: { ...fileUploaderItemArgs },
  render: (args) => {
    const {
      disabled,
      errorBody,
      errorSubject,
      iconDescription,
      invalid,
      name,
      onDelete,
      size,
      state,
    } = args ?? {};
    return html`
      <cds-file-uploader-item
        ?disabled=${disabled}
        error-body="${errorBody}"
        error-subject="${errorSubject}"
        icon-description="${iconDescription}"
        ?invalid=${invalid}
        size="${size}"
        state="${state}"
        @cds-file-uploader-item-deleted=${onDelete}>
        ${name}
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
  parameters: {
    controls: {
      exclude: ['onChange'],
    },
  },
};

export default meta;
