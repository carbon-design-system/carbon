/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode, type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

type DivProps = HTMLAttributes<HTMLDivElement>;
export interface ModalInfluencerProps extends DivProps {
  /**
   * Specify the content to be placed in the ModalInfluencer
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal influencer
   */
  className?: string;

  /**
   * Specify an optional location for the influencer
   */
  location: 'start' | 'end';
}

export const ModalInfluencer = React.forwardRef<
  HTMLDivElement,
  ModalInfluencerProps
>(function ModalInfluencer(
  { children, className: customClassName, location, ...rest },
  ref
) {
  const prefix = usePrefix();

  const influencerClass = cx(
    `${prefix}--modal-influencer ${prefix}--modal-influencer--${location}`,
    customClassName
  );

  return (
    <div className={influencerClass} {...rest} ref={ref}>
      {children}
    </div>
  );
});

ModalInfluencer.propTypes = {
  /**
   * Specify the content to be placed in the ModalInfluencer
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal influencer
   */
  className: PropTypes.string,

  /**
   * Specify an optional location for the influencer
   */
  location: PropTypes.oneOf(['start', 'end']),
};
