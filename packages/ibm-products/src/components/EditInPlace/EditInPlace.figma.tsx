/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { EditInPlace } from './EditInPlace';
import figma from '@figma/code-connect';
figma.connect(
  EditInPlace,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=15713%3A9775',
  {
    props: {
      // These props were automatically mapped based on your linked code:
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
    example: (props) => (
      <EditInPlace
        readOnly={false}
        cancelLabel="Cancel"
        editLabel="Edit"
        id="Example-ID"
        labelText="Example label text"
        onCancel={() => console.log('Cancel clicked')}
        onChange={(val) => {
          console.log('Changed to: ' + val);
        }}
        onSave={() => console.log('Save clicked')}
        saveLabel="Save"
        size={props.size}
        value={props.value}
        invalid={props.invalid}
        invalidText={props.invalidText}
      />
    ),
  }
);
