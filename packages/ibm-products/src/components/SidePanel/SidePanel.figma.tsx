/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { SidePanel } from './SidePanel';
import figma from '@figma/code-connect';
import { Add, Copy, Settings, TrashCan } from '@carbon/react/icons';
import { ButtonProps } from '@carbon/react';
import { CarbonIconProps } from '@carbon/icons-react';
type ButtonKind =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'danger--primary'
  | 'danger--ghost'
  | 'danger--tertiary'
  | 'tertiary';

figma.connect(
  SidePanel,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=8858%3A390246',
  {
    props: {
      size: figma.enum('Size', {
        'X-Small (256)': 'xs',
        'Small (320)': 'sm',
        'Medium (480)': 'md',
        'Large (640)': 'lg',
        'X-Large (<75%)': 'xl',
      }),
      children: figma.children('Slot'),
      title: figma.nestedProps('Header', {
        text: figma.boolean('Title', {
          true: figma.string('Title text'),
          false: undefined,
        }),
      }),
      subtitle: figma.nestedProps('Header', {
        text: figma.string('Description text'),
      }),
      labelText: figma.nestedProps('Header', {
        text: figma.boolean('Eyebrow', {
          true: figma.string('Eyebrow text'),
          false: undefined,
        }),
      }),
      slideIn: figma.boolean('Slide over', {
        true: true,
        false: undefined,
      }),
      placement: figma.boolean('Slide over', {
        true: undefined,
        false: 'right',
      }),
      selectorPageContent: figma.boolean('Slide over', {
        true: undefined,
        false: '#page-content',
      }),
      actions: figma.boolean('Primary actions', {
        false: { actionsArray: undefined },
        true: figma.nestedProps('Footer', {
          actionsArray: figma.enum('Buttons', {
            '1': [
              {
                kind: 'primary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
            ],
            '2': [
              {
                kind: 'primary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
              {
                kind: 'secondary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
            ],
            '3': [
              {
                kind: 'primary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
              {
                kind: 'secondary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
              {
                kind: 'secondary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
            ],
            '1 + Ghost': [
              {
                kind: 'primary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
              {
                kind: 'ghost' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
            ],
            '2 + Ghost': [
              {
                kind: 'primary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
              {
                kind: 'secondary' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
              {
                kind: 'ghost' as ButtonKind,
                label: 'Button',
                onClick: () => console.log('Clicked action button'),
              },
            ],
          }),
        }),
      }),
      toolbar: figma.nestedProps('Header', {
        items: figma.boolean('Action toolbar', {
          false: { actionsArray: undefined },
          true: figma.nestedProps('Action toolbar', {
            actionsArray: figma.boolean('Button', {
              true: [
                {
                  leading: true,
                  label: 'Button',
                  icon: (props: CarbonIconProps) => (
                    <Add size={16} {...props} />
                  ),
                  onClick: () => console.log('Clicked toolbar action button'),
                  kind: 'primary',
                },
                {
                  label: 'Copy',
                  icon: (props: CarbonIconProps) => (
                    <Copy size={16} {...props} />
                  ),
                  onClick: () => console.log('Clicked toolbar action button'),
                  hasIconOnly: true,
                },
                {
                  label: 'Settings',
                  icon: (props: CarbonIconProps) => (
                    <Settings size={16} {...props} />
                  ),
                  onClick: () => console.log('Clicked toolbar action button'),
                  hasIconOnly: true,
                },
                {
                  label: 'Delete',
                  icon: (props: CarbonIconProps) => (
                    <TrashCan size={16} {...props} />
                  ),
                  onClick: () => console.log('Clicked toolbar action button'),
                  hasIconOnly: true,
                },
              ],
              false: [
                {
                  label: 'Copy',
                  icon: (props: CarbonIconProps) => (
                    <Copy size={16} {...props} />
                  ),
                  onClick: () => console.log('Clicked toolbar action button'),
                  hasIconOnly: true,
                },
                {
                  label: 'Settings',
                  icon: (props: CarbonIconProps) => (
                    <Settings size={16} {...props} />
                  ),
                  onClick: () => console.log('Clicked toolbar action button'),
                  hasIconOnly: true,
                },
                {
                  label: 'Delete',
                  icon: (props: CarbonIconProps) => (
                    <TrashCan size={16} {...props} />
                  ),
                  onClick: () => console.log('Clicked toolbar action button'),
                  hasIconOnly: true,
                },
              ],
            }),
          }),
        }),
      }),
      currentStep: figma.nestedProps('Header', {
        value: figma.boolean('Back button', {
          true: 1,
          false: undefined,
        }),
      }),
    },
    example: (props) => (
      <SidePanel
        open={true}
        size={props.size}
        title={props.title.text}
        subtitle={props.subtitle.text}
        labelText={props.labelText.text}
        slideIn={props.slideIn}
        placement={props.placement}
        selectorPageContent={
          props.selectorPageContent ||
          "Enter 'selectorPageContent' if slideIn is true"
        }
        actions={props.actions.actionsArray}
        actionToolbarButtons={
          props.toolbar.items.actionsArray as ButtonProps<React.ElementType>[]
        }
        currentStep={props.currentStep.value}
      >
        {props.children}
      </SidePanel>
    ),
  }
);
