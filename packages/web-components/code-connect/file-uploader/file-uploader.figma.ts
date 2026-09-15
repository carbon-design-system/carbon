/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5465-294860&t=KAcDAMsePqspmo2e-4',
  {
    variant: { Type: 'Default' },
    props: {
      labelDescription: figma.string('Desc. text'),
      labelTitle: figma.string('Label text'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-file-uploader
        label-title=${props.labelTitle}
        label-description=${props.labelDescription}
        disabled=${props.disabled}>
        <cds-file-uploader-button size=${props.size}>
          Add file
        </cds-file-uploader-button>
      </cds-file-uploader>`,
    imports: [
      "import '@carbon/web-components/es/components/file-uploader/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5465-294860&t=KAcDAMsePqspmo2e-4',
  {
    variant: { Type: 'Drag and drop' },
    props: {
      children: figma.children(['_File uploader file item']),
      labelDescription: figma.string('Desc. text'),
      labelTitle: figma.string('Label text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-file-uploader
        label-title=${props.labelTitle}
        label-description=${props.labelDescription}
        disabled=${props.disabled}
        multiple>
        <cds-file-uploader-drop-container accept="image/jpeg image/png">
          Drag and drop files here or click to upload
        </cds-file-uploader-drop-container>
        ${props.children}
      </cds-file-uploader>`,
    imports: [
      "import '@carbon/web-components/es/components/file-uploader/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3199-35182&t=D2RGrtNnHWaB9r1F-4',
  {
    props: {
      errorBody: figma.string('Long desc.'),
      errorSubject: figma.string('Short desc.'),
      name: figma.string('Long file name'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      state: figma.enum('State', {
        Uploaded: 'edit',
        Loading: 'uploading',
        Complete: 'complete',
      }),
      invalid: figma.enum('State', {
        'Error short': true,
        'Error long': true,
      }),
    },
    example: (props) =>
      html`<cds-file-uploader-item
        state=${props.state}
        size=${props.size}
        invalid=${props.invalid}
        error-subject=${props.errorSubject}
        error-body=${props.errorBody}>
        ${props.name}
      </cds-file-uploader-item>`,
    imports: [
      "import '@carbon/web-components/es/components/file-uploader/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5465-294860&t=KAcDAMsePqspmo2e-4',
  {
    variant: { State: 'Skeleton' },
    example: () =>
      html`<cds-file-uploader-skeleton></cds-file-uploader-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/file-uploader/index.js'",
    ],
  }
);
