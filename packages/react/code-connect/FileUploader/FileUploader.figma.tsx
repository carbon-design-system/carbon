/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  FileUploader,
  FileUploaderItem,
  FileUploaderSkeleton,
  FormItem,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FileUploader,
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
        Disabled: 'disabled',
      }),
    },
    example: ({ ...props }) => <FileUploader {...props} />,
  }
);

figma.connect(
  FileUploader,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5465-294860&t=KAcDAMsePqspmo2e-4',
  {
    variant: { Type: 'Drag and drop' },
    props: {
      children: figma.children(['_File uploader file item']),
      labelDescription: figma.string('Desc. text'),
      labelTitle: figma.string('Label text'),
      disabled: figma.enum('State', {
        Disabled: 'disabled',
      }),
    },
    example: ({ children, labelDescription, labelTitle }) => (
      <FormItem>
        <p className="cds--file--label">{labelTitle}</p>
        <p className="cds--label-description">{labelDescription}</p>
        <FileUploaderDropContainer
          accept={['image/jpeg', 'image/png']}
          innerRef={{
            current: '[Circular]',
          }}
          labelText="Drag and drop files here or click to upload"
          multiple
          name=""
          onAddFiles={function noRefCheck() {}}
          onChange={function noRefCheck() {}}
          tabIndex={0}
        />
        <div className="cds--file-container cds--file-container--drop" />
        {children}
      </FormItem>
    ),
  }
);

figma.connect(
  FileUploaderItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3199-35182&t=D2RGrtNnHWaB9r1F-4',
  {
    props: {
      errorBody: figma.string('Long desc.'),
      errorSubject: figma.string('Short desc.'),
      name: figma.string('Long file name'),
      filename113480: figma.string('File name'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      state: figma.enum('State', {
        Uploaded: 'edit',
        Loading: 'uploading',
        Success: 'complete',
        'Error short': 'error-short',
        'Error long': 'error-long',
      }),
      invalid: figma.enum('State', {
        'Error short': true,
        'Error long': true,
      }),
    },
    example: ({ ...props }) => <FileUploaderItem {...props} />,
  }
);

figma.connect(
  FileUploaderSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5465-294860&t=KAcDAMsePqspmo2e-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <FileUploaderSkeleton />,
  }
);
