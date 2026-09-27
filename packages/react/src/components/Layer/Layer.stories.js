/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Layer-story.scss';
import React from 'react';
import { Layer, useLayer } from '../Layer';
import mdx from './Layer.mdx';

export default {
  title: 'Components/Layer',
  component: Layer,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
};

const contentArgTypes = {
  label: {
    control: { type: 'text' },
  },
};

const contentParameters = {
  controls: {
    include: ['label'],
  },
};

export const Default = ({ label }) => {
  function TestComponent() {
    return <div className="example-layer-test-component">{label}</div>;
  }

  return (
    <>
      <TestComponent />
      <Layer>
        <TestComponent />
        <Layer>
          <TestComponent />
        </Layer>
      </Layer>
    </>
  );
};

Default.args = {
  label: 'Workspace settings',
};
Default.argTypes = contentArgTypes;
Default.parameters = contentParameters;

export const withBackground = ({ label }) => {
  function TestComponent() {
    return (
      <div className="example-layer-test-component-no-background">{label}</div>
    );
  }

  return (
    <>
      <TestComponent />
      <Layer withBackground>
        <TestComponent />
        <Layer withBackground>
          <TestComponent />
        </Layer>
      </Layer>
    </>
  );
};

withBackground.args = {
  label: 'Workspace settings',
};
withBackground.argTypes = contentArgTypes;
withBackground.parameters = contentParameters;

export const CustomLevel = ({ label, level }) => {
  function TestComponent() {
    return <div className="example-layer-test-component">{label}</div>;
  }

  return (
    <Layer level={level}>
      <TestComponent />
    </Layer>
  );
};

CustomLevel.args = {
  label: 'Workspace settings',
  level: 2,
};
CustomLevel.argTypes = {
  ...contentArgTypes,
  level: {
    control: { type: 'select' },
    options: [0, 1, 2],
  },
};
CustomLevel.parameters = {
  controls: {
    include: ['label', 'level'],
  },
};

export const UseLayer = ({ label }) => {
  function ExampleComponent() {
    const { level } = useLayer();
    return (
      <div style={{ padding: '1rem', background: 'var(--cds-layer)' }}>
        {label}: {level}
      </div>
    );
  }

  return (
    <>
      <ExampleComponent />
      <Layer>
        <ExampleComponent />
      </Layer>
    </>
  );
};

UseLayer.args = {
  label: 'Current layer level',
};
UseLayer.argTypes = contentArgTypes;
UseLayer.parameters = contentParameters;

UseLayer.story = {
  name: 'useLayer',
};
