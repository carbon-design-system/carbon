/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import {
  fluidButtonLabels,
  fluidButtonMapping,
  fluidButtonOptions,
} from '../Button/__story__/fluid-button-set-args';
import { background } from 'storybook/internal/theming';

export default {
  title: 'Components/Button/Set Of Buttons',
  component: ButtonSet,
};

export const Default = (args) => {
  return (
    <ButtonSet>
      <Button kind="secondary" {...args}>
        Secondary button
      </Button>
      <Button kind="primary" {...args}>
        Primary button
      </Button>
    </ButtonSet>
  );
};

export const Fluid = {
  parameters: {
    controls: {
      include: [
        'Container width',
        'Container visible',
        'Fluid Buttons',
        'Stacked',
      ],
    },
  },
  argTypes: {
    'Fluid Buttons': {
      control: {
        type: 'select',
        labels: fluidButtonLabels,
      },
      options: fluidButtonOptions,
      mapping: fluidButtonMapping,
      description: 'Sets the number and type of buttons in the set',
    },
    'Container width': {
      control: {
        type: 'range',
        min: '280',
        max: '1200',
        step: '1',
      },
      description: 'Sets the width of the ButtonSet container',
    },
    'Container visible': {
      control: {
        type: 'boolean',
      },
      description: 'Show the ButtonSet container using Carbon layer styling',
    },
  },

  render: ({ ...rest }) => {
    const buttons = rest['Fluid Buttons'];
    const containerStyle = {
      inlineSize: rest['Container width'] + 'px',
      maxInlineSize: '100%',
    };
    if (rest['Container visible']) {
      // 42px is the padding around the story
      containerStyle.boxShadow = '0 0 0 42px var(--cds-layer-01)';
    }

    if (!buttons || buttons === 0) {
      return <div>Select one or more buttons.</div>;
    }

    return (
      <div style={containerStyle}>
        <ButtonSet fluid>
          {buttons.map(({ label, kind, key }) => (
            <Button key={key} kind={kind}>
              {label}
            </Button>
          ))}
        </ButtonSet>
      </div>
    );
  },
};

Fluid.args = {
  'Fluid Buttons': 8,
  'Container width': 600,
  'Container visible': false,
};
