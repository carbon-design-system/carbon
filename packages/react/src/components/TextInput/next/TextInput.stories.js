/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidForm from '../../FluidForm';
import { default as TextInput, TextInputSkeleton } from '../../TextInput';
import { Layer } from '../../Layer';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  subcomponents: {
    TextInputSkeleton,
    'TextInput.PasswordInput': TextInput.PasswordInput,
  },
};

export const Default = () => (
  <TextInput
    id="text-input-1"
    type="text"
    labelText="Text input label"
    helperText="Optional help text"
  />
);

export const Fluid = () => (
  <FluidForm>
    <TextInput type="text" labelText="Text input label" id="text-input-1" />
  </FluidForm>
);

export const TogglePasswordVisibility = () => {
  return (
    <TextInput.PasswordInput
      id="text-input-1"
      labelText="Text input label"
      helperText="Optional help text"
    />
  );
};

export const ReadOnly = () => {
  return (
    <TextInput
      labelText="Text input label"
      helperText="Optional help text"
      value="This is read only, you can't type more."
      readOnly
    />
  );
};

export const WithLayer = () => {
  return (
    <>
      <TextInput
        type="text"
        labelText="First layer"
        helperText="Optional help text"
        id="text-input-1"
      />
      <Layer>
        <TextInput
          type="text"
          labelText="Second layer"
          helperText="Optional help text"
          id="text-input-2"
        />
        <Layer>
          <TextInput
            type="text"
            labelText="Third layer"
            helperText="Optional help text"
            id="text-input-3"
          />
        </Layer>
      </Layer>
    </>
  );
};

export const Skeleton = () => <TextInputSkeleton />;

export const Playground = (args) => (
  <TextInput
    {...args}
    labelText="Text input label"
    helperText="Optional help text"
    id="text-input-1"
    type="text"
  />
);
