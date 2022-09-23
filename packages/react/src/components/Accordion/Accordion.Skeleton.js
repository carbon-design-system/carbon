/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { ChevronRight } from '@carbon/icons-react';
import SkeletonText from '../SkeletonText';
import { usePrefix } from '../../internal/usePrefix';

function AccordionSkeleton({
  align,
  className,
  count,
  isFlush,
  open,
  ...rest
}) {
  const prefix = usePrefix();
  const classes = cx(`${prefix}--accordion`, `${prefix}--skeleton`, className, {
    [`${prefix}--accordion--${align}`]: align,
    [`${prefix}--accordion--flush`]: isFlush && align !== 'start',
  });
  const numSkeletonItems = open ? count - 1 : count;
  return (
    <ul className={classes} {...rest}>
      {open && (
        <li
          className={`${prefix}--accordion__item ${prefix}--accordion__item--active`}>
          <span className={`${prefix}--accordion__heading`}>
            <ChevronRight className={`${prefix}--accordion__arrow`} />
            <SkeletonText className={`${prefix}--accordion__title`} />
          </span>
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
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: PropTypes.oneOf(['start', 'end']),

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Set number of items to render
   */
  count: PropTypes.number,

  /**
   * Specify whether an individual AccordionItem should be flush, default is false
   */
  isFlush: PropTypes.bool,

  /**
   * `false` to not display the first item opened
   */
  open: PropTypes.bool,
};

AccordionSkeleton.defaultProps = {
  open: true,
  count: 4,
  align: 'end',
};

function AccordionSkeletonItem() {
  const prefix = usePrefix();
  return (
    <li className={`${prefix}--accordion__item`}>
      <span className={`${prefix}--accordion__heading`}>
        <ChevronRight className={`${prefix}--accordion__arrow`} />
        <SkeletonText className={`${prefix}--accordion__title`} />
      </span>
    </li>
  );
}

export default AccordionSkeleton;
