/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Form } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Form,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3897-51336&t=SbIuH3RAJeFPjXmN-4',
  {
    props: {
      children: figma.children('*'),
    },
    example: ({ children }) => <Form aria-label="sample form">{children}</Form>,
  }
);
