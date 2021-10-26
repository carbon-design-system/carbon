/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TextInput, TextInputSkeleton, FluidForm } from '.';
import { Layer } from '../Layer';
import mdx from './TextInput.mdx';

export default {
  title: 'Components/TextInput',

  parameters: {
    component: TextInput,
    docs: {
      page: mdx,
    },
    subcomponents: {
      TextInputSkeleton,
      'TextInput.PasswordInput': TextInput.PasswordInput,
    },
  },
};

export const Default = () => (
  <TextInput
    type="text"
    labelText="Text input label"
    defaultValue="This is not a default value"
    helperText="Optional help text"
  />
);

export const Fluid = () => (
  <FluidForm>
    <TextInput
      type="text"
      labelText="Text input label"
      defaultValue="This is not a default value"
    />
  </FluidForm>
);

export const TogglePasswordVisibility = () => {
  return (
    <TextInput.PasswordInput
      labelText="Text input label"
      defaultValue="This is not a default value"
      helperText="Optional help text"
    />
  );
};

export const withLayer = () => {
  return (
    <>
      <TextInput
        type="text"
        labelText="First layer"
        defaultValue="This is not a default value"
        helperText="Optional help text"
      />
      <Layer>
        <TextInput
          type="text"
          labelText="Second layer"
          defaultValue="This is not a default value"
          helperText="Optional help text"
        />
        <Layer>
          <TextInput
            type="text"
            labelText="Third layer"
            defaultValue="This is not a default value"
            helperText="Optional help text"
          />
        </Layer>
      </Layer>
    </>
  );
};

export const Skeleton = () => <TextInputSkeleton />;
