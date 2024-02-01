/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ChatButton from './';

export default {
  title: 'Experimental/unstable__ChatButton',
  component: ChatButton,
  parameters: {},
  argTypes: {
    onChange: {
      action: 'onChange',
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
  <div className="test-button">
    <div className="test-button-sizes">
      {' '}
      <ChatButton size="xs">Test</ChatButton>
      <ChatButton size="md">Test</ChatButton>
      <ChatButton size="lg">Test</ChatButton>
    </div>
    <div className="test-button-kinds">
      <ChatButton kind="secondary">Test</ChatButton>
      <ChatButton kind="tertiary">Test</ChatButton>
      <ChatButton kind="ghost">Test</ChatButton>
      <ChatButton kind="danger">Test</ChatButton>
    </div>
  </div>
);
