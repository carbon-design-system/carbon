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

import Accordion from '../Accordion';
import AccordionItem from '../AccordionItem';
import TextInput from '../TextInput';
import { Stack } from '../Stack';

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
  argTypes: {
    as: {
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
  },
  args: {
    level: 0,
  },
};

export const Default = () => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
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

export const withBackground = () => {
  function TestComponent() {
    return (
      <div className="example-layer-test-component-no-background">
        Test component
      </div>
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

export const CustomLevel = (args) => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
  }

  return (
    <Layer level={2} {...args}>
      <TestComponent />
    </Layer>
  );
};

CustomLevel.args = {
  level: 2,
};

export const UseLayer = () => {
  function ExampleComponent() {
    const { level } = useLayer();
    return (
      <div style={{ padding: '1rem', background: 'var(--cds-layer)' }}>
        The current layer level is: {level}
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

UseLayer.story = {
  name: 'useLayer',
};

export const Test = () => {
  function TestComponent() {
    return (
      <div
        style={{
          padding: '2rem',
        }}>
        <Stack gap={6}>
          <TextInput labelText="Text input" id="text-input-1" type="text" />
          <Accordion>
            <AccordionItem title="Accordion 1 title">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </AccordionItem>
            <AccordionItem title="Accordion 2 title">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </AccordionItem>
          </Accordion>
        </Stack>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <h2>Nested layer components</h2>
        <p>
          Layer component doesn't automatically set the background, just changes
          the components inside
        </p>
        <TestComponent />
        <Layer>
          <TestComponent />
          <Layer>
            <TestComponent />
          </Layer>
        </Layer>
      </div>
      <div style={{ width: '50%' }}>
        <h2>Nested layer components withBackground</h2>
        <p>
          If you want the Layer component to automatically set the background
          use the withBackground prop
        </p>
        <TestComponent />
        <Layer withBackground>
          <TestComponent />
          <Layer withBackground>
            <TestComponent />
          </Layer>
        </Layer>
      </div>
    </div>
  );
};
