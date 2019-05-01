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
    const currentSvg = (
      <svg>
        <path d="M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0" />
      </svg>
    );

    const step = (
      <li
        className={`${prefix}--progress-step ${prefix}--progress-step--incomplete`}>
        <div
          className={`${prefix}--progress-step-button ${prefix}--progress-step-button--unclickable`}>
          {currentSvg}
          <p className={`${prefix}--progress-label`} />
          <span className={`${prefix}--progress-line`} />
        </div>
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
