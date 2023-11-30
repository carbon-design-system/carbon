/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import './index';
import './demo-file-uploader';
import { FILE_UPLOADER_ITEM_STATE } from './file-uploader-item';
import { BUTTON_KIND, BUTTON_SIZE } from '../button/button';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './file-uploader-story.mdx';

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

export const Default = () => {
  return html`
    <cds-ce-demo-file-uploader
      accept="image/jpeg"
      button
      label-description="Max file size is 500mb. Only .jpg files are supported."
      label-title="Upload files">
    </cds-ce-demo-file-uploader>
  `;
};

Default.storyName = 'Default';

export const DragAndDropUploadContainerExampleApplication = () => {
  return html`
    <cds-ce-demo-file-uploader
      accept="image/jpeg image/png"
      label-description="Max file size is 500kb. Supported file types are .jpg and .png."
      label-title="Upload files">
    </cds-ce-demo-file-uploader>
  `;
};

DragAndDropUploadContainerExampleApplication.storyName =
  'Drag And Drop Upload Container Example Application';

export const FileUploaderDropContainer = () => {
  return html`
    <cds-file-uploader-drop-container accept="image/jpeg image/png">
      Drag and drop files here or click to upload
    </cds-file-uploader-drop-container>
  `;
};

FileUploaderDropContainer.storyName = 'File Uploader Drop Container';

export const FileUploaderItem = () => {
  return html`
    <cds-file-uploader-item state="${FILE_UPLOADER_ITEM_STATE.EDIT}">
      README.md
    </cds-file-uploader-item>
  `;
};

FileUploaderItem.storyName = 'File Uploader Item';

export const Skeleton = () => {
  return html` <cds-file-uploader-skeleton></cds-file-uploader-skeleton> `;
};

export const Playground = (args) => {
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
  } = args?.[`${prefix}-file-uploader`] ?? {};

  return html`
    <cds-ce-demo-file-uploader
      button-kind="${buttonKind}"
      button-label="${buttonLabel}"
      input-state="${state}"
      icon-description="${iconDescription}"
      accept="image/jpeg"
      button
      ?disabled="${disabled}"
      label-description="${ifDefined(labelDescription)}"
      label-title="${ifDefined(labelTitle)}"
      ?multiple="${multiple}"
      size="${ifDefined(size)}"
      input-name="${ifDefined(name)}"
      @cds-file-uploader-item-deleted="${onDelete}"
      @cds-file-uploader-drop-container-changed="${onChange}">
    </cds-ce-demo-file-uploader>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-file-uploader`]: () => ({
      buttonKind: select(
        'Button kind (button-kind)',
        kind,
        BUTTON_KIND.PRIMARY
      ),
      buttonLabel: textNullable('Button Label', 'Add file'),
      disabled: boolean('Disabled (disabled)', false),
      state: select(
        'File uploader item state (state)',
        states,
        FILE_UPLOADER_ITEM_STATE.UPLOADING
      ),
      iconDescription: textNullable(
        'Icon description (icon-description)',
        'Delete file'
      ),
      labelDescription: textNullable(
        'Label description (label-description)',
        'Max file size is 500mb. Only .jpg files are supported.'
      ),
      labelTitle: textNullable('Label title (label-title)', 'Upload files'),
      name: textNullable('Input name (name)', ''),
      onDelete: action('cds-file-uploader-item-deleted'),
      onChange: action('cds-drop-container-changed'),
      multiple: boolean('Multiple (multiple)', false),
      size: select('Size (size)', sizes, BUTTON_SIZE.MEDIUM),
    }),
  },
};

export default {
  title: 'Components/File uploader',
  parameters: {
    ...storyDocs.parameters,
  },
};
