/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { TypeAhead } from '.';
import Search from '.';

export default {
  title: 'Components/Search/TypeAhead',
  component: TypeAhead,
  args: {
    size: 'md',
    suggestions: [
      'How to check your emails before noon',
      'How to water your plants properly',
      'How to find and try a new coffee shop nearby',
      'How to finish reading a book you started',
      'How to schedule a meeting with the design team',
      'How to update your resume with recent projects',
      'How to take a refreshing short walk',
      'How to organize your workspace for productivity',
      'How to plan meals for the upcoming week',
      'How to back up important files to the cloud',

      'How to start a morning routine that works',
      'How to stay focused while working from home',
      'How to prepare for a job interview',
      'How to improve your time management skills',
      'How to clean and declutter your room',
      'How to create a weekly workout plan',
      'How to cook a healthy dinner quickly',
      'How to save money every month',
      'How to learn a new skill online',
      'How to build better daily habits',

      'What to do when you feel unproductive',
      'What to pack for a weekend trip',
      'What to include in a professional resume',
      'What to eat for a balanced breakfast',
      'What to ask during a team meeting',
      'What to do before going to sleep',
      'What to prioritize in your daily schedule',
      'What to keep in your work backpack',
      'What to review before submitting a project',
      'What to do during a study break',
    ],
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
  },
};

export const Default = (args) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '400px' }}>
      <TypeAhead
        value={value}
        suggestions={args.suggestions}
        size={args.size}
        onSelect={(suggestion) => {
          setValue(suggestion);
        }}>
        <Search
          id="search-default-1"
          size={args.size}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </TypeAhead>
    </div>
  );
};
