/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ChatButton, ChatButtonSkeleton } from './';
import { Add } from '@carbon/icons-react';
import './chat-button-story.scss';

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
      <h3>Sizes</h3>
      <br />
      <ChatButton size="sm" renderIcon={Add}>
        Primary
      </ChatButton>
      <ChatButton size="md" renderIcon={Add}>
        Primary
      </ChatButton>
      <ChatButton size="lg" renderIcon={Add}>
        Primary
      </ChatButton>
      <br />
      <br />
      <ChatButton size="sm">Primary</ChatButton>
      <ChatButton size="md">Primary</ChatButton>
      <ChatButton size="lg">Primary</ChatButton>
    </div>
    <div className="test-button-kinds">
      <h3>Kinds</h3>
      <br />
      <ChatButton kind="primary" renderIcon={Add}>
        Primary
      </ChatButton>
      <ChatButton kind="secondary" renderIcon={Add}>
        Secondary
      </ChatButton>
      <ChatButton kind="tertiary" renderIcon={Add}>
        Tertiary
      </ChatButton>
      <ChatButton kind="ghost" renderIcon={Add}>
        Ghost
      </ChatButton>
      <ChatButton kind="danger" renderIcon={Add}>
        Danger
      </ChatButton>
      <br />
      <br />
      <ChatButton kind="primary">Primary</ChatButton>
      <ChatButton kind="secondary">Secondary</ChatButton>
      <ChatButton kind="tertiary">Tertiary</ChatButton>
      <ChatButton kind="ghost">Ghost</ChatButton>
      <ChatButton kind="danger">Danger</ChatButton>
    </div>
    <div className="test-button-quick-action">
      <h3>Quick action</h3>
      <br />
      <ChatButton isQuickAction renderIcon={Add}>
        Quick action
      </ChatButton>
      <ChatButton isSelected isQuickAction renderIcon={Add}>
        Selected and Enabled
      </ChatButton>
      <ChatButton disabled isSelected isQuickAction renderIcon={Add}>
        Selected and Disabled
      </ChatButton>
      <ChatButton disabled isQuickAction renderIcon={Add}>
        Disabled
      </ChatButton>
      <br />
      <br />
      <ChatButton isQuickAction>Quick action</ChatButton>
      <ChatButton isSelected isQuickAction>
        Selected and Enabled
      </ChatButton>
      <ChatButton disabled isSelected isQuickAction>
        Selected and Disabled
      </ChatButton>
      <ChatButton disabled isQuickAction>
        Disabled
      </ChatButton>
    </div>

    <div className="test-button-skeleton">
      <h3>Skeleton</h3>
      <br />
      <ChatButtonSkeleton size="sm" />
      <ChatButtonSkeleton size="md" />
      <ChatButtonSkeleton />
    </div>
  </div>
);
