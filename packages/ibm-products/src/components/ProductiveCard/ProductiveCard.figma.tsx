/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ProductiveCard } from './ProductiveCard';
import figma from '@figma/code-connect';

figma.connect(
  ProductiveCard,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=5970%3A355091',
  {
    props: {
      CardActionBlockProps: figma.nestedProps(
        '_Productive card action title block base',
        {
          title: figma.textContent('Title'),
          label: figma.textContent('Label'),
          description: figma.textContent('Caption'),
        }
      ),
      primaryButtonProps: figma.boolean('Clickable - feature flag', {
        true: {
          primaryButtonText: undefined,
          onPrimaryButtonClick: undefined,
        },
        false: figma.boolean('Footer', {
          true: {
            primaryButtonText: 'Button',
            onPrimaryButtonClick: () => console.log('Button clicked'),
          },
          false: {
            primaryButtonText: undefined,
            onPrimaryButtonClick: undefined,
          },
        }),
      }),

      slotChildren: figma.boolean('Slot', {
        true: figma.nestedProps('_Card slot base', {
          slot: figma.children('Slot'),
        }),
        false: { slot: undefined },
      }),
      descriptionChildren: figma.boolean('Description', {
        true: figma.nestedProps('_Card description base', {
          description: figma.textContent('Description'),
        }),
        false: { description: undefined },
      }),
    },
    example: (props) => (
      <ProductiveCard
        title={props.CardActionBlockProps.title}
        label={props.CardActionBlockProps.label}
        description={props.CardActionBlockProps.description}
        primaryButtonText={props.primaryButtonProps.primaryButtonText}
        onPrimaryButtonClick={props.primaryButtonProps.onPrimaryButtonClick}
      >
        {props.slotChildren.slot}
        {props.descriptionChildren.description}
      </ProductiveCard>
    ),
  }
);
