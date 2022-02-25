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
import mdx from './TextInput.mdx';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  subcomponents: {
    TextInputSkeleton,
    'TextInput.PasswordInput': TextInput.PasswordInput,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <TextInput
    type="text"
    labelText="Text input label"
    helperText="Optional help text"
  />
);

export const Fluid = () => (
  <FluidForm>
    <TextInput type="text" labelText="Text input label" />
  </FluidForm>
);

export const TogglePasswordVisibility = () => {
  return (
    <TextInput.PasswordInput
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
      />
      <Layer>
        <TextInput
          type="text"
          labelText="Second layer"
          helperText="Optional help text"
        />
        <Layer>
          <TextInput
            type="text"
            labelText="Third layer"
            helperText="Optional help text"
          />
        </Layer>
      </Layer>
    </>
  );
};

export const Skeleton = () => <TextInputSkeleton />;
