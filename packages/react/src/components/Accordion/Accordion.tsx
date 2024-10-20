/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';
import React, { PropsWithChildren, ReactNode } from 'react';
import { AccordionProvider } from './AccordionProvider';

export interface AccordionProps {
  /**
   * Specify the alignment of the accordion heading
   * title and chevron. Defaults to `end`.
   */
  align?: 'start' | 'end';

  /**
   * Specify an optional className to be applied to
   * the container node.
   */
  className?: string;

  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children?: ReactNode;

  /**
   * Specify whether an individual AccordionItem
   * should be disabled.
   */
  disabled?: boolean;

  /**
   * Specify whether Accordion text should be flush,
   * default is `false`, does not work with `align="start"`.
   */
  isFlush?: boolean;

  /**
   * Specify if the Accordion should be an ordered list,
   * default is `false`
   */
  ordered?: boolean;

  /**
   * Specify the size of the Accordion. Currently
   * supports the following: `sm`, `md`, `lg`
   */
  size?: 'sm' | 'md' | 'lg';
}

function Accordion({
  align = 'end',
  children,
  className: customClassName,
  disabled = false,
  isFlush = false,
  ordered = false,
  size,
  ...rest
}: PropsWithChildren<AccordionProps>) {
  const prefix = usePrefix();

  const className = cx(`${prefix}--accordion`, customClassName, {
    [`${prefix}--accordion--${align}`]: align,
    [`${prefix}--accordion--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--accordion--flush`]: isFlush && align !== 'start',
  });
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <AccordionProvider disabled={disabled}>
      <ListTag className={className} {...rest}>
        {children}
      </ListTag>
    </AccordionProvider>
  );
}

Accordion.propTypes = {
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: PropTypes.oneOf(['start', 'end']),

  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether Accordion text should be flush, default is false, does not work with align="start"
   */
  isFlush: PropTypes.bool,

  /**
   * Specify if the Accordion should be an ordered list,
   * default is `false`
   */
  ordered: PropTypes.bool,

  /**
   * Specify the size of the Accordion. Currently supports the following:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Accordion;
