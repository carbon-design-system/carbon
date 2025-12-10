/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from '.';
import mdx from './Loading.mdx';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    docs: {
      page: mdx,
    },
    // The id prop is deprecated and should be remove in the next major release
    controls: {
      exclude: ['id'],
    },
  },
};

export const Default = (args) => {
  return <Loading className={'some-class'} {...args} />;
};

Default.args = {
  active: true,
  withOverlay: false,
  small: false,
  description: 'Loading',
};

Default.argTypes = {
  active: {
    control: {
      type: 'boolean',
    },
  },
  withOverlay: {
    control: {
      type: 'boolean',
    },
  },
  small: {
    control: {
      type: 'boolean',
    },
  },
  description: {
    control: {
      type: 'text',
    },
  },
};

export const AnimationSpeeds = () => {
  const speeds = [400, 450, 500, 550, 600, 650, 690, 700, 750, 800, 850, 900];

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'center',
      }}>
      {speeds.map((speed) => (
        <div
          key={speed}
          style={{
            textAlign: 'center',
            padding: '1rem',
            border: speed === 690 ? '2px solid red' : 'none',
            borderRadius: '4px',
          }}>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            {speed}ms{speed === 690 ? ' (Current)' : ''}
          </p>
          <Loading
            active={true}
            withOverlay={false}
            description={`Loading at ${speed}ms`}
            className={speed !== 690 ? `loading-speed-${speed}` : ''}
          />
        </div>
      ))}
      <style>{`
        ${speeds
          .filter((speed) => speed !== 690)
          .map(
            (speed) =>
              `.loading-speed-${speed} { animation-duration: ${speed}ms !important; }`
          )
          .join('\n        ')}
      `}</style>
    </div>
  );
};

AnimationSpeeds.parameters = {
  docs: {
    description: {
      story:
        'Compare different animation speeds from 400ms to 900ms in 50ms increments. Current default is 690ms (highlighted with red border).',
    },
  },
};
