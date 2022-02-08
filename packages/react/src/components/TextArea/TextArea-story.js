/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import TextArea from '../TextArea';
import TextAreaSkeleton from '../TextArea/TextArea.Skeleton';
import mdx from './TextArea.mdx';
import { FeatureFlags } from '../FeatureFlags';

const TextAreaProps = () => ({
  className: 'some-class',
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  hideLabel: boolean('No label (hideLabel)', false),
  labelText: text('Label text (labelText)', 'Text Area label'),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Content of form validation UI (invalidText)',
    'A valid value is required'
  ),
  helperText: text('Helper text (helperText)', 'Optional helper text.'),
  enableCounter: boolean(
    'Enable character counter/limit (enableCounter)',
    false
  ),
  maxCount: number('Character limit (maxCount)', undefined),
  id: 'test2',
  cols: number('Columns (columns)', 50),
  rows: number('Rows (rows)', 4),
  onChange: action('onChange'),
  onClick: action('onClick'),
});

export default {
  title: 'Components/TextArea',
  component: TextArea,
  decorators: [withKnobs],
  subcomponents: {
    TextAreaSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => <TextArea {...TextAreaProps()} />;

export const Skeleton = () => <TextAreaSkeleton />;

export const ClassNameChangeTest = () => (
  <>
    <TextArea
      labelText="Text area label"
      placeholder="The class should be added to the label"
      helperText="Optional helper text."
      className="TEST_CLASS"
    />
    <br />
    <FeatureFlags flags={{ 'enable-v11-release': true }}>
      <TextArea
        labelText="Text area label"
        placeholder="The class should be added to the wrapper"
        helperText="Optional helper text."
        className="TEST_CLASS"
      />
    </FeatureFlags>
  </>
);
