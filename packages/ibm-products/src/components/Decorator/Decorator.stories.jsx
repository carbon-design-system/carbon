/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { previewCandidate__Decorator as Decorator } from '..';
import mdx from './Decorator.mdx';

import styles from './_storybook-styles.scss?inline';

const scoreOptions = {
  '-1 (less than 0 is 0)': -1,
  '0 ': 0,
  '1 ': 1,
  '2 ': 2,
  '3 ': 3,
  '4 ': 4,
  '5 ': 5,
  '6 ': 6,
  '7 ': 7,
  '8 ': 8,
  '9 ': 9,
  '10 ': 10,
  '11 (greater than 10 is 10)': 11,
  'NaN; treated as "Unknown"': null,
};

export default {
  title: 'Preview Candidate/Decorator',
  component: Decorator,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    // For internal use only.
    kind: { table: { disable: true } },
    // ...
    className: { control: { type: {} } },
    setLabelTitle: { control: { type: {} } },
    score: {
      control: {
        type: 'select',
        labels: Object.keys(scoreOptions),
      },
      mapping: Object.values(scoreOptions),
      options: Object.values(scoreOptions).map((_k, i) => i),
    },
    theme: {
      control: {
        type: 'select',
        labels: ['use default', 'light', 'dark'],
      },
      mapping: {
        0: null,
        1: 'light',
        2: 'dark',
      },
      options: [0, 1, 2],
    },
    truncateValue: {
      control: {
        type: 'select',
        labels: {
          0: 'No truncation',
          1: '"end"',
          2: '"start"',
          3: '{ maxLength:20, front:9, back:10 }',
        },
      },
      mapping: {
        0: undefined,
        1: 'end',
        2: 'start',
        3: { maxLength: 20, front: 9, back: 10 },
      },
      options: [0, 1, 2, 3],
    },
  },
  args: {
    theme: 0,
    truncateValue: 0,
  },
};

const Template = (args) => {
  if (args.truncateValue) {
    return (
      <>
        <div style={{ padding: '0 0 1rem' }}>With limited width.</div>
        <div
          style={{
            maxWidth: '16rem',
            padding: '3px',
            outline: '2px dashed #999',
          }}
        >
          <Decorator {...args} value="Very long value to show truncation" />
        </div>
      </>
    );
  }

  return <Decorator {...args} />;
};

export const Default = Template.bind({});
Default.storyName = 'Decorator';
Default.args = {
  hideIcon: false,
  label: 'IP',
  score: 5,
  scoreThresholds: [0, 4, 7, 10],
  setLabelTitle: (score, scoreThresholds, magnitude) => {
    if (typeof score !== 'number') {
      return 'Unknown score';
    }
    return `"${magnitude}" magnitude. Score ${score} out of ${
      scoreThresholds[scoreThresholds.length - 1]
    }`;
  },
  small: false,
  value: '192.168.0.50',
  valueTitle: '',
};
