/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './edit-in-place';
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=15713%3A9775',
  {
    props: {
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      invalid: figma.enum('State', {
        Active: false,
        Disabled: false,
        Enabled: false,
        Error: true,
        Focus: false,
        Hover: false,
      }),
      invalidText: figma.enum('State', {
        Active: undefined,
        Disabled: undefined,
        Enabled: undefined,
        Error: figma.textContent('Error message goes here'),
        Focus: undefined,
        Hover: undefined,
      }),
      value: figma.textContent('Input text'),
    },
    example: ({ size, invalid, invalidText, value }) => html`
      <c4p-edit-in-place
        id="example-id"
        label-text="Example label text"
        size="${size}"
        value="${value}"
        ${invalid ? 'invalid' : ''}
        invalid-text="${invalidText || ''}"
        cancel-label="Cancel"
        edit-label="Edit"
        save-label="Save"
      >
      </c4p-edit-in-place>
    `,
  }
);
