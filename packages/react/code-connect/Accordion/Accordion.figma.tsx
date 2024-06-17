/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Accordion } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Accordion,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=2490-17019&mode=design&t=0hF8pirV0i9mofd1-4',
  {
    props: {
      // missing props, set on Accordion item within Figma
      // size
      // isFlush
      // align
      children: figma.children(['Accordion item']),
    },
    example: ({ children }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <Accordion>{children}</Accordion>
    ),
  }
);
