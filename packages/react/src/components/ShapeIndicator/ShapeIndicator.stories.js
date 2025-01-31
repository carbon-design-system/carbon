/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ShapeIndicator from '.';
import { ShapeIndicatorKinds } from './index';
import mdx from './ShapeIndicator.mdx';

export default {
  title: 'Experimental/StatusIndicators/unstable__ShapeIndicator',
  component: ShapeIndicator,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        columnGap: '1rem',
        rowGap: '0.5rem',
        width: 'fit-content',
      }}>
      {ShapeIndicatorKinds.map((type) => (
        <>
          <ShapeIndicator kind={type} label={type} />
          <ShapeIndicator kind={type} label={type} size={14} />
        </>
      ))}
    </div>
  );
};

const PlaygroundStory = (props) => {
  return <ShapeIndicator {...props} />;
};

export const Playground = PlaygroundStory.bind({});

Playground.args = {
  label: 'Custom label',
  kind: 'failed',
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
    options: ShapeIndicatorKinds,
  },
  size: {
    control: {
      type: 'select',
    },
    options: [16, 20],
  },
};
