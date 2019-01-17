/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class BreadcrumbSkeleton extends React.Component {
  render() {
    const item = (
      <div className={`${prefix}--breadcrumb-item`}>
        <a href="/#" className={`${prefix}--link`}>
          &nbsp;
        </a>
      </div>
    );
    return (
      <div className={`${prefix}--breadcrumb ${prefix}--skeleton`}>
        {item}
        {item}
        {item}
      </div>
    );
  }
}
