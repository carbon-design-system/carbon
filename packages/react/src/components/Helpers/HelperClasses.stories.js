/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

export default {
  title: 'Helpers/BreakpointClasses',
  component: BreakpointClasses,
};

export const BreakpointClasses = () => {
  const prefix = usePrefix();
  return (
    <>
      <div className={`${prefix}__hidden--sm-only`}>
        Only hidden on sm breakpoint
      </div>
      <div className={`${prefix}__hidden--md-only`}>
        Only hidden on md breakpoint
      </div>
      <div className={`${prefix}__hidden--lg-only`}>
        Only hidden on lg breakpoint
      </div>
      <div className={`${prefix}__hidden--xlg-only`}>
        Only hidden on xlg breakpoint
      </div>
      <div className={`${prefix}__hidden--max-only`}>
        Only hidden on max breakpoint
      </div>
    </>
  );
};
