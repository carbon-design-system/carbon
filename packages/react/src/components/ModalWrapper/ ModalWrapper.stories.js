/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ModalWrapper from './ModalWrapper';

export default {
  title: 'Deprecated/ModalWrapper',
  component: ModalWrapper,
  args: {
    theme: 'g10',
  },
  argTypes: {
    theme: {
      options: ['white', 'g10', 'g90', 'g100'],
      control: { type: 'select' },
      description: 'The theme to apply to the component.',
    },
    triggerButtonKind: {
      options: [
        'primary',
        'secondary',
        'danger',
        'ghost',
        'danger--primary',
        'danger--ghost',
        'danger--tertiary',
        'tertiary',
      ],
    },
  },
};

export const Default = (args) => {
  return (
    <ModalWrapper
      buttonTriggerText="Launch modal"
      modalHeading="Modal heading"
      modalLabel="Label"
      handleSubmit={() => {}}
      {...args}>
      <p>Modal content here</p>
    </ModalWrapper>
  );
};
