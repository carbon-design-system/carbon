/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import SkeletonText from '../SkeletonText';

const { prefix } = settings;

export default class PaginationSkeleton extends React.Component {
  render() {
    return (
      <div className={`${prefix}--pagination ${prefix}--skeleton`}>
        <div className={`${prefix}--pagination__left`}>
          <SkeletonText width="70px" />
          <SkeletonText width="35px" />
          <SkeletonText width="105px" />
        </div>
        <div
          className={`${prefix}--pagination__right ${prefix}--pagination--inline`}>
          <SkeletonText width="70px" />
        </div>
      </div>
    );
  }
}
