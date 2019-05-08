/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class CheckboxSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className={`${prefix}--form-item ${prefix}--checkbox-wrapper`}>
        {
          // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
          <label
            className={`${prefix}--checkbox-label ${prefix}--skeleton`}
            htmlFor={id}
          />
        }
      </div>
    );
  }
}
