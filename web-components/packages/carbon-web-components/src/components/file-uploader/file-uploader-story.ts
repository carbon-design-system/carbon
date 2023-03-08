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
import './file-uploader';
import './drop-container';
import './demo-file-uploader';
import { FILE_UPLOADER_ITEM_SIZE } from './file-uploader-item';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './file-uploader-story.mdx';

const sizes = {
  'Regular size': null,
  [`Small size (${FILE_UPLOADER_ITEM_SIZE.SMALL})`]:
    FILE_UPLOADER_ITEM_SIZE.SMALL,
  [`Large size (${FILE_UPLOADER_ITEM_SIZE.LARGE})`]:
    FILE_UPLOADER_ITEM_SIZE.LARGE,
  // TODO: deprecate
  // [`Small size (${FILE_UPLOADER_ITEM_SIZE.SMALL})`]:
  //   FILE_UPLOADER_ITEM_SIZE.SMALL,
  // [`Size for form field (${FILE_UPLOADER_ITEM_SIZE.FIELD})`]:
  //   FILE_UPLOADER_ITEM_SIZE.FIELD,
};

export const Default = (args) => {
  const { helperText, labelText } = args?.[`${prefix}-file-uploader`] ?? {};
  const { accept, disabled, multiple } =
    args?.[`${prefix}-file-drop-container`] ?? {};
  const { size, disableDelete, onBeforeDelete, onDelete } =
    args?.[`${prefix}-file-uploader-item`] ?? {};
  const handleBeforeDelete = (event: CustomEvent) => {
    onBeforeDelete(event);
    if (disableDelete) {
      event.preventDefault();
    }
  };
  return html`
    <cds-ce-demo-file-uploader
      accept="${ifDefined(accept)}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      label-text="${ifDefined(labelText)}"
      ?multiple="${multiple}"
      size="${ifDefined(size)}"
      @cds-file-uploader-item-beingdeleted="${handleBeforeDelete}"
      @cds-file-uploader-item-deleted="${onDelete}">
    </cds-ce-demo-file-uploader>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/File uploader',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-file-uploader`]: () => ({
        helperText: textNullable(
          'Helper text (helper-text)',
          'Only .jpg and .png files. 500kb max file size'
        ),
        labelText: textNullable('Label text (label-text)', 'Account photo'),
      }),
      [`${prefix}-file-drop-container`]: () => ({
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
      [`${prefix}-file-uploader-item`]: () => ({
        size: select('Filename height (size)', sizes, null),
        disableDelete: boolean(
          `Disable user-initiated delete action (Call event.preventDefault() in ${prefix}-file-uploader-item-beingdeleted event)`,
          false
        ),
        onBeforeDelete: action(`${prefix}-file-uploader-item-beingdeleted`),
        onDelete: action(`${prefix}-file-uploader-item-deleted`),
      }),
    },
  },
};
