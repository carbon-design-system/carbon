/**
 * Copyright IBM Corp. 2016, 2018
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
};

export const Default = () => (
  <TextArea
    labelText="Text Area label"
    helperText="Optional helper text"
    cols={50}
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
        cols={50}
        rows={4}
        id="text-area-1"
      />
      <Layer>
        <TextArea
          labelText="Second layer"
          helperText="Optional helper text"
          cols={50}
          rows={4}
          id="text-area-1"
        />
        <Layer>
          <TextArea
            labelText="Third layer"
            helperText="Optional helper text"
            cols={50}
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
    control: {
      type: 'text',
    },
  },
  cols: {
    control: {
      type: 'number',
    },
    defaultValue: 50,
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  value: {
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
    control: {
      type: 'text',
    },
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
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  light: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  maxCount: {
    control: {
      type: 'number',
    },
  },
};

Playground.args = {
  enableCounter: true,
  helperText: 'TextArea helper text',
  labelText: 'TextArea label',
  maxCount: 500,
};
