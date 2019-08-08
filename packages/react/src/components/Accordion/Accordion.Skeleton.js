/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { ChevronRight16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import SkeletonText from '../SkeletonText';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;

function AccordionSkeleton(props) {
  const numSkeletonItems = props.open ? props.count - 1 : props.count;
  return (
    <ul className={`${prefix}--accordion ${prefix}--skeleton`}>
      {props.open && (
        <li
          className={`${prefix}--accordion__item ${prefix}--accordion__item--active`}>
          <button type="button" className={`${prefix}--accordion__heading`}>
            <ChevronRight16 className={`${prefix}--accordion__arrow`} />
            <SkeletonText className={`${prefix}--accordion__title`} />
          </button>
          <div className={`${prefix}--accordion__content`}>
            <SkeletonText width="90%" />
            <SkeletonText width="80%" />
            <SkeletonText width="95%" />
          </div>
        </li>
      )}
      {Array.from({ length: numSkeletonItems }).map((_, i) => (
        <AccordionSkeletonItem key={i} />
      ))}
    </ul>
  );
}

AccordionSkeleton.propTypes = {
  /**
   * `false` to not display the first item opened
   */
  open: PropTypes.bool,

  /**
   * Set number of items to render
   */
  count: PropTypes.number,

  /**
   * Set unique identifier to generate unique item keys
   */
  uid: deprecate(PropTypes.any),
};

AccordionSkeleton.defaultProps = {
  open: true,
  count: 4,
};

function AccordionSkeletonItem() {
  return (
    <li className={`${prefix}--accordion__item`}>
      <button type="button" className={`${prefix}--accordion__heading`}>
        <ChevronRight16 className={`${prefix}--accordion__arrow`} />
        <SkeletonText className={`${prefix}--accordion__title`} />
      </button>
    </li>
  );
}

export default AccordionSkeleton;
