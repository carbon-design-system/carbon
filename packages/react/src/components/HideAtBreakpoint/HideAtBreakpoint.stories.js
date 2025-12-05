/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './HideAtBreakpoint-story.scss';
import mdx from './HideAtBreakpoint.mdx';

export default {
  title: 'Helpers/HideAtBreakpoint',
  component: 'HideAtBreakpoint',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    theme: 'g10',
  },
  argTypes: {
    theme: {
      options: ['white', 'g10', 'g90', 'g100'],
      control: { type: 'select' },
      description: 'The theme to apply to the component.',
    },
  },
};

export const HideAtBreakpoint = () => {
  return (
    <>
      <div className="hide-at-sm">
        <code>@include hide-at-sm</code> <br />
        <br />
        Only hidden on sm breakpoint
      </div>
      <div className="hide-at-md">
        <code>@include hide-at-md</code> <br />
        <br />
        Only hidden on md breakpoint
      </div>
      <div className="hide-at-lg">
        <code>@include hide-at-lg</code> <br />
        <br />
        Only hidden on lg breakpoint
      </div>
      <div className="hide-at-xlg">
        <code>@include hide-at-xlg</code> <br />
        <br />
        Only hidden on xlg breakpoint
      </div>
      <div className="hide-at-max">
        <code>@include hide-at-max</code> <br />
        <br />
        Only hidden on max breakpoint
      </div>
    </>
  );
};
