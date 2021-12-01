/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';

export default {
  title: 'Elements/IBM Plex',
  argTypes: {
    fontWeight: {
      control: {
        type: 'radio',
      },
      defaultValue: 'Regular',
      mapping: {
        Light: 300,
        Regular: 400,
        SemiBold: 600,
      },
      options: ['Light', 'Regular', 'SemiBold'],
    },
  },
};

export const IBMPlexMono = (args) => {
  return (
    <code dir="auto" style={args} className="text-mono">
      This paragraph is in English and goes left to right.
    </code>
  );
};

export const IBMPlexSansArabic = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans-arabic">
      هذه الفقرة باللغة العربية ، لذا يجب الانتقال من اليمين إلى اليسار.
    </p>
  );
};

export const IBMPlexSans = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans">
      This paragraph is in English and goes left to right.
    </p>
  );
};

export const IBMPlexSerif = (args) => {
  return (
    <p dir="auto" style={args} className="text-serif">
      This paragraph is in English and goes left to right.
    </p>
  );
};
