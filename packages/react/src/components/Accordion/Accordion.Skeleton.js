/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import SkeletonText from '../SkeletonText';
import ChevronRight16 from '@carbon/icons-react/lib/chevron--right/16';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default function AccordionSkeleton(props) {
  const Item = () => (
    <li className={`${prefix}--accordion__item`}>
      <button type="button" className={`${prefix}--accordion__heading`}>
        <ChevronRight16 className={`${prefix}--accordion__arrow`} />
        <SkeletonText className={`${prefix}--accordion__title`} />
      </button>
    </li>
  );
  return (
    <ul className={`${prefix}--accordion ${prefix}--skeleton`}>
      {props.open ? (
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
      ) : (
        <Item />
      )}
      {Array.from({
        length: props.count
          ? props.count - 1
          : AccordionSkeleton.defaultProps.count,
      }).map((v, i) => (
        <Item key={`skeleton-accordion-item-${props.uid}-${i}`} />
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
  uid: PropTypes.any,
};

AccordionSkeleton.defaultProps = {
  open: true,
  count: 4,
  uid: '',
};
