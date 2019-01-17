/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class ProgressIndicatorSkeleton extends React.Component {
  render() {
    const step = (
      <li
        className={`${prefix}--progress-step ${prefix}--progress-step--incomplete`}>
        <svg>
          <g>
            <circle cx="12" cy="12" r="12" />
          </g>
        </svg>
        <p className={`${prefix}--progress-label`} />
        <span className={`${prefix}--progress-line`} />
      </li>
    );

    return (
      <ul className={`${prefix}--progress ${prefix}--skeleton`}>
        {step}
        {step}
        {step}
        {step}
      </ul>
    );
  }
}
