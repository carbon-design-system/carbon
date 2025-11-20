/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import { WithDisplayBox } from '../../../.storybook/templates/WithDisplayBox';
import {
  fluidButtonLabels,
  fluidButtonMapping,
  fluidButtonOptions,
} from '../Button/__story__/fluid-button-set-args';

export default {
  title: 'Components/Button/Button Set',
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
      include: ['Fluid Buttons', 'Stacked'],
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
    },
  },
  render: ({ ...rest }) => {
    const buttons = rest['Fluid Buttons'];

    if (!buttons || buttons === 0) {
      return <div>Select one or more buttons.</div>;
    }

    return (
      <WithDisplayBox>
        <ButtonSet fluid>
          {buttons.map(({ label, kind, key }) => (
            <Button key={key} kind={kind}>
              {label}
            </Button>
          ))}
        </ButtonSet>
      </WithDisplayBox>
    );
  },
};

Fluid.args = {
  'Fluid Buttons': 1,
};
