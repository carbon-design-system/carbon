/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OptionsTile } from './OptionsTile';
import figma from '@figma/code-connect';

figma.connect(
  OptionsTile,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=36228%3A14503',
  {
    props: {
      title: figma.string('Heading text'),
      open: figma.boolean('Expanded'),
      size: figma.enum('Size', {
        Large: 'lg',
        'Extra large': 'xl',
      }),
      enabled: figma.boolean('Toggle'),
      children: figma.enum('Type', {
        Static: undefined,
        Expandable: figma.instance('Swap slot'),
      }),
      summaryProps: figma.boolean('Summary + Validation', {
        true: figma.nestedProps('Summary + Validation message', {
          locked: figma.enum('Type', {
            Summary: figma.boolean('Locked'),
            Warning: false,
            Error: false,
          }),
          summary: figma.enum('Type', {
            Summary: figma.string('Summary text'),
            Warning: undefined,
            Error: undefined,
          }),
          invalid: figma.enum('Type', {
            Summary: undefined,
            Warning: undefined,
            Error: true,
          }),
          invalidText: figma.enum('Type', {
            Summary: undefined,
            Warning: undefined,
            Error: figma.string('Error text'),
          }),
          warn: figma.enum('Type', {
            Summary: undefined,
            Warning: true,
            Error: undefined,
          }),
          warnText: figma.enum('Type', {
            Summary: undefined,
            Warning: figma.string('Warning text'),
            Error: undefined,
          }),
        }),
        false: {
          locked: undefined,
          summary: undefined,
          invalid: undefined,
          invalidText: undefined,
          warn: undefined,
          warnText: undefined,
        },
      }),
    },
    example: (props) => (
      <OptionsTile
        title={props.title}
        open={props.open}
        size={props.size}
        locked={props.summaryProps.locked}
        summary={props.summaryProps.summary}
        invalid={props.summaryProps.invalid}
        invalidText={props.summaryProps.invalidText}
        warn={props.summaryProps.warn}
        warnText={props.summaryProps.warnText}
        enabled={props.enabled}
      >
        {props.children}
      </OptionsTile>
    ),
  }
);
