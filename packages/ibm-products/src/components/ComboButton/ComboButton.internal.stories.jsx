/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { CloudApp } from '@carbon/react/icons';
import { ComboButton, ComboButtonItem } from '..';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Internal/ComboButton',
  component: ComboButton,
  tags: ['autodocs'],
};

const Template = () => (
  <Annotation
    type="deprecation-notice"
    text={
      <div>
        This component is deprecated and will be removed in the next major
        version. Please migrate to Carbon&apos;s{' '}
        <a href="https://react.carbondesignsystem.com/?path=/docs/components-combobutton--overview">
          ComboButton
        </a>
        .
      </div>
    }
  >
    <ComboButton>
      <ComboButtonItem>ComboButtonItem 1</ComboButtonItem>
      <ComboButtonItem
        renderIcon={(props) => <CloudApp size={16} {...props} />}
      >
        ComboButtonItem 2
      </ComboButtonItem>
      <ComboButtonItem>ComboButtonItem 3</ComboButtonItem>
    </ComboButton>
  </Annotation>
);

export const Default = Template.bind({});
