/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import IconIndicator from '.';
import { IconIndicatorKinds } from './index';
import mdx from './IconIndicator.mdx';

export default {
  title: 'Preview/StatusIndicators/preview__IconIndicator',
  component: IconIndicator,
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
  iconDescription: {
    control: {
      type: 'text',
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
  size: {
    control: {
      type: 'select',
    },
    options: [16, 20],
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
      <IconIndicator kind="failed" label="Failed" {...props} />
      <IconIndicator kind="caution-major" label="Caution major" {...props} />
      <IconIndicator kind="caution-minor" label="Caution minor" {...props} />
      <IconIndicator kind="undefined" label="Undefined" {...props} />
      <IconIndicator kind="succeeded" label="Succeeded" {...props} />
      <IconIndicator kind="normal" label="Normal" {...props} />
      <IconIndicator kind="in-progress" label="In progress" {...props} />
      <IconIndicator kind="incomplete" label="Incomplete" {...props} />
      <IconIndicator kind="not-started" label="Not started" {...props} />
      <IconIndicator kind="pending" label="Pending" {...props} />
      <IconIndicator kind="unknown" label="Unknown" {...props} />
      <IconIndicator kind="informative" label="Informative" {...props} />
    </div>
  );
};

Default.args = {
  align: 'right',
  autoAlign: false,
  iconDescription: 'Icon',
  compact: false,
  size: 16,
};
Default.argTypes = sharedArgTypes;

export const DefaultWithSize20 = (props) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexFlow: 'column',
        rowGap: '.5rem',
      }}>
      <IconIndicator kind="failed" label="Failed" {...props} />
      <IconIndicator kind="caution-major" label="Caution major" {...props} />
      <IconIndicator kind="caution-minor" label="Caution minor" {...props} />
      <IconIndicator kind="undefined" label="Undefined" {...props} />
      <IconIndicator kind="succeeded" label="Succeeded" {...props} />
      <IconIndicator kind="normal" label="Normal" {...props} />
      <IconIndicator kind="in-progress" label="In progress" {...props} />
      <IconIndicator kind="incomplete" label="Incomplete" {...props} />
      <IconIndicator kind="not-started" label="Not started" {...props} />
      <IconIndicator kind="pending" label="Pending" {...props} />
      <IconIndicator kind="unknown" label="Unknown" {...props} />
      <IconIndicator kind="informative" label="Informative" {...props} />
    </div>
  );
};

DefaultWithSize20.args = {
  align: 'top',
  autoAlign: true,
  compact: false,
  size: 20,
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
DefaultWithSize20.tags = ['!dev', '!autodocs'];
DefaultWithSize20.argTypes = sharedArgTypes;
