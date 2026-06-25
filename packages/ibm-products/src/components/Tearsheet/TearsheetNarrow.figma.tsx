/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TearsheetNarrow } from './TearsheetNarrow';
import figma from '@figma/code-connect';

figma.connect(
  TearsheetNarrow,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9837%3A338231',
  {
    props: {
      title: figma.nestedProps('R:2 | Tearsheet header item', {
        value: figma.textContent('Title'),
      }),
      description: figma.nestedProps('R:2 | Tearsheet header item', {
        value: figma.textContent('Description'),
      }),
      children: figma.children('_Tearsheet content - Narrow'),
      actions: figma.boolean('Buttons', {
        true: figma.nestedProps('R:2 | Tearsheet footer item', {
          value: figma.enum('Buttons', {
            '1': [
              {
                key: 1,
                kind: 'primary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked primary'),
              },
            ],
            '2': [
              {
                key: 1,
                kind: 'primary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked primary'),
              },
              {
                key: 2,
                kind: 'secondary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked secondary'),
              },
            ],
            '3': [
              {
                key: 1,
                kind: 'primary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked primary'),
              },
              {
                key: 2,
                kind: 'secondary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked secondary'),
              },
              {
                key: 3,
                kind: 'ghost',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked ghost'),
              },
            ],
            '4': [
              {
                key: 1,
                kind: 'primary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked primary'),
              },
              {
                key: 2,
                kind: 'secondary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked secondary'),
              },
              {
                key: 3,
                kind: 'tertiary',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked tertiary'),
              },
              {
                key: 4,
                kind: 'ghost',
                label: 'Button',
                loading: false,
                onClick: () => console.log('clicked ghost'),
              },
            ],
          }),
        }),
        false: { value: undefined },
      }),
    },
    example: (props) => (
      <TearsheetNarrow
        title={props.title.value}
        description={props.description.value}
        actions={props.actions.value}
      >
        {props.children}
      </TearsheetNarrow>
    ),
  }
);
