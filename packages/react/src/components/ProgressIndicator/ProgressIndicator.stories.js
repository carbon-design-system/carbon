/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ProgressIndicator, ProgressStep, ProgressIndicatorSkeleton } from './';
import mdx from './ProgressIndicator.mdx';

export default {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  subcomponents: {
    ProgressStep,
    ProgressIndicatorSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ProgressIndicatorFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22progress-indicator%22%2C%22isVertical%22%3Atrue%2C%22currentIndex%22%3A0%2C%22spacing%22%3Atrue%2C%22progressSteps%22%3A%5B%7B%22label%22%3A%22Step%201%22%2C%22description%22%3A%22Step%201%20description%22%2C%22secondaryLabel%22%3A%22Optional%20label%22%2C%22invalid%22%3Afalse%2C%22disabled%22%3Afalse%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22progress-indicator-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ProgressIndicator>
      <ProgressStep
        complete
        label="First step"
        description="Step 1: Getting started with Carbon Design System"
        secondaryLabel="Optional label"
      />
      <ProgressStep
        current
        label="Second step with tooltip"
        description="Step 2: Getting started with Carbon Design System"
      />
      <ProgressStep
        label="Third step with tooltip"
        description="Step 3: Getting started with Carbon Design System"
      />
      <ProgressStep
        label="Fourth step"
        description="Step 4: Getting started with Carbon Design System"
        invalid
        secondaryLabel="Example invalid step"
      />
      <ProgressStep
        label="Fifth step"
        description="Step 5: Getting started with Carbon Design System"
        disabled
      />
    </ProgressIndicator>
  </>
);

export const Interactive = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ProgressIndicatorFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22progress-indicator%22%2C%22isVertical%22%3Atrue%2C%22currentIndex%22%3A0%2C%22spacing%22%3Atrue%2C%22progressSteps%22%3A%5B%7B%22label%22%3A%22Step%201%22%2C%22description%22%3A%22Step%201%20description%22%2C%22secondaryLabel%22%3A%22Optional%20label%22%2C%22invalid%22%3Afalse%2C%22disabled%22%3Afalse%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22progress-indicator-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ProgressIndicator currentIndex={1} onChange={() => alert('Clicked')}>
      <ProgressStep
        label="Click me"
        description="Step 1: Register a onChange event"
      />
      <ProgressStep
        label="Really long label"
        description="The progress indicator will listen for clicks on the steps"
      />
      <ProgressStep
        label="Third step"
        description="The progress indicator will listen for clicks on the steps"
      />
    </ProgressIndicator>
  </>
);

export const Skeleton = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ProgressIndicatorFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22progress-indicator%22%2C%22isVertical%22%3Atrue%2C%22currentIndex%22%3A0%2C%22spacing%22%3Atrue%2C%22progressSteps%22%3A%5B%7B%22label%22%3A%22Step%201%22%2C%22description%22%3A%22Step%201%20description%22%2C%22secondaryLabel%22%3A%22Optional%20label%22%2C%22invalid%22%3Afalse%2C%22disabled%22%3Afalse%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22progress-indicator-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ProgressIndicatorSkeleton />
  </>
);

export const Playground = (args) => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ProgressIndicatorFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22progress-indicator%22%2C%22isVertical%22%3Atrue%2C%22currentIndex%22%3A0%2C%22spacing%22%3Atrue%2C%22progressSteps%22%3A%5B%7B%22label%22%3A%22Step%201%22%2C%22description%22%3A%22Step%201%20description%22%2C%22secondaryLabel%22%3A%22Optional%20label%22%2C%22invalid%22%3Afalse%2C%22disabled%22%3Afalse%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22progress-indicator-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ProgressIndicator {...args}>
      <ProgressStep
        complete
        label="First step"
        description="Step 1: Getting started with Carbon Design System"
        secondaryLabel="Optional label"
      />
      <ProgressStep
        current
        label="Second step with tooltip"
        description="Step 2: Getting started with Carbon Design System"
      />
      <ProgressStep
        label="Third step with tooltip"
        description="Step 3: Getting started with Carbon Design System"
      />
      <ProgressStep
        label="Fourth step"
        description="Step 4: Getting started with Carbon Design System"
        invalid
        secondaryLabel="Example invalid step"
      />
      <ProgressStep
        label="Fifth step"
        description="Step 5: Getting started with Carbon Design System"
        disabled
      />
    </ProgressIndicator>
  </>
);

Playground.argTypes = {
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
  onChange: {
    table: {
      disable: true,
    },
  },
  currentIndex: {
    control: { type: 'number' },
    defaultValue: 0,
  },
  spaceEqually: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  vertical: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
};
