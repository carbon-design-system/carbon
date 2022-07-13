/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './HelperClasses-story.scss';
import React from 'react';

export default {
  title: 'Helpers/BreakpointClasses',
  component: BreakpointClasses,
};

export const BreakpointClasses = () => {
  return (
    <>
      <div className="hide-at-sm">Only hidden on sm breakpoint</div>
      <div className="hide-at-md">Only hidden on md breakpoint</div>
      <div className="hide-at-lg">Only hidden on lg breakpoint</div>
      <div className="hide-at-xlg">Only hidden on xlg breakpoint</div>
      <div className="hide-at-max">Only hidden on max breakpoint</div>
    </>
  );
};
