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
  return (
    <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>400ms</p>
        <Loading
          active={true}
          withOverlay={false}
          description="Loading at 400ms"
          className="loading-speed-400"
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>500ms</p>
        <Loading
          active={true}
          withOverlay={false}
          description="Loading at 500ms"
          className="loading-speed-500"
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          690ms (current)
        </p>
        <Loading
          active={true}
          withOverlay={false}
          description="Loading at 690ms"
        />
      </div>
      <style>{`
        .loading-speed-400 {
          animation-duration: 400ms !important;
        }
        .loading-speed-500 {
          animation-duration: 500ms !important;
        }
      `}</style>
    </div>
  );
};

AnimationSpeeds.parameters = {
  docs: {
    description: {
      story:
        'Compare different animation speeds side by side. Default is 690ms, with options for 400ms and 500ms.',
    },
  },
};
