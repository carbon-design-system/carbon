/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Loading from '.';
import mdx from './Loading.mdx';
import Button from '../Button';

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

const sharedArgTypes = {
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

Default.argTypes = { ...sharedArgTypes };

export const UXExample = () => {
  const [isActive, setIsActive] = useState(false);

  const startLoading = () => setIsActive(true);
  const stopLoading = () => setIsActive(false);

  return (
    <main>
      <Button onClick={startLoading}>Start</Button>
      <Button onClick={stopLoading}>Stop</Button>
      <Loading active={isActive} withOverlay />
    </main>
  );
};

UXExample.storyName = 'UX Example';

UXExample.argTypes = { ...sharedArgTypes };
