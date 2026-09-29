// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3199-35182&t=D2RGrtNnHWaB9r1F-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FileUploader/FileUploaderItem.tsx
// component=FileUploaderItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const errorBody = figma.selectedInstance.getString('Long desc.');
const errorSubject = figma.selectedInstance.getString('Short desc.');
const name = figma.selectedInstance.getString('Long file name');
const size = figma.selectedInstance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const status = figma.selectedInstance.getEnum('State', {
  Uploaded: 'edit',
  Loading: 'uploading',
  Complete: 'complete',
});
const invalid = figma.selectedInstance.getEnum('State', {
  'Error short': true,
  'Error long': true,
});

export default {
  id: 'FileUploaderItem',
  imports: ["import { FileUploaderItem } from '@carbon/react';"],
  example: figma.code`<FileUploaderItem${figma.helpers.react.renderProp(
    'errorBody',
    errorBody
  )}${figma.helpers.react.renderProp(
    'errorSubject',
    errorSubject
  )}${figma.helpers.react.renderProp(
    'name',
    name
  )}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'status',
    status
  )}${figma.helpers.react.renderProp('invalid', invalid)}/>`,
  metadata: { nestable: true },
};
