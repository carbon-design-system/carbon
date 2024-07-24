/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React, { useState } from 'react';
import { ComposedModal } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  ComposedModal,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4080-55366&t=kgHdN1kQbk04e5Jv-4',
  {
    props: {
      title: figma.string('Title text'),
      label: figma.boolean('Label', {
        true: figma.string('Label text'),
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra small': 'xs',
      }),
      progress: figma.boolean('Progress', {
        true: figma.children('Progress indicator'),
      }),
      descriptionText: figma.boolean('Description', {
        true: '<p>' + figma.string('Description text') + '</p>',
      }),
      children: figma.instance('Swap slot'),
      modalFooter: figma.boolean('Actions', {
        true: figma.children('Actions'),
      }),
    },
    example: ({
      size,
      title,
      label,
      modalFooter,
      children,
      descriptionText,
      progress,
    }) => {
      const [open, setOpen] = useState(true);
      return (
        <ComposedModal open onClose={() => setOpen(false)}>
          <ModalHeader label={label} title={title} />
          <ModalBody>
            {progress}
            {descriptionText}
            {children}
          </ModalBody>
          {modalFooter}
        </ComposedModal>
      );
    },
  }
);
