/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import IconIndicator from '.';
import { IconIndicatorKinds } from './index';
import mdx from './IconIndicator.mdx';

export default {
  title: 'Components/StatusIndicators/IconIndicator',
  component: IconIndicator,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return IconIndicatorKinds.map((type) => (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <IconIndicator kind={type} label={type} />
      <IconIndicator kind={type} label={type} size={20} />
    </div>
  ));
};

const PlaygroundStory = (props) => {
  return <IconIndicator {...props} />;
};

export const Playground = PlaygroundStory.bind({});

Playground.args = {
  label: 'Custom label',
  kind: 'error',
  size: 16,
};

Playground.argTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  kind: {
    control: {
      type: 'select',
    },
    options: IconIndicatorKinds,
  },
  size: {
    control: {
      type: 'select',
    },
    options: [16, 20],
  },
};
