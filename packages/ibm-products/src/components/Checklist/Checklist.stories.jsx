/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { getSelectedCarbonTheme } from '../../global/js/utils/story-helper';

import { Checklist } from '.';
import { TruncatedText } from '../TruncatedText';

import styles from './_storybook-styles.scss?inline';
import DocsPage from './Checklist.docs-page';

const storyClass = 'checklist-stories';

const taskLists = [
  {
    title: 'Section label',
    tasks: [
      {
        kind: 'checked',
        label: 'Task name',
        url: 'https://www.ibm.com/',
        onClick: (task) => {
          action('task')(task);
          // The onClick event returns all of the task's object's properties.
          // E.g. console.log(task) returns:
          // {
          //   kind: 'checked',
          //   label: 'Task name',
          //   onClick: f(),
          //   url: 'https://www.ibm.com/',
          // }
        },
      },
      {
        kind: 'indeterminate',
        label: 'Task name',
        onClick: (task) => {
          action('task')(task);
          // E.g. define your own inline code
          // window.open('https://www.ibm.com/', '_blank').focus();
        },
      },
      {
        kind: 'unchecked',
        label: 'Task name',
        guid: '6B29FC40-CA47-1067-B31D-00DD010662DA',
        onClick: (task) => {
          action('task')(task);
          // E.g. trigger your own callback
          // handleClick(task.guid);
        },
      },
    ],
  },
];

export default {
  title: 'Components/Onboarding/Checklist',
  component: Checklist,
  tags: ['autodocs', 'Onboarding'],
  argTypes: {
    taskLists: {
      table: {
        type: {
          detail: `[{
            title: string,
            tasks: [{
              kind: 'unchecked' | 'indeterminate' | 'checked' | 'disabled' | 'error',
              label: string,
              onClick: func,
            }]
          }]`,
        },
      },
    },
    theme: {
      control: { type: null },
      table: {
        defaultValue: { summary: 'light' },
        type: { summary: "'light' | 'dark'" },
      },
    },
  },
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
    layout: 'padded',
  },
};

const Template = (args) => {
  const theme = getSelectedCarbonTheme();

  return (
    <div className={`${storyClass}__viewport`}>
      <Checklist {...args} theme={theme} />
    </div>
  );
};

export const checklist = Template.bind({});
checklist.args = {
  onClickViewAll: () => {
    action('view all')();
  },
  onToggle: (isOpen) => {
    action(`toggle ${isOpen ? 'open' : 'closed'}`)();
  },
  chartValue: 0.15,
  chartLabel: (
    <TruncatedText
      autoAlign
      align="bottom"
      id="example-id-1"
      lines={2}
      type="tooltip"
      value="15% complete"
    />
  ),
  taskLists: taskLists,
  title: (
    <TruncatedText
      autoAlign
      align="bottom"
      id="example-id-2"
      lines={2}
      type="tooltip"
      value="A long title running over the lines to show truncation and tooltips"
    />
  ),
  viewAllLabel: `View all (10)`,
};

export const taskStates = Template.bind({});
taskStates.storyName = 'Task states';
taskStates.args = {
  taskLists: [
    {
      title: 'Unchecked state',
      tasks: [
        {
          kind: 'unchecked',
          label: 'Task name',
          onClick: action('task'),
        },
        {
          kind: 'unchecked',
          label: 'Task name',
        },
      ],
    },
    {
      title: 'Indeterminate state',
      tasks: [
        {
          kind: 'indeterminate',
          label: 'Task name',
          onClick: action('task'),
        },
        { kind: 'indeterminate', label: 'Task name' },
      ],
    },
    {
      title: 'Checked state',
      tasks: [
        {
          kind: 'checked',
          label: 'Task name',
          onClick: action('task'),
        },
        { kind: 'checked', label: 'Task name' },
      ],
    },
    {
      title: 'Disabled state',
      tasks: [
        { kind: 'disabled', label: 'Task name' },
        {
          kind: 'disabled',
          label: 'Task name',
          onClick: action('task'),
        },
      ],
    },
    {
      title: 'Error state',
      tasks: [
        { kind: 'error', label: 'Task name' },
        {
          kind: 'error',
          label: 'Task name',
          onClick: action('task'),
        },
      ],
    },
  ],
};
