// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5465-294860&t=KAcDAMsePqspmo2e-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/file-uploader/file-uploader.ts
// component=cds-file-uploader

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
      id: 'cds-file-uploader-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/file-uploader/index.js'",
      ],
      example: figma.code`<cds-file-uploader-skeleton></cds-file-uploader-skeleton>`,
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
      id: 'cds-file-uploader',
      imports: [
        "import '@carbon/web-components/es/components/file-uploader/index.js'",
      ],
      example: figma.code`<cds-file-uploader${renderStringAttribute(
        'label-title',
        labelTitle
      )}${renderStringAttribute(
        'label-description',
        labelDescription
      )}${renderBooleanAttribute('disabled', disabled)}>
  <cds-file-uploader-drop-container accept="image/jpeg image/png" multiple>
    Drag and drop files here or click to upload
  </cds-file-uploader-drop-container>
  ${children}
</cds-file-uploader>`,
      metadata: { nestable: true },
    };
  }

  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });

  return {
    id: 'cds-file-uploader',
    imports: [
      "import '@carbon/web-components/es/components/file-uploader/index.js'",
    ],
    example: figma.code`<cds-file-uploader${renderStringAttribute(
      'label-title',
      labelTitle
    )}${renderStringAttribute(
      'label-description',
      labelDescription
    )}${renderBooleanAttribute('disabled', disabled)}>
  <cds-file-uploader-button${renderStringAttribute('size', size)}>
    Add file
  </cds-file-uploader-button>
</cds-file-uploader>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
