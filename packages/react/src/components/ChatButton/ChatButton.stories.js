/**
 * Copyright IBM Corp. 2022, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Add } from '@carbon/icons-react';
import { ChatButton, ChatButtonSkeleton } from './';

const icons = {
  Add,
};

const sizeArgType = {
  options: ['sm', 'md', 'lg'],
  control: { type: 'select' },
};

const chatButtonArgTypes = {
  children: {
    control: { type: 'text' },
  },
  className: {
    control: { type: 'text' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  isQuickAction: {
    control: { type: 'boolean' },
  },
  isSelected: {
    control: { type: 'boolean' },
  },
  kind: {
    options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
    control: { type: 'select' },
  },
  onClick: {
    action: 'onClick',
  },
  renderIcon: {
    options: ['Add', 'None'],
    control: { type: 'select' },
  },
  size: sizeArgType,
};

export default {
  title: 'Preview/preview__ChatButton',
  component: ChatButton,
  subcomponents: { ChatButtonSkeleton },
};

export const Default = (args) => {
  const { renderIcon, ...rest } = args;
  return (
    <ChatButton
      {...rest}
      renderIcon={renderIcon === 'None' ? undefined : icons[renderIcon]}
    />
  );
};

Default.args = {
  children: 'Ask AI',
  className: '',
  disabled: false,
  isQuickAction: false,
  isSelected: false,
  kind: 'primary',
  renderIcon: 'Add',
  size: 'lg',
};

Default.argTypes = chatButtonArgTypes;

Default.parameters = {
  controls: {
    include: Object.keys(chatButtonArgTypes),
  },
};

export const Skeleton = (args) => <ChatButtonSkeleton {...args} />;

Skeleton.args = {
  size: 'lg',
};

Skeleton.argTypes = {
  size: sizeArgType,
};

Skeleton.parameters = {
  controls: {
    include: ['size'],
  },
};
