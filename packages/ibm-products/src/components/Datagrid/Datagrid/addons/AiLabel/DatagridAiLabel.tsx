/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  isValidElement,
} from 'react';
import PropTypes from 'prop-types';

interface DatagridAILabelProps {
  aiLabel?: ReactNode;
}

interface NormalizedAILabeProps {
  size?: string;
  ref?: ForwardedRef<HTMLDivElement>;
}

export const DatagridAILabel = forwardRef(
  ({ aiLabel }: DatagridAILabelProps, ref: ForwardedRef<HTMLDivElement>) => {
    if (aiLabel && isValidElement(aiLabel)) {
      const normalizedAILabel = React.cloneElement(aiLabel, {
        size: 'mini',
        ref,
      } as NormalizedAILabeProps);
      return normalizedAILabel;
    }
    return null;
  }
);

DatagridAILabel.propTypes = {
  /**
   * Specify the AI AILabel to be displayed
   */
  aiLabel: PropTypes.node,
};
