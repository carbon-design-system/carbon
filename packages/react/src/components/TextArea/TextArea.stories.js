/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as TextArea, TextAreaSkeleton } from './';
import { Layer } from '../Layer';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  subcomponents: {
    TextAreaSkeleton,
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
  <TextArea
    labelText="Text Area label"
    helperText="Optional helper text"
    rows={4}
    id="text-area-1"
  />
);

export const WithLayer = () => {
  return (
    <>
      <TextArea
        labelText="First layer"
        helperText="Optional helper text"
        rows={4}
        id="text-area-1"
      />
      <Layer>
        <TextArea
          labelText="Second layer"
          helperText="Optional helper text"
          rows={4}
          id="text-area-1"
        />
        <Layer>
          <TextArea
            labelText="Third layer"
            helperText="Optional helper text"
            rows={4}
            id="text-area-1"
          />
        </Layer>
      </Layer>
    </>
  );
};

export const Skeleton = () => <TextAreaSkeleton />;

export const Playground = (args) => <TextArea {...args} id="text-area-1" />;

Playground.argTypes = {
  className: {
    control: false,
  },
  cols: {
    control: {
      type: 'number',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  enableCounter: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  id: {
    control: false,
  },
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue: '',
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  maxCount: {
    control: {
      type: 'number',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
    defaultValue: '',
  },
  rows: {
    control: {
      type: 'number',
    },
    defaultValue: 4,
  },
};

Playground.args = {
  enableCounter: true,
  helperText: 'TextArea helper text',
  labelText: 'TextArea label',
  maxCount: 500,
};
