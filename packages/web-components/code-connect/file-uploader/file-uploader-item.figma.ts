// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3199-35182&t=D2RGrtNnHWaB9r1F-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/file-uploader/file-uploader-item.ts
// component=cds-file-uploader-item

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import {
  renderBooleanAttribute,
  renderStringAttribute,
} from '../template-helpers';

const instance = figma.selectedInstance;
const errorBody = instance.getString('Long desc.');
const errorSubject = instance.getString('Short desc.');
const name = instance.getString('Long file name');
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const state = instance.getEnum('State', {
  Uploaded: 'edit',
  Loading: 'uploading',
  Complete: 'complete',
});
const invalid = instance.getEnum('State', {
  'Error short': true,
  'Error long': true,
});

export default {
  id: 'cds-file-uploader-item',
  imports: [
    "import '@carbon/web-components/es/components/file-uploader/index.js'",
  ],
  example: figma.code`<cds-file-uploader-item${renderStringAttribute(
    'state',
    state
  )}${renderStringAttribute('size', size)}${renderBooleanAttribute(
    'invalid',
    invalid
  )}${renderStringAttribute(
    'error-subject',
    errorSubject
  )}${renderStringAttribute('error-body', errorBody)}>${name}</cds-file-uploader-item>`,
  metadata: { nestable: true },
};
