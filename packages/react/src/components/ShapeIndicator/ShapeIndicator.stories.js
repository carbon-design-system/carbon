/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ShapeIndicator from '.';
import mdx from './ShapeIndicator.mdx';

export default {
  title: 'Preview/StatusIndicators/preview__ShapeIndicator',
  component: ShapeIndicator,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  align: {
    control: {
      type: 'select',
    },
    options: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
  },
  autoAlign: {
    control: {
      type: 'boolean',
    },
  },
  compact: {
    control: {
      type: 'boolean',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  kind: {
    control: false,
  },
  shapeDescription: {
    control: {
      type: 'text',
    },
  },
  textSize: {
    control: {
      type: 'select',
    },
    options: [12, 14],
  },
};

export const Default = (props) => {
  return (
    <div
      style={{
        display: 'inline-flex',
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
  align: 'right',
  autoAlign: false,
  compact: false,
  shapeDescription: 'Shape',
  textSize: 12,
};

Default.argTypes = sharedArgTypes;

export const DefaultWithTextSize14 = (props) => {
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

DefaultWithTextSize14.args = {
  align: 'right',
  autoAlign: false,
  compact: false,
  shapeDescription: 'Shape',
  textSize: 14,
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
DefaultWithTextSize14.tags = ['!dev', '!autodocs'];

DefaultWithTextSize14.argTypes = sharedArgTypes;
