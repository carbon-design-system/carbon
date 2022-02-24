/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import IconSkeleton from '../Icon/Icon.Skeleton';

const propsSkeleton = {
  style: {
    margin: '50px',
  },
};

const propsSkeleton2 = {
  style: {
    margin: '50px',
    width: '24px',
    height: '24px',
  },
};

export default {
  title: 'Components/IconSkeleton',
  component: IconSkeleton,
};

export const Default = () => (
  <>
    <IconSkeleton {...propsSkeleton} />
    <IconSkeleton {...propsSkeleton2} />
  </>
);

Default.parameters = {
  info: {
    text: `
        Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see https://www.carbondesignsystem.com/guidelines/iconography/library
      `,
  },
};
