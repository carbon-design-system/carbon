// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5465-294860&t=KAcDAMsePqspmo2e-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FileUploader/FileUploader.tsx
// component=FileUploader

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const type = instance.getEnum('Type', {
  Default: 'default',
  'Drag and drop': 'drag-and-drop',
});
const isSkeleton = instance.getEnum('State', {
  Skeleton: true,
});

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'FileUploaderSkeleton',
      imports: ["import { FileUploaderSkeleton } from '@carbon/react';"],
      example: figma.code`<FileUploaderSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const labelDescription = instance.getString('Desc. text');
  const labelTitle = instance.getString('Label text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });

  if (type === 'drag-and-drop') {
    const children = instance
      .findConnectedInstances(
        (child) =>
          child.name === '_File uploader file item' && child.hasCodeConnect()
      )
      .map((child) => child.executeTemplate().example);

    return {
      id: 'FileUploader',
      imports: [
        "import { FormItem, FileUploaderDropContainer } from '@carbon/react';",
      ],
      example: figma.code`<FormItem>
  <p className="cds--file--label">${figma.helpers.react.renderChildren(
    labelTitle
  )}</p>
  <p className="cds--label-description">${figma.helpers.react.renderChildren(
    labelDescription
  )}</p>
  <FileUploaderDropContainer accept={['image/jpeg', 'image/png']} labelText="Drag and drop files here or click to upload" multiple name=""${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )} />
  <div className="cds--file-container cds--file-container--drop" />
  ${figma.helpers.react.renderChildren(children)}
</FormItem>`,
      metadata: { nestable: true },
    };
  }

  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });

  return {
    id: 'FileUploader',
    imports: ["import { FileUploader } from '@carbon/react';"],
    example: figma.code`<FileUploader filenameStatus="edit"${figma.helpers.react.renderProp(
      'labelDescription',
      labelDescription
    )}${figma.helpers.react.renderProp(
      'labelTitle',
      labelTitle
    )}${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp('disabled', disabled)} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
