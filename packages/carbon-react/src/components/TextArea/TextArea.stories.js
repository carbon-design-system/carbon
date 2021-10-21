/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TextArea, TextAreaSkeleton } from 'carbon-components-react';
import { Layer } from '../Layer';

export default {
  title: 'Components/TextArea',
  parameters: {
    component: TextArea,
    subcomponents: {
      TextAreaSkeleton,
    },
  },
};

export const Default = () => (
  <TextArea
    labelText="Text Area label"
    helperText="Optional helper text"
    placeholder="Placeholder text"
    cols={50}
    rows={4}
    id="text-area-1"
  />
);

export const withLayer = () => {
  return (
    <>
      <TextArea
        labelText="First layer"
        helperText="Optional helper text"
        placeholder="Placeholder text"
        cols={50}
        rows={4}
        id="text-area-1"
      />
      <Layer>
        <TextArea
          labelText="Second layer"
          helperText="Optional helper text"
          placeholder="Placeholder text"
          cols={50}
          rows={4}
          id="text-area-1"
        />
        <Layer>
          <TextArea
            labelText="Third layer"
            helperText="Optional helper text"
            placeholder="Placeholder text"
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
