/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { NonLinearReading } from './NonLinearReading';
import figma from '@figma/code-connect';
import { html } from '@figma/code-connect/html';

figma.connect(
  NonLinearReading,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642637',
  {
    props: {
      text: figma.textContent('Keyword'),
    },
    example: (props) => (
      <NonLinearReading definition={<>Plain text</>}>
        {props.text}
      </NonLinearReading>
    ),
  }
);

figma.connect(
  NonLinearReading,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642749',
  {
    props: {
      markup: figma.enum('Keywords', {
        '1': html`<NonLinearReading definition={<>Plain text</>}>Keyword</NonLinearReading>Text after`,
        '2': html`<NonLinearReading definition={<>Plain text</>}>Keyword</NonLinearReading>Text between<NonLinearReading definition={<>Plain text</>}>Keyword</NonLinearReading>Text after`,
      }),
    },
    example: (props) => <p>Text before{props.markup}</p>,
  }
);

figma.connect(
  NonLinearReading,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642685',
  {
    props: {
      markup: figma.enum('Keywords', {
        '1': html`<NonLinearReading definition={<>Text before Text before<NonLinearReading definition={<>Plain text</>}>Keyword</NonLinearReading>Text after Text before</>}>Keyword</NonLinearReading>Text after`,
        '2': html`<NonLinearReading definition={<>Text before Text before<NonLinearReading definition={<>Plain text</>}>Keyword</NonLinearReading>Text after Text before</>}>Keyword</NonLinearReading>Text between<NonLinearReading definition={<>Text before Text before<NonLinearReading definition={<>Plain text</>}>Keyword</NonLinearReading>Text after Text before</>}>Keyword</NonLinearReading>Text after`,
      }),
    },
    example: (props) => <p>Text before{props.markup}</p>,
  }
);

figma.connect(
  NonLinearReading,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642655',
  {
    example: () => (
      <p>
        Text before
        <NonLinearReading definition={<>Plain text</>}>
          Keyword
        </NonLinearReading>
        Text after
      </p>
    ),
  }
);
