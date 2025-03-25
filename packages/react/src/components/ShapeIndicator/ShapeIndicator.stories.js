/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ShapeIndicator from '.';
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

export const Default = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        rowGap: '.5rem',
      }}>
      <ShapeIndicator kind="failed" label="Failed" {...props} />
      <ShapeIndicator kind="critical" label="Critical" {...props} />
      <ShapeIndicator kind="high" label="High" {...props} />
      <ShapeIndicator kind="medium" label="Medium" {...props} />
      <ShapeIndicator kind="low" label="Low" {...props} />
      <ShapeIndicator kind="cautious" label="Cautious" {...props} />
      <ShapeIndicator kind="undefined" label="Undefined" {...props} />
      <ShapeIndicator kind="stable" label="Stable" {...props} />
      <ShapeIndicator kind="informative" label="Informative" {...props} />
      <ShapeIndicator kind="incomplete" label="Incomplete" {...props} />
      <ShapeIndicator kind="draft" label="Draft" {...props} />
    </div>
  );
};

Default.args = {
  textSize: 12,
};

Default.argTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  kind: {
    control: false,
  },
  textSize: {
    control: {
      type: 'select',
    },
    options: [12, 14],
  },
};
