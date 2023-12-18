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
import { Theme } from '../Theme';

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

export const CustomLevel = () => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
  }

  return (
    <Layer level={2}>
      <TestComponent />
    </Layer>
  );
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

const PlaygroundStory = (args) => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
  }

  return (
    <Layer {...args}>
      <TestComponent />
    </Layer>
  );
};

export const Playground = PlaygroundStory.bind({});

function Demo({ children }) {
  return (
    <div
      style={{
        background: 'var(--cds-layer)',
        border: '0.0625rem solid var(--cds-border-subtle)',
        blockSize: '4rem',
        padding: '1rem',
      }}>
      Element on {children}
    </div>
  );
}

const themes = ['white', 'g10', 'g90', 'g100'];

const Test = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr '.repeat(themes.length),
      }}>
      {themes.map((theme) => (
        <Theme theme={theme} key={theme}>
          <div
            style={{
              backgroundColor: 'var(--cds-background)',
              padding: '1rem',
            }}>
            <Demo>{`${theme} layer 1`}</Demo>
          </div>

          <div
            style={{
              backgroundColor: 'var(--cds-layer)',
              padding: '1rem',
            }}>
            <Layer>
              <Demo>{`${theme} layer 2`}</Demo>
            </Layer>
          </div>

          <Layer>
            <div
              style={{
                backgroundColor: 'var(--cds-layer)',
                padding: '1rem',
              }}>
              <Layer>
                <Demo>{`${theme} layer 3`}</Demo>
              </Layer>
            </div>
          </Layer>
        </Theme>
      ))}
    </div>
  );
};

export const TestStory = Test.bind({});
