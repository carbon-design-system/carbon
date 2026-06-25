/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ExpressiveCard } from './ExpressiveCard';
import { AspectRatio } from '@carbon/react';
import { ArrowRight, Cloud } from '@carbon/react/icons';
import figma from '@figma/code-connect';

figma.connect(
  ExpressiveCard,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9053-414333',
  {
    props: {
      pictogram: figma.enum('Media', {
        None: undefined,
        Top: undefined,
        Left: undefined,
        Pictogram: Cloud,
      }),
      r2Props: figma.nestedProps('R:2 | Title bar', {
        title: figma.boolean('Title', {
          true: figma.string('Title text'),
          false: undefined,
        }),
        description: figma.boolean('Caption', {
          true: figma.string('Caption text'),
          false: undefined,
        }),
        label: figma.boolean('Label', {
          true: figma.string('Label text'),
          false: undefined,
        }),
      }),
      descProps: figma.boolean('Description', {
        true: figma.nestedProps('_Card description base', {
          description: figma.string('Description text'),
        }),
        false: { description: undefined },
      }),

      slotProps: figma.boolean('Slot', {
        true: figma.nestedProps('_Card slot base', {
          slotChildren: figma.children('Slot'),
        }),
        false: {
          slotChildren: undefined,
        },
      }),
      mediaPosition: figma.enum('Media', {
        None: undefined,
        Top: 'top',
        Left: 'left',
        Pictogram: undefined,
      }),
      mediaProps: figma.enum('Media', {
        None: { media: undefined },
        Top: figma.nestedProps('Aspect ratio', {
          media: figma.enum('Aspect ratio', {
            '1:1': <AspectRatio ratio="1x1">1:1</AspectRatio>,
            '4:3': <AspectRatio ratio="4x3">4:3</AspectRatio>,
            '3:2': <AspectRatio ratio="3x2">3:2</AspectRatio>,
            '16:9': <AspectRatio ratio="16x9">16:9</AspectRatio>,
            '2:1': <AspectRatio ratio="2x1">2:1</AspectRatio>,
          }),
        }),
        Left: figma.nestedProps('Aspect ratio', {
          media: figma.enum('Aspect ratio', {
            '1:1': <AspectRatio ratio="1x1">1:1</AspectRatio>,
            '4:3': <AspectRatio ratio="4x3">4:3</AspectRatio>,
            '3:2': <AspectRatio ratio="3x2">3:2</AspectRatio>,
            '16:9': <AspectRatio ratio="16x9">16:9</AspectRatio>,
            '2:1': <AspectRatio ratio="2x1">2:1</AspectRatio>,
          }),
        }),
        Pictogram: { media: undefined },
      }),

      aspectRatioProps: figma.enum('Media', {
        None: {
          media: undefined,
        },
        Top: {
          media: <AspectRatio ratio="1x1">1:1</AspectRatio>,
        },
        Left: {
          media: <AspectRatio ratio="1x1">1:1</AspectRatio>,
        },
        Pictogram: {
          mediaProps: { media: undefined },
        },
      }),

      actionBarProps: figma.nestedProps('_Expressive card action bar base', {
        actionIcons: figma.enum('Type', {
          'Primary + ghost': undefined,
          'Primary only': undefined,
          'Primary full bleed': undefined,
          'Icon only': [
            {
              id: '1',
              icon: () => <ArrowRight size={18} />,
              iconDescription: 'Visit carbon official site',
            },
          ],
        }),
        primaryButtonKind: figma.enum('Type', {
          'Primary + ghost': 'primary',
          'Primary only': 'primary',
          'Primary full bleed': 'primary',
          'Icon only': undefined,
        }),
        primaryButtonText: figma.enum('Type', {
          'Primary + ghost': 'Button',
          'Primary only': 'Button',
          'Primary full bleed': 'Button',
          'Icon only': undefined,
        }),
        secondaryButtonKind: figma.enum('Type', {
          'Primary + ghost': 'ghost',
          'Primary only': undefined,
          'Primary full bleed': undefined,
          'Icon only': undefined,
        }),
        secondaryButtonText: figma.enum('Type', {
          'Primary + ghost': 'Button',
          'Primary only': undefined,
          'Primary full bleed': undefined,
          'Icon only': undefined,
        }),
      }),
    },
    example: (props) => (
      <ExpressiveCard
        pictogram={props.pictogram}
        mediaPosition={props.mediaPosition}
        media={props.mediaProps.media}
        title={props.r2Props.title}
        description={props.r2Props.description}
        label={props.r2Props.label}
        primaryButtonKind={props.actionBarProps.primaryButtonKind}
        primaryButtonText={props.actionBarProps.primaryButtonText}
        secondaryButtonKind={props.actionBarProps.secondaryButtonKind}
        secondaryButtonText={props.actionBarProps.secondaryButtonText}
        actionIcons={props.actionBarProps.actionIcons}
      >
        {props.descProps.description}
        {props.slotProps.slotChildren}
      </ExpressiveCard>
    ),
  }
);
