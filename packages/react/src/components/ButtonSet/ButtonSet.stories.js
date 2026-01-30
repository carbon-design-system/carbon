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
import { action } from 'storybook/actions';

const styles = `
  .buttonSetContainer {
    inline-size: var(--container-width, 600px);
    max-inline-size: 100%;
    contain: layout paint;
  }

  .buttonSetContainer--visible {
    box-shadow: 0 0 0 42px var(--cds-layer-01);
  }
`;

export default {
  title: 'Components/Button/Set Of Buttons',
  component: ButtonSet,

  args: {
    Buttons: 4,
    'Container width': 600,
    'Container visible': false,
  },

  argTypes: {
    Buttons: {
      control: {
        type: 'select',
        labels: fluidButtonLabels,
      },
      options: fluidButtonOptions,
      mapping: fluidButtonMapping,
      description: 'Sets the number and type of buttons in the set',
      table: { category: 'story controls' },
    },

    'Container width': {
      control: {
        type: 'range',
        min: 280,
        max: 1200,
        step: 1,
      },
      description: 'Sets the width of the ButtonSet container',
      if: { arg: 'fluid', truthy: true },
      table: { category: 'story controls' },
    },

    'Container visible': {
      control: {
        type: 'boolean',
      },
      if: { arg: 'fluid', truthy: true },
      description: 'Show the ButtonSet container using Carbon layer styling',
      table: { category: 'story controls' },
    },
  },
};

export const Default = {
  render: (args) => {
    const buttons = args.Buttons;

    if (!buttons || buttons.length === 0) {
      return <div>Select one or more buttons.</div>;
    }

    return (
      <>
        {/* CSS injected once per story render */}
        <style>{styles}</style>

        <div
          className={[
            'buttonSetContainer',
            args['Container visible'] && 'buttonSetContainer--visible',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            '--container-width': `${args['Container width']}px`,
          }}>
          <ButtonSet fluid={args.fluid} stacked={args.stacked}>
            {buttons.map(({ label, kind, key }) => (
              <Button key={key} kind={kind} onClick={action('onClick')}>
                {label}
              </Button>
            ))}
          </ButtonSet>
        </div>
      </>
    );
  },
};
