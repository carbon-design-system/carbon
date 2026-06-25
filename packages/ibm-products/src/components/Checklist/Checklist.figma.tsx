/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Checklist } from './Checklist';
import figma from '@figma/code-connect';
import { Kinds } from './Checklist.types';

figma.connect(
  Checklist,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728%3A642157',
  {
    props: {
      // No matching props could be found for these Figma properties:
      title: figma.string('Heading text'),
      chartLabel: figma.string('Progress text'),
      footerLinkLabel: figma.nestedProps('Link', {
        text: figma.textContent('Link'),
      }),
    },
    example: (props) => (
      <Checklist
        title={props.title}
        chartLabel={props.chartLabel}
        chartValue={0.15}
        viewAllLabel={props.footerLinkLabel.text}
        taskLists={[
          {
            title: 'Section label',
            tasks: [
              {
                kind: Kinds.unchecked,
                label: 'Task name',
                onClick: () => {},
              },
              {
                kind: Kinds.unchecked,
                label: 'Task name',
                onClick: () => {},
              },
              {
                kind: Kinds.unchecked,
                label: 'Task name',
                onClick: () => {},
              },
            ],
          },
        ]}
      />
    ),
  }
);
