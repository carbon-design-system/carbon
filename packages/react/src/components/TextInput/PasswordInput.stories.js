/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PasswordInput } from '../PasswordInput';

const args = {
  autoComplete: 'current-password',
  className: '',
  defaultValue: '',
  defaultWidth: 300,
  disabled: false,
  helperText: 'Use at least 8 characters',
  hideLabel: false,
  hidePasswordLabel: 'Hide password',
  id: 'password-input-1',
  inline: false,
  invalid: false,
  invalidText: 'Password must be at least 8 characters',
  labelText: 'Password',
  placeholder: 'Enter your password',
  readOnly: false,
  showPasswordLabel: 'Show password',
  size: 'md',
  tooltipAlignment: 'end',
  tooltipPosition: 'bottom',
  type: 'password',
  warn: false,
  warnText: 'Password strength is low',
};

const argTypes = {
  autoComplete: {
    control: { type: 'text' },
  },
  className: {
    control: { type: 'text' },
  },
  defaultValue: {
    control: { type: 'text' },
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  helperText: {
    control: { type: 'text' },
  },
  hideLabel: {
    control: { type: 'boolean' },
  },
  hidePasswordLabel: {
    control: { type: 'text' },
  },
  id: {
    control: { type: 'text' },
  },
  inline: {
    control: { type: 'boolean' },
  },
  invalid: {
    control: { type: 'boolean' },
  },
  invalidText: {
    control: { type: 'text' },
  },
  labelText: {
    control: { type: 'text' },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  onTogglePasswordVisibility: {
    action: 'onTogglePasswordVisibility',
  },
  placeholder: {
    control: { type: 'text' },
  },
  readOnly: {
    control: { type: 'boolean' },
  },
  showPasswordLabel: {
    control: { type: 'text' },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  tooltipAlignment: {
    options: ['start', 'center', 'end'],
    control: { type: 'radio' },
  },
  tooltipPosition: {
    options: ['top', 'right', 'bottom', 'left'],
    control: { type: 'radio' },
  },
  type: {
    options: ['password', 'text'],
    control: { type: 'radio' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
  },
};

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  args,
  argTypes,
  parameters: {
    controls: {
      include: Object.keys(argTypes),
    },
  },
};

export const Default = ({ defaultWidth, ...passwordInputArgs }) => (
  <div style={{ width: defaultWidth }}>
    <PasswordInput {...passwordInputArgs} />
  </div>
);
