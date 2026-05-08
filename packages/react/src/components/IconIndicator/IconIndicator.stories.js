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
  title: 'Preview/StatusIndicators/preview__IconIndicator',
  component: IconIndicator,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
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

export const Compact = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row',
        gap: '1rem',
        alignItems: 'center',
      }}>
      <IconIndicator kind="failed" label="Failed" compact {...props} />
      <IconIndicator
        kind="caution-major"
        label="Caution major"
        compact
        {...props}
      />
      <IconIndicator
        kind="caution-minor"
        label="Caution minor"
        compact
        {...props}
      />
      <IconIndicator kind="undefined" label="Undefined" compact {...props} />
      <IconIndicator kind="succeeded" label="Succeeded" compact {...props} />
      <IconIndicator kind="normal" label="Normal" compact {...props} />
      <IconIndicator
        kind="in-progress"
        label="In progress"
        compact
        {...props}
      />
      <IconIndicator kind="incomplete" label="Incomplete" compact {...props} />
      <IconIndicator
        kind="not-started"
        label="Not started"
        compact
        {...props}
      />
      <IconIndicator kind="pending" label="Pending" compact {...props} />
      <IconIndicator kind="unknown" label="Unknown" compact {...props} />
      <IconIndicator
        kind="informative"
        label="Informative"
        compact
        {...props}
      />
    </div>
  );
};

Compact.args = {
  size: 16,
};
Compact.argTypes = sharedArgTypes;
