/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

import { Annotation } from '../Annotation';

function WithDeprecationNotice({ children, text }) {
  return (
    <Annotation
      type="deprecation-notice"
      text={
        <div>
          <strong>Deprecation notice</strong>
          <br />
          {text}
        </div>
      }>
      {children}
    </Annotation>
  );
}

WithDeprecationNotice.propTypes = {
  /**
   * The story to be rendered with the provided feature flags.
   */
  children: PropTypes.node,

  /**
   * The deprecation notice.
   */
  text: PropTypes.string,
};

export { WithDeprecationNotice };
