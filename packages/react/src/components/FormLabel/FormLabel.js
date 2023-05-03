/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import * as FeatureFlags from '@carbon/feature-flags';

function FormLabel({ className: customClassName, children, id, ...rest }) {
  const prefix = usePrefix();
  const className = cx(
    `${prefix}--label`,
    {
      [`${prefix}--label--no-margin`]:
        FeatureFlags.enabled('enable-v11-release'),
    },
    customClassName
  );

  return (
    <label htmlFor={id} className={className} {...rest}>
      {children}
    </label>
  );
}

FormLabel.propTypes = {
  /**
   * Specify the content of the form label
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <label> node
   */
  className: PropTypes.string,

  /**
   * Provide a unique id for the given <FormLabel>
   */
  id: PropTypes.string,
};

export default FormLabel;
