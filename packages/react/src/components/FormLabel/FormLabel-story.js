/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import FormLabel from './FormLabel';
import Tooltip from '../Tooltip';
import mdx from './FormLabel.mdx';

export default {
  title: 'Components/FormLabel',

  parameters: {
    component: FormLabel,
    docs: {
      page: mdx,
    },
  },
};

export const _Default = () => <FormLabel>Form label</FormLabel>;

_Default.story = {
  name: 'Form Label',
};

export const WithTooltip = () => (
  <FormLabel>
    <Tooltip triggerText="Form label">
      This can be used to provide more information about a field.
    </Tooltip>
  </FormLabel>
);

WithTooltip.story = {
  name: 'Form Label with Tooltip',
};
