/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import bg from './carbon_bg.png';
import './welcome.scss';
import PackageInfo from './../../package.json';

export const Welcome = () => {
  return (
    <div
      className="welcome__container"
      style={{
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}>
      <h2 className="welcome__heading">Carbon Components</h2>
      <h4 className="welcome__heading welcome__heading--subtitle">{`React v${PackageInfo.version}`}</h4>
    </div>
  );
};
