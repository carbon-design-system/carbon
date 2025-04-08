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
  title: 'Experimental/StatusIndicators/unstable__IconIndicator',
  component: IconIndicator,
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
  size: 16,
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
  size: {
    control: {
      type: 'select',
    },
    options: [16, 20],
  },
};
