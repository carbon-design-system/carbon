/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { AILabelContent } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  AILabelContent,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=57561-3508&t=SB9qULZbn3FRopvU-4',
  {
    props: {
      title: figma.string('AI title'),
      description: figma.string('AI description'),
      slotOne: figma.boolean('Slot 1', {
        true: figma.instance('Swap slot 1'),
        false: '',
      }),
      slotTwo: figma.boolean('Slot 2', {
        true: figma.instance('Swap slot 2'),
      }),
      slotThree: figma.boolean('Slot 3', {
        true: figma.instance('Swap slot 3'),
      }),
      slotFour: figma.boolean('Slot 4', {
        true: figma.instance('Swap slot 4'),
      }),
      actions: figma.children(['Actions footer']),
    },
    example: ({
      title,
      description,
      slotOne,
      slotTwo,
      slotThree,
      slotFour,
      actions,
    }) => (
      <AILabelContent>
        {slotOne}
        <div>
          <p>AI Explained</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {slotOne}
          <hr />
          {slotTwo}
          <p>
            This is sample placeholder content, replace with your own content
            and custom styles.
          </p>
          {slotThree}
          {slotFour}
        </div>
        {actions}
      </AILabelContent>
    ),
  }
);
